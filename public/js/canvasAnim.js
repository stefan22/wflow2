//globals
var canvas = null;
var context = null;
var bufferCanvas = null;
var bufferCanvasCtx = null;
var bubbleArray = [];
var bubbleTimer = null;
var maxBubbles = 200;

    function Bubble() {
        this.x = Math.round(Math.random() * context.canvas.width);
        this.y = -10;
        this.drift = Math.random();
        this.speed = Math.round(Math.random() * 5) + 1;
        this.width = (Math.random() * 3) + 2;
        this.height = this.width;
    }
            
    function init() {
        canvas = document.getElementById('testCanvas');
        context = canvas.getContext("2d");
        
        bufferCanvas = document.createElement("canvas");
        bufferCanvasCtx = bufferCanvas.getContext("2d");
        bufferCanvasCtx.canvas.width = context.canvas.width;
        bufferCanvasCtx.canvas.height = context.canvas.height;

        // initialize the rects
        bubbleTimer = setInterval(addBubble, 200);

        Draw();
        
        setInterval(animate, 36);
    }//init

        function addBubble() {
            bubbleArray[bubbleArray.length] = new Bubble();
            if (bubbleArray.length == maxBubbles)
                clearInterval(bubbleTimer);
        }

        function blank() {
           
            bufferCanvasCtx.fillStyle = "rgba(255,255,255,.85)";
           
            bufferCanvasCtx.fillRect(0,0,bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);
           
        }

        function animate() {
            Update();
            Draw();
        }

        function Update() {
            for (var i = 0; i < bubbleArray.length; i++) {
                if (bubbleArray[i].y < context.canvas.height) {
                    bubbleArray[i].y += bubbleArray[i].speed;
                    if (bubbleArray[i].y > context.canvas.height)
                        bubbleArray[i].y = -5;
                    bubbleArray[i].x += bubbleArray[i].drift;
                    if (bubbleArray[i].x > context.canvas.width)
                        bubbleArray[i].x = 0;
                }
            }
        }
        
        function Draw(){
           
            blank();

            for (var i = 0; i < bubbleArray.length; i++) {
                bufferCanvasCtx.fillStyle = "rgba(27,32,27,1)";
                bufferCanvasCtx.fillRect(bubbleArray[i].x,bubbleArray[i].y,bubbleArray[i].width,bubbleArray[i].height);
            }
            
            // copy the entire rendered image from the buffer canvas to the visible one
            context.drawImage(bufferCanvas, 0,0,bufferCanvas.width, bufferCanvas.height);
            
        }
