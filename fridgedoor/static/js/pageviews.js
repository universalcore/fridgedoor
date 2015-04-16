gapi.analytics.ready(function() {
    gapi.analytics.auth.authorize({
    container: 'embed-api-auth-container',
    clientid: '607034686826-asf8diukgvpl5qsrvfovf1114uqd1l6s.apps.googleusercontent.com',
  });

  var time = 500;
  profiles.forEach(function(p) {
    setTimeout( function(){ render_chart(p); }, time)
    time += 500;
  });

  // Contains a profile parameter, that is where the unique id of the country gets taken
  function render_chart(profile){
    var container = document.createElement('div');
    var chart_id = "chart-"+profile.id;
    container.setAttribute("id", chart_id);
    container.setAttribute("class", "chart");
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
    });
  }

});
