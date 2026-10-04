// Chart dimensions
const width = 1000;
const height = 600;

const margin = {
  top: 20,
  right: 30,
  bottom: 50,
  left: 60
};

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// set up inner chart variable for scatterplot
let innerChartS;

// set up tooltip dimensions
const tooltipWidth = 65;
const tooltipHeight = 32;

// Colours
const barColor = "#d2691e";
const bodyBackgroundColor = "#fffaf0";

// Scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// set up the scatterplot scales and color scale
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

// Bin generator
const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .thresholds(14);

// Array of filter options for screen types
const filters_screen = [
  { id: "all", label: "All", isActive: true },
  { id: "LED", label: "LED", isActive: false },
  { id: "LCD", label: "LCD", isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];