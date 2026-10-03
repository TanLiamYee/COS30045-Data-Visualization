// Exercise 5.1 - Vertical Bar Chart

d3.csv("data/Data_exercise_5.1.csv", d => {
    return {
        Screen_Tech: d.Screen_Tech,
        Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"]
    };
}).then(data => {

    // Sort energy consumption
    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);

    console.log(data);

    // Draw bar chart
    drawVerticalBarChart(data);
});


const drawVerticalBarChart = data => {

    // Set up inner chart margins and dimensions
    const margin = { top: 40, right: 170, bottom: 25, left: 40 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    // Add the svg container for our chart
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");


    // Create inner chart group and apply margins
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


    // Create scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Energy_Consumption)])
        .range([innerHeight, 0]);


    // Calculate x and y axis
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d => d.toUpperCase());
    const leftAxis = d3.axisLeft(yScale);


    // Add axes
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChart
        .append("g")
        .call(leftAxis);


    // Add axis label
    innerChart
        .append("text")
        .text("Energy Consumption (kWh)")
        .attr("x", -margin.left)
        .attr("y", -25)
        .attr("text-anchor", "start");


    // Draw bars
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.Energy_Consumption))
        .attr("fill", "green");


    // Add value labels
    innerChart
        .selectAll(".bar-label")
        .data(data)
        .join("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.Energy_Consumption) - 5)
        .attr("text-anchor", "middle")
        .text(d => `${Math.round(d.Energy_Consumption)} kWh`);

};