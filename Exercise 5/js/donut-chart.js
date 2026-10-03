// Exercise 5.3 - Donut Chart

d3.csv("data/Data_exercise_5.3.csv", d => {
    return {
        Screensize_Category: d.Screensize_Category,
        Count: +d.Count
    };
}).then(data => {

console.log("Exercise 5.3 data:", data);

    drawDonutChart(data);

});

const drawDonutChart = data => {

    // Set up chart dimensions
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; 

    // Create color scale
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_Category)) 
        .range(d3.schemeSet2); 

    // Calculate angle for each slice using d3.pie
    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null); 

    // Set up arc generator
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 1)
        .padAngle(0.02)
        .cornerRadius(5);

    // Create SVG container
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    // Create group and move it to the centre of the SVG
    const chart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Draw the donut arcs
    chart
        .selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.Screensize_Category));

    // Add labels
    chart
        .selectAll("text")
        .data(pie(data))
        .join("text")
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(d => d.data.Screensize_Category);

};