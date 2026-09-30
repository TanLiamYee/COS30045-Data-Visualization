const DATA_URL = "data/data.csv";

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

async function loadData() {
  try {
    const response = await fetch(DATA_URL);
    const text = await response.text();
    const records = parseCSV(text);
    renderTable(records);
  } catch (err) {
    console.error("Failed to load data:", err);
  }
}

function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const row = {};
    headers.forEach((key, i) => {
      row[key] = values[i];
    });
    return row;
  });
}

function renderTable(records) {
  const tbody = document.getElementById("dataTableBody");
  tbody.innerHTML = records
    .map(
      (row) => `
      <tr>
        <td>${row.country}</td>
        <td>${row.year}</td>
        <td>${row.renewable_share_percent}%</td>
        <td>${row.total_consumption_twh}</td>
      </tr>`
    )
    .join("");
}