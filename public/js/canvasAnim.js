//globals
var canvas = null;
var context = null;
var bufferCanvas = null;
var bufferCanvasCtx = null;
var bubbleArray = [];
var bubbleTimer = null;
var bubbleTimer2 = null;

//watcher - for debugging purposes only
var watcher = document.getElementById('watcher');

//bubs is number of bubbles and by default is null
var bubs = document.getElementById('amtbubbles');
console.log(bubs);  //null

var maxBubbles = bubs;

/*
--------------------------------------------------------------------------
        Bubble {            // new Bubble()
            
            x: 79,
            y: -10,
            wind:0.9788567556745454,
            speed: 5,
            width:2.787767686856566,
            height:2.71788112222124
            
        }

---------------------------------------------------------------------------
*/

    function Bubble() {
        this.x = Math.round(Math.random() * context.canvas.width);
        this.y = -10;
        this.wind = Math.random();
        this.speed = Math.round(Math.random() * 5) + 1;
        this.width = (Math.random() * 3) + 2;
        this.height = this.width;
    }
            
    function init() {
        //step 1
        canvas = document.getElementById('testCanvas');
        context = canvas.getContext("2d");
        //step 2
        bufferCanvas = document.createElement("canvas");
        bufferCanvasCtx = bufferCanvas.getContext("2d");
        //bufferCanvasCtx and context same width and height
        bufferCanvasCtx.canvas.width = context.canvas.width;
        bufferCanvasCtx.canvas.height = context.canvas.height;

        // initialize the rects
        bubbleTimer = setInterval(addBubble, bubs);
        draw();
        bubbleTimer2 = setInterval(animate, 36);
    }//init

        
        function addBubble() {
            //check to see if anything's been entered, and typeof number, undefined
            if((bubs == null) || (typeof bubs !== number) || (bubs == '') ) {
                //clear timer
                clearInterval(bubbleTimer);
                //nothing has been entered
                console.log('please enter a number');
                return true;

            
            } 
            //bubs a number
            else if (typeof bubs == parseInt(number)) { 

                //adds maxBubbles to Array and clears.
                console.log("what is bubs: " + bubs)
                var pushArr = function(obj) {
                       //if length equals max
                    if(bubbleArray.length == maxBubbles) {
                        //stop adding
                        clearInterval(bubbleTimer);
                    
                    }//if
                    //otherwise continue adding
                     else {
                    
                        bubbleArray.push(obj);
                    
                    }//else add to array

                }//pussArr

                pushArr(new Bubble());


            }//else bubs is a number





            

            console.log(new Bubble())
        }//addBubble


    function draw(){
       
        bufferCanvasCtx.fillStyle = "rgba(255,255,255,.85)";
        bufferCanvasCtx.fillRect(0,0,bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);

        for (var i = 0; i < bubbleArray.length; i++) {
            bufferCanvasCtx.fillStyle = "rgba(27,32,27,1)";
            bufferCanvasCtx.fillRect(bubbleArray[i].x,bubbleArray[i].y,bubbleArray[i].width,bubbleArray[i].height);
        }
        
        // copy the entire rendered image from the buffer canvas to the visible one
        context.drawImage(bufferCanvas, 0,0,bufferCanvas.width, bufferCanvas.height);
        
    }


    

        function animate() {
            update();
            draw();
        }

        function update() {
            for (var i = 0; i < bubbleArray.length; i++) {
                if (bubbleArray[i].y < context.canvas.height) {
                    bubbleArray[i].y += bubbleArray[i].speed;
                    //if array greater than canvas height
                    if (bubbleArray[i].y > context.canvas.height)
                        //reset vertical position to -5
                        bubbleArray[i].y = -5;

                    bubbleArray[i].x += bubbleArray[i].wind;
                    if (bubbleArray[i].x > context.canvas.width)
                        bubbleArray[i].x = 0;
                }
            
            }//for loop
        }//Update function



        
     

document.addEventListener('DOMContentLoaded',init,false);
