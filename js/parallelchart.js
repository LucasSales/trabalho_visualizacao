
function blue_to_brown(tester){
  if (tester == "Maria")
    return "steelblue";
  else
    return "brown";
}

// interact with this variable from a javascript console
var pc1;

// load csv file and create the chart
d3.json('data/dataP.json', function(data) {


  var array = [];

  data.forEach(function(d){
    if (d.type == "Manual"){      
      // console.log(d.testsuite.testsuite[0].testcase[0].testedBy);
      var obj = {
        name:d.testsuite.testsuite[0].testcase[0].testedBy,
        pack: d.name.substring(2,8),
        time:d.testsuite.time,
        failures:d.failures 
      }
      array.push(obj);    
    }
  });

pc1 = d3.parcoords()("#parallelchart")
    .data(array)
    //.hideAxis(["name"])
    .composite("darken")
    .color(function(d) { return blue_to_brown(d['name']); })  // quantitative color scale
    .alpha(0.55)
    .render()
    .brushMode("1D-axes")  // enable brushing
    .interactive()  // command line mode

  var explore_count = 0;
  var exploring = {};
  var explore_start = false;
  pc1.svg
    .selectAll(".dimension")
    .style("cursor", "pointer")
    .on("click", function(d) {
      exploring[d] = d in exploring ? false : true;
      event.preventDefault();
      if (exploring[d]) d3.timer(explore(d,explore_count));
    });

  function explore(dimension,count) {
    if (!explore_start) {
      explore_start = true;
      d3.timer(pc1.brush);
    }
    var speed = (Math.round(Math.random()) ? 1 : -1) * (Math.random()+0.5);
    return function(t) {
      if (!exploring[dimension]) return true;
      var domain = pc1.yscale[dimension].domain();
      var width = (domain[1] - domain[0])/4;

      var center = width*1.5*(1+Math.sin(speed*t/1200)) + domain[0];

      pc1.yscale[dimension].brush.extent([
        d3.max([center-width*0.01, domain[0]-width/400]),
        d3.min([center+width*1.01, domain[1]+width/100])
      ])(pc1.g()
          .filter(function(d) {
            return d == dimension;
          })
      );
    };
  };

});


//var timeChart = dc.compositeChart("#pacotesProblematicos");
//var parallelchart   = dc.pieChart("#parallelchart");
/*
// linear color scale
var blue_to_brown = d3.scale.linear()
  .domain([9, 50])
  .range(["steelblue", "brown"])
  .interpolate(d3.interpolateLab);

// interact with this variable from a javascript console
var pc1;

var dataV = [
  [0,-0,0,0,0,3 ],
  [1,-1,1,2,1,6 ],
  [2,-2,4,4,0.5,2],
  [3,-3,9,6,0.33,4],
  [4,-4,16,8,0.25,9]
];

d3.json("data/dataP.json", function (error, data) {  
 
  var array = [];

  data.forEach(function(d){
    if (d.type == "Manual"){      
      // console.log(d.testsuite.testsuite[0].testcase[0].testedBy);
      var obj = {
        name:d.testsuite.testsuite[0].testcase[0].testedBy,
        pack: d.name,
        time:d.testsuite.time,
        failures:d.failures 
      }
      array.push(obj);    
    }
  });

  var facts = crossfilter(array);
  console.log(array);

  var pc = d3.parcoords()("#parallelchart")
  .data(array)
  .render()
  .createAxes();


  //dc.renderAll();
});
*/

// var blue_to_brown = d3.scale.linear()
//   .domain(["Julia", "Maria"])
//   .range(["steelblue", "brown"])
//   .interpolate(d3.interpolateLab);