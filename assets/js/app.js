// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from data.csv file
// ================================
d3.csv("assets/data/data.csv").then(function(censusData) {
    console.table(censusData),
    // Step 4: Parse the data
    // Use age and smoing data for our chart
    censusData.forEach(function(data) {
        data.age = parseFloat(data.age);
        data.smokes = parseFloat(data.smokes);        
    });

    // Step 5: Create Scales
    //= ============================================
    // x scale to scale ages data
    var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(censusData, data => data.smokes))
    .range([0, width]);

    // y scale to scale smokes data
    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, data => data.smokes)])
    .range([height, 0]);

    // Step 6: Create Axes
    // =============================================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
 

  


}).catch(function(error) {
    console.log(error);
});



