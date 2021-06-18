//Hack it - we are the robot family

//TASK 1. modify the code so that all three robots are drawn
//TASK 2. try changing the numbers to create your robot family
//TASK 3. create more arrays and use the values in them to add more variation to the robots

var robotCount;
var robotColors;
var robotWidths;
var robotHeights;
var headWidths;


function setup()
{
	//create a canvas for the robot
	createCanvas(1000, 700);
    robotCount = 3;
    robotColors = ["red", "green", "blue"];
//    robotWidths = [70,100,150]; //torse+legs/arms
    robotWidths = [[120, 120/3, 120*2/3], [100, 100/3, 100*2/3], [150, 150/3, 150*2/3]];
    robotHeights = [[180, 180/2, 180/2], [220, 220/2, 220/2], [200, 200/2, 200/2]]; //torse+legs/arms
    
    headWidths = [0.7,0.8,1.2];
    
}

function draw()
{
    
	strokeWeight(2);
    noFill();
    rect(0,0,width,height);
    fill(255,0,0);
    
    
    for(let i = 0 ; i < robotCount ; i++){
    
    //Draw body    
    push();
    fill(120 + i * 50, 120 + i * 50, 120 + i * 50);
    rect(150 + 300 * i, height - 100 - robotHeights[i][1] - robotHeights[i][0], robotWidths[i][0], robotHeights[i][0]);
    pop();
    
    //Draw legs
    push();
    fill(120 + i * 50, 120 + i * 50, 120 + i * 50);    
    rect(150 + 300 * i, height - 100 - robotHeights[i][1], robotWidths[i][1], robotHeights[i][1]);
    rect(150 + 300 * i + robotWidths[i][0] - robotWidths[i][1], height - 100 - robotHeights[i][1], robotWidths[i][1], robotHeights[i][1]);
        
    pop();
        
    //Draw hands
    
    push();
    fill(120 + i * 50, 120 + i * 50, 120 + i * 50);    
    rect(150 + 300 * i - robotWidths[i][1], height - 100 - robotHeights[i][1] - robotHeights[i][0], robotWidths[i][1], robotHeights[i][1] * 1.5);
    rect(150 + 300 * i + robotWidths[i][0], height - 100 - robotHeights[i][1] - robotHeights[i][0], robotWidths[i][1], robotHeights[i][1] * 1.5);
        
    pop();
        
    //Draw heads
    
    push();
    fill(120 + i * 50, 120 + i * 50, 120 + i * 50);    
    rect(150 + 300 * i + robotWidths[i][0]/2 - robotWidths[i][2]/2, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2], robotWidths[i][2], robotHeights[i][2]);
        
    pop();
        
    //Draw ears
    
    push();
    fill(225 - i * 100, i * 150, i * 100);    
    rect(150 + 300 * i + robotWidths[i][0]/2 - robotWidths[i][2]/2 - robotWidths[i][2]/8, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] * 2/3, robotWidths[i][2]/8, robotHeights[i][2]/3); 
    rect(150 + 300 * i + robotWidths[i][0]/2 + robotWidths[i][2]/2, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] * 2/3, robotWidths[i][2]/8, robotHeights[i][2]/3);
        
    pop();
        
    //Draw antenas
    
    push();
    fill(100 + i * 50, i * 100, 225 - i * 75);    
    rect(150 + 300 * i + robotWidths[i][0]/2 - robotWidths[i][2]/8, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] * 1.1, robotWidths[i][2]/4, robotHeights[i][2]/10);
    fill(random(120, i * 100), random(80, i * 50), random(0, i * 30));
    ellipse(150 + 300 * i + robotWidths[i][0]/2, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] - robotHeights[i][2]/10, robotWidths[i][2]/8, robotHeights[i][2]/8);
        
    pop();
        
    //Draw eyes
    
    push();
    fill(255, 255, 255);    
    ellipse(150 + 300 * i + robotWidths[i][0]/2 - robotWidths[i][2]/4, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] * 2/3, robotWidths[i][2] * 1/4, robotHeights[i][2] * 1/4);
    point(150 + 300 * i + robotWidths[i][0]/2 - robotWidths[i][2]/4, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] * 2/3);
    ellipse(150 + 300 * i + robotWidths[i][0]/2 + robotWidths[i][2]/4, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] * 2/3, robotWidths[i][2] * 1/4, robotHeights[i][2] * 1/4);  
    point(150 + 300 * i + robotWidths[i][0]/2 + robotWidths[i][2]/4, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] * 2/3);  
    pop();
        
    //Draw nose
    
    push();
    fill(255 - 80 * i, 100 + i * 50, i * 60);    
    triangle(150 + 300 * i + robotWidths[i][0]/2, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] * 1/3,150 + 300 * i + robotWidths[i][0]/2 - robotWidths[i][2]/10, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] * 1/2, 150 + 300 * i + robotWidths[i][0]/2 + robotWidths[i][2]/10, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] * 1/2);    
    pop();
        
    //Draw mouth
    
    push();
    fill(255 - 35 * i, 255 - 95 * i, 255 - 25 * i);    
    rect(150 + 300 * i + robotWidths[i][0]/2 - robotWidths[i][2]/3, height - 100 - robotHeights[i][1] - robotHeights[i][0] - robotHeights[i][2] * 1/5, robotWidths[i][2] * 2/3, robotWidths[i][2] * 0.1);
        
    pop();
        
        
    }
    
    
//    console.log(robotWidths[i - 1][i - 1]);
    
    //ROBOT 1
//    translate(200,0);
//
//    fill(200);
//    rect(-robotWidths[0]/2, -robotHeights[0] - 130, robotWidths[0], 130);
//    rect(-70, -robotHeights[0] - 130, 30, 100);
//    rect(40,  -robotHeights[0] - 130, 30, 100);
//    rect(-30, -robotHeights[0], 30, robotHeights[0]);
//    rect(0,  -robotHeights[0], 30, robotHeights[0]);
//
//    //robot heads
//    fill(200);
//    rect(-50* headWidths[0], -robotHeights[0] - 230, 100* headWidths[0], 100, 10);
//
//    //ears
//    fill(255, 0, 0);
//    rect(-50 * headWidths[0] - 10, -robotHeights[0] - 200, 10, 33);
//    rect(50 * headWidths[0], -robotHeights[0] - 200, 10, 33);
//
//    //robots' antennas
//    fill(250, 250, 0);
//    ellipse(0, -robotHeights[0] - 237, 10, 10);
//    fill(200, 0, 200);
//    rect(-10, -robotHeights[0] - 233, 20, 10);
//
//    //robot's eyes
//    fill(255)
//    ellipse(-25 * headWidths[0], -robotHeights[0] - 200, 26, 26);
//    point(-25 * headWidths[0], -robotHeights[0] - 200);
//    ellipse(25 * headWidths[0], -robotHeights[0] - 200, 26, 26);
//    point(25 * headWidths[0], -robotHeights[0] - 200);
//
//    //robots' nose
//    fill(255, 0, 0);
//    triangle(0, -robotHeights[0] - 190, -15, -robotHeights[0] - 170,15, -robotHeights[0] - 170);
//
//    //robot mouth
//    noFill();
//    beginShape();
//    vertex(-23, -robotHeights[0] - 155);
//    vertex(-15, -robotHeights[0] - 145);
//    vertex(-9, -robotHeights[0] - 155);
//    vertex(-1, -robotHeights[0] - 145);
//    vertex(7, -robotHeights[0] - 155);
//    vertex(15, -robotHeights[0] - 145);
//    vertex(23, -robotHeights[0] - 155);
//    endShape();
    
        
    

}