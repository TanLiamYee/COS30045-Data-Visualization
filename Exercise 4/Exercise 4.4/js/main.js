// Exercise 4.3 - D3 Setup

const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Exercise 4.4 - Load and convert CSV data

d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.Brand_Reg,
    count: +d["Count(SoldIn)"]
  };
}).then(data => {

  // Sort from highest count to lowest count
  data.sort((a, b) => b.count - a.count);

  console.log("Sorted data:", data);

  // Number of records
  console.log("Number of records:", data.length);

  // Maximum count
  console.log("Maximum:", d3.max(data, d => d.count));

  // Minimum count
  console.log("Minimum:", d3.min(data, d => d.count));

  // Minimum and maximum
  console.log("Extent:", d3.extent(data, d => d.count));

  // Pass the data to the bar chart function
  drawBarChart(data);

});