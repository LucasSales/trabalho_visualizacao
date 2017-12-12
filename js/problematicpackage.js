
//var timeChart = dc.compositeChart("#pacotesProblematicos");
var packagesChart = dc.rowChart("#pacotesProblematicos");
var errosChart    = dc.pieChart("#pacotesProblematicosErros");
var falhasChart   = dc.pieChart("#pacotesProblematicosFalhas");
var packagesChartM = dc.rowChart("#pacotesProblematicosManual");
var falhasChartM   = dc.pieChart("#pacotesProblematicosFalhasManual");
d3.json("data/ProjectZA.json", function (error, data) {

  var facts = crossfilter(data[0].packages);
  var factsmanual = crossfilter(data[1].packages);

  var packageDimensionM = factsmanual.dimension(function(d){return d.name});
  var errorDimensionM  = factsmanual.dimension(function(d){return d.errors});
  var testPerNameM = packageDimensionM.group().reduceSum(function(d) {
          return +d.tests;
  });
  var errorPerTestM = errorDimensionM.group().reduceSum(function(d) {
          return +d.errors;
      });
  var failDimensionM  = factsmanual.dimension(function(d){return d.failures});
  var failPerTestM = failDimensionM.group().reduceSum(function(d) {return +d.failures;});

  var packageDimension = facts.dimension(function(d){return d.name}),
      testDimension  = facts.dimension(function(d){return d.tests}),
      failDimension  = facts.dimension(function(d){return d.failures}),
      errorDimension  = facts.dimension(function(d){return d.errors}),
      valuesDimension = facts.dimension(function(d){
        return [d.name, d.tests, d.failures, d.errors]
      }),
      failPerTest = failDimension.group().reduceSum(function(d) {return +d.failures;}),
      errorPerTest = errorDimension.group().reduceSum(function(d) {
          return +d.errors;
      }),
      errorPerName = packageDimension.group().reduceSum(function(d) {return +d.errors;}),
      testPerName = packageDimension.group().reduceSum(function(d) {
        // if(d.type == "Automatic")
          return +d.tests;
      }),
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
// #1f77b4
  packagesChart
        .width(800).height(400)
        .dimension(packageDimension)
        .group(testPerName)
        .colors(d3.scale.category10())
        .elasticX(true)
        .ordinalColors(["#1f77b4"]);

  packagesChart.render();

  errosChart
        .width(600)
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

  errosChart.render();


  

  falhasChart
        .width(600)
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
  falhasChart.render();

  packagesChartM
      .width(800).height(400)
      .dimension(packageDimensionM)
      .group(testPerNameM)
      .colors(d3.scale.category10())
      .elasticX(true)
      .ordinalColors(["#1f77b4"]);

  packagesChartM.render();



  falhasChartM
      .width(600)
        .height(480)
        .slicesCap(4)
        .innerRadius(100)
        .externalLabels(30)
        .externalRadiusPadding(50)
        .drawPaths(true)
        .legend(dc.legend())
        .dimension(failDimensionM)
        .group(failPerTestM)
        .on('pretransition', function(chart) {
          chart.selectAll('text.pie-slice').text(function(d) {
          return dc.utils.printSingleValue(d.data.value) + ' failures'
        })});
  falhasChartM.render();

  // errosChartM
  //     .width(600)
  //       .height(480)
  //       .slicesCap(4)
  //       .innerRadius(100)
  //       .externalLabels(50)
  //       .externalRadiusPadding(50)
  //       .drawPaths(true)
  //       .dimension(errorDimensionM)
  //       .group(errorPerTestM)
  //       .legend(dc.legend())
  //       .on('pretransition', function(chart) {
  //         chart.selectAll('text.pie-slice').text(function(d) {
  //         return dc.utils.printSingleValue(d.data.value) + ' errors'
  //       })});
  // errosChartM.render();  
  
  // dc.renderAll();


});
