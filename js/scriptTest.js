var barChartP1 = dc.barChart('#bar-chart-p1');
var barChartP2 = dc.barChart('#bar-chart-p2');
d3.json("data/dataP.json", function(error, data){
  var facts = crossfilter(data);
  

  var typeDim = facts.dimension(function(d){
    return d.type;
  });

  var valueTotal = typeDim.group().reduceSum(function(d){
    if(d.type == "Automatic"){
      return +d.testsuite.time/(60*60);
    }
    return +d.testsuite.time/60;
  });
  

  var packageDim = facts.dimension(function(d,i){
    return d.name;
  });

  var valuePerPackage = packageDim.group().reduceSum(function(d,i){
    if(d.type == "Automatic"){
      return +d.testsuite.time/(60*60);
    }
    return +d.testsuite.time/60;
  });



  barChartP1.width(400)
           .height(400)
           .margins({top: 30, right: 50, bottom: 25, left: 40})
           .dimension(typeDim)
           .x(d3.scale.ordinal())
           .xUnits(dc.units.ordinal)
           .yAxisLabel('Horas')
           .barPadding(0.1)
           .outerPadding(0.05)
           .brushOn(false)
           .ordering(function(d){ return d.name })
           .group(valueTotal)
           .colors(d3.scale.ordinal().domain(["positive","negative"])
                                    .range(["darkorange","steelblue"]))
          .colorAccessor(function(d) {
                       if(d.value > 6)
                           return "positive"
                       return "negative";});
        
  barChartP2.width(1200)
           .height(400)
           .margins({top: 30, right: 50, bottom: 25, left: 40})
           .dimension(packageDim)
           .x(d3.scale.ordinal())
           .xUnits(dc.units.ordinal)
           .yAxisLabel('time')
           .ordering(function(d){ return d.value })
           .barPadding(0.1)
           .outerPadding(0.05)
           .brushOn(false)
           .group(valuePerPackage)
           .colors(d3.scale.ordinal().domain(["positive","negative"])
                                    .range(["darkorange","steelblue"]))
          .colorAccessor(function(d) {
                       if(d.value > 0.89)
                           return "positive"
                       else if(d.value == 0.8)
                        return "positive"
                       return "negative";});

  dc.renderAll();
});




// d3.json("projeto2.json", function(error, data){
//   var newData = [];
//   for(var i = 0; i < data.length; i++){
//     var obj1 = {
//       value: data[i].tempoExecucaoAutomatica,
//       type: "auto"
//     }
//     newData.push(obj1);

//     var obj2 = {
//       value: data[i].tempoExecucaoManual,
//       type: "manual"
//     }
//     newData.push(obj2);
//   }

//   var facts = crossfilter(newData);

//   var typeDim = facts.dimension(function(d){
//     return d.type;
//   });

//   var valueTotal = typeDim.group().reduceSum(function(d){
//     return d.value/3600;
//   });

//   barChartP2.width(400)
//            .height(400)
//            .margins({top: 30, right: 50, bottom: 25, left: 40})
//            .dimension(typeDim)
//            .x(d3.scale.ordinal())
//            .xUnits(dc.units.ordinal)
//            .yAxisLabel('Horas')
//            .barPadding(0.1)
//            .outerPadding(0.05)
//            .brushOn(false)
//            .group(valueTotal)
//             .colors(d3.scale.ordinal().domain(["positive","negative"])
//                                 .range(["darkorange","steelblue"]))
//            .colorAccessor(function(d) {
//             if(d.value > 30)
//                 return "positive"
//             return "negative";});;

//   dc.renderAll();
// });
