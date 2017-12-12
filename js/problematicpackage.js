
//var timeChart = dc.compositeChart("#pacotesProblematicos");
var packagesChart = dc.rowChart("#pacotesProblematicos");
var errosChart    = dc.pieChart("#pacotesProblematicosErros");
var falhasChart   = dc.pieChart("#pacotesProblematicosFalhas");

d3.json("data/ProjectZV.json", function (error, data) {

  // data.forEach(function(x) {
  //         x.tests = +x.tests;
  //
  // });
  console.log(data);
  var facts = crossfilter(data.automatic);

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

  packagesChart
        .width(450).height(200)
        .dimension(packageDimension)
        .group(testPerName)
        .colors(d3.scale.category10())
        .elasticX(true);

  // packagesChart.render();

  errosChart
        .width(768)
          .height(480)
          .slicesCap(4)
          .innerRadius(100)
          .externalLabels(50)
          .externalRadiusPadding(50)
          .drawPaths(true)
          .dimension(errorDimension)
          .group(errorPerTest)
          .legend(dc.legend())
          .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
            return dc.utils.printSingleValue(d.data.value) + ' errors'
          })});

  // errosChart.render();

  falhasChart
        .width(768)
          .height(480)
          .slicesCap(4)
          .innerRadius(100)
          .externalLabels(30)
          .externalRadiusPadding(50)
          .drawPaths(true)
          .legend(dc.legend())
          .dimension(failDimension)
          .group(failPerTest)
          .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
            return dc.utils.printSingleValue(d.data.value) + ' failures'
          })});

  dc.renderAll();


});
