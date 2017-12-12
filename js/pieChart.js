var errosChart    = dc.pieChart("#pacotesProblematicosErros");
d3.json("data/dataP.json", function (error, data) {
	
	var t = 0;
	var e = 0;
	var f = 0;
	var tM = 0;
	var eM = 0;
	var fM = 0;
	var array = [];
	var arrayM = [];
	data.forEach(function(d){
		if(d.type == "Automatic"){
			t = t + (Number(d.tests) - (Number(d.errors) + Number(d.failures)));
			e = e + Number(d.errors);
			f = f + Number(d.failures);
		}else{
			tM = tM + (Number(d.tests) - (Number(d.failures)));
			eM = eM + Number(d.errors);
			fM = fM + Number(d.failures);
		}
	});	
	
	var obj1 = {
		value: t,
		type: "passed"
	}
	var obj2 = {
		value: e,
		type: "error"
	}
	var obj3 = {
		value: f,
		type: "failures"
	}

	var obj4 = {
		value: tM,
		type: "passed"
	}
	var obj6 = {
		value: f,
		type: "failures"
	}
	arrayM.push(obj4);
	arrayM.push(obj6);

	array.push(obj1);
	array.push(obj2);
	array.push(obj3);
	console.log("TESTE: " + array[0].value);
	
	var facts = crossfilter(array);
	var factsM = crossfilter(arrayM);

	var dim = facts.dimension(function(d){
          return d.type;
  	});

	var total = dim.group().reduceSum(function(d){
    	return d.value;
		
	});

	// var dimension = facts.dimension(function(d){
 //          return d.name;
 //  	});

	// var errorsPerPackage = dimension.group().reduceSum(function(d){
	// 	if(d.type == "Automatic"){
	// 		console.log("Erros: "+ d.erros)
 //        	return d.errors;
	// 	}
	// });

	// var failuresPerPackage = dimension.group().reduceSum(function(d){
	//     if(d.type == "Automatic"){
	//       console.log("Failure: "+ d.failures)
	//       return +d.failures;
	//     }
 //  	});

	// var testsPackages = dimension.group().reduceSum(function(d){
	//     if(d.type == "Automatic"){
	//       console.log("Tests: "+ d.tests)
	//       return +d.tests;
	//     }
 //  	});

 //  	var tests = dimension.group().reduceSum(function(d){
	//     if(d.type == "Automatic"){
	//       console.log("Tests: "+ d.tests)
	//       var total = +d.tests;
	//       var totaE = +d.erros;
	//       var totaF = +d.failures;
	//       var totaS = total - (totaF + totaE);
	//       return [totaE, totaF, totaS];
	//     }
 //  	});

	errosChart
    .width(768)
    .height(480)
    .slicesCap(4)
    .innerRadius(100)
    .dimension(dim)
    .group(total)
    .legend(dc.legend())
    // workaround for #703: not enough data is accessible through .label() to display percentages
    .on('pretransition', function(chart) {
        chart.selectAll('text.pie-slice').text(function(d) {
            return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        })
    });
  errosChart.render();
});