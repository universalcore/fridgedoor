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
  
  
    /*   var ids = "ga:" + profile.id;
    // Trying to insert my button
    
    var a = document.createElement('a');
    var linkText = document.createTextNode("More Info");
    a.appendChild(linkText);
    a.title = "More Info";
    a.setAttribute("href","/"+profiles.label.+"/"+ids);
    document.body.appendChild(a);
    */



    /*
    a.addEventListener("click",moreDetails);
    }*/

      function renderWeekOverWeekChart(profile) {
      // Trying to insert my button

      var container = document.createElement('div');
      var chart_id = "chart-"+profile.id;
      container.setAttribute("id", chart_id);
      container.setAttribute("class", "chart");

      
      var ids = "ga:"+ profile.id;

      var title = document.createElement('div');
      title.setAttribute("class", "title");
      title.innerHTML = profile.label;

      var legend_id = "legend-"+profile.id;
      var legend = document.createElement('div');
      legend.setAttribute("id", legend_id);

      var parent = document.getElementById(profile.parent);
      parent.appendChild(title);
      parent.appendChild(container);
      parent.appendChild(legend);
      var ids = "ga:" + profile.id;



      var a = document.createElement('a');
      var linkText = document.createTextNode("More Info");
      a.appendChild(linkText);
      a.setAttribute("href","/moreinfo/"+profile.label+"/"+ids);
      a.title = "More Info";
      document.body.appendChild(a);
      // Adjust `now` to experiment with different days, for testing only...
      var now = moment(); // .subtract(3, 'day');

      var thisWeek = query({
        'ids': ids,
        'dimensions': 'ga:date,ga:nthDay',
        'metrics': 'ga:pageviews',
        'start-date': moment(now).subtract(1, 'day').day(1).format('YYYY-MM-DD'),
        'end-date': moment(now).format('YYYY-MM-DD')
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

      console.log("I have arrived");
      
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
      generateLegend(legend_id, data.datasets);

    });
  }

//    <button onclick=""
    /*var button = document.createElement("input");
    button.type = "submit";
    button.value = "More info";
    button.setAttribute("id","info_button");
    document.body.appendChild(button);
    */


    /*
    $('button').click(function(){
        window.location.href='http://zolisa.unicore.ngrok.com/pageviews/moreinfo';
    });*/


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
    parent.appendChild(title);
    parent.appendChild(container);
    parent.appendChild(legend);
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
      new Chart(makeCanvas(chart_id)).Line(data, {scaleOverride: true, scaleStartValue: 0, scaleStepWidth: 2000, scaleSteps: 5});
      generateLegend(legend_id, data.datasets);

    });
  }



});
