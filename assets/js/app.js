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
        data.age = +data.age;
        data.smokes = +data.smokes;        
    });

    // Step 5: Create Scales
    //= ============================================
    // x scale to scale ages data
    var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(censusData, data => data.age))
    .range([0, width]);

    // y scale to scale smokes data
    var yLinearScale = d3.scaleLinear()
    .domain(d3.extent(censusData, data => data.smokes))
    .range([height, 0]);

    // Step 6: Create Axes
    // =============================================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 7: Append the axes to the chartGroup - ADD STYLING
    // ==============================================
    // Add bottomAxis
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    // left axis
    chartGroup.append("g")
    // .attr("stroke", "green") // NEW!
    // .classed("green", true)
    .call(leftAxis);

    
    // append circles
   /* var circlesGroup = chartGroup.selectAll("circle")
      .data(censusData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.age))
      .attr("cy", d => yLinearScale(d.smokes))
      .attr("r", "8")
      //.classed("chart", true)
      .classed("stateCircle", true);
      //.classed("stateText", function((d, i) {
       // d.abbr;
      //})
    // Append text element to the circles
    
    var textGroup = chartGroup.selectAll("text")
    .data(censusData)
    .enter()
    .append("text");

    var textLabel = textGroup
      // .attr("dx", 0)
      // .attr("dy", ".35em")
      .attr("dx", d => xLinearScale(d.age))
      .attr("dy", d => yLinearScale(d.smokes))
      .attr("font-size", "5px")
      .text(function(d) {
        return d.abbr;
      })
      .classed("stateText", true);*/

    /*chartGroup.append("text")
    .text(function(d) {
      return d.abbr;
    })
    .attr("dx", d => xLinearScale(d.age))
    .attr("dy", d => yLinearScale(d.smokes))
    .attr("font-size", "10px")
    .classed("stateText", true);*/

    // append circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(censusData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.age))
      .attr("cy", d => yLinearScale(d.smokes))
      .attr("r", "15")
      //.classed("chart", true)
      .classed("stateCircle", true);
      //.classed("stateText", function((d, i) {
       // d.abbr;
      //})
    // Append text element to the circles
    
    var textGroup = chartGroup.selectAll(null)
    .data(censusData)
    .enter()
    .append("text");

    var textLabel = textGroup
      // .attr("dx", 0)
      // .attr("dy", ".35em")
      .attr("x", d => xLinearScale(d.age))
      .attr("y", d => yLinearScale(d.smokes))
      //.attr("dx", ".71em")
      //.attr("dy", ".35em")
      .attr("font-size", "10px")
      .text(function(d) {
        return d.abbr;
      })
      .classed("stateText", true);
      
   
    
      


 

  


}).catch(function(error) {
    console.log(error);
});



