import './css/style.css';
(function init(){
    window.$ = require("jquery");
    $('body').append($(`<div id="container"><div id="loader">Loading...</div><video id="vid"></video><canvas id="canvas"></canvas></div>`));

    let canvas = document.getElementById("canvas");
        let width,height;
        let vidEl;
        function extractPixel(str){
          return str.substring(0, str.length - 2);
        }
        
        function startCamera(startCameraCallback){
          try{
            const constraints = {
              video: {
                // aspectRatio: 16/9
              },
              audio: true
            };
            navigator.mediaDevices.getUserMedia(constraints).then(stream => {
              vidEl = $("#vid")[0];
              $("#vid").css({maxWidth:"95%",margin:'auto'})
              vidEl.srcObject = stream;
              vidEl.onloadedmetadata = function(e){
                vidEl.play();
              }
              startCameraCallback();
            })
          }catch(e){
            console.log("error initializing camera",e);
          }
        }

        function draw(){
           let ctx = canvas.getContext("2d"); 
           ctx.beginPath();
          //  ctx.setLineDash([5]);
           let radiusX = 140;
           let radiusY = 160;
           var startAngle = (Math.PI/180)* 30;
           var endAngle = (Math.PI/180)* -210;
           ctx.ellipse(width/2, height/2 - 60, radiusX, radiusY, 0, startAngle, endAngle, true);
           ctx.clearRect(width,0, -width, height);
           ctx.strokeStyle = "blue"
           ctx.stroke();
           ctx.closePath();
           
           ctx.beginPath();
          //  ctx.setLineDash([5]);
           var startAngle1 = (Math.PI/180)* -58;
           var endAngle1 = (Math.PI/180)* 238;
           ctx.arc(width/2, height/2 + 400, 400, startAngle1, endAngle1, false);
           ctx.strokeStyle = "blue"
           ctx.stroke();
           ctx.closePath();
           
           ctx.beginPath();
          //  ctx.setLineDash([5]);
           let rectW = 200;
           let rectH = 100;
           let rectX = (ctx.canvas.width * .5) - (rectW * .5);
      //      let rectY = (ctx.canvas.height * .5) - (rectH * .5);
           let rectY = height-rectH - 10;
           ctx.strokeRect(rectX,rectY, 200, 100);
           ctx.closePath();



          //  ctx.beginPath();
          //  ctx.arc(100, 100, 80, (Math.PI/180)* - 100, (Math.PI/180)* - 180, true);
          //  ctx.stroke();
          //  ctx.closePath();

          //  ctx.beginPath();
          //  ctx.arc(200, 100, 80, (Math.PI/180)* 180, (Math.PI/180)* -100, false);
          //  ctx.stroke();
          //  ctx.closePath();

        }

        function startCameraCallback(){
          setTimeout(() => {
            let tempWidth = $("#vid").css("width");
            let tempHeight = $("#vid").css("height");
            console.log("height width",tempWidth,tempHeight)
            width = canvas.width = extractPixel(tempWidth);
            height = canvas.height = extractPixel(tempHeight);
            draw();
            $("#loader").css({display:'none'});
          },2000)
        }
        
        function init(){
          startCamera(startCameraCallback);
        }
        
        window.addEventListener("resize",function(e){
          init();
        })
         
        init();
})()