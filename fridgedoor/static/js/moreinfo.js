
var countryName;
for (i=0; i < profiles.length ; i++){

	if ((profiles[i]).id === profile.id){
		countryName = profiles[i].label;
		break;
	}
}
$('#heading').html(countryName);


gapi.analytics.ready(function() {
	gapi.analytics.auth.authorize({
		container: 'embed-api-auth-container',
		clientid: '607034686826-asf8diukgvpl5qsrvfovf1114uqd1l6s.apps.googleusercontent.com',
	});

	renderWeekOverWeekChart(profile);
	renderWeekOverWeekChartMonth(profile);
	renderPagesPerSessionChartDaily(profile);
	renderTopBrowsersChart(profile);
	render_chartTotalUsers(profile);
	render_chartTotalPageviews(profile);
	
  	// Set some global Chart.js defaults.
  	Chart.defaults.global.animationSteps = 10;
  	Chart.defaults.global.animationEasing = 'easeInOutQuart';
  	Chart.defaults.global.responsive = true;
  	Chart.defaults.global.maintainAspectRatio = false;

  	/**
  	 * Draw the a chart.js line chart with data from the specified view that
  	 * overlays session data for the current week over session data for the
  	 * previous week.
  	 */

  	 function renderWeekOverWeekChart(profile) {

  	 	var container = document.createElement('div');
  	 	var chart_id = "chart-"+profile.id;
  	 	container.setAttribute("id", chart_id);
  	 	container.setAttribute("class", "chart");

  	 	var title = document.createElement('div');
  	 	title.setAttribute("class", "title");
  	 	title.innerHTML = "Weekly Pageviews";

  	 	var legend_id = "legend-"+profile.id;
  	 	var legend = document.createElement('div');
  	 	legend.setAttribute("id", legend_id);

  	 	var parent = document.getElementById(profile.parent);
  	 	parent.appendChild(container);
  	 	var ids = "ga:" + profile.id;

    // Adjust `now` to experiment with different days, for testing only...
    var now = moment(); // .subtract(3, 'day');

    var thisWeek = query({
    	'ids': ids,
    	'dimensions': 'ga:date,ga:nthDay',
    	'metrics': 'ga:pageviews',
    	'start-date': moment(now).subtract(1, 'day').day(1).format('YYYY-MM-DD'),
    	'end-date': moment(now).subtract(1, 'day').format('YYYY-MM-DD')
    });

    var lastWeek = query({
    	'ids': ids,
    	'dimensions': 'ga:date,ga:nthDay',
    	'metrics': 'ga:pageviews',
    	'start-date': moment(now).subtract(1, 'day').day(1).subtract(1, 'week')
    	.format('YYYY-MM-DD'),
    	'end-date': moment(now).subtract(1, 'day').day(7).subtract(1, 'week')
    	.format('YYYY-MM-DD')
    });

    Promise.all([thisWeek, lastWeek]).then(function(results) {

    	var data1 = results[0].rows.map(function(row) { return +row[2]; });
    	var data2 = results[1].rows.map(function(row) { return +row[2]; });
    	var labels = results[1].rows.map(function(row) { return +row[0]; });

    	labels = labels.map(function(label) {
    		return moment(label, 'YYYYMMDD').format('ddd');
    	});

    	var data = {
    		labels : labels,
    		datasets : [
    		{
    			label: 'Last Week',
    			fillColor : "rgba(220,220,220,0.5)",
    			strokeColor : "rgba(220,220,220,1)",
    			pointColor : "rgba(220,220,220,1)",
    			pointStrokeColor : "#fff",
    			data : data2
    		},
    		{
    			label: 'This Week',
    			fillColor : "rgba(151,187,205,0.5)",
    			strokeColor : "rgba(151,187,205,1)",
    			pointColor : "rgba(151,187,205,1)",
    			pointStrokeColor : "#fff",
    			data : data1
    		}
    		]
    	};

    	$(parent).fadeIn();
    	new Chart(makeCanvas(chart_id)).Line(data);
    	$(container).prepend(title);
    	$(container).append(legend);
    	generateLegend(legend_id, data.datasets);

    });
}


 // A graph for monthly

 function renderWeekOverWeekChartMonth(profile) {
 	var container = document.createElement('div');
 	var chart_id = "chart2-"+profile.id;
 	container.setAttribute("id", chart_id);
 	container.setAttribute("class", "chart");

 	var title = document.createElement('div');
 	title.setAttribute("class", "title");
 	title.innerHTML = "Monthly Pageviews";

 	var legend_id = "legend2-"+profile.id;
 	var legend = document.createElement('div');
 	legend.setAttribute("id", legend_id);

 	var parent = document.getElementById(profile.parent);
 	parent.appendChild(container);
 	var ids = "ga:" + profile.id

	    // Adjust `now` to experiment with different days, for testing only...
	    var now = moment(); // .subtract(3, 'day');

	    var thisMonth = query({
	    	'ids': ids,
	    	'dimensions': 'ga:date,ga:nthDay',
	    	'metrics': 'ga:pageviews',
	    	'start-date': moment(now).date(1).format('YYYY-MM-DD'),
	    	'end-date': moment(now).subtract(1, 'day').format('YYYY-MM-DD')
	    });

	    var lastMonth = query({
	    	'ids': ids,
	    	'dimensions': 'ga:date,ga:nthDay',
	    	'metrics': 'ga:pageviews',
	    	'start-date': moment(now).subtract(1, 'month').date(1).format('YYYY-MM-DD'),
	    	'end-date': moment(now).date(1).subtract(1, 'day').format('YYYY-MM-DD')
	    });

	    Promise.all([thisMonth, lastMonth]).then(function(results) {

	    	var data1 = results[0].rows.map(function(row) { return +row[2]; });
	    	var data2 = results[1].rows.map(function(row) { return +row[2]; });
	    	var labels = results[1].rows.map(function(row) { return +row[0]; });

	    	labels = []

      // Ensure the data arrays are at least as long as the labels array.
      // Chart.js bar charts don't (yet) accept sparse datasets.
      for (var i = 1, len = 31; i <= len; i++) {
      	labels.push(i);
      }

      for (var i = 0, len = 31; i < len; i++) {
      	if (data1[i] === undefined) data1[i] = null;
      	if (data2[i] === undefined) data2[i] = null;
      }

      var data = {
      	labels : labels,
      	datasets : [
      	{
      		label: moment(now).subtract(1, 'month').format('MMMM'),
      		fillColor : "rgba(220,220,220,0.5)",
      		strokeColor : "rgba(220,220,220,1)",
      		pointColor : "rgba(220,220,220,1)",
      		pointStrokeColor : "#fff",
      		data : data2
      	},
      	{
      		label: moment(now).format('MMMM'),
      		fillColor : "rgba(151,187,205,0.5)",
      		strokeColor : "rgba(151,187,205,1)",
      		pointColor : "rgba(151,187,205,1)",
      		pointStrokeColor : "#fff",
      		data : data1
      	}
      	]
      };

      $(parent).fadeIn();
      new Chart(makeCanvas(chart_id)).Line(data);
      $(container).prepend(title);
      $(container).append(legend);
      generateLegend(legend_id, data.datasets);

  });
}

function renderPagesPerSessionChartDaily(profile){

	var container = document.createElement('div');
	var chart_id = "chart3-"+profile.id;
	container.setAttribute("id", chart_id);
	container.setAttribute("class", "chart");

	var title = document.createElement('div');
	title.setAttribute("class", "title");
	title.innerHTML = "Weekly Sessions";

	var legend_id = "legend3-"+profile.id;
	var legend = document.createElement('div');
	legend.setAttribute("id", legend_id);

	var parent = document.getElementById(profile.parent);
	parent.appendChild(container);

	var ids = "ga:" + profile.id;

	var now =moment();


	var thisWeek = query({
		'ids': ids,
		'dimensions': 'ga:date,ga:nthDay',
		'metrics': 'ga:sessions',
		'start-date': moment(now).subtract(1, 'day').day(0).format('YYYY-MM-DD'),
		'end-date': moment(now).subtract(1, 'day').format('YYYY-MM-DD')
	});

	var lastWeek = query({
		'ids': ids,
		'dimensions': 'ga:date,ga:nthDay',
		'metrics': 'ga:sessions',
		'start-date': moment(now).subtract(1, 'day').day(0).subtract(1, 'week')
		.format('YYYY-MM-DD'),
		'end-date': moment(now).subtract(1, 'day').day(6).subtract(1, 'week')
		.format('YYYY-MM-DD')
	});

	Promise.all([thisWeek, lastWeek]).then(function(results) {

		var data1 = results[0].rows.map(function(row) { return +row[2]; });
		var data2 = results[1].rows.map(function(row) { return +row[2]; });
		var labels = results[1].rows.map(function(row) { return +row[0]; });

		labels = labels.map(function(label) {
			return moment(label, 'YYYYMMDD').format('ddd');
		});

		var data = {
			labels : labels,
			datasets : [
			{
				label: 'Last Week',
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : data2
			},
			{
				label: 'This Week',
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : data1
			}
			]
		};

		$(parent).fadeIn();
		new Chart(makeCanvas(chart_id)).Line(data);
		$(container).prepend(title);
		$(container).append(legend);
		generateLegend(legend_id, data.datasets);

	});
}

function renderTopBrowsersChart(profile) {
	var container = document.createElement('div');
	var chart_id = "chart4-"+profile.id;
	container.setAttribute("id", chart_id);
	container.setAttribute("class", "chart");

	var title = document.createElement('div');
	title.setAttribute("class", "title");
	title.innerHTML = "Top Browsers";

	var legend_id = "legend4-"+profile.id;
	var legend = document.createElement('div');
	legend.setAttribute("id", legend_id);

	var parent = document.getElementById(profile.parent);
	parent.appendChild(container);

	var ids = "ga:" + profile.id

	query({
		'ids': ids,
		'dimensions': 'ga:browser',
		'metrics': 'ga:pageviews',
		'sort': '-ga:pageviews',
		'max-results': 5
	})
	.then(function(response) {

		var data = [];
		var colors = ['#4D5360','#949FB1','#D4CCC5','#E2EAE9','#F7464A'];

		response.rows.forEach(function(row, i) {
			data.push({ value: +row[1], color: colors[i], label: row[0] });
		});

		$(parent).fadeIn();
		new Chart(makeCanvas(chart_id)).Doughnut(data);
		$(container).prepend(title);
		$(container).append(legend);
		generateLegend(legend_id, data);

	});
}

function render_chartTotalUsers(profile){

	var container = document.createElement('div');
	var chart_id = "chart5-"+profile.id;
	container.setAttribute("id", chart_id);
	container.setAttribute("class", "chart");

	var title = document.createElement('div');
	title.setAttribute("class", "title");
	title.innerHTML = "Total Users";

	var parent = document.getElementById(profile.parent);
	parent.appendChild(container);
	var dataChart = new gapi.analytics.googleCharts.DataChart({
		query: {
			metrics: 'ga:users',
			'start-date': '2014-01-01',
			'end-date': 'yesterday'
		},
		chart: {
			container: chart_id,
			type: 'TABLE'
		}
	});
	dataChart.set({query: {ids: "ga:"+profile.id}}).execute();
	dataChart.on('success', function(){
		$('#'+chart_id+' .gapi-analytics-data-chart-styles-table-th').html(profile.label);
		var result = $('#'+chart_id+' .gapi-analytics-data-chart-styles-table-td');
		result.html(parseInt(result.html()).toLocaleString());
		$(parent).fadeIn();
		$(container).prepend(title);
	});
}

function render_chartTotalPageviews(profile){
	var container = document.createElement('div');
	var chart_id = "chart6-"+profile.id;
	container.setAttribute("id", chart_id);
	container.setAttribute("class", "chart");

	var title = document.createElement('div');
	title.setAttribute("class", "title");
	title.innerHTML = "Total Pageviews";

	var parent = document.getElementById(profile.parent);
	parent.appendChild(container);
	var dataChart = new gapi.analytics.googleCharts.DataChart({
		query: {
			metrics: 'ga:pageviews',
			'start-date': '2014-01-01',
			'end-date': 'yesterday'
		},
		chart: {
			container: chart_id,
			type: 'TABLE'
		}
	});
	dataChart.set({query: {ids: "ga:"+profile.id}}).execute();
	dataChart.on('success', function(){
		$('#'+chart_id+' .gapi-analytics-data-chart-styles-table-th').html(profile.label)
		var result = $('#'+chart_id+' .gapi-analytics-data-chart-styles-table-td');
		result.html(parseInt(result.html()).toLocaleString());
		$(parent).fadeIn();
		$(container).prepend(title);
	});
}

});
