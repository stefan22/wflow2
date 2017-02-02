//global

/*  canvasAnim.js is the default js file and needs to be replaced for this one.
--------------------------------------------------------------------------------------------
**==CRAZY DEBUGGING ==** and Fixing It without fixing it.

Having done this much writting shadowing the JavaScript interpreter as it executed my code
 -this much not needed to - identify the bug/problem with the code.

Anyways, in the name of making the time spent on doing it worth my while

I'm going to try to change **--The--Execution--Order--** to see if it can be fixed without 
fixing the problem first.

For Practice only  (BTW: making it evaluate to null instead of zero will fix the problem, but
=================   that will be no fun.)

it should be simple already knowing that the interpreter goes through the addBubble function
once, exits the function only after creating one bubble. I already know that the if statement 
conditional is wrong and that it evaluates before the array length has been updated.

**FIXED** without fixing it: 
  At the fourth very 'Casual' attempt. (By calling the addBubble function from within 
  the animate function).

---------------------------------------------------------------------------------------------//*

 /*

 javascript interpreter goes through code from the moment DOMContentLoaded is fired, and init
 function gets called.

          - js interpreter goes line by line in init
          - bubbleTimer to clear interval for addBubble funct
          - draw();
          - jumps to draw() - fills node values for style and rect but nothing gets done cause 
            as it goes through loop -array length zero so exits
          - jsInterpreter goes back init function but not to addBuble but the next line of code:
            bubbleTimer2 which clears timer for animate function. (last line of code at init)
          - exits init and re-directs to an external script
          - comesback to my script, and seeks the function inside BubbleTimer2
            that seemed weird being that there's another variable setting another timer holding
            another function only two lines of code above. 
            It seems since Draw() got executed right before that, keeps on going from top to bottom
          - anyhow exits init funct to go to animate funct (bubbleTimer2)
          - now at animate(), i have to other functions: update and draw
          - interpreter goes to update function but since not a single bubble been added and array
            length remains zero, exits it.
          - now back to animate to call second function: draw();
          - goes through draw, re-writes canvas values for width,height in node
          - js interpreter goes through the loop one more time, stil zero lenght array
            cause nothing's been pushed yet. Exits draw function, goes back to animate
          - exits animate function, goes to external script
          - comes back to animate function, goes through update, draw function again. 
          - it goes through animate two more times, it goes to the external script again,
            it goes through my Ajax call in a different script and finally goes and
          - finds addBubble. 
            goes through function. Near the end makes a call to inner function to add a
            bubble to array but array still zero so clears interval - exits function
          - one bubble gets added.
          - js interpreter goes back to animate function
          - it goes through update again but now array length is 1 so speed updated
          - goes back to animate and next goes to draw. Creates width, height, and runs
            loop and this time lenght equals 1 so the buffer canvas width, height gets created
          - draws rect and goest through animate function and sub functions draw and update
          - four or five hundred more times....
            So:
          - ARRAY LENGTH STILL 1.
            
          - RESULTS:
          - moving draw() inside init function to bottom of stack fails
          - addBubble already sitting after init moved between animate and 
            update functs -- nope!
          - addBubble after draw and before animate funcs  -- nope!
          - calling addBubble from within animate function. Yes!

          - Fixed without fixing it.


*//*



---------------------------------------------------------------------------------------------
*/




var canvas = null;
var context = null;
var bufferCanvas = null;
var bufferCanvasCtx = null;
var bubbleArray = [];
var bubbleTimer = null;
var bubbleTimer2 = null;
var counter = 0;



var maxBubbles = 60;

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

            var counter = 10;
            var countdown = setInterval(function(){
              console.log(counter);
              counter--
              if (counter === 0) {
                console.log("zero here");
                clearInterval(countdown);
              }
            }, 1000);
            
        

---------------------------------------------------------------------------
*/
    

    function Bubble() {
        this.x = Math.round(Math.random() * context.canvas.width);
        this.y = -15;
        this.wind = Math.random()* 5  + 12;
        this.speed = Math.round(Math.random() * 7);
        this.width = (Math.random() * 7) +18;
        this.height = this.width-7;
    }

debugger;
    function init() {
        //step 1
        console.log('step1:init');
        canvas = document.getElementById('testCanvas');
        context = canvas.getContext("2d");
        //step 2
        bufferCanvas = document.createElement("canvas");
        bufferCanvasCtx = bufferCanvas.getContext("2d");
        //bufferCanvasCtx and context same width and height
        bufferCanvasCtx.canvas.width = context.canvas.width;
        bufferCanvasCtx.canvas.height = context.canvas.height;

        // initialize the rects
        bubbleTimer = setInterval(addBubble, 60);
        draw();
        //draw and speed
        bubbleTimer2 = setInterval(animate, 36);



       
  
       
    }//init

        
        function addBubble() {          
                
                    if(bubbleArray.length == maxBubbles) {
                        //stop adding
                        clearInterval(bubbleTimer);
                    
                    }//if
                    //otherwise continue adding
                     else {

                        var pushArr = function(obj) {
                             bubbleArray.push(obj);
                            console.log(bubbleArray);
                        }//pussArr
                    
                    }//else add to array

                

                pushArr(new Bubble());

                console.log(new Bubble())
        }//addBubble





            

            
      


    function draw(){
        //console.log('step3:draw');
        bufferCanvasCtx.fillStyle = "rgba(255,255,255,.15)";
        bufferCanvasCtx.fillRect(0,0,bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);

        for (var i = 0; i < bubbleArray.length; i++) {
            bufferCanvasCtx.fillStyle = "blue";
            bufferCanvasCtx.fillRect(bubbleArray[i].x,bubbleArray[i].y,bubbleArray[i].width,bubbleArray[i].height);
        }
        
        // copy the entire rendered image from the buffer canvas to the visible one
        context.drawImage(bufferCanvas, 100,30,bufferCanvas.width, bufferCanvas.height);
        
    }


    

        function animate() {
            //console.log('step4:time for anima');
            for (var i=0; i< maxBubbles; i++) {
                update();
                draw();

            } 

        }

        function addBubble() {
                //console.log('step2:addBubble /cuts off at 200 bubbles');
                //adds maxBubbles to Array and clears.
            
                var pushArr = function(obj) {

                       //if length equals max
                    if(bubbleArray.length == maxBubbles) {
                        //stop adding
                        clearInterval(bubbleTimer);
                    
                    }//if
                    //otherwise continue adding
                     else {
                    
                        bubbleArray.push(obj);
                        //console.log(bubbleArray);
                    
                    }//else add to array

                }//pussArr


                /*  while loop part of the console log total objects info:
                   -------------------------------------------------------
                    60 objects/bubbles. Counter starts at one
                */

                while (counter <  maxBubbles) {

                    pushArr(new Bubble());
                    var mes = "Bubble" + counter++ + ": ";
                        
                    console.info(mes);
                    console.log(new Bubble());


                }

                    console.log('total number of bubbles: ' + bubbleArray.length);

                    
                    
               

                    
        }//addBubble


        function update() {
            for (var i = 0; i < bubbleArray.length; i++) {
                if (bubbleArray[i].y < context.canvas.height) {
                    bubbleArray[i].y += bubbleArray[i].speed;
                    //if array greater than canvas height
                    if (bubbleArray[i].y > context.canvas.height) {
                        //reset vertical position to -5
                        bubbleArray[i].y -= 75;
                        bubbleArray[i].x += bubbleArray[i].wind;
                        //====================== old style
                        //shuts off all prev timers and calls bounce
                        

                        //calls lastTimer and clear all other intervals
                        //lastTimer3();
                        //redraw();
                        
                    }  

                    
                    else if (bubbleArray[i].x > context.canvas.width) {
                        bubbleArray[i].x = 0;
                       
                    }
                      

                }
            
            }//for loop
        }//Update function


        function bounce() {
            for (var i = 0; i < bubbleArray.length; i++) {
                if (bubbleArray[i].y < context.canvas.height) {
                    bubbleArray[i].y += bubbleArray[i].speed;
                    //if array greater than canvas height
                    if (bubbleArray[i].y > context.canvas.height) {
                        //go back up
                        //bubbleArray[i].y -= 5;
                       
                       
                    }  

                    bubbleArray[i].x += bubbleArray[i].wind;
                    if (bubbleArray[i].x > context.canvas.width) {
                        bubbleArray[i].x -= 3;
                       
                    }
                      

                }
            
            }//for loop
        }//bounce function



        function redraw(){
       
            bufferCanvasCtx.fillStyle = "rgba(255,255,255,1)";
            bufferCanvasCtx.fillRect(0,0,bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);

            for (var i = 0; i < bubbleArray.length; i++) {
                bufferCanvasCtx.fillStyle = "rgba(27,32,27,1)";
                bufferCanvasCtx.fillRect(bubbleArray[i].x,bubbleArray[i].y,bubbleArray[i].width,bubbleArray[i].height);
            }
            
            // copy the entire rendered image from the buffer canvas to the visible one
            context.drawImage(bufferCanvas, 0,0,bufferCanvas.width, bufferCanvas.height);
            
        }//redraw



document.addEventListener('DOMContentLoaded',init,false);
