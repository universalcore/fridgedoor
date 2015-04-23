gapi.analytics.ready(function() {
  gapi.analytics.auth.authorize({
    container: 'embed-api-auth-container',
    clientid: '607034686826-asf8diukgvpl5qsrvfovf1114uqd1l6s.apps.googleusercontent.com',
  });

  var time = 500;
  profiles.forEach(function(p) {
    setTimeout( function(){ renderWeekOverWeekChart(p); }, time)
    time += 500;
  });

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
    // Creating a link
    var link = document.createElement("a");
    link.setAttribute("href", "/moreinfo/" + profile.id);
    link.innerHTML = profile.label;

    var container = document.createElement('div');
    var chart_id = "chart-"+profile.id;
    container.setAttribute("id", chart_id);
    container.setAttribute("class", "chart");

    var title = document.createElement('div');
    title.setAttribute("class", "title");
    title.innerHTML = profile.label;

    var legend_id = "legend-"+profile.id;
    var legend = document.createElement('div');
    legend.setAttribute("id", legend_id);

    var parent = document.getElementById(profile.parent);
//    parent.appendChild(title);
    parent.appendChild(container);
    parent.appendChild(legend);
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
      $('#'+chart_id).before(link);
      generateLegend(legend_id, data.datasets);

    });
  }


});
