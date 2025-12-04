# 🎬 IMDb Movie Ratings Visualization (1920–2020)

A dynamic web‑based visualization project that explores how movie ratings have evolved over a century — from 1920 to 2020 — using data derived from a public IMDb dataset.

## 🌟 Overview

This project presents an interactive visualization of IMDb movie ratings across a span of 100 years (1920–2020). Users can:

- 📅 Filter and explore movies by **release year**  
- 🎥 Click on specific movies to view more detailed metadata and understand their **individual impact**  
- 🏆 Discover the most **highly rated** and **influential films** in each era  
- 🕰️ Explore how historical trends and cultural shifts may have influenced audience preferences over time  

Whether you're a film enthusiast, data explorer, or cultural researcher, this site offers a compelling way to dive into cinematic trends across decades.

## 📚 Dataset

The data powering this visualization comes from the public dataset **“IMDb Dataset of Top 1000 Movies and TV Shows”** on Kaggle. :contentReference[oaicite:1]{index=1}

- The dataset includes metadata such as title, release year, genre, runtime, rating, number of votes, and more.
- The dataset highlights top‑rated movies/TV shows over time and observe rating trends from 1920 to 2020.

You can view/download the dataset here:  
[https://www.kaggle.com/datasets/harshitshankhdhar/imdb-dataset-of-top-1000-movies-and-tv-shows](https://www.kaggle.com/datasets/harshitshankhdhar/imdb-dataset-of-top-1000-movies-and-tv-shows?resource=download)

## 💡 Features

- 🧭 **Year-based navigation:** Adjust the year slider to see movies from a specific period  
- 📈 **Dynamic visual encodings:** Patterns in ratings, vote counts, genres over time — helping users spot long-term trends  
- 🔍 **Movie detail exploration:** Click on any movie data point to show detailed metadata (title, year, rating, genre, runtime, votes, etc.)  
- 🎨 Clean and Netflix-inspired UI designed for storytelling and data discovery  

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Data Visualization:** D3.js  
- **Data Source:** The Kaggle IMDb top‑1000 dataset (static CSV/JSON) — no backend required  

## 📦 Installation & Usage

```bash
git clone https://github.com/KerryGu/Movie-Success-Over-Years.git
cd imdb-visualization

## 📂 Open index.html with Live Server

To properly run the visualization, you **must** open `index.html` using a local server (due to browser security restrictions with loading local files like CSV or JSON). We recommend using **Live Server** in Visual Studio Code.

## Step 1: Install Live Server Extension

1. Open your project in **Visual Studio Code**
2. Go to the **Extensions Marketplace**
3. Search for `Live Server` by **Ritwick Dey**
4. Click **Install**

## Step 2: Open with Live Server

Once the extension is installed:
- In VS Code, right-click on `index.html`
- Select **“Open with Live Server”**
- Your default browser will open a local address. Click on the address to go to the site.

