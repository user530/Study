/*
Hack It: Robot Olympics

* Make each robot move down the track by increasing its x coordinate each frame. You will want to add some randomness to this so each robot races at a different speed. 
* Check which robot has won the race and display a message saying which robot won. Remember the lanes will are labelled 1-5 not 0-4. 
* Some other things to try out when you've done the basics: 
    * Switch the robotXs and robotYs arrays to a single array of objects. 
    * Change the look of each robot.  
    * [HARD] Make the robots run the other way, or down the screen not across. 
    * [V HARD] make the race distance longer without increasing the size of the canvas. 
    * [V HARD] add "on your marks.", "Get set" and "go" before the start of the race. 
*/

var finishLineX = 1150;
var finishLineY = 5000;
var winner;
var timer = 180;
var end = false;
var cam = 0;
var robots = [{x:40,
               y:50},
              {x:200,
               y:50},
              {x:360,
               y:50},
              {x:520,
               y:50},
              {x:680,
               y:50}]


function setup()
{
	createCanvas(850, 800);
    finishLineY = height - 80;
}


function draw()
{

	background(200, 100, 0);

    push();
    translate(0, cam);
	//draw the finish line and first line marker
	strokeWeight(7);
	stroke(255);
	
	line(0, 170, width, 170);
    line(0, finishLineY, width, finishLineY);
    pop();
    
	for (let i = 0; i < robots.length; i++)
	{
        
		//draw the robots
		strokeWeight(2);
		stroke(0);

		//robot head
		fill(200 - i * 25);
		rect(robots[i].x, robots[i].y, 100, 100, 10);

		//ears
		fill(255 - i * 25, 0 + i * 40, 0 + i * 30);

		rect(robots[i].x - 7, robots[i].y + 30, 10, 33);
		rect(robots[i].x + 97, robots[i].y + 30, 10, 33);

		//robots' antennas
		fill(250 - i * 25, 250 - i * 25, 0 + i * 30);
		ellipse(robots[i].x + 50, robots[i].y - 7, 10, 10);

		fill(200 - i * 25, 0 + i * 40, 200 + i * 30);
		rect(robots[i].x + 40, robots[i].y - 3, 20, 10);

		//eyes
		fill(255 - i * 25);
		ellipse(robots[i].x + 25, robots[i].y + 30, 26, 26);
		point(robots[i].x + 25, robots[i].y + 30);
		ellipse(robots[i].x + 75, robots[i].y + 30, 26, 26);
		point(robots[i].x + 75, robots[i].y + 30);


		//robots' noses
		fill(255 - i * 25, 0 + i * 40, 0 + i * 30);
		triangle(robots[i].x + 50, robots[i].y + 35, robots[i].x + 35, robots[i].y + 60, robots[i].x + 65, robots[i].y + 60);

		//robot 1 mouth
		noFill();
		beginShape();
		vertex(robots[i].x + 28, robots[i].y + 75);
		vertex(robots[i].x + 36, robots[i].y + 85);
		vertex(robots[i].x + 42, robots[i].y + 75);
		vertex(robots[i].x + 50, robots[i].y + 85);
		vertex(robots[i].x + 58, robots[i].y + 75);
		vertex(robots[i].x + 66, robots[i].y + 85);
		vertex(robots[i].x + 74, robots[i].y + 75);
		endShape();

        
        
		//draw the lines  
		strokeWeight(7);
		stroke(255);
		line(robots[i].x - 30, 0, robots[i].x - 30, finishLineY + 170);
        line(robots[i].x + 100 + 30, 0, robots[i].x + 100 + 30, finishLineY + 170);
        
    }
    
    fill(255, 0, 0);
    textSize(64);
    
    if (frameCount < timer)
        {
            text("On your marks...", 100, height/2);
        }
    else if ((frameCount > timer)&&(frameCount < timer * 2))
        {
            text("Get set...", 100, height/2);
        }
    else if ((frameCount > timer * 2)&&(frameCount < timer * 2.1))
        {
            text("GO!!!", 100, height/2);
        }
    
    
    if ((frameCount >= timer * 2.1)&&(end == false))
        {
            for (let i = 0 ; i < robots.length ; i++)
                {
                    console.log("i = " + i);
                    robots[i].y += random (0.1, 10);
                    console.log("y = " + robots[i].y);
                    if (robots[i].y + 100 >= finishLineY)
                        {
                            end = true;
                            winner = i + 1;
                        }
                }
        }
    else if (frameCount >= timer * 2.1)
        {            
            text("Robot in line " + (winner) + " wins!", 100, height/2);
        }
   
		//TODO: update the robots x location
    
		//TODO Check if the robot has won and display message!   
	

}