
function histogram(context, canvas, data, chartHeight, increments) {
  var startY = 450;
  var canvasWidth = (canvas.width / data.length) - 20;
  var startX = 50;
  var maxValue = 0;
  for (var i = 0; i < data.length; i++) {

    var values = data[i];
    var height = parseInt((Math.max(values)));
    
    if (parseInt(height) > parseInt(maxValue))
    {
      maxValue = height;
    } 

    context.beginPath()
    context.fillStyle = makeRandomColor();
    context.rect(startX, (chartHeight - height), canvasWidth, height, true);
    context.stroke();
    context.closePath()
    context.fill();
      // Add the column title to the x-axis

    context.fillText(values, startX + 4, chartHeight +10);
    context.fillStyle = "#4CAF50";
    context.restore();
    startX += canvasWidth;
  }

  
  context.font = "10px Georgia";
  var numMarkers = Math.ceil(maxValue / increments);
  context.textAlign = "right";
  var markerValue = 0;

  for (var i = 0; i < numMarkers; i++) {
    context.fillStyle = "#333";
    context.fillText(markerValue, (50 - 5), (chartHeight - markerValue), 50);
    markerValue += increments;
  }
}


function barChart(context, canvas, data, chartHeight, increments) {
  context.lineWidth = "1.0";
  var startY = 490;
  var canvasWidth = (canvas.width / data.length) - 10;
  var startX = 50;
  var maxValue = 0;
  for (var i = 0; i < data.length; i++) {
    var values = data[i];

    var height = parseInt((Math.max(values)));

    if (parseInt(height) > parseInt(maxValue)) maxValue = height;

    // Write the data to the chart
    context.rect(startX, (chartHeight - height), canvasWidth, height, true);
    context.stroke();
    context.closePath();
    context.fill();
    context.fillStyle = makeRandomColor();

    // Add the column title to the x-axis
    context.textAlign = "left";
    context.fillStyle = "#333";
    context.fillText(values, startX + 4, chartHeight + 10, 200);
    startX += canvasWidth + 5;

  }

  context.font = "10px Georgia";
  var numMarkers = Math.ceil(maxValue / increments);
  context.textAlign = "right";

  context.fillStyle = "#000";
  var markerValue = 0;
  for (var i = 0; i < numMarkers; i++) {
    context.fillText(markerValue, (50 - 5), (chartHeight - markerValue), 50);
    markerValue += increments;
  }

}


//function to draw the pie. Parameters are as follows:
//context:reference to the drawing context
//centerX: the X coordinate of the circle center
//centerY: the Y coordinate of the circle center
//radius: the X coordinate of the line end point
//startAngle: the angle where the circle starts
//endAngle: the angle where the circle ends

function pieChart(canvas, context) {
  var datasets = document.getElementById('datasets').value.replace(/\s/g, "") ;
  datasets=datasets.split(",");
  datasets = datasets.map(function (val) {
    return parseInt(val);
  });

  labels = datasets;
  total = datasets.reduce((a, b) => parseInt(a) + parseInt(b), 0);


  var centerX = Math.floor(canvas.width / 2);
  var centerY = Math.floor(canvas.height / 2);
  
  radius = Math.floor(canvas.width / 2);

  var initialAngle = degreesToRadians(sumTo(datasets, i));


  for (var i = 0; i < datasets.length; i++) {
    
    context.fillStyle = makeRandomColor();

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius,
      initialAngle, initialAngle + Math.PI * 2 * (datasets[i])/total, false);
    context.lineTo(centerX, centerY);

    context.fill();
    context.closePath();

    context.save();
    context.translate(centerX, centerY);
    context.rotate(initialAngle);
    var dx = Math.floor(canvas.width * 0.5) - 10;
    var dy = Math.floor(canvas.height * 0.05);

    context.textAlign = "right";
    var fontSize = Math.floor(canvas.height / 30);
    context.font = fontSize + "pt Heveltica";
    context.fillStyle = "#333";
    context.fillText(labels[i], dx, dy);
    context.restore();

    initialAngle += Math.PI * 2 * (datasets[i]/total);
  }

}



function lineChart(context, canvas, data, startX, chartHeight, increments) {

  var startY = 490;

  var fluidWidth = canvas.width / data.length;

  var currX = 70;
  
  context.lineWidth = "0.0";
  var maxValue = 0;
  data = data.sort(function(a, b) {
    return a - b
  });

  for (var i = 0; i < data.length; i++) {
    var height = parseInt((Math.max(data[i])))

    if (parseInt(height) > parseInt(maxValue)) maxValue = height;

    context.beginPath();

    context.moveTo(currX, canvas.height - height - 5);

    context.lineTo(currX + fluidWidth, canvas.height - parseInt(data[i + 1]) - 5);

    context.lineWidth = 3;
    context.strokeStyle = makeRandomColor();
    context.stroke();
    context.closePath();


    context.beginPath();
    context.arc(currX, canvas.height - height - 5, 2, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();

    // Add the column title to the x-axis
    context.textAlign = "left";
    context.fillStyle = "#333";
    context.fillText(height, currX - 10, chartHeight + 10, 200);
    currX += fluidWidth - 3;
  }



  context.font = "10px Georgia";
  var numMarkers = Math.ceil(maxValue / increments);
  context.textAlign = "right";
  context.fillStyle = "#000";
  var markerValue = 0;
  for (var i = 0; i < numMarkers; i++) {
    context.fillText(markerValue, (50 - 5), (chartHeight - markerValue), 50);
    markerValue += increments;
  }

}


var makeRandomColor = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function sumTo(a, i) {
  var sum = 0;

  for (var j = 0; j < i; j++) {
    sum += a[j];
  }
  return sum;
}

function drawRectangle(contextO, x, y, w, h, fill) {
  contextO.beginPath();
  contextO.rect(x, y, w, h);
  contextO.closePath();
  contextO.stroke();
  if (fill) contextO.fill();
}


function graph(event) {
  event.preventDefault();

  var error;

  var canvas = document.getElementById('canvasId');
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height)

  //remove spaces from user input and split into an array
  this.data = document.getElementById('datasets').value.replace(/\s/g, "") ;
  dataArray = this.data.split(",");

  // //Tests for Edge cases
  // if (typeof (dataArray == null)) {
  //   alert("No empty data");
  // }

  //Test if data entered is less than 2.
  if (dataArray.length < 2) {
    alert("Please enter value greater than or equal to 2");
  }

  //Tests for negatives or zero
  else if (dataArray < 1) {
    alert("Data entered contains one or more negative values. Please enter correct values");
  }

  //Use data points as labels
  this.labels = dataArray;

  var total = dataArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);

  //Select Chart Type
  var graphName = document.getElementsByName("selectedGraph");

  for (var i = 0; i < graphName.length; i++) {
    if (graphName[i].checked) {
      var graph = graphName[i].value;
    }
  }

  //To alculate bar width according to length of data points
  var canvasWidth = canvas.length / dataArray.length;

  if (context) {
    if (canvas && context) {
      if (graph == 'histogram') {
        histogram(context, canvas, dataArray, (canvas.height - 10), 10);
      }
      if (graph == 'bar') {
        barChart(context, canvas, dataArray, (canvas.height - 10), 10);
      }
      if (graph == 'line') {
        lineChart(context, canvas, dataArray, 50, (canvas.height - 10), 10)
      }
      if (graph == 'pie') {
          pieChart(canvas, context);
      }
    }
  } 
}

document.getElementById("plotInputedtData").addEventListener("click", graph);