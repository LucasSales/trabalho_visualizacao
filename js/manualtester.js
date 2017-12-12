//var lineChart = dc.compositeChart('#manualTester');
//var timeChart = dc.lineChart("#manualTester");
var timeChart = dc.compositeChart("#manualTester");
var timeChartFailed = dc.compositeChart("#manualTesterFailed");

d3.json("data/data.json", function (error, data) {

  var execDateFormat = d3.time.format.utc("%Y-%m-%dT");

  data.forEach(function(d){
      d.executionDate = execDateFormat.parse(d.executionDate.substr(0,11));;
  });

  //Fatos para a visualização de todos os testes
  
  var factsM = crossfilter(data);
  var factsJ = crossfilter(data);

  //Maria
  var testerDimension = factsM.dimension(function(d){return d.testedBy}),
      dateDimension = factsM.dimension(function(d){        
        return d.executionDate;
      }),
      statusDimension = factsM.dimension(function(d){return d.status}),
      threeDimension  = factsM.dimension(function (d){ 
        return [d.testedBy, d.executionDate, d.status];
      });

  //Julia
  var testerJDimension = factsJ.dimension(function(d){return d.testedBy}),
      dateJDimension = factsJ.dimension(function(d){return d.executionDate}),
      statusJDimension = factsJ.dimension(function(d){return d.status}),
      threeJDimension  = factsM.dimension(function (d){ 
        return [d.testedBy, d.executionDate, d.status];
      });


  testerDimension.filterExact("Maria");
  //statusDimension.filterExact("failed");
  testerJDimension.filterExact("Julia");
  //statusJDimension.filterExact("failed");

  var mariaGroup = dateDimension.group();
  var juliaGroup = dateJDimension.group();

  //----------------------------------------------------------------------------------------------


  mariaGroup.top(Infinity).forEach(function(p, i) {
    console.log(p.key + ": " + p.value);
  });

  juliaGroup.top(Infinity).forEach(function(p, i) {
    console.log(p.key + ": " + p.value);
  });


   timeChart.width(800)
     .height(400)
     .margins({top: 50, right: 50, bottom: 35, left: 40})
     .dimension(dateDimension)
     .x(d3.time.scale().domain([new Date(2017,10,25,21,0,0), new Date(2017,10,29,21,0,0)]))
     .xUnits(d3.time.days)
     .renderHorizontalGridLines(true)
     .legend(dc.legend().x(700).y(5).itemHeight(13).gap(5))
     .brushOn(false) 
     .yAxisLabel("Testes Realizados")
     .xAxisLabel("Data")   
     .compose([
        dc.lineChart(timeChart)
                  .group(mariaGroup, 'Maria')
                  .ordinalColors(['steelblue']),
        dc.lineChart(timeChart)
                  .group(juliaGroup, 'Julia')
                  .ordinalColors(['darkorange'])]);

  timeChart.render();

  // Fatos para a visualização apenas dos testes que falharam !!
  // tive que repetir por que quando é chamado o dc.renderALL em algum outro script, altera a visualização anterior.

  var facts2M = crossfilter(data);
  var facts2J = crossfilter(data);

  //Maria
  var tester2Dimension = facts2M.dimension(function(d){return d.testedBy}),
      date2Dimension = facts2M.dimension(function(d){        
        return d.executionDate;
      }),
      status2Dimension = facts2M.dimension(function(d){return d.status}),
      three2Dimension  = facts2M.dimension(function (d){ 
        return [d.testedBy, d.executionDate, d.status];
      });

  //Julia
  var tester2JDimension = facts2J.dimension(function(d){return d.testedBy}),
      date2JDimension = facts2J.dimension(function(d){return d.executionDate}),
      status2JDimension = facts2J.dimension(function(d){return d.status}),
      three2JDimension  = facts2M.dimension(function (d){ 
        return [d.testedBy, d.executionDate, d.status];
      });

  var maria2Group = date2Dimension.group();
  var julia2Group = date2JDimension.group();


  //-----------------------------------------------------------------------------

  tester2Dimension.filterExact("Maria");
  status2Dimension.filterExact("failed");
  tester2JDimension.filterExact("Julia");
  status2JDimension.filterExact("failed");

  timeChartFailed.width(800)
     .height(400)
     .margins({top: 50, right: 50, bottom: 35, left: 40})
     .dimension(date2Dimension, date2JDimension)
     .x(d3.time.scale().domain([new Date(2017,10,25,21,0,0), new Date(2017,10,29,21,0,0)]))
     .xUnits(d3.time.days)
     .renderHorizontalGridLines(true)
     .legend(dc.legend().x(700).y(5).itemHeight(13).gap(5))
     .brushOn(false)
     .yAxisLabel("Falhas Encontradas")
     .xAxisLabel("Data")    
     .compose([
        dc.lineChart(timeChartFailed)
                  .group(maria2Group, 'Maria')
                  .ordinalColors(['steelblue']),
        dc.lineChart(timeChartFailed)
                  .group(julia2Group, 'Julia')
                  .ordinalColors(['darkorange'])]);

  //dc.renderAll();
  timeChartFailed.render();


});
