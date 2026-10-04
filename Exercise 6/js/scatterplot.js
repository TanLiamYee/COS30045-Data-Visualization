const drawScatterplot = (data) => {

    // Set the dimensions and margins of the chart area
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Create an inner chart group with margins
    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Calculate maximum values for the scales
    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    // Set up x scale for star rating
    xScaleS
        .domain([0, maxStar])
        .range([0, innerWidth]);

    // Set up y scale for energy consumption
    yScaleS
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

    // Set up colour scale for screen technology
    colorScale
        .domain(["LED", "LCD", "OLED"])
        .range(d3.schemeCategory10);

    // Draw scatterplot circles
    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 3)
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);

    // Create axes
    const bottomAxis = d3.axisBottom(xScaleS);
    const leftAxis = d3.axisLeft(yScaleS);

    // Add x-axis
    innerChartS
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Add y-axis
    innerChartS
        .append("g")
        .call(leftAxis);

    // Add x-axis label
    innerChartS
        .append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "middle")
        .text("Star Rating");

    // Add y-axis label
    innerChartS
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    // Add legend
    const legend = innerChartS
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${innerWidth - 100}, 10)`);

    const legendItems = legend
        .selectAll(".legend-item")
        .data(colorScale.domain())
        .join("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`);

    legendItems
        .append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", d => colorScale(d));

    legendItems
        .append("text")
        .attr("x", 18)
        .attr("y", 10)
        .text(d => d);

};