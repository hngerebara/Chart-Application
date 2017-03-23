function histogram(context, canvas, data, chartHeight) {
  var startY = 400;
  var canvasWidth = (canvas.width / data.length)-20;
  var startX = 50

  var maxValue = 0;
  for (var i = 0; i < data.length; i++) {
    var values = data[i];

    //find the maximum value and assign to vairiable height
    var height = parseInt(Math.max(values));

    if (parseInt(height) > parseInt(maxValue))
    {
      maxValue = height;
    } 

    
    context.beginPath()
    context.fillStyle = makeRandomColor();
    context.rect(startX,(chartHeight - height), canvasWidth,height,true);
    context.stroke();
    context.closePath();
    context.fill();
     

    context.fillText(values, startX + 4, chartHeight +10);
    context.fillStyle = "#4CAF50";
    context.restore();
    startX += canvasWidth;
  }

}

// function drawLine(context,beginX, beginY,endX,endY){
//   //beginPath() informs the drawing context that something new is about to be drawn
//   context.beginPath();

//   //moveTo() sets the starting point 
//   context.moveTo(beginX,beginY);

//   //lineTo() indicates the end point of drawing
//   context.lineTo(endX,endY);

//   //stroke then creates the line
//   context.stroke();
// }


function barChart(context, canvas, data, chartHeight) {
  var startY = 450;
  var canvasWidth = (canvas.width / data.length) - 20;
  var startX = 50;


  var maxValue = 0;
  for (var i = 0; i < data.length; i++) {
    var values = data[i];

    var height = parseInt((Math.max(values)));

    if (parseInt(height) > parseInt(maxValue)) maxValue = height;

    // Write the data to the chart
    context.fillStyle = makeRandomColor();
    context.rect(startX,(chartHeight - height), canvasWidth,height,true);
    context.stroke();
    context.closePath();
    context.fill();

    // Add the column title to the x-axis
    context.fillStyle = "#4CAF50";
    context.fillText(values, startX + 4, chartHeight + 10);

    startX += canvasWidth + 10;

  }

}


//function to draw the pie. Parameters are as follows:
//context:reference to the drawing context
//centerX: the X coordinate of the circle center
//centerY: the Y coordinate of the circle center
//radius: the X coordinate of the line end point
//startAngle: the angle where the circle starts
//endAngle: the angle where the circle ends

function pieChart(context,canvas,data){
    
    var total = 0;
    var startAngle
    var initialAngle = 0;
    var centerX = this.canvasId.width / 2;
    var centerY = this.canvasId.height / 2;
    var radius = Math.min(centerX,centerY);

    for (var i = 0; i < data.length; i++) {
      var values = data[i];
    
      total = data.reduce((a,b) => a + b , 0);
      var pieSlice= values/total;
      console.log(pieSlice);

      var endAngle = initialAngle +  (pieSlice  * Math.Pi*2);
      console.log("this isthe total",total);

      context.beginPath();
      context.moveTo(centerX,centerY);
      context.arc(centerX,centerY,radius,initialAngle,endAngle);
      context.stroke();
      context.closePath();
      context.fill();
      context.fillStyle = makeRandomColor();

    //Add labels
    var labelX = centerX + (radius / 2) * Math.cos(initialAngle + pieSlice/2);
    var labelY = centerY + (radius / 2) * Math.sin(initialAngle + pieSlice/2);

    var labelText = Math.round(100 * values / total);
    context.fillStyle ="white";
    context.font = "bold 20px Arial";
    // context.fillText(labelX,labelY);
    initialAngle += pieSlice;
  }
    

}



var makeRandomColor = function() {
  var letters = '0123456789ABCDEF';
  var c = '';
  for (var i = 0; i < 6; i++) {
    c += letters[Math.floor(Math.random() * 16)];
  }
  return '#'+c;
}


  
// function drawRectangle(contextO, x, y, w, h, fill) {
//   contextO.beginPath();
//   contextO.rect(x, y, w, h);
//   contextO.closePath();
//   contextO.stroke();
//   if (fill) contextO.fill();
// }




//The default action of canvas is to show nothing therfore event.preventDefault is used to revert it
function graph(event) {
  event.preventDefault();

  var canvas = document.getElementById('canvasId');
  canvasId.width= 600;
  canvasId.height=300;

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
      if (graph === 'histogram') {
        histogram(context, canvas, dataArray, (canvas.height - 10));
      }
      if (graph === 'bar') {
        barChart(context, canvas, dataArray, (canvas.height - 10));
      }
      if (graph === 'pie') {
          pieChart(context,canvas,dataArray);
  } 
}
	document.getElementById("plotInputedtData").addEventListener("click", graph)

