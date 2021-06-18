var groundHeight;
var mountain1;
var mountain2;

var tree;
var pond;
var bush;
var birds;
var stars;
var r;

var moon;
var sun;
var darkness;

function setup()
{
	createCanvas(800, 600);
	//set the groundHeight proportional to the canvas size
	groundHeight = (height / 3) * 2;

	//initalise the mountain objects with properties to help draw them to the canvas
	mountain1 = {
		x: 400,
		y: groundHeight,
		height: 320,
		width: 230
	};
    
	mountain2 = {
		x: 550,
		y: groundHeight,
		height: 200,
		width: 130
	};

	//initalise the tree object
	tree = {
		x: 150,
		y: groundHeight + 20,
		trunkWidth: 40,
		trunkHeight: 150,
		canopyWidth: 120,
		canopyHeight: 100
	};

    //initalise the pond
	pond = {
		x: mountain1.x + mountain1.width,
		y: mountain1.y + 60,
		pondWidth: 140,
		pondHeight: 40
	};
    
    //initalise the bush
    
	bush = {
		x: pond.x,
		y: pond.y + 20,
		bushWidth: 50,
		bushHeight: 100
	};
    
    //initalise the birds
    
	birds = {
		x: 100,
		y: 70,
		birdsWidth: 30,
		birdsHeight: 10
	};
    
    //initalise the stars
    
	stars = {
		x: 100,
		y: 100,
		starsWidth: 10,
		starsHeight: 10
	};
    
    //initalise the sun
    
	sun = {
		x: 150,
		y: 70,
		diameter: 80
	};
    
    //initalise the moon
    
	moon = {
		x: 650,
		y: 70,
		diameter: 80,
        brightness: 0
	};

	//set the initial darkness
	darkness = 0;
    
    r = [1,-1];
}



function draw()
{
	//TASK: update the values for the moons brightness, the sun's position and the darkness.
	//You can either map this to the mouse's location (i.e. the futher left the mouse is the more daylight) or you can just change the values gradually over time.
    moon.brightness = mouseX * 255/width;
    darkness = mouseX * 255/width;
    
	//draw the sky
	background(150, 200, 255);
	noStroke();

	//draw the sun
	fill(255, 255 - darkness*0.4, 0 + darkness*0.2);
	ellipse(sun.x, sun.y + (groundHeight - sun.y + sun.diameter)/255 * darkness , sun.diameter);
        
	//draw the ground and make it green
	fill(70, 200, 0);
	rect(0, groundHeight, width, height - groundHeight);

	//draw the mountains
	fill(120);
	triangle(mountain1.x, mountain1.y,
		mountain1.x + mountain1.width, mountain1.y,
		mountain1.x + (mountain1.width / 2), mountain1.y - mountain1.height);

	triangle(mountain2.x, mountain2.y,
		mountain2.x + mountain2.width, mountain2.y,
		mountain2.x + (mountain2.width / 2), mountain2.y - mountain2.height);
    
    //TASK: You can draw the tree yourself
    fill(139,69,19);
    rect(tree.x, tree.y, tree.trunkWidth, -tree.trunkHeight);
    fill(34,139,34);
    ellipse(tree.x + tree.trunkWidth/2, 
            tree.y-tree.trunkHeight,
            tree.canopyWidth, tree.canopyHeight);
    
    //draw the rocks
    fill(160,160,160);
    quad(100+tree.x,60+pond.y,100+tree.x+30,60+pond.y-70,100+tree.x+80,60+pond.y-30,100+tree.x+95,60+pond.y)

    //draw the pond
    fill(30,144,255);
    ellipse(pond.x, pond.y, pond.pondWidth, pond.pondHeight);
    
    //draw the bush
    stroke(3);
    noFill();
    arc(bush.x, bush.y, bush.bushWidth, bush.bushHeight, PI + QUARTER_PI * 3/2, PI * 2);
    arc(bush.x+5, bush.y, bush.bushWidth, bush.bushHeight*1.34, PI + QUARTER_PI * 3/2, PI * 2);
    arc(bush.x+bush.bushWidth, bush.y - bush.bushHeight*0.35, bush.bushWidth, bush.bushHeight*1.13, HALF_PI + QUARTER_PI * 2/3, PI + QUARTER_PI *2);
    noStroke();
    //draw the birds
    stroke(5);
    beginShape();
    vertex(birds.x-birds.birdsWidth + darkness*5
           ,birds.y-darkness%17);
    vertex(birds.x + darkness*5
           ,birds.y+birds.birdsHeight);
    vertex(birds.x+birds.birdsWidth + darkness*5
           ,birds.y-darkness%17);
    endShape();
    
    beginShape();
    vertex(-39+birds.x-birds.birdsWidth  + darkness*5   
           ,15 -darkness%17 +birds.y ); 
    vertex(-39+birds.x  + darkness*5 
           ,15+birds.y+birds.birdsHeight);
    vertex(-39+birds.x+birds.birdsWidth  + darkness*5 
           ,15 -darkness%17 +birds.y);
    endShape();
    
    beginShape();
    vertex(20+birds.x-birds.birdsWidth  + darkness*5
           ,27+birds.y-darkness%17);
    vertex(20+birds.x  + darkness*5
           ,33+birds.y+birds.birdsHeight);
    vertex(20+birds.x+birds.birdsWidth  + darkness*5
           ,27+birds.y-darkness%17);
    endShape();
    noStroke();
    
	//TASK: make the scene dark by drawing a rectangle that covers the whole canvas.
	//Use the alpha value of fill to determine how dark to make it
    fill(255 - darkness,229 - darkness^(darkness/25),204 - darkness^(darkness/75),min(darkness,220));
    rect(0,0,width,height);

    //TASK: you'll need to draw the moon too. Make sure you use brightness to adjust the colour
    
    fill(255,250,205,moon.brightness-100);
    ellipse(moon.x, moon.y, moon.diameter);
    
     //draw the stars
    fill(255,255,255,moon.brightness-100);
    beginShape();
    vertex(stars.x,stars.y+30);
    vertex(stars.x+stars.starsWidth/4,stars.y+stars.starsHeight/4+30);
    vertex(stars.x+stars.starsWidth/2,stars.y+stars.starsHeight/2+30);
    vertex(stars.x+stars.starsWidth*3/4,stars.y+stars.starsHeight/4+30);
    vertex(stars.x+stars.starsWidth,stars.y+30);
    vertex(stars.x+stars.starsWidth*3/4,stars.y-stars.starsHeight/4+30);
    vertex(stars.x+stars.starsWidth/2,stars.y-stars.starsHeight/2+30);
    vertex(stars.x+stars.starsWidth/4,stars.y-stars.starsHeight/4+30);
    endShape();
    
    beginShape();
    vertex(stars.x+80,stars.y-70);
    vertex(stars.x+80+stars.starsWidth/4,stars.y+stars.starsHeight/4-70);
    vertex(stars.x+80+stars.starsWidth/2,stars.y+stars.starsHeight/2-70);
    vertex(stars.x+80+stars.starsWidth*3/4,stars.y+stars.starsHeight/4-70);
    vertex(stars.x+80+stars.starsWidth,stars.y-70);
    vertex(stars.x+80+stars.starsWidth*3/4,stars.y-stars.starsHeight/4-70);
    vertex(stars.x+80+stars.starsWidth/2,stars.y-stars.starsHeight/2-70);
    vertex(stars.x+80+stars.starsWidth/4,stars.y-stars.starsHeight/4-70);
    endShape();
    
    beginShape();
    vertex(stars.x+160,stars.y+15);
    vertex(stars.x+160+stars.starsWidth/4,stars.y+stars.starsHeight/4+15);
    vertex(stars.x+160+stars.starsWidth/2,stars.y+stars.starsHeight/2+15);
    vertex(stars.x+160+stars.starsWidth*3/4,stars.y+stars.starsHeight/4+15);
    vertex(stars.x+160+stars.starsWidth,stars.y+15);
    vertex(stars.x+160+stars.starsWidth*3/4,stars.y-stars.starsHeight/4+15);
    vertex(stars.x+160+stars.starsWidth/2,stars.y-stars.starsHeight/2+15);
    vertex(stars.x+160+stars.starsWidth/4,stars.y-stars.starsHeight/4+15);
    endShape();
    
    beginShape();
    vertex(stars.x+240,stars.y);
    vertex(stars.x+240+stars.starsWidth/4,stars.y+stars.starsHeight/4);
    vertex(stars.x+240+stars.starsWidth/2,stars.y+stars.starsHeight/2);
    vertex(stars.x+240+stars.starsWidth*3/4,stars.y+stars.starsHeight/4);
    vertex(stars.x+240+stars.starsWidth,stars.y);
    vertex(stars.x+240+stars.starsWidth*3/4,stars.y-stars.starsHeight/4);
    vertex(stars.x+240+stars.starsWidth/2,stars.y-stars.starsHeight/2);
    vertex(stars.x+240+stars.starsWidth/4,stars.y-stars.starsHeight/4);
    endShape();
    
    beginShape();
    vertex(stars.x+320,stars.y-50);
    vertex(stars.x+320+stars.starsWidth/4,stars.y+stars.starsHeight/4-50);
    vertex(stars.x+320+stars.starsWidth/2,stars.y+stars.starsHeight/2-50);
    vertex(stars.x+320+stars.starsWidth*3/4,stars.y+stars.starsHeight/4-50);
    vertex(stars.x+320+stars.starsWidth,stars.y-50);
    vertex(stars.x+320+stars.starsWidth*3/4,stars.y-stars.starsHeight/4-50);
    vertex(stars.x+320+stars.starsWidth/2,stars.y-stars.starsHeight/2-50);
    vertex(stars.x+320+stars.starsWidth/4,stars.y-stars.starsHeight/4-50);
    endShape();
    
}