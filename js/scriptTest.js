// var barChartP1 = dc.barChart('#bar-chart-p1');
// var barChartP2 = dc.barChart('#bar-chart-p2');
// d3.json("projeto1.json", function(error, data){
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

//   barChartP1.width(400)
//            .height(400)
//            .margins({top: 30, right: 50, bottom: 25, left: 40})
//            .dimension(typeDim)
//            .x(d3.scale.ordinal())
//            .xUnits(dc.units.ordinal)
//            .yAxisLabel('Minutos')
//            .barPadding(0.1)
//            .outerPadding(0.05)
//            .brushOn(false)
//            .group(valueTotal)
//            .colors(d3.scale.ordinal().domain(["positive","negative"])
//                                 .range(["darkorange","steelblue"]))
//            .colorAccessor(function(d) { 
//             if(d.value > 1.5) 
//                 return "positive"
//             return "negative";});

//   dc.renderAll();
// });




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



d3.json("ProjectZ.json", function(error, data){
  console.log(data);
});


