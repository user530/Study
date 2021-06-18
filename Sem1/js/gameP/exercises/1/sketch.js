/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.


WARNING: Do not get too carried away. If you're shape takes more than 5 lines
of code to draw then you've probably over done it.


*/

function setup()
{
	createCanvas(1024, 576);
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, 432, 1024, 144); //draw some green ground

	//1. a cloud in the sky
	
	noStroke();
	fill(255);
    ellipse(215,100,100);
    ellipse(150,100,100);
    ellipse(280,100,100);//... add your code here

	text("cloud", 200, 100);

	//2. a mountain in the distance
	
	stroke(255,255,255);
    fill(150,150,150);
    triangle(520,200,370,432,670,432);
    triangle(620,330,570,432,670,432);//... add your code here
    fill(255)
    noStroke();
    triangle(520,200,490,247,550,247);
	text("mountain", 500, 256);

	//3. a tree
	
    noStroke();
    fill(139,69,19);
    rect(800,425,16,7);
    fill(0,100,0);
    triangle(808,325,780,425,836,425);
    triangle(808,275,780,375,836,375);//... add your code here
	fill(255);
	text("tree", 800, 346);

	//4. a canyon
	//NB. the canyon should go from ground-level to the bottom of the screen

	fill(184,134,11);
    beginShape();
    vertex(54-40,432);
    vertex(90-40,480);
    vertex(54-40,523);
    vertex(90-40,576);
    vertex(155+40,576);
    vertex(129+40,523);
    vertex(155+40,480);
    vertex(129+40,432);
    endShape(); //... add your code here

	noStroke();
	fill(255);
	text("canyon", 100, 480);

	//5. a collectable token - eg. a jewel, fruit, coins
	noStroke();
    fill(255,140,0);
    ellipse(435,423,30);
    fill(255,215,0);
    triangle(436,408,422,430,448,430);
    triangle(436,419+22-3,422,430-11-3,448,430-11-3);//... add your code here
    
	noStroke();
	fill(255);
	text("collectable item", 400, 400);
}
