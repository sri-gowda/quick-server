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
              audio: false
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
          let isMobile = height > width;

          // draw oval start
          let ellipseXCoord,ellipseYCoord,radiusX,radiusY,startAngle,endAngle,headHeightFromTop;
          console.log("isMobile",isMobile);
           if(isMobile){
              ellipseXCoord = (width/100) * 50;
              ellipseYCoord = (height/100) * 31;
              radiusX = width/100 * 30;
              radiusY = height/100 * 30;
              startAngle = (Math.PI/180)* 0; //have to do Math.PI/180 to use degrees
              endAngle = (Math.PI/180)* 360;
           }else{
              ellipseXCoord = (width/100) * 25;
              ellipseYCoord = (height/100) * 40;
              radiusX = width/100 * 20;
              radiusY = height/100 * 35;
              startAngle = (Math.PI/180)* 0; //have to do Math.PI/180 to use degrees
              endAngle = (Math.PI/180)* 360;
           }
           ctx.beginPath();
          //  ctx.setLineDash([5]);
           ctx.ellipse(ellipseXCoord, ellipseYCoord, radiusX, radiusY, 0, startAngle, endAngle, true);
           ctx.clearRect(width,0, -width, height);
           ctx.strokeStyle = "blue"
           ctx.stroke();
           ctx.closePath();
          // draw oval end
           

          // draw shoulder start

          //  let shoulderHeightFromTop = (height/100) * 60;
          //  let shoulderRadius = width/2;
          //  ctx.beginPath();
          // //  ctx.setLineDash([5]);
          //  var startAngle1 = (Math.PI/180)* -58;
          //  var endAngle1 = (Math.PI/180)* 238;
          //  ctx.arc(width/2, height/2 + shoulderHeightFromTop, shoulderRadius, startAngle1, endAngle1, false);
          //  ctx.strokeStyle = "blue"
          //  ctx.stroke();
          //  ctx.closePath();

          // draw shoulder end

          // draw rectangle start
           let rectH,rectW,rectX,rectY;
           ctx.beginPath();

           if(isMobile){
            //  ctx.setLineDash([5]);
            rectW = width/100 * 80;
            rectH = height/100 * 35;
            rectX = (ctx.canvas.width * .5) - (rectW * .5);
            // rectY = (ctx.canvas.height * .5) - (rectH * .5);
            rectY = height-rectH - height/100 * 2;
           }else{
           //  ctx.setLineDash([5]);
            rectW = width/100 * 50;
            rectH = height/100 * 40;
          //  let rectX = (ctx.canvas.width * .5) - (rectW * .5);
          //  let rectY = (ctx.canvas.height * .5) - (rectH * .5);
            rectX = width/100 * 45;
            rectY = height-rectH - height/100 * 2;
           }
         
           ctx.strokeStyle = "green"
           ctx.strokeRect(rectX, rectY, rectW, rectH);
           ctx.closePath();

           // draw rectange end

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