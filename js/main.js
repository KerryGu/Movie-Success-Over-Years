let myChart;
let myTimeline;

loadData();

function loadData() {
    // Load data asynchronously
    d3.csv("data/imdb_top_1000.csv").then(data => {

        // Data processing: convert strings to numbers
        data = data.map(d => {
            // Remove commas from Gross and convert to number
            d.Gross = d.Gross ? +d.Gross.replace(/,/g, '') : 0;

            // Convert other numeric fields with validation
            d.Released_Year = +d.Released_Year;
            d.IMDB_Rating = +d.IMDB_Rating;
            d.Meta_score = d.Meta_score ? +d.Meta_score : null;
            d.No_of_Votes = +d.No_of_Votes;

            // Parse Runtime (remove " min" and convert to number)
            d.Runtime = +d.Runtime.replace(' min', '');

            return d;
        })
            // Filter out invalid data
            .filter(d => {
                return d.Gross > 0 &&
                    !isNaN(d.Released_Year) &&
                    d.Released_Year > 1900 &&
                    d.Released_Year < 2030 &&
                    !isNaN(d.IMDB_Rating) &&
                    !isNaN(d.No_of_Votes);
            });

        console.log("Data loaded:", data.length, "movies with valid gross data");

        // Hide loading indicator and show visualization (chart + timeline)
        d3.select("#loading-indicator").style("display", "none");
        d3.select("#visualization-content").style("display", "flex");
        d3.select(".visualization-continuation").style("display", "block");

        // Create main visualization
        myChart = new plotChart(null, data);

        // Create timeline slider with callback
        myTimeline = new Timeline("slider-chart", data, function (yearRange) {
            // Callback function: when brush changes, update the main chart
            myChart.updateYearRange(yearRange);
        });

        // ===== Rating Range Controls (Define before using in Reset All) =====
        const ratingMinSlider = d3.select("#rating-min");
        const ratingMaxSlider = d3.select("#rating-max");
        const ratingMinValue = d3.select("#rating-min-value");
        const ratingMaxValue = d3.select("#rating-max-value");
        const ratingRangeDisplay = d3.select("#rating-range-display");

        // Helper function to update rating range display and filter
        function updateRatingRange() {
            let minRating = +ratingMinSlider.property("value");
            let maxRating = +ratingMaxSlider.property("value");

            // Clamp: ensure min <= max
            if (minRating > maxRating) {
                minRating = maxRating;
                ratingMinSlider.property("value", minRating);
            }

            // Update displayed values
            ratingMinValue.text(minRating.toFixed(1));
            ratingMaxValue.text(maxRating.toFixed(1));
            ratingRangeDisplay.text(`${minRating.toFixed(1)}–${maxRating.toFixed(1)}`);

            // Update ARIA attributes for accessibility
            ratingMinSlider
                .attr("aria-valuenow", minRating)
                .attr("aria-valuetext", `Minimum rating ${minRating.toFixed(1)}`);
            ratingMaxSlider
                .attr("aria-valuenow", maxRating)
                .attr("aria-valuetext", `Maximum rating ${maxRating.toFixed(1)}`);

            // Update chart filter
            myChart.updateRatingRange([minRating, maxRating]);
        }

        // Attach event listeners to sliders
        ratingMinSlider.on("input", updateRatingRange);
        ratingMaxSlider.on("input", updateRatingRange);

        // Reset rating range button
        d3.select("#reset-rating-range").on("click", function() {
            this.blur(); // Remove focus after click

            // Reset sliders to default [0, 10]
            ratingMinSlider.property("value", 0);
            ratingMaxSlider.property("value", 10);

            // Update display and filter
            updateRatingRange();
        });

        // Setup reset all filters button
        d3.select("#reset-filters").on("click", function() {
            this.blur(); // Remove focus after click
            // Reset genre selection to all
            myChart.selectedGenres.clear();
            myChart.genres.forEach(genre => myChart.selectedGenres.add(genre));

            // Update dropdown UI
            d3.select("#select-all").property("checked", true);
            d3.selectAll("#genre-dropdown input[type='checkbox']").property("checked", true);
            d3.select("#dropdown-text").text("Movie Genres");

            // Reset timeline brush
            myTimeline.brushGroup.call(myTimeline.brush.move, null);
            myChart.yearRange = null;

            // Reset rating range
            ratingMinSlider.property("value", 0);
            ratingMaxSlider.property("value", 10);
            ratingMinValue.text("0.0");
            ratingMaxValue.text("10.0");
            ratingRangeDisplay.text("0.0–10.0");
            myChart.ratingRange = [0, 10];

            // Reset legend filters too
            myChart.resetLegend();

            // Reset zoom to default view
            myChart.resetZoom();
        });

        // Setup reset timeline button (new)
        d3.select("#reset-timeline").on("click", function() {
            this.blur(); // Remove focus after click
            // Reset timeline brush only
            myTimeline.brushGroup.call(myTimeline.brush.move, null);
            myChart.yearRange = null;

            // Update chart with current genre filters intact
            myChart.wrangleData();
        });

        // Remove focus from genre dropdown button after clicking
        d3.select("#genreDropdownButton").on("click", function() {
            // Delay blur slightly to allow Bootstrap dropdown to open
            setTimeout(() => this.blur(), 100);
        });

    }).catch(error => {
        console.error("Error loading data:", error);
    })
}

// Hide scroll indicator when user starts scrolling
window.addEventListener('scroll', function() {
    const viewportContent = document.querySelector('.viewport-content');
    if (viewportContent) {
        if (window.scrollY > 0) {
            viewportContent.style.setProperty('--scroll-indicator-opacity', '0');
        } else {
            viewportContent.style.setProperty('--scroll-indicator-opacity', '1');
        }
    }
});