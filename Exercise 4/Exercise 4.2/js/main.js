// Exercise 4.2 - Step 2
// Use D3 to select and style HTML elements

d3.select("#overview h2")
  .style("color", "green");

d3.select("#models h2")
  .style("color", "darkblue");

// Exercise 4.2 - Step 3
// Append a paragraph using D3

d3.select(".d3-container")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Exercise 4.2 - Step 4
// Append a rectangle to the SVG using D3

d3.select("#d3-svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "green");