$(document).ready(function(){
  var lightOn = false;
   $('#light').change(function() {
    lightToggle();
   });
  function lightToggle(){

    if(!lightOn){
    $('canvas').css('background-color','#00ffff');
    offColor = '#00f6f6';
    onColor = '#003434';
    drawTime(getClockTimeFormat());
    lightOn=true;
    }else{
    $('canvas').css('background-color','#A8AA96');
    offColor= '#b9bbab';
    onColor = '#21221e';
    drawTime(getClockTimeFormat());
    lightOn = false;
    }
  }

  var longitude = 20;
  var scaleFactor = 5;
  var margin = longitude/ 2;
  var doubleMargin = longitude*2;
  var offColor = '#b9bbab';
  var onColor = '#21221e';
  var positionArray = [];


  $('canvas').css('background-color','#A8AA96');

  //Coordinates System

  var clockData = {
  "numbers":{
      1:{"vertical":[{'x':1,'y':0},{'x':1,'y':1}],
         "horizontal":[{}]},

      2:{"vertical":[{'x':1,'y':0},{'x':0,'y':1}],
         "horizontal":[{'x':0,'y':0},{'x':0,'y':1},{'x':0,'y':2}]},

      3:{"vertical":[{'x':1,'y':0},{'x':1,'y':1}],
         "horizontal":[{'x':0,'y':0},{'x':0,'y':1},{'x':0,'y':2}]},

      4:{"vertical":[{'x':0,'y':0},{'x':1,'y':0},{'x':1,'y':1}],
         "horizontal":[{'x':0,'y':1}]},

      5:{"vertical":[{'x':0,'y':0},{'x':1,'y':1}],
         "horizontal":[{'x':0,'y':0},{'x':0,'y':1},{'x':0,'y':2}]},

      6:{"vertical":[{'x':0,'y':0},{'x':0,'y':1},{'x':1,'y':1}],
         "horizontal":[{'x':0,'y':0},{'x':0,'y':1},{'x':0,'y':2}]},

      7:{"vertical":[{'x':1,'y':0},{'x':1,'y':1}],
         "horizontal":[{'x':0,'y':0}]},

      8:{"vertical":[{'x':0,'y':0},{'x':0,'y':1},{'x':1,'y':0},{'x':1,'y':1}],
         "horizontal":[{'x':0,'y':0},{'x':0,'y':1},{'x':0,'y':2}]},

      9:{"vertical":[{'x':0,'y':0},{'x':1,'y':0},{'x':1,'y':1}],
         "horizontal":[{'x':0,'y':0},{'x':0,'y':1}]},

      0:{"vertical":[{'x':0,'y':0},{'x':1,'y':0},{'x':0,'y':1},{'x':1,'y':1}],
         "horizontal":[{'x':0,'y':0},{'x':0,'y':2}]}


      }
  };


  function verticalRectangle(x,y, color){
    $('canvas').drawRect({
        fillStyle: color,
        x: x, y: y,
        width: longitude,
        height: longitude*scaleFactor,
        draggable: false,
        fromCenter: false,
        cornerRadius: 10
      });
  }

  function horizontalRectangle(x, y, color){
    $('canvas').drawRect({
        fillStyle: color,
        x: x, y: y,
        width: longitude*scaleFactor,
        height: longitude,
        draggable: false,
        fromCenter: false,
        cornerRadius: 100
      });

  }

  function drawUnit(x , y,color){
    var auxY = y;
    var auxX = x;

    for(var i =0; i<3;i++){
      horizontalRectangle(auxX,auxY,color);
      auxY = auxY + (longitude * scaleFactor) - longitude;
    }
    auxY = y;
    auxX = x;

    for(var i =0; i<2;i++){

      for(var j=0; j<2;j++){

        verticalRectangle(auxX,auxY,color);
        auxY = auxY + (longitude * scaleFactor) - longitude;

      }
      auxY = y;
      auxX = auxX + (longitude *scaleFactor) - longitude;

    }

  }
  function drawFullCLock( x, y,color){

    for(var i=0; i<3;i++){
      for(var j=0; j<2;j++){
        positionArray.push(x);
        drawUnit(x,y,color);
        x = x + (longitude * scaleFactor) + margin;
      }
      x = x + doubleMargin;
    }
    for(var i=1; i<3;i++){
    $('canvas').drawRect({
        fillStyle: onColor,
        x: (longitude*scaleFactor + margin*i)*2*i+margin/2,
        y: (initY+longitude*scaleFactor/2),
        width: 40,
        height: 40,
        draggable: false,
        fromCenter: false,
        cornerRadius: 10
      }).drawRect({
        fillStyle: onColor,
        x: (longitude*scaleFactor + margin*i)*2*i+margin/2,
        y: (initY+longitude*scaleFactor+ longitude/2),
        width: 40,
        height: 40,
        draggable: false,
        fromCenter: false,
        cornerRadius: 10
      });
    }




  }


  function drawUnitLine(x,y,vertical,color){
    if(vertical == true){
      verticalRectangle(x, y, color);
    }else{
      horizontalRectangle(x, y, color);
    }

  }
  var initX =10;
  var initY =10;
  drawFullCLock(initX,initY, offColor);
  //drawUnit(positionArray[5],50,onColor);

  /*drawNumber(3,5);
  cleanSpot(3);
  drawNumber(3,1);
  drawNumber(4,1);
  */
  //var time = 123511;

  function getClockTimeFormat(){
  var currentdate = new Date();
    var temp = currentdate.getHours();
    var hours = temp < 10 ? '0'+temp.toString() : temp.toString();
    temp = currentdate.getMinutes();
    var minutes = temp < 10 ? '0'+temp.toString() : temp.toString();
    temp = currentdate.getSeconds();
    var seconds = temp < 10 ? '0'+temp.toString() : temp.toString();
    return hours+minutes+seconds;
  }
  setInterval(function () {

    drawTime(getClockTimeFormat());

  }, 1000);

  function drawTime(time){
    for (var i = 0, len = time.length; i < len; i++) {
    cleanSpot(i);
    drawNumber(i,time[i]);
    }

  }


  function cleanSpot(position){
    drawNumber(position, 8, offColor);
  }

  function drawNumber(position, number, color){
   color = typeof color !== 'undefined' ? color : onColor;

  $.each( clockData.numbers[number].vertical , function( key, value ) {
   drawUnitLine(positionArray[position]+(scaleFactor-1)*(longitude*value.x),
          initY+(scaleFactor-1)*(longitude*value.y),true,color);

  });
  $.each( clockData.numbers[number].horizontal , function( key, value ) {
   drawUnitLine(positionArray[position]+(scaleFactor-1)*(longitude*value.x),
          initY+(scaleFactor-1)*(longitude*value.y),false,color);

  });

  }



});
