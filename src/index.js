import './css/style.css';
(function init(){

    window.$ = require("jquery");

    let template = $(`<div id="container"><canvas id="canvas"></canvas></div>`);
    $('body').append(template);

    let canvas = document.getElementById("canvas");
        let width,height;
        function extractPixel(str){
          return str.substring(0, str.length - 2);
        }
        
        
         function draw(){
           let ctx = canvas.getContext("2d"); 
           ctx.beginPath();
           let radiusX = 100;
           let radiusY = 120;
           var startAngle = (Math.PI/180)* 30;
           var endAngle = (Math.PI/180)* -210;
           ctx.ellipse(width/2, height/2 - 60, radiusX, radiusY, 0, startAngle, endAngle, true);
           ctx.clearRect(width,0, -width, height);
           ctx.stroke();
           ctx.closePath();
           
           ctx.beginPath();
           var startAngle1 = (Math.PI/180)* -58;
           var endAngle1 = (Math.PI/180)* 238;
           ctx.arc(width/2, height/2 + 180, 180, startAngle1, endAngle1, false);
           ctx.stroke();
           ctx.closePath();
           
           ctx.beginPath();
      //   ctx.setLineDash([5]);
           let rectW = 200;
           let rectH = 100;
           let rectX = (ctx.canvas.width * .5) - (rectW * .5);
      //      let rectY = (ctx.canvas.height * .5) - (rectH * .5);
           let rectY = height-rectH - 10;
           ctx.strokeRect(rectX,rectY, 200, 100);
           ctx.closePath();
        }
        
        function init(){
          let tempWidth = $("#container").css("width");
          let tempHeight = $("#container").css("height");
          width = canvas.width = extractPixel(tempWidth);
          height = canvas.height = extractPixel(tempHeight);
          draw();
        }
        
        window.addEventListener("resize",function(e){
          init();
        })
         
      
        init();
})()