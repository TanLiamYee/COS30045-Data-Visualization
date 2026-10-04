const populateFilters = (data) => {

  // Add screen type filter buttons
  d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)

    .on("click", (e, d) => {
      console.log("Clicked filter:", e);
      console.log("Clicked filter data:", d);

      // If the clicked filter is not already active,
      // update the active state of the filters
      if (!d.isActive) {

        // Make sure button clicked is not already active
        filters_screen.forEach(filter => {
          filter.isActive = d.id === filter.id ? true : false;
        });

        // Update the filter buttons based on which one was clicked
        d3.selectAll("#filters_screen .filter")
          .classed("active", filter => filter.id === d.id ? true : false);

        updateHistogram(d.id);
      }
    });

    // Update histogram based on selected screen type
    const updateHistogram = id => {

    // If "all" is selected, use all data.
    // Otherwise filter by screen technology.
    const updatedData = id === "all"
        ? data
        : data.filter(d => d.screenTech === id);

    // Create new bins using filtered data
    const updatedBins = binGenerator(updatedData);

    // Update histogram bars
    d3.select("#histogram")
    .selectAll("rect")
        .data(updatedBins)
        .join("rect")
        .transition()
        .duration(750)
        .ease(d3.easeCubicOut)
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor);
    };
};