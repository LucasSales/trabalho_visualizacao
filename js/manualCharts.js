
// //var timeChart = dc.compositeChart("#pacotesProblematicos");
// var packagesChartM = dc.rowChart("#pacotesProblematicosManual");
// var errosChartM    = dc.pieChart("#pacotesProblematicosErrosManual");
// var falhasChartM   = dc.pieChart("#pacotesProblematicosFalhasManual");

// d3.json("data/ProjectZA.json", function (error, data) {

//   var facts = crossfilter(data[0].packages);

//   var packageDimensionM = facts.dimension(function(d){return d.name}),
//       testDimension  = facts.dimension(function(d){return d.tests}),
//       failDimensionM  = facts.dimension(function(d){return d.failures}),
//       errorDimension  = facts.dimension(function(d){return d.errors}),
//       valuesDimension = facts.dimension(function(d){
//         return [d.name, d.tests, d.failures, d.errors]
//       }),
//       failPerTest = failDimension.group().reduceSum(function(d) {return +d.failures;}),
//       errorPerTest = errorDimension.group().reduceSum(function(d) {
//           return +d.errors;
//       }),
//       errorPerName = packageDimensionM.group().reduceSum(function(d) {return +d.errors;}),
//       testPerName = packageDimensionM.group().reduceSum(function(d) {
//         // if(d.type == "Automatic")
//           return +d.tests;
//       }),
//       failPerName = packageDimensionM.group().reduceSum(function(d) {return +d.failures;}),
//       errosHist    = errorDimension.group().reduceCount();

//   var packGroup = valuesDimension.group();

//   packGroup.top(Infinity).forEach(function(p, i) {
//     // console.log(p.key + ": " + p.value);
//   });

//   var quantizeColors = d3.scale.quantize()
//     .domain([1,99])
//     .range(colorbrewer.Greens[9]);

//   var color = d3.scale.linear().domain([0,100]).range(["red","blue"]);

//   packagesChartM
//         .width(800).height(400)
//         .dimension(packageDimensionM)
//         .group(testPerName)
//         .colors(d3.scale.category10())
//         .elasticX(true);

//   packagesChart.render();

//   errosChartM
//         .width(600)
//           .height(480)
//           .slicesCap(4)
//           .innerRadius(100)
//           .externalLabels(50)
//           .externalRadiusPadding(50)
//           .drawPaths(true)
//           .dimension(errorDimension)
//           .group(errorPerTest)
//           .legend(dc.legend())
//           .on('pretransition', function(chart) {
//             chart.selectAll('text.pie-slice').text(function(d) {
//             return dc.utils.printSingleValue(d.data.value) + ' errors'
//           })});

//   errosChart.render();

//   falhasChartM
//         .width(600)
//           .height(480)
//           .slicesCap(4)
//           .innerRadius(100)
//           .externalLabels(30)
//           .externalRadiusPadding(50)
//           .drawPaths(true)
//           .legend(dc.legend())
//           .dimension(failDimension)
//           .group(failPerTest)
//           .on('pretransition', function(chart) {
//             chart.selectAll('text.pie-slice').text(function(d) {
//             return dc.utils.printSingleValue(d.data.value) + ' failures'
//           })});
//   falhasChart.render();
//   // dc.renderAll();


// });
