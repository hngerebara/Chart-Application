var makeRandomColor = function() {
  var letters = '0123456789ABCDEF';
  var c = '';
  for (var i = 0; i < 7; i++) {
    c += letters[Math.floor(Math.random() * 16)];
  }
  return '#'+c;
}



function histogram(context, canvasid, dataArray) {
  var yAxis = 480;
  var ratio = canvas.width / dataArray.length;
  var xAxis = 20;

  var maxValue = 0;
  for (var i = 0; i < dataArray.length; i++) {

    var values = dataArray[i];
    var height = parseInt((Math.max(values)));

    if (parseInt(height) > parseInt(maxValue)) maxValue = height;

    
    context.beginPath()
    context.fillStyle = makeRandomColor();
    drawRectangle(context, xAxis, ratio, height);
    context.closePath();
     

    context.fillText(values, xAxis + 4, height + 10, 100);
    context.restore();
    xAxis += ratio;
  }
}


//The default action of canvas is to show nothing therfore event.preventDefault is used to revert it
function graph(event) {
  event.preventDefault();

  var canvas = document.getElementById('canvasId');
  var context = canvas.getContext('2d');

  //remove spaces from user input and split into an array
  this.data = document.getElementById('datasets').value.replace(/\s/g, "") ;
  dataArray=this.data.split(",");
  
  //Select Chart Type
  var graphName = document.getElementsByName("selectedGraph");

  for (var i = 0; i < graphName.length; i++) {
    if (graphName[i].checked) {
      var graph = graphName[i].value;
    }
  }
      if (graph == 'histogram') {
        histogram(context, canvas, dataArray, (canvas.height - 10));
      }
      if (graph == 'bar') {
        barChart(context, canvas, dataArray, (canvas.height - 10), 10);
      }
      if (graph == 'pie') {
          pieChart(canvas, context);
      
    
  } 
}

  document.getElementById("plotInputedtData").addEventListener("click", graph)

