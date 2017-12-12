
//var timeChart = dc.compositeChart("#pacotesProblematicos");
var packagesChartM = dc.rowChart("#pacotesProblematicosManual");
var errosChartM    = dc.pieChart("#pacotesProblematicosErrosManual");
var falhasChartM   = dc.pieChart("#pacotesProblematicosFalhasManual");

d3.json("data/ProjectZV.json", function (error, data) {


  console.log(data);
  var facts = crossfilter(data.manual);

  var packageDimension = facts.dimension(function(d){return d.name}),
      testDimension  = facts.dimension(function(d){return d.tests}),
      failDimension  = facts.dimension(function(d){return d.failures}),
      errorDimension  = facts.dimension(function(d){return d.errors}),
      valuesDimension = facts.dimension(function(d){
        return [d.name, d.tests, d.failures, d.errors]
      }),
      failPerTest = failDimension.group().reduceSum(function(d) {return +d.failures;}),
      errorPerTest = errorDimension.group().reduceSum(function(d) {return +d.errors;}),
      errorPerName = packageDimension.group().reduceSum(function(d) {return +d.errors;}),
      testPerName = packageDimension.group().reduceSum(function(d) {return +d.tests;}),
      failPerName = packageDimension.group().reduceSum(function(d) {return +d.failures;}),
      errosHist    = errorDimension.group().reduceCount();

  var packGroup = valuesDimension.group();

  packGroup.top(Infinity).forEach(function(p, i) {
    // console.log(p.key + ": " + p.value);
  });

  var quantizeColors = d3.scale.quantize()
    .domain([1,99])
    .range(colorbrewer.Greens[9]);

  var color = d3.scale.linear().domain([0,100]).range(["red","blue"]);

  packagesChartM
        .width(450).height(200)
        .dimension(packageDimension)
        .group(testPerName)
        .colors(d3.scale.category10())
        .elasticX(true)
        .x(d3.scale.linear().domain([0,110]))
        .ordinalColors(["#1a84b8","	#1a8cb8","#1a94b8","#1a9cb8",,"#1a9cb8","#ADD8E6","#4682B4","#6495ED"]);

  // packagesChartM.render();

  // errosChartM
  //       .width(768)
  //         .height(480)
  //         .slicesCap(4)
  //         .innerRadius(100)
  //         .externalLabels(50)
  //         .externalRadiusPadding(50)
  //         .drawPaths(true)
  //         .dimension(errorDimension)
  //         .group(errorPerTest)
  //         .legend(dc.legend())
  //         .on('pretransition', function(chart) {
  //           chart.selectAll('text.pie-slice').text(function(d) {
  //           return dc.utils.printSingleValue(d.data.value) + ' errors'
  //         })});
  //
  // // errosChartM.render();
  //
  // falhasChartM
  //       .width(768)
  //         .height(480)
  //         .slicesCap(4)
  //         .innerRadius(100)
  //         .externalLabels(30)
  //         .externalRadiusPadding(50)
  //         .drawPaths(true)
  //         .legend(dc.legend())
  //         .dimension(failDimension)
  //         .group(failPerTest)
  //         .on('pretransition', function(chart) {
  //           chart.selectAll('text.pie-slice').text(function(d) {
  //           return dc.utils.printSingleValue(d.data.value) + ' failures'
  //         })});

  dc.renderAll();


});
