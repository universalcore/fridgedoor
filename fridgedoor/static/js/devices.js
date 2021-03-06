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
    // Trying to insert my button
    var link = document.createElement("a");
    link.setAttribute("href", "/moreinfo/" + profile.id);
    link.innerHTML = profile.label;

    var container = document.createElement('div');
    var chart_id = "chart-"+profile.id;
    container.setAttribute("id", chart_id);
    container.setAttribute("class", "chart");
    var parent = document.getElementById(profile.parent);
    parent.appendChild(container);

    var dataChart = new gapi.analytics.googleCharts.DataChart({
        query: {
          'dimensions': 'ga:browser',
          'metrics': 'ga:pageviews',
          'sort': '-ga:pageviews',
          'max-results': '5'
        },
        chart: {
          container: chart_id,
          type: 'PIE',
          options: {
            'width': '100%'
          }
        }
      });

    dataChart.set({query: {ids: "ga:"+profile.id}}).execute();
    dataChart.on('success', function(){
      $('#'+chart_id).prepend(link);
      var result = $('#'+chart_id+' .gapi-analytics-data-chart-styles-table-td');
      result.html(parseInt(result.html()).toLocaleString());
      $(parent).fadeIn();
    });
  }

});
