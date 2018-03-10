// Define SVG area dimensions
var svgWidth = 850;
var svgHeight = 400;

// Define the chart's margins as an object
var margin = {top: 20, right: 40, bottom: 100, left: 100};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)
  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// Append an SVG group
var chart = svg.append("g");

// Append a div to the bodyj to create tooltips, assign it a class
d3.select(".chart")
  .append("div").attr("class", "tooltip").style("opacity", 0);

// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv", function(err, riskData) {
  if (err) throw err;

  riskData.forEach(function(data) {
    data.medianincome = +data.medianincome;
    data.publictransit = +data.publictransit;
    data.population = +data.population
    data.nodoctorvisit = +data.nodoctorvisit;
    data.percentcoverage = +data.percentcoverage;
    data.percentseatbelt = +data.percentseatbelt; });

//Create scale functions
  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);

//Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

//Define current x and y axis
var currentAxisLabelX = "medianincome";
findMinAndMax(currentAxisLabelX);
xLinearScale.domain([xMin, xMax]) ;

function findMinAndMaxY(ycolumn) {
  yMax = d3.max(riskData,function(data)
    {return +data[currentAxisLabelY]*1.1;}) }


var currentAxisLabelY = "nodoctorvisit";
findMinAndMaxY(currentAxisLabelY);
yLinearScale.domain([0,yMax])   ;


//Set up xvalue and yvalue
  var xMin;
  var xMax;
  var yMax;
console.log (yMax);

function findMinAndMax(xcolumn) {
  xMin = d3.min(riskData, function(data){return +data[xcolumn]*0.8;});
  xMax = d3.max(riskData, function(data){return +data[xcolumn]*1.1;});
  yMax = d3.max(riskData,function(data){return +data[currentAxisLabelY]*1.1;})
}
console.log(xMin, xMax, yMax)



// Initialize tooltip
var toolTip = d3.tip().attr("class", "tooltip")
    // Define position
  .offset([80, -60])
  .html(function(data){
      var stateName = data.state;
      var yinfo = +data[currentAxisLabelY];
      var xinfo = +data[currentAxisLabelX];
      if (currentAxisLabelX === "medianincome", currentAxisLabelY==="nodoctorvisit") 
        {return stateName + "<br> Median Income: " + xinfo +
         "<br> + % Not Going to Doctor Office Due to Cost: " + yinfo;}
      else if (currentAxisLabelX === "medianincome", currentAxisLabelY==="percentcoverage") 
        {return stateName + "<br> Median Income: " + xinfo +
         "<br> + % Healthcare Coverage: " + yinfo;}
      else if (currentAxisLabelX === "medianincome", currentAxisLabelY==="percentseatbelt") 
        {return stateName + "<br> Median Income: " + xinfo +
         "<br> + % Wearing Seatbelt: " + yinfo;}

      else if (currentAxisLabelX === "publictransit", currentAxisLabelY==="nodoctorvisit") 
        {return stateName + "<br> % Used Public Transportation: " + xinfo +
         "<br> + % Not Going to Doctor Office Due to Cost: " + yinfo;}
      else if (currentAxisLabelX === "publictransit", currentAxisLabelY==="percentseatbelt") 
        {return stateName + "<br> % Used Public Transportation: " + xinfo +
         "<br> + % Wearing Seatbelt: " + yinfo;}
      else if (currentAxisLabelX === "publictransit", currentAxisLabelY==="percentseatbelt") 
        {return stateName + "<br> % Used Public Transportation: " + xinfo +
         "<br> + % Wearing Seatbelt: " + yinfo;}

      else if (currentAxisLabelX === "population", currentAxisLabelY==="nodoctorvisit") 
        {return stateName + "<br> Population: " + xinfo +
         "<br> + % Not Going to Doctor Office Due to Cost: " + yinfo;}
      else if (currentAxisLabelX === "population", currentAxisLabelY==="percentseatbelt") 
        {return stateName + "<br> Population: " + xinfo +
         "<br> + % Wearing Seatbelt: " + yinfo;}
      else if (currentAxisLabelX === "population", currentAxisLabelY==="percentseatbelt") 
        {return stateName + "<br> Population: " + xinfo +
         "<br> + % Wearing Seatbelt: " + yinfo;}
         });

// Create tooltip
chart.call(toolTip); 
chart.selectAll("circle")
  .data(riskData)
  .enter().append("circle")
  .attr("cx",function(data, index)
    {return xLinearScale(+data[currentAxisLabelX]);})
  .attr("cy",function(data, index)
    {return yLinearScale(+data[currentAxisLabelY]);})
  .attr("r", "15")
  .attr("fill", "purple")
  .on("click", function(data){toolTip.show(data);})
  .on("mouseout", function(data, index){toolTip.hide(data);});
 

//Define data for text
var texts = svg.selectAll("text")
  .data(riskData)
  .enter().append("text");
var textlabel = texts
  .attr("x",function(data){return xLinearScale(+data[currentAxisLabelX]);})
  .attr("y",function(data){return yLinearScale(+data[currentAxisLabelY]);})
  .text(function(data){return data.abbr})
  .attr("fill","white")
  .attr("font-size", "9");

//Display y-axis
chart.append("g")
  .attr("class", "y-axis").call(leftAxis);
chart
  .append("text")
  .attr("transform","rotate(-90)")
  .attr("y", 0-margin.left + 10)
  .attr("x", 0- height/2)
  .attr("dy", "1em")
  .attr("class","y-axis-text activey")
  .attr("y-axis-name","nodoctorvisit")
  .text("% Not Visit Doctor Office Due to Cost");
chart
  .append("text")
  .attr("transform","rotate(-90)")
  .attr("y", 0-margin.left + 30)
  .attr("x", 0- height/2)
  .attr("dy", "1em")
  .attr("class","y-axis-text inactivey")
  .attr("y-axis-name","percentcoverage")
  .text("% Having Healthcare Coverage");
chart
  .append("text")
  .attr("transform","rotate(-90)")
  .attr("y", 0-margin.left + 50)
  .attr("x", 0- height/2)
  .attr("dy", "1em")
  .attr("class","y-axis-text inactivey")
  .attr("y-axis-name","percentseatbelt")
  .text("% Wearing Seatbelt");

//Display x-axis

 chart.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class", "x-axis")
  .call(bottomAxis);
 chart
  .append("text")
  .attr("transform", 
    "translate(" + width / 2 + "," + (height + margin.top + 20) + ")")
  //Active x-axis label
  .attr("class", "axis-text active")
  .attr("data-axis-name","medianincome")
  .text("Median Income");
  //Inactive x-axis label
chart.append("text")
  .attr("transform",
    "translate(" + width / 2 + "," + (height + margin.top + 45) + ")")
  .attr("class", "axis-text inactive")
  .attr("data-axis-name", "publictransit")
  .text("# People Used Public Transportation To Work");
chart.append("text")
  .attr("transform",
      "translate(" + width / 2 + "," + (height + margin.top + 70) + ")")
  .attr("class", "axis-text inactive")
  .attr("data-axis-name", "population")
  .text("Working Population (age 16 and over)");

  // Change an axis's status from inactive to active when clicked (if it was inactive)
  // Change the status of all active axes to inactive otherwise
  //Display text in bubble


  function labelChange(clickedAxis) {
    d3.selectAll(".axis-text")
      .filter(".active")
      .classed("active", false)
      .classed("inactive", true);
  clickedAxis.classed("inactive",false).classed("active", true); }

  d3.selectAll(".axis-text").on("click", function()
  {var clickedSelection = d3.select(this);
  
  var isClickedSelectionInactive = clickedSelection.classed("inactive");
  
  var clickedAxis =clickedSelection.attr("data-axis-name");
  console.log("current axis: ", clickedAxis);

  if (isClickedSelectionInactive)
    {currentAxisLabelX = clickedAxis;
      findMinAndMax(currentAxisLabelX);
    xLinearScale.domain([xMin,xMax]);
    texts
      .attr("x",function(data){return xLinearScale(+data[currentAxisLabelX]);})
      .attr("y",function(data){return yLinearScale(+data[currentAxisLabelY]);})
    
    svg.select(".x-axis").transition().duration(1800).call(bottomAxis);
 
    d3.selectAll("circle").each(function() 
        {d3.select(this).transition().attr("cx", function(data) 
          {return xLinearScale(+data[currentAxisLabelX]);})
          .duration(1800);
        });
    labelChange(clickedSelection);}});

  function labelChangeY(clickedAxisY) {
    d3.selectAll(".y-axis-text")
      .filter(".activey")
      .classed("activey", false)
      .classed("inactivey", true);
  clickedAxisY.classed("inactivey",false).classed("activey", true); }

  d3.selectAll(".y-axis-text").on("click", function()
  {var clickedSelectionY = d3.select(this); 
  
  var isClickedSelectionInactiveY = clickedSelectionY.classed("inactivey");
  
  var clickedAxisY =clickedSelectionY.attr("y-axis-name");
  console.log("current axis: ", clickedAxisY);

  if (isClickedSelectionInactiveY)
   {currentAxisLabelY = clickedAxisY;
    findMinAndMaxY(currentAxisLabelY);
    yLinearScale.domain([0,yMax]);
    texts
      .attr("x",function(data){return xLinearScale(+data[currentAxisLabelX]);})
      .attr("y",function(data){return yLinearScale(+data[currentAxisLabelY]);})
    
    svg.select(".y-axis").transition().duration(1800).call(leftAxis);
 
    d3.selectAll("circle").each(function() 
        {d3.select(this).transition().attr("cy", function(data) 
          {return yLinearScale(+data[currentAxisLabelY]);})
          .duration(1800);
        });
    labelChangeY(clickedSelectionY);}});
});