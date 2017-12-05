var lineChart = dc.compositeChart('#line-chart');

d3.json("projeto1.json", function (error, data) {
	
	var facts = crossfilter(data);

	var caseTestIdDim = facts.dimension(function(d){
		return d.numeroDoCasoDeTeste;
	});

	var auto = caseTestIdDim.group().reduceSum(function(d){
        return d.tempoExecucaoAutomatica;
    });

	var manual = caseTestIdDim.group().reduceSum(function(d){
        return d.tempoExecucaoManual;
    });

    lineChart.width(800)
             .height(400)
             .margins({top: 50, right: 50, bottom: 25, left: 40})
             .dimension(caseTestIdDim)
             .x(d3.scale.linear().domain([0, 40]))
             .renderHorizontalGridLines(true)
             .legend(dc.legend().x(700).y(5).itemHeight(13).gap(5))
             .brushOn(false)
             .compose([
                dc.lineChart(lineChart)
                          .group(auto, 'Auto')
                          .ordinalColors(['steelblue']),
                dc.lineChart(lineChart)
                          .group(manual, 'Manual')
                          .ordinalColors(['darkorange'])]);

    dc.renderAll();

});
