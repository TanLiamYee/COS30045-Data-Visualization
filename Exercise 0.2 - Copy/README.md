# Energy Data Webpage

COS30045 Data Visualisation — Exercise 0.2

A simple static website built with HTML, CSS, and JavaScript that loads energy
data from a CSV file and displays it in a table, along with a short overview
section.

## Project Structure

Exercise 0.2
│
├── css/
│ └── styles.css
├── data/
│ └── data.csv
├── images/
│ └── PowerIcon.png
├── js/
│ └── scripts.js
├── index.html
└── README.md


## How to Run

This project uses `fetch()` to load `data.csv`, so it must be run through a
local server rather than opened directly as a file.

1. Open this folder in VS Code
2. Install the **Live Server** extension
3. Right-click `index.html` → "Open with Live Server"

## Data Source

`data.csv` contains sample renewable energy data (illustrative, not verified
real-world statistics) used to demonstrate loading and displaying data with
JavaScript.