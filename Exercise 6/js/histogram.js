const drawHistogram = data => {

    // Create SVG container
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Create inner chart
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create bins from the data
    const bins = binGenerator(data);

    console.log("Bins:", bins);

    // Find minimum and maximum bin values
    const binsMinMax = [
        bins[0].x0,
        bins[bins.length - 1].x1
    ];

    // Find the largest number of TVs in any bin
    const binsMaxLength = d3.max(bins, d => d.length);

    // Define scales
    xScale
        .domain(binsMinMax)
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    // Draw histogram bars
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor);

    // Create axes
    const bottomAxis = d3.axisBottom(xScale);
    const leftAxis = d3.axisLeft(yScale);

    // Add x-axis
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Add y-axis
    innerChart
        .append("g")
        .call(leftAxis);

    // Add x-axis label
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    // Add y-axis label
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .text("Frequency");

};