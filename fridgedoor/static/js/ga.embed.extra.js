/**
* Extend the Embed APIs `gapi.analytics.report.Data` component to
* return a promise the is fulfilled with the value returned by the API.
* @param {Object} params The request parameters.
* @return {Promise} A promise.
*/
function query(params) {
  return new Promise(function(resolve, reject) {
    var data = new gapi.analytics.report.Data({query: params});
    data.once('success', function(response) { resolve(response); })
        .once('error', function(response) { reject(response); })
        .execute();
  });
}

/**
* Create a new canvas inside the specified element. Set it to be the width
* and height of its container.
* @param {string} id The id attribute of the element to host the canvas.
* @return {RenderingContext} The 2D canvas context.
*/
function makeCanvas(id) {
  var container = document.getElementById(id);
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  container.innerHTML = '';
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  container.appendChild(canvas);

  return ctx;
}

/**
* Create a visual legend inside the specified element based off of a
* Chart.js dataset.
* @param {string} id The id attribute of the element to host the legend.
* @param {Array.<Object>} items A list of labels and colors for the legend.
*/
function generateLegend(id, items) {
  var legend = document.getElementById(id);
  legend.innerHTML = items.map(function(item) {
    var color = item.color || item.fillColor;
    var label = item.label;
    return '<li><i style="background:' + color + '"></i>' + label + '</li>';
  }).join('');
}
