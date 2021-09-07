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
           let radiusX = width/4;
           let radiusY = height/2.8;
           var startAngle = (Math.PI/180)* 30;
           var endAngle = (Math.PI/180)* -210;
           let headHeightFromTop = (height/100) * 10;
           ctx.ellipse(width/2, height/2 - headHeightFromTop , radiusX, radiusY, 0, startAngle, endAngle, true);
           ctx.clearRect(width,0, -width, height);
           ctx.strokeStyle = "blue"
           ctx.stroke();
           ctx.closePath();
           

           let shoulderHeightFromTop = (height/100) * 60;
           let shoulderRadius = width/2;
           ctx.beginPath();
          //  ctx.setLineDash([5]);
           var startAngle1 = (Math.PI/180)* -58;
           var endAngle1 = (Math.PI/180)* 238;
           ctx.arc(width/2, height/2 + shoulderHeightFromTop, shoulderRadius, startAngle1, endAngle1, false);
           ctx.strokeStyle = "blue"
           ctx.stroke();
           ctx.closePath();
           
           ctx.beginPath();
          //  ctx.setLineDash([5]);
           let rectW = width/2.2;
           let rectH = width/3.5;
           let rectX = (ctx.canvas.width * .5) - (rectW * .5);
      //      let rectY = (ctx.canvas.height * .5) - (rectH * .5);
           let rectY = height-rectH - height/100 * 2;
           ctx.strokeRect(rectX,rectY, rectW, rectH);
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