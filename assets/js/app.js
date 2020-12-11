// Step 1:  Wrap chart code inside a function
// that automatically resizes the chart
//=======================================
function makeResponsive() {
  
  // Step 2:
  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // Step 3:
  // SVG wrapper dimensions are determined by the current width
  // and height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;
  
  // Step 4: Set up our chart
  //=================================

  var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Step 5: Create an SVG wrapper,
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

  // Step 6:
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

      // Step 7: Create Scales
      //= ============================================
      // x scale to scale ages data
      var xLinearScale = d3.scaleLinear()
      .domain(d3.extent(censusData, data => data.age))
      .range([0, width]);

      // y scale to scale smokes data
      var yLinearScale = d3.scaleLinear()
      .domain(d3.extent(censusData, data => data.smokes))
      .range([height, 0]);

      // Step 8: Create Axes
      // =============================================
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

      // Step 9: Append the axes to the chartGroup - ADD STYLING
      // ==============================================
      // Add bottomAxis
      chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

      // left axis
      chartGroup.append("g")
      .call(leftAxis);

      // Step 10:  append circles
      // ========================================
      var circlesGroup = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "15")
        .classed("stateCircle", true);
      
      // Step 11: Append text
      var textGroup = chartGroup.selectAll(null)
      .data(censusData)
      .enter()
      .append("text");

      textGroup
        .attr("x", d => xLinearScale(d.age))
        .attr("y", d => yLinearScale(d.smokes))
        //.attr("dx", ".71em")
        //.attr("dy", ".35em")
        .attr("font-size", "10px")
        .text(function(d) {
          return d.abbr;
        })
        .classed("stateText", true);

       // Step 12: Initialize tool tip
      // ==============================
      var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}<br>Smokes (%): ${d.smokes}<br>Age (Median): ${d.age}`);
      });

      // Step 13: Create tooltip in the chart
      // ==============================
      chartGroup.call(toolTip);

      // Step 14: Create event listeners to display and hide the tooltip
      // ==============================
      circlesGroup.on("mouseover", function(d) {
        toolTip.show(d, this);
      })
      // Step 15: Create "mouseout" event listener to hide tooltip
      // =======================================================
        .on("mouseout", function(d) {
          toolTip.hide(d);
        });

      // Step 16: Create axes labels
      // =============================
      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 5)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .classed("axisText", true)
      .text("Smokers (%)");

      chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .classed("axisText", true)
      .text("Age (Median)");
 
  }).catch(function(error) {
      console.log(error);
  });

};

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, responsify() is called.
d3.select(window).on("resize", makeResponsive);





