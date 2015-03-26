gapi.analytics.ready(function() {

  /**
   * Authorize the user immediately if the user has already granted access.
   * If no access has been created, render an authorize button inside the
   * element with the ID "embed-api-auth-container".
   */
  gapi.analytics.auth.authorize({
    container: 'embed-api-auth-container',
    clientid: '607034686826-asf8diukgvpl5qsrvfovf1114uqd1l6s.apps.googleusercontent.com',
  });

  /**
   * Create the first DataChart for top countries over the past 30 days.
   * It will be rendered inside an element with the id "chart-1-container".
   */

  var profiles = [
    {'label': 'India', 'id': 97544600, 'parent': 'mama'},
    {'label': 'Ghana', 'id': 97700900, 'parent': 'mama'},
    {'label': 'Kenya', 'id': 96070258, 'parent': 'mama'},
    {'label': 'Tanzania', 'id': 96863205, 'parent': 'mama'},
    {'label': 'Colombia', 'id': 96315599, 'parent': 'mama'},
    {'label': 'Philippines', 'id': 99855200, 'parent': 'mama'},
    {'label': 'Zambia', 'id': 88472004, 'parent': 'mama'},
    //{'label': 'Guatemala', 'id': 99847704, 'parent': 'mama'},

    {'label': 'India', 'id': 97544500, 'parent': 'gem'},
    {'label': 'Ghana', 'id': 97700700, 'parent': 'gem'},
    {'label': 'Kenya', 'id': 96068268, 'parent': 'gem'},
    {'label': 'Tanzania', 'id': 96070149, 'parent': 'gem'},
    {'label': 'Colombia', 'id': 96316790, 'parent': 'gem'},
    {'label': 'Philippines', 'id': 99848207, 'parent': 'gem'},
    //{'label': 'Guatemala', 'id': 99848005, 'parent': 'gem'},

    {'label': 'India', 'id': 97699136, 'parent': 'ffl'},
    {'label': 'Ghana', 'id': 97681769, 'parent': 'ffl'},
    {'label': 'Kenya', 'id': 96066855, 'parent': 'ffl'},
    {'label': 'Tanzania', 'id': 96067672, 'parent': 'ffl'},
    {'label': 'Colombia', 'id': 96316991, 'parent': 'ffl'},
    {'label': 'Philippines', 'id': 99848002, 'parent': 'ffl'},
    //{'label': 'Guatemala', 'id': 99855310, 'parent': 'ffl'},

    {'label': 'Ghana', 'id': 97700600, 'parent': 'ebola'},
    {'label': 'Kenya', 'id': 96069861, 'parent': 'ebola'},
    {'label': 'Tanzania', 'id': 96069367, 'parent': 'ebola'},
    {'label': 'Zambia', 'id': 90672297, 'parent': 'ebola'},

    {'label': 'India', 'id': 97544501, 'parent': 'mnm'},
    //{'label': 'Guatemala', 'id': 99855203, 'parent': 'mnm'},
  ];

  var time = 500;
  profiles.forEach(function(p) {
    setTimeout( function(){ render_chart(p); }, time)
    time += 500;
  });

  function render_chart(profile){
    var container = document.createElement('div');
    var chart_id = "chart-"+profile.id;
    container.setAttribute("id", chart_id);
    container.setAttribute("class", "chart");
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
      $('#'+chart_id+' .gapi-analytics-data-chart-styles-table-th').html(profile.label)
      var result = $('#'+chart_id+' .gapi-analytics-data-chart-styles-table-td');
      result.html(parseInt(result.html()).toLocaleString());
    });
  }

});
