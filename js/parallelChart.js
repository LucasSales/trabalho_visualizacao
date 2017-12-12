var barChartP1 = dc.barChart('#bar-chart-p1');
d3.json("data/ProjectZA.json", function(error, data){

  var facts = crossfilter(data);

  var typeDim = facts.dimension(function(d){
    return d.type;
  });

  var valueTotal = typeDim.group().reduceSum(function(d){
    if(d.type == "automatic"){
      return d.totalTime/(60*60);
    }
    return d.totalTime/60;
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
           .group(valueTotal)
           .colors(d3.scale.ordinal().domain(["positive","negative"])
                                    .range(["darkorange","steelblue"]))
          .colorAccessor(function(d) {
                       if(d.value > 6)
                           return "positive"
                       return "negative";});

  dc.renderAll();
});