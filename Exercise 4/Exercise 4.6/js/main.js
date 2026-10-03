// Exercise 4.3

const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 500 1600")
    .style("border", "1px solid black");

// Exercise 4.4 

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

// Exercise 4.5

const drawBarChart = data => {

  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 400]);

  const yScale = d3.scaleBand()
  .domain(data.map(d => d.brand))
  .range([0, 1400])
  .padding(0.1);

  //const barHeight = 20;
  //const barSpacing = 5;

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => {
      console.log(d);
      return `bar bar-${d.count}`;
    })
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    .attr("x", 0)
    .attr("y", d => yScale(d.brand));

};