/*

The Game Project

2 - Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

IMPORTANT: For each box the variables gameChar_x & gameChar_y are set to the bottom
center of the box. You must combine these variables with arithmetic to
determine the position of each shape that you draw. This will later allow
you to adjust the position of your game character.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it lacks detail and you didn't use gameChar_x and gameChar_y correctly
2 marks = you've used a selction of shape functions and made consistent use of gameChar_x and gameChar_y

WARNING: Do not get too carried away. If you're character takes more than 5 lines
of code to draw then you've probably over done it.

** Only submit your sketch.js **

*/

var gameChar_x = 0;
var gameChar_y = 0;
var char

function setup()
{
	createCanvas(400, 600);
    char = {col_skin: [210, 180, 140],
            col_cloth_1:[0, 0, 255],
            col_cloth_2:[255, 255, 255],
            col_accessories:[255, 204, 0]};
}

function draw()
{
	background(255);

	//Standing, facing frontwards

	stroke(100);
	noFill();
	rect(20, 60, 50, 80);
	noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;
	
    
    //Add your code here ...
    
    //--------------------------STAND_FRONT_START----------------------------
    
    //!---------STAND_FRONT_TORSO----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 52);
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x + 7, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 52);
        vertex(gameChar_x + 10, gameChar_y - 57); 
    endShape(CLOSE); 
    pop();
    
    
    
    //!--------STAND_FRONT_HANDS---------
    
    //----------STAND_FRONT_LeftHand----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 37);
        vertex(gameChar_x - 10 - 1.5, gameChar_y - 37 + 2.5);
        vertex(gameChar_x - 10, gameChar_y - 37 + 5);
        vertex(gameChar_x - 10 - 1, gameChar_y - 27);
        vertex(gameChar_x - 15 + 1, gameChar_y - 27);
        vertex(gameChar_x - 15, gameChar_y - 37 + 5);
        vertex(gameChar_x - 15 - 1.5, gameChar_y - 37 + 5);
        vertex(gameChar_x - 15 + 2, gameChar_y - 37 + 2.5);
        vertex(gameChar_x - 15, gameChar_y - 37);
        vertex(gameChar_x - 15, gameChar_y - 52);
    endShape(CLOSE);
    
    //----------STAND_FRONT_RightHand----------
    
    beginShape();
        vertex(gameChar_x + 10, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 37);
        vertex(gameChar_x + 10 + 1.5, gameChar_y - 37 + 2.5);
        vertex(gameChar_x + 10, gameChar_y - 37 + 5);
        vertex(gameChar_x + 10 + 1, gameChar_y - 27);
        vertex(gameChar_x + 15 - 1, gameChar_y - 27);
        vertex(gameChar_x + 15, gameChar_y - 37 + 5);
        vertex(gameChar_x + 15 + 1.5, gameChar_y - 37 + 5);
        vertex(gameChar_x + 15 - 2, gameChar_y - 37 + 2.5);
        vertex(gameChar_x + 15, gameChar_y - 37);
        vertex(gameChar_x + 15, gameChar_y - 52);
    endShape(CLOSE);
    
    pop();
    
    
    
    //!---------STAND_FRONT_LEGS----------
    
    //----------STAND_FRONT_LeftThigh----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 5, gameChar_y - 32);
        vertex(gameChar_x - 10, gameChar_y - 12);
        vertex(gameChar_x - 5, gameChar_y - 17);
        vertex(gameChar_x, gameChar_y - 32);
    endShape(CLOSE);
    
    //----------STAND_FRONT_LeftShin----------
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 17);
        vertex(gameChar_x - 10 + 5, gameChar_y - 17 + 5);
        vertex(gameChar_x - 10 + 1.5, gameChar_y);
        vertex(gameChar_x - 10, gameChar_y);
    endShape(CLOSE);
    
    //----------STAND_FRONT_LeftFeet----------
    
    rect(gameChar_x - 10 - 7, gameChar_y, 10,3);
    
    //----------STAND_FRONT_RightThigh----------
    
    beginShape();
        vertex(gameChar_x + 5, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 12);
        vertex(gameChar_x + 5, gameChar_y - 17);
        vertex(gameChar_x, gameChar_y - 32);
    endShape(CLOSE);
    
    //----------STAND_FRONT_RightShin----------
    
    beginShape();
        vertex(gameChar_x + 10, gameChar_y - 17);
        vertex(gameChar_x + 10 - 5, gameChar_y - 17 + 5);
        vertex(gameChar_x + 10 - 1.5, gameChar_y);
        vertex(gameChar_x + 10, gameChar_y);
    endShape(CLOSE);
    
    //----------STAND_FRONT_RightFeet----------
    
    rect(gameChar_x + 10 - 3, gameChar_y, 10,3);
    
    pop();
    
    
    
    //!---------STAND_FRONT_CLOTHES----------
    
    //----------STAND_FRONT_Chestpiece----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_2);
    triangle(gameChar_x - 15, gameChar_y - 57,
                gameChar_x + 15, gameChar_y - 57,
                    gameChar_x, gameChar_y - 42);
    
    strokeWeight(1);
    stroke('Black');
    beginShape();
        vertex(gameChar_x - 3, gameChar_y - 53);
        vertex(gameChar_x + 3, gameChar_y - 53);
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x - 4, gameChar_y - 50);
        vertex(gameChar_x + 4, gameChar_y - 50);
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x, gameChar_y - 45)
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x - 3, gameChar_y - 53);
    endShape();
    
    pop();
    
    //----------STAND_FRONT_Skirt----------
    
    push()
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_1);
    
    beginShape();
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x - 10, gameChar_y - 17);
        vertex(gameChar_x, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 17);
        vertex(gameChar_x + 7, gameChar_y - 32);
    endShape();
    
    fill(char.col_cloth_2);
    triangle(gameChar_x - 10, gameChar_y - 17,
                gameChar_x, gameChar_y - 32,
                    gameChar_x + 10, gameChar_y - 17);
    
    pop();
    
    //----------STAND_FRONT_Belt-----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    pop();
    
    
    
    //!---------STAND_FRONT_HEAD----------
    
    //----------STAND_FRONT_Headress---------- 
    
    push();
    fill(char.col_cloth_1);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 5, gameChar_y - 72);
        vertex(gameChar_x - 10, gameChar_y - 67);
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10 + 2, gameChar_y - 52);
        vertex(gameChar_x - 5 + 1, gameChar_y - 52);
        vertex(gameChar_x - 5 + 1, gameChar_y - 57);
        vertex(gameChar_x - 5 + 1, gameChar_y - 67);
        vertex(gameChar_x - 5 + 1 - 1, gameChar_y - 67 - 2);
        vertex(gameChar_x + 5 - 1 + 1, gameChar_y - 67 - 2);
        vertex(gameChar_x + 5 - 1, gameChar_y - 67);
        vertex(gameChar_x + 5 - 1, gameChar_y - 57);
        vertex(gameChar_x + 5 - 1, gameChar_y - 52);
        vertex(gameChar_x + 10 - 2, gameChar_y - 52);
        vertex(gameChar_x + 10, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 72);
    endShape(CLOSE);
    pop();
    
    push();
    stroke(char.col_accessories);
    strokeWeight(1);
    line(gameChar_x - 10, gameChar_y - 67, 
            gameChar_x - 5, gameChar_y - 67);
    line(gameChar_x - 10, gameChar_y - 67 + 2.5, 
            gameChar_x - 5, gameChar_y - 67 + 2.5);
    line(gameChar_x - 10, gameChar_y - 67 + 5, 
            gameChar_x - 5, gameChar_y - 67 + 5);
    line(gameChar_x - 10, gameChar_y - 67 + 7.5, 
            gameChar_x - 5, gameChar_y - 67 + 7.5);
    line(gameChar_x - 10, gameChar_y - 67 + 10, 
            gameChar_x - 5, gameChar_y - 67 + 10);
    
    line(gameChar_x + 10 - 1, gameChar_y - 67, 
            gameChar_x + 5 - 1, gameChar_y - 67);
    line(gameChar_x + 10 - 1, gameChar_y - 67 + 2.5, 
            gameChar_x + 5 - 1, gameChar_y - 67 + 2.5);
    line(gameChar_x + 10 - 1, gameChar_y - 67 + 5, 
            gameChar_x + 5 - 1, gameChar_y - 67 + 5);
    line(gameChar_x + 10 - 1, gameChar_y - 67 + 7.5, 
            gameChar_x + 5 - 1, gameChar_y - 67 + 7.5);
    line(gameChar_x + 10 - 1, gameChar_y - 67 + 10, 
            gameChar_x + 5 - 1, gameChar_y - 67 + 10);
    pop();
    
    //----------STAND_FRONT_Backside (darker tone)----------
    
    fill(char.col_cloth_1);
    strokeWeight(1);
    beginShape();
        vertex(gameChar_x - 5 + 1, gameChar_y - 57);
        vertex(gameChar_x - 5 + 1, gameChar_y - 62);
        vertex(gameChar_x, gameChar_y - 57);
        vertex(gameChar_x + 5 - 1, gameChar_y - 62);
        vertex(gameChar_x + 5 - 1, gameChar_y - 57); 
    endShape(CLOSE);
    
    //----------STAND_FRONT_Crown----------
    
    push()
    fill(char.col_accessories);
    stroke(0);
    strokeWeight(0.5);
    
    beginShape();
        vertex(gameChar_x - 5 + 1 - 1, gameChar_y - 67 - 2);
        vertex(gameChar_x - 5 + 1, gameChar_y - 67);
        vertex(gameChar_x + 5 - 1, gameChar_y - 67);
        vertex(gameChar_x + 5 - 1 + 1, gameChar_y - 67 - 2);
    endShape(CLOSE);
    
    //----------STAND_FRONT_Emblem----------
    
    rect(gameChar_x - 1,
         gameChar_y - 67 - 2 - 2,
         2,
         3);
    

    
    //----------STAND_FRONT_Face----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(0.5);
    
    beginShape();
        vertex(gameChar_x - 5 + 1,
               gameChar_y - 67);
        vertex(gameChar_x - 5 + 1,
               gameChar_y - 62);
        vertex(gameChar_x,
               gameChar_y - 57);
        vertex(gameChar_x + 5 - 1,
               gameChar_y - 62);
        vertex(gameChar_x + 5 - 1,
               gameChar_y - 67);
    endShape(CLOSE);
    
    //----------STAND_FRONT_Eyes----------
    
    line(gameChar_x - 3,
         gameChar_y - 67 + 2.5,
         gameChar_x - 1,
         gameChar_y - 67 + 2.5);
    line(gameChar_x + 3,
         gameChar_y - 67 + 2.5,
         gameChar_x,
         gameChar_y - 67 + 2.5); 
    
    //----------STAND_FRONT_Nouse + Mouth----------
    
    line(gameChar_x,
         gameChar_y - 67 + 2.5, 
         gameChar_x,
         gameChar_y - 62);
    line(gameChar_x - 1,
         gameChar_y - 60,
         gameChar_x + 1,
         gameChar_y - 60);

    //----------STAND_FRONT_Beard----------
    
    strokeWeight(0.5);
    line(gameChar_x, gameChar_y - 58,
            gameChar_x, gameChar_y - 56);

    
    
    //--------------------------STAND_FRONT_END------------------------------
    
	//Jumping facing forwards
	stroke(100);
	noFill();
	rect(220, 60, 50, 80);
	noStroke();
	fill(0);
	text("2. jumping facing forwards", 220, 160);

	gameChar_x = 245;
	gameChar_y = 137;
	//Add your code here ...
    
    //--------------------------JUMP_FRONT_START-----------------------------

    //!---------JUMP_FRONT_TORSO----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 52);
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x + 7, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 52);
        vertex(gameChar_x + 10, gameChar_y - 57); 
    endShape(CLOSE); 
    pop();
    
    
    
    //!--------JUMP_FRONT_HANDS---------
    
    //----------JUMP_FRONT_LeftHand----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 50);
        vertex(gameChar_x - 21, gameChar_y - 62);
        vertex(gameChar_x - 16, gameChar_y - 72);
        vertex(gameChar_x - 18, gameChar_y - 75);
        vertex(gameChar_x - 16, gameChar_y - 74);
        vertex(gameChar_x - 14, gameChar_y - 73);
        vertex(gameChar_x - 15, gameChar_y - 72);
        vertex(gameChar_x - 16, gameChar_y - 62);
    endShape(CLOSE);
    
    //----------JUMP_FRONT_RightHand----------
    
    beginShape();
        vertex(gameChar_x + 10, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 50);
        vertex(gameChar_x + 21, gameChar_y - 62);
        vertex(gameChar_x + 16, gameChar_y - 72);
        vertex(gameChar_x + 18, gameChar_y - 75);
        vertex(gameChar_x + 16, gameChar_y - 74);
        vertex(gameChar_x + 14, gameChar_y - 73);
        vertex(gameChar_x + 15, gameChar_y - 72);
        vertex(gameChar_x + 16, gameChar_y - 62);
    endShape(CLOSE);
    
    pop();
    
    
    
    //!---------JUMP_FRONT_LEGS----------
    
    //----------JUMP_FRONT_LeftThigh----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 5, gameChar_y - 32);
        vertex(gameChar_x - 20, gameChar_y - 22);
        vertex(gameChar_x - 13, gameChar_y - 22);
        vertex(gameChar_x, gameChar_y - 32);
    endShape(CLOSE);
    
    //----------JUMP_FRONT_LeftShin----------
    
    beginShape();
        vertex(gameChar_x - 20, gameChar_y - 22);
        vertex(gameChar_x - 10, gameChar_y - 12);
        vertex(gameChar_x - 15, gameChar_y - 7);
        vertex(gameChar_x - 5, gameChar_y - 10);
        vertex(gameChar_x - 13, gameChar_y - 22);
    endShape(CLOSE);
    
    //----------JUMP_FRONT_LeftFeet----------
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 12);
        vertex(gameChar_x - 15, gameChar_y - 7);
        vertex(gameChar_x - 5, gameChar_y - 10);
    endShape(CLOSE);
    
    //----------JUMP_FRONT_RightThigh----------
       
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x + 5, gameChar_y - 32);
        vertex(gameChar_x + 20, gameChar_y - 22);
        vertex(gameChar_x + 13, gameChar_y - 22);
        vertex(gameChar_x, gameChar_y - 32);
    endShape(CLOSE);
    
    //----------JUMP_FRONT_LeftShin----------
    
    beginShape();
        vertex(gameChar_x + 20, gameChar_y - 22);
        vertex(gameChar_x + 10, gameChar_y - 12);
        vertex(gameChar_x + 15, gameChar_y - 7);
        vertex(gameChar_x + 5, gameChar_y - 10);
        vertex(gameChar_x + 13, gameChar_y - 22);
    endShape(CLOSE);
    
    //----------JUMP_FRONT_LeftFeet----------
    
    beginShape();
        vertex(gameChar_x + 10, gameChar_y - 12);
        vertex(gameChar_x + 15, gameChar_y - 7);
        vertex(gameChar_x + 5, gameChar_y - 10);
    endShape(CLOSE);
    
    pop();
    
    
    
    //!---------JUMP_FRONT_CLOTHES----------
    
    //----------JUMP_FRONT_Chestpiece----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_2);

    beginShape();
        vertex(gameChar_x - 15, gameChar_y - 62);
        vertex(gameChar_x, gameChar_y - 45);
        vertex(gameChar_x + 15, gameChar_y - 62);
    endShape(CLOSE);
    
    strokeWeight(1);
    stroke('Black');
    beginShape();
        vertex(gameChar_x - 3, gameChar_y - 53 - 2);
        vertex(gameChar_x + 3, gameChar_y - 53 - 2);
        vertex(gameChar_x, gameChar_y - 50 - 2);
        vertex(gameChar_x - 3, gameChar_y - 50 - 2);
        vertex(gameChar_x + 3, gameChar_y - 50 - 2);
        vertex(gameChar_x, gameChar_y - 50 - 2);
        vertex(gameChar_x, gameChar_y - 45 - 4)
        vertex(gameChar_x, gameChar_y - 50 - 2);
        vertex(gameChar_x - 3, gameChar_y - 53 - 2);
    endShape();
    
    pop();
    
    //----------JUMP_FRONT_Skirt----------
    
    push()
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_1);
    
    beginShape();
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x - 20, gameChar_y - 25);
        vertex(gameChar_x - 10, gameChar_y - 25);
        vertex(gameChar_x, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 25);
        vertex(gameChar_x + 20, gameChar_y - 25);
        vertex(gameChar_x + 7, gameChar_y - 32);
    endShape();
    
    fill(char.col_cloth_2);
    triangle(gameChar_x - 10, gameChar_y - 25,
                gameChar_x, gameChar_y - 32,
                    gameChar_x + 10, gameChar_y - 25);
    
    pop();
    
    //----------JUMP_FRONT_Belt-----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    pop();
    
    
    
    //!---------JUMP_FRONT_HEAD----------
    
    //----------JUMP_FRONT_Headress---------- 
    
    push();
    fill(char.col_cloth_1);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 5, gameChar_y - 72);
        vertex(gameChar_x - 10, gameChar_y - 67);
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10 + 2, gameChar_y - 52);
        vertex(gameChar_x - 5 + 1, gameChar_y - 52);
        vertex(gameChar_x - 5 + 1, gameChar_y - 57);
        vertex(gameChar_x - 5 + 1, gameChar_y - 67);
        vertex(gameChar_x - 5 + 1 - 1, gameChar_y - 67 - 2);
        vertex(gameChar_x + 5 - 1 + 1, gameChar_y - 67 - 2);
        vertex(gameChar_x + 5 - 1, gameChar_y - 67);
        vertex(gameChar_x + 5 - 1, gameChar_y - 57);
        vertex(gameChar_x + 5 - 1, gameChar_y - 52);
        vertex(gameChar_x + 10 - 2, gameChar_y - 52);
        vertex(gameChar_x + 10, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 72);
    endShape(CLOSE);
    pop();
    
    push();
    stroke(char.col_accessories);
    strokeWeight(1);
    line(gameChar_x - 10, gameChar_y - 67, 
            gameChar_x - 5, gameChar_y - 67);
    line(gameChar_x - 10, gameChar_y - 67 + 2.5, 
            gameChar_x - 5, gameChar_y - 67 + 2.5);
    line(gameChar_x - 10, gameChar_y - 67 + 5, 
            gameChar_x - 5, gameChar_y - 67 + 5);
    line(gameChar_x - 10, gameChar_y - 67 + 7.5, 
            gameChar_x - 5, gameChar_y - 67 + 7.5);
    line(gameChar_x - 10, gameChar_y - 67 + 10, 
            gameChar_x - 5, gameChar_y - 67 + 10);
    
    line(gameChar_x + 10 - 1, gameChar_y - 67, 
            gameChar_x + 5 - 1, gameChar_y - 67);
    line(gameChar_x + 10 - 1, gameChar_y - 67 + 2.5, 
            gameChar_x + 5 - 1, gameChar_y - 67 + 2.5);
    line(gameChar_x + 10 - 1, gameChar_y - 67 + 5, 
            gameChar_x + 5 - 1, gameChar_y - 67 + 5);
    line(gameChar_x + 10 - 1, gameChar_y - 67 + 7.5, 
            gameChar_x + 5 - 1, gameChar_y - 67 + 7.5);
    line(gameChar_x + 10 - 1, gameChar_y - 67 + 10, 
            gameChar_x + 5 - 1, gameChar_y - 67 + 10);
    pop();
    
    //----------JUMP_FRONT_Backside (darker tone)----------
    
    fill(char.col_cloth_1);
    strokeWeight(1);
    beginShape();
        vertex(gameChar_x - 5 + 1, gameChar_y - 57);
        vertex(gameChar_x - 5 + 1, gameChar_y - 62);
        vertex(gameChar_x, gameChar_y - 57);
        vertex(gameChar_x + 5 - 1, gameChar_y - 62);
        vertex(gameChar_x + 5 - 1, gameChar_y - 57); 
    endShape(CLOSE);
    
    //----------JUMP_FRONT_Crown----------
    
    push()
    fill(char.col_accessories);
    stroke(0);
    strokeWeight(0.5);
    
    beginShape();
        vertex(gameChar_x - 5 + 1 - 1, gameChar_y - 67 - 2);
        vertex(gameChar_x - 5 + 1, gameChar_y - 67);
        vertex(gameChar_x + 5 - 1, gameChar_y - 67);
        vertex(gameChar_x + 5 - 1 + 1, gameChar_y - 67 - 2);
    endShape(CLOSE);
    
    //----------JUMP_FRONT_Emblem----------
    
    rect(gameChar_x-1, gameChar_y - 67 - 2 - 2, 2, 3);
    

    
    //----------JUMP_FRONT_Face----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(0.5);
    
    beginShape();
        vertex(gameChar_x - 5 + 1, gameChar_y - 67);
        vertex(gameChar_x - 5 + 1, gameChar_y - 62);
        vertex(gameChar_x, gameChar_y - 57);
        vertex(gameChar_x + 5 - 1, gameChar_y - 62);
        vertex(gameChar_x + 5 - 1, gameChar_y - 67);
    endShape(CLOSE);
    
    //----------JUMP_FRONT_Eyes----------
    
    line(gameChar_x - 3, gameChar_y - 67 + 2.5, 
            gameChar_x - 1, gameChar_y - 67 + 2.5);
    
    line(gameChar_x - 2, gameChar_y - 67 + 2.5, 
            gameChar_x - 2, gameChar_y - 67 + 3);
    
    line(gameChar_x + 3, gameChar_y - 67 + 2.5, 
            gameChar_x, gameChar_y - 67 + 2.5);
    
    line(gameChar_x + 2, gameChar_y - 67 + 2.5, 
            gameChar_x + 2, gameChar_y - 67 + 3);
    
    
    //----------JUMP_FRONT_Nouse + Mouth----------
    
    line(gameChar_x, gameChar_y - 67 + 2.5, 
            gameChar_x, gameChar_y - 62);
    ellipse(gameChar_x, gameChar_y - 60, 3, 1);

    //----------JUMP_FRONT_Beard----------
    
    strokeWeight(0.5);
    line(gameChar_x, gameChar_y - 58,
            gameChar_x, gameChar_y - 56);

    
    
    //--------------------------JUMP_FRONT_END-------------------------------
    
	//Walking, turned left
	stroke(100);
	noFill();
	rect(20, 260, 50, 80);
	noStroke();
	fill(0);
	text("3. Walking left", 20, 360);

	gameChar_x = 45;
	gameChar_y = 337;
	//Add your code here ...

    //--------------------------WALKNG_LEFT_START----------------------------
    
    //!---------WALKING_LEFT_TORSO----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 52);
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x + 7, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 52);
        vertex(gameChar_x + 10, gameChar_y - 57); 
    endShape(CLOSE); 
    pop();
    
    
    
    //!--------WALKING_LEFT_HANDS---------
    
    //----------WALKING_LEFT_LeftHand----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 52);
        vertex(gameChar_x - 25, gameChar_y - 52);
        vertex(gameChar_x - 20, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x - 15, gameChar_y - 67);
        vertex(gameChar_x - 20, gameChar_y - 52);
        vertex(gameChar_x - 25, gameChar_y - 52);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x - 15, gameChar_y - 67);
        vertex(gameChar_x - 24, gameChar_y - 67);
        vertex(gameChar_x - 24, gameChar_y - 68);
        vertex(gameChar_x - 15, gameChar_y - 68);
    endShape(CLOSE);
    
    //----------WALKING_LEFT_RightHand----------
    
    beginShape();
        vertex(gameChar_x + 10, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 52);
        vertex(gameChar_x + 20, gameChar_y - 52);
        vertex(gameChar_x + 25, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x + 20, gameChar_y - 57);
        vertex(gameChar_x + 15, gameChar_y - 43);
        vertex(gameChar_x + 25, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x + 15, gameChar_y - 42);
        vertex(gameChar_x + 24, gameChar_y - 42);
        vertex(gameChar_x + 24, gameChar_y - 43);
        vertex(gameChar_x + 15, gameChar_y - 43);
    endShape(CLOSE);
    
    pop();
    
    
    
    //!---------WALKING_LEFT_LEGS----------
    
    //----------WALKING_LEFT_LeftThigh----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x - 15, gameChar_y - 12);
        vertex(gameChar_x, gameChar_y - 32);
    endShape(CLOSE);
    
    //----------WALKING_LEFT_LeftShin----------
    
    beginShape();
        vertex(gameChar_x - 15, gameChar_y - 17);
        vertex(gameChar_x - 15, gameChar_y + 2);
        vertex(gameChar_x - 10, gameChar_y - 17);
    endShape(CLOSE);
    
    //----------WALKING_LEFT_LeftFeet----------
    
    beginShape();
        vertex(gameChar_x - 23, gameChar_y);
        vertex(gameChar_x - 23, gameChar_y + 3);
        vertex(gameChar_x - 13, gameChar_y + 3);
        vertex(gameChar_x - 13, gameChar_y);
    endShape(CLOSE);
    
    //----------WALKING_LEFT_RightThigh----------
    
    beginShape();
        vertex(gameChar_x, gameChar_y - 32);
        vertex(gameChar_x, gameChar_y - 12);
        vertex(gameChar_x + 7, gameChar_y - 32);
    endShape(CLOSE);
    
    //----------WALKING_LEFT_RightShin----------
    
    beginShape();
        vertex(gameChar_x, gameChar_y - 17);
        vertex(gameChar_x, gameChar_y - 12);
        vertex(gameChar_x + 15, gameChar_y + 2);
        vertex(gameChar_x + 5, gameChar_y - 17);
    endShape(CLOSE);
    
    //----------WALKING_LEFT_RightFeet----------
    
    rect(gameChar_x + 10 - 3, gameChar_y, 10,3);
    
    pop();
    
    
    
    //!---------WALKING_LEFT_CLOTHES----------
    
    //----------WALKING_LEFT_Chestpiece----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_2);
    triangle(gameChar_x - 15, gameChar_y - 57,
                gameChar_x + 15, gameChar_y - 57,
                    gameChar_x, gameChar_y - 42);
    
    strokeWeight(1);
    stroke('Black');
    beginShape();
        vertex(gameChar_x - 3, gameChar_y - 53);
        vertex(gameChar_x + 3, gameChar_y - 53);
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x - 4, gameChar_y - 50);
        vertex(gameChar_x + 4, gameChar_y - 50);
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x, gameChar_y - 45)
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x - 3, gameChar_y - 53);
    endShape();
    
    pop();
    
    //----------WALKING_LEFT_Skirt----------
    
    push()
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_1);
    
    beginShape();
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x - 15, gameChar_y - 17);
        vertex(gameChar_x, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 17);
        vertex(gameChar_x + 7, gameChar_y - 32);
    endShape();
    
    fill(char.col_cloth_2);
    triangle(gameChar_x - 15, gameChar_y - 17,
                gameChar_x, gameChar_y - 32,
                    gameChar_x + 10, gameChar_y - 17);
    
    pop();
    
    //----------WALKING_LEFT_Belt-----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    pop();
    
    
    
    //!---------WALKING_LEFT_HEAD----------
    
    //----------WALKING_LEFT_Headress---------- 
    
    push();
    fill(char.col_cloth_1);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 5, gameChar_y - 72);
        vertex(gameChar_x - 5, gameChar_y - 54);
        vertex(gameChar_x + 5, gameChar_y - 54);
        vertex(gameChar_x + 5, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 72);
    endShape(CLOSE);
    pop();
    
    push();
    stroke(char.col_accessories);
    strokeWeight(1);
    line(gameChar_x - 5, gameChar_y - 67, 
            gameChar_x + 10 - 1, gameChar_y - 67);
    line(gameChar_x - 5, gameChar_y - 67 + 2.5, 
            gameChar_x + 10 - 1, gameChar_y - 67 + 2.5);
    line(gameChar_x - 5, gameChar_y - 67 + 5, 
            gameChar_x + 10 - 1, gameChar_y - 67 + 5);
    line(gameChar_x - 5, gameChar_y - 67 + 7.5, 
            gameChar_x + 10 - 1, gameChar_y - 67 + 7.5);
    line(gameChar_x - 5, gameChar_y - 67 + 10, 
            gameChar_x + 5 - 1, gameChar_y - 67 + 10);
    pop();
    

    //----------WALKING_LEFT_Emblem----------
    push()
    fill(char.col_accessories);
    stroke(0);
    strokeWeight(0.5);
        
    rect(gameChar_x - 5 - 2, gameChar_y - 67 - 2 - 2, 1, 3);
    
    //----------WALKING_LEFT_Crown----------
    
    beginShape();
        vertex(gameChar_x - 5 - 2, gameChar_y - 67 - 2);
        vertex(gameChar_x - 5 - 1, gameChar_y - 67);
        vertex(gameChar_x - 5, gameChar_y - 67);
        vertex(gameChar_x - 5, gameChar_y - 67 - 2);
    endShape(CLOSE);
    


    //----------WALKING_LEFT_Face----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(0.5);
    
    beginShape();
        vertex(gameChar_x - 5 , gameChar_y - 67);
        bezierVertex(gameChar_x - 5 - 3, gameChar_y - 67,
                        gameChar_x - 5 - 3, gameChar_y - 57,
                            gameChar_x - 5 - 3, gameChar_y - 62);
        bezierVertex(gameChar_x - 5 - 3, gameChar_y - 67,
                        gameChar_x - 5 - 3, gameChar_y - 57,
                            gameChar_x - 5 - 3, gameChar_y - 60);
        vertex(gameChar_x - 5, gameChar_y - 57);

    endShape(CLOSE);
    
    //----------WALKING_LEFT_Eyes----------
    
    line(gameChar_x - 5 -  2, gameChar_y - 67 + 2.5, 
            gameChar_x - 5 - 1, gameChar_y - 67 + 2.5);
    line(gameChar_x - 5 -  1, gameChar_y - 67 + 2.5, 
            gameChar_x - 5 - 1, gameChar_y - 67 + 3);
    
    //----------WALKING_LEFT_Nouse + Mouth----------
    
    line(gameChar_x - 5 - 3, gameChar_y - 60, 
            gameChar_x - 5 - 1, gameChar_y - 60);

    //----------WALKING_LEFT_Beard----------
    
    strokeWeight(0.5);
    line(gameChar_x - 5 - 2, gameChar_y - 60,
            gameChar_x - 5 - 2, gameChar_y - 56);

    
    
    //--------------------------WALKNG_LEFT_END------------------------------
    
	//Walking, turned right
	stroke(100);
	noFill();
	rect(220, 260, 50, 80);
	noStroke();
	fill(0);
	text("4. Walking right", 220, 360);

	gameChar_x = 245;
	gameChar_y = 337;
	//Add your code here ...

    //--------------------------WALKNG_RIGHT_START---------------------------
    
    //!---------WALKING_RIGHT_TORSO----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 52);
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x + 7, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 52);
        vertex(gameChar_x + 10, gameChar_y - 57); 
    endShape(CLOSE); 
    pop();
    
    
    
    //!--------WALKING_RIGHT_HANDS---------
    
    //----------WALKING_RIGHT_RightHand----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x + 10, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 52);
        vertex(gameChar_x + 25, gameChar_y - 52);
        vertex(gameChar_x + 20, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x + 15, gameChar_y - 67);
        vertex(gameChar_x + 20, gameChar_y - 52);
        vertex(gameChar_x + 25, gameChar_y - 52);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x + 15, gameChar_y - 67);
        vertex(gameChar_x + 24, gameChar_y - 67);
        vertex(gameChar_x + 24, gameChar_y - 68);
        vertex(gameChar_x + 15, gameChar_y - 68);
    endShape(CLOSE);
    
    //----------WALKING_RIGHT_LeftHand----------
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 52);
        vertex(gameChar_x - 20, gameChar_y - 52);
        vertex(gameChar_x - 25, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x - 20, gameChar_y - 57);
        vertex(gameChar_x - 15, gameChar_y - 43);
        vertex(gameChar_x - 25, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x - 15, gameChar_y - 42);
        vertex(gameChar_x - 24, gameChar_y - 42);
        vertex(gameChar_x - 24, gameChar_y - 43);
        vertex(gameChar_x - 15, gameChar_y - 43);
    endShape(CLOSE);
    
    pop();
    
    
    
    //!---------WALKING_RIGHT_LEGS----------
    
    //----------WALKING_RIGHT_RightThigh----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x + 7, gameChar_y - 32);
        vertex(gameChar_x + 15, gameChar_y - 12);
        vertex(gameChar_x, gameChar_y - 32);
    endShape(CLOSE);
    
    //----------WALKING_RIGHT_RightShin----------
    
    beginShape();
        vertex(gameChar_x + 15, gameChar_y - 17);
        vertex(gameChar_x + 15, gameChar_y + 2);
        vertex(gameChar_x + 10, gameChar_y - 17);
    endShape(CLOSE);
    
    //----------WALKING_RIGHT_RightFeet----------
    
    beginShape();
        vertex(gameChar_x + 23, gameChar_y);
        vertex(gameChar_x + 23, gameChar_y + 3);
        vertex(gameChar_x + 13, gameChar_y + 3);
        vertex(gameChar_x + 13, gameChar_y);
    endShape(CLOSE);
    
    //----------WALKING_RIGHT_LeftThigh----------
    
    beginShape();
        vertex(gameChar_x, gameChar_y - 32);
        vertex(gameChar_x, gameChar_y - 12);
        vertex(gameChar_x - 7, gameChar_y - 32);
    endShape(CLOSE);
    
    //----------WALKING_RIGHT_LeftShin----------
    
    beginShape();
        vertex(gameChar_x, gameChar_y - 17);
        vertex(gameChar_x, gameChar_y - 12);
        vertex(gameChar_x - 15, gameChar_y + 2);
        vertex(gameChar_x - 5, gameChar_y - 17);
    endShape(CLOSE);
    
    //----------WALKING_RIGHT_LeftFeet----------
    
    rect(gameChar_x - 20 + 3, gameChar_y, 10,3);
    
    pop();
    
    
    
    //!---------WALKING_RIGHT_CLOTHES----------
    
    //----------WALKING_RIGHT_Chestpiece----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_2);
    triangle(gameChar_x - 15, gameChar_y - 57,
                gameChar_x + 15, gameChar_y - 57,
                    gameChar_x, gameChar_y - 42);
    
    strokeWeight(1);
    stroke('Black');
    beginShape();
        vertex(gameChar_x - 3, gameChar_y - 53);
        vertex(gameChar_x + 3, gameChar_y - 53);
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x - 4, gameChar_y - 50);
        vertex(gameChar_x + 4, gameChar_y - 50);
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x, gameChar_y - 45)
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x - 3, gameChar_y - 53);
    endShape();
    
    pop();
    
    //----------WALKING_RIGHT_Skirt----------
    
    push()
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_1);
    
    beginShape();
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x - 10, gameChar_y - 17);
        vertex(gameChar_x, gameChar_y - 32);
        vertex(gameChar_x + 15, gameChar_y - 17);
        vertex(gameChar_x + 7, gameChar_y - 32);
    endShape();
    
    fill(char.col_cloth_2);
    triangle(gameChar_x - 10, gameChar_y - 17,
                gameChar_x, gameChar_y - 32,
                    gameChar_x + 15, gameChar_y - 17);
    
    pop();
    
    //----------WALKING_RIGHT_Belt-----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    pop();
    
    
    
    //!---------WALKING_RIGHT_HEAD----------
    
    //----------WALKING_RIGHT_Headress---------- 
    
    push();
    fill(char.col_cloth_1);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x + 5, gameChar_y - 72);
        vertex(gameChar_x + 5, gameChar_y - 54);
        vertex(gameChar_x - 5, gameChar_y - 54);
        vertex(gameChar_x - 5, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 67);
        vertex(gameChar_x - 5, gameChar_y - 72);
    endShape(CLOSE);
    pop();
    
    push();
    stroke(char.col_accessories);
    strokeWeight(1);
    line(gameChar_x + 5, gameChar_y - 67, 
            gameChar_x - 10 + 1, gameChar_y - 67);
    line(gameChar_x + 5, gameChar_y - 67 + 2.5, 
            gameChar_x - 10 + 1, gameChar_y - 67 + 2.5);
    line(gameChar_x + 5, gameChar_y - 67 + 5, 
            gameChar_x - 10 + 1, gameChar_y - 67 + 5);
    line(gameChar_x + 5, gameChar_y - 67 + 7.5, 
            gameChar_x - 10 + 1, gameChar_y - 67 + 7.5);
    line(gameChar_x + 4, gameChar_y - 67 + 10, 
            gameChar_x - 5, gameChar_y - 67 + 10);
    pop();
    

    //----------WALKING_RIGHT_Emblem----------
    push()
    fill(char.col_accessories);
    stroke(0);
    strokeWeight(0.5);
        
    rect(gameChar_x + 5 + 1, gameChar_y - 67 - 2 - 2, 1, 3);
    
    //----------WALKING_RIGHT_Crown----------
    
    beginShape();
        vertex(gameChar_x + 5 + 2, gameChar_y - 67 - 2);
        vertex(gameChar_x + 5 + 1, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 67 - 2);
    endShape(CLOSE);
    


    //----------WALKING_RIGHT_Face----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(0.5);
    
    beginShape();
        vertex(gameChar_x + 5 , gameChar_y - 67);
        bezierVertex(gameChar_x + 5 + 3, gameChar_y - 67,
                        gameChar_x + 5 + 3, gameChar_y - 57,
                            gameChar_x + 5 + 3, gameChar_y - 62);
        bezierVertex(gameChar_x + 5 + 3, gameChar_y - 67,
                        gameChar_x + 5 + 3, gameChar_y - 57,
                            gameChar_x + 5 + 3, gameChar_y - 60);
        vertex(gameChar_x + 5, gameChar_y - 57);

    endShape(CLOSE);
    
    //----------WALKING_RIGHT_Eyes----------
    
    line(gameChar_x + 5 +  2, gameChar_y - 67 + 2.5, 
            gameChar_x + 5 + 1, gameChar_y - 67 + 2.5);
    line(gameChar_x + 5 +  1, gameChar_y - 67 + 2.5, 
            gameChar_x + 5 + 1, gameChar_y - 67 + 3);
    
    //----------WALKING_RIGHT_Nouse + Mouth----------
    
    line(gameChar_x + 5 + 3, gameChar_y - 60, 
            gameChar_x + 5 + 1, gameChar_y - 60);

    //----------WALKING_RIGHT_Beard----------
    
    strokeWeight(0.5);
    line(gameChar_x + 5 + 2, gameChar_y - 60,
            gameChar_x + 5 + 2, gameChar_y - 56);

    
    
    //--------------------------WALKNG_RIGHT_END-----------------------------
    
	//Jumping right
	stroke(100);
	noFill();
	rect(20, 460, 50, 80);
	noStroke();
	fill(0);
	text("5. Jumping to the right", 20, 560);

	gameChar_x = 45;
	gameChar_y = 537;
	//Add your code here ...

    //--------------------------JUMPING_RIGHT_START--------------------------
    
    //!---------JUMPING_RIGHT_TORSO----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 52);
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x + 7, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 52);
        vertex(gameChar_x + 10, gameChar_y - 57); 
    endShape(CLOSE); 
    pop();
    
    
    
    //!--------JUMPING_RIGHT_HANDS---------
    
    //----------JUMPING_RIGHT_RightHand----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x + 10, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 52);
        vertex(gameChar_x + 20, gameChar_y - 52);
        vertex(gameChar_x + 15, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x + 20, gameChar_y - 72);
        vertex(gameChar_x + 15, gameChar_y - 57);
        vertex(gameChar_x + 20, gameChar_y - 52);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x + 17, gameChar_y - 74);
        vertex(gameChar_x + 20, gameChar_y - 72);
        vertex(gameChar_x + 24, gameChar_y - 77);
    endShape(CLOSE);
    
    //----------JUMPING_RIGHT_LeftHand----------
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 52);
        vertex(gameChar_x - 20, gameChar_y - 52);
        vertex(gameChar_x - 25, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x - 20, gameChar_y - 57);
        vertex(gameChar_x - 15, gameChar_y - 43);
        vertex(gameChar_x - 25, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x - 15, gameChar_y - 42);
        vertex(gameChar_x - 24, gameChar_y - 42);
        vertex(gameChar_x - 24, gameChar_y - 43);
        vertex(gameChar_x - 15, gameChar_y - 43);
    endShape(CLOSE);
    
    pop();
    
    
    
    //!---------JUMPING_RIGHT_LEGS----------
    
    //----------JUMPING_RIGHT_RightThigh----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x, gameChar_y - 25);
        vertex(gameChar_x + 24, gameChar_y - 10);
        vertex(gameChar_x + 7, gameChar_y - 32);
    endShape(CLOSE);
    
    
    //----------JUMPING_RIGHT_RightFeet----------
    
    beginShape();
        vertex(gameChar_x + 22, gameChar_y - 8);
        vertex(gameChar_x + 24, gameChar_y - 8);
        vertex(gameChar_x + 24, gameChar_y - 18);
        vertex(gameChar_x + 22, gameChar_y - 18);
    endShape(CLOSE);
    
    //----------JUMPING_RIGHT_LeftThigh----------
    
    beginShape();
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x - 10, gameChar_y - 12);
        vertex(gameChar_x + 5, gameChar_y - 32);
    endShape(CLOSE);
    
    //----------JUMPING_RIGHT_LeftShin----------
    
    beginShape();
        vertex(gameChar_x - 5, gameChar_y - 17);
        vertex(gameChar_x - 24, gameChar_y - 7);
        vertex(gameChar_x - 5, gameChar_y - 10);
    endShape(CLOSE);
    
    //----------JUMPING_RIGHT_LeftFeet----------
    
    beginShape();
        vertex(gameChar_x - 24, gameChar_y - 10);
        vertex(gameChar_x - 24, gameChar_y);
        vertex(gameChar_x - 21, gameChar_y);
        vertex(gameChar_x - 21, gameChar_y - 10);
    endShape(CLOSE);
    
    pop();
    
    
    
    //!---------JUMPING_RIGHT_CLOTHES----------
    
    //----------JUMPING_RIGHT_Chestpiece----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_2);
    triangle(gameChar_x - 15, gameChar_y - 57,
                gameChar_x + 15, gameChar_y - 57,
                    gameChar_x, gameChar_y - 42);
    
    strokeWeight(1);
    stroke('Black');
    beginShape();
        vertex(gameChar_x - 3, gameChar_y - 53);
        vertex(gameChar_x + 3, gameChar_y - 53);
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x - 4, gameChar_y - 50);
        vertex(gameChar_x + 4, gameChar_y - 50);
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x, gameChar_y - 45)
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x - 3, gameChar_y - 53);
    endShape();
    
    pop();
    
    //----------JUMPING_RIGHT_Skirt----------
    
    push()
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_1);
    
    beginShape();
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x - 10, gameChar_y - 23);
        vertex(gameChar_x, gameChar_y - 32);
        vertex(gameChar_x + 15, gameChar_y - 23);
        vertex(gameChar_x + 7, gameChar_y - 32);
    endShape();
    
    fill(char.col_cloth_2);
    triangle(gameChar_x - 10, gameChar_y - 22,
                gameChar_x, gameChar_y - 32,
                    gameChar_x + 15, gameChar_y - 23);
    
    pop();
    
    //----------JUMPING_RIGHT_Belt-----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    pop();
    
    
    
    //!---------JUMPING_RIGHT_HEAD----------
    
    //----------JUMPING_RIGHT_Headress---------- 
    
    push();
    fill(char.col_cloth_1);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x + 5, gameChar_y - 72);
        vertex(gameChar_x + 5, gameChar_y - 54);
        vertex(gameChar_x - 5, gameChar_y - 54);
        vertex(gameChar_x - 5, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 67);
        vertex(gameChar_x - 5, gameChar_y - 72);
    endShape(CLOSE);
    pop();
    
    push();
    stroke(char.col_accessories);
    strokeWeight(1);
    line(gameChar_x + 5, gameChar_y - 67, 
            gameChar_x - 10 + 1, gameChar_y - 67);
    line(gameChar_x + 5, gameChar_y - 67 + 2.5, 
            gameChar_x - 10 + 1, gameChar_y - 67 + 2.5);
    line(gameChar_x + 5, gameChar_y - 67 + 5, 
            gameChar_x - 10 + 1, gameChar_y - 67 + 5);
    line(gameChar_x + 5, gameChar_y - 67 + 7.5, 
            gameChar_x - 10 + 1, gameChar_y - 67 + 7.5);
    line(gameChar_x + 4, gameChar_y - 67 + 10, 
            gameChar_x - 5, gameChar_y - 67 + 10);
    pop();
    

    //----------JUMPING_RIGHT_Emblem----------
    push()
    fill(char.col_accessories);
    stroke(0);
    strokeWeight(0.5);
        
    rect(gameChar_x + 5 + 1, gameChar_y - 67 - 2 - 2, 1, 3);
    
    //----------JUMPING_RIGHT_Crown----------
    
    beginShape();
        vertex(gameChar_x + 5 + 2, gameChar_y - 67 - 2);
        vertex(gameChar_x + 5 + 1, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 67 - 2);
    endShape(CLOSE);
    


    //----------JUMPING_RIGHT_Face----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(0.5);
    
    beginShape();
        vertex(gameChar_x + 5 , gameChar_y - 67);
        bezierVertex(gameChar_x + 5 + 3, gameChar_y - 67,
                        gameChar_x + 5 + 3, gameChar_y - 57,
                            gameChar_x + 5 + 3, gameChar_y - 62);
        bezierVertex(gameChar_x + 5 + 3, gameChar_y - 67,
                        gameChar_x + 5 + 3, gameChar_y - 57,
                            gameChar_x + 5 + 3, gameChar_y - 60);
        vertex(gameChar_x + 5, gameChar_y - 57);

    endShape(CLOSE);
    
    //----------JUMPING_RIGHT_Eyes----------
    
    line(gameChar_x + 5 +  2, gameChar_y - 67 + 2.5, 
            gameChar_x + 5 + 1, gameChar_y - 67 + 2.5);
    line(gameChar_x + 5 +  1, gameChar_y - 67 + 2.5, 
            gameChar_x + 5 + 1, gameChar_y - 67 + 3);
    
    //----------JUMPING_RIGHT_Nouse + Mouth----------
    
    ellipse(gameChar_x + 5 + 2, gameChar_y - 60, 2,1);

    //----------JUMPING_RIGHT_Beard----------
    
    strokeWeight(0.5);
    line(gameChar_x + 5 + 2, gameChar_y - 60,
            gameChar_x + 5 + 2, gameChar_y - 56);

    
    
    //--------------------------JUMPING_RIGHT_END----------------------------
    
	//Jumping to the left
	stroke(100);
	noFill();
	rect(220, 460, 50, 80);
	noStroke();
	fill(0);
	text("6. Jumping to the left", 220, 560);

	gameChar_x = 245;
	gameChar_y = 537;
	//Add your code here ...
    
    //--------------------------JUMPING_LEFT_START--------------------------
    
    //!---------JUMPING_LEFT_TORSO----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 52);
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x + 7, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 52);
        vertex(gameChar_x + 10, gameChar_y - 57); 
    endShape(CLOSE); 
    pop();
    
    
    
    //!--------JUMPING_LEFT_HANDS---------
    
    //----------JUMPING_LEFT_LeftHand----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 10, gameChar_y - 57);
        vertex(gameChar_x - 10, gameChar_y - 52);
        vertex(gameChar_x - 20, gameChar_y - 52);
        vertex(gameChar_x - 15, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x - 20, gameChar_y - 72);
        vertex(gameChar_x - 15, gameChar_y - 57);
        vertex(gameChar_x - 20, gameChar_y - 52);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x - 17, gameChar_y - 74);
        vertex(gameChar_x - 20, gameChar_y - 72);
        vertex(gameChar_x - 24, gameChar_y - 77);
    endShape(CLOSE);
    
    //----------JUMPING_LEFT_RightHand----------
    
    beginShape();
        vertex(gameChar_x + 10, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 52);
        vertex(gameChar_x + 20, gameChar_y - 52);
        vertex(gameChar_x + 25, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x + 20, gameChar_y - 57);
        vertex(gameChar_x + 15, gameChar_y - 43);
        vertex(gameChar_x + 25, gameChar_y - 57);
    endShape(CLOSE);
    
    beginShape();
        vertex(gameChar_x + 15, gameChar_y - 42);
        vertex(gameChar_x + 24, gameChar_y - 42);
        vertex(gameChar_x + 24, gameChar_y - 43);
        vertex(gameChar_x + 15, gameChar_y - 43);
    endShape(CLOSE);
    
    pop();
    
    
    
    //!---------JUMPING_LEFT_LEGS----------
    
    //----------JUMPING_LEFT_LeftThigh----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x + 7, gameChar_y - 32);
        vertex(gameChar_x, gameChar_y - 25);
        vertex(gameChar_x - 24, gameChar_y - 10);
        vertex(gameChar_x - 7, gameChar_y - 32);
    endShape(CLOSE);
    
    
    //----------JUMPING_LEFT_LeftFeet----------
    
    beginShape();
        vertex(gameChar_x - 22, gameChar_y - 8);
        vertex(gameChar_x - 24, gameChar_y - 8);
        vertex(gameChar_x - 24, gameChar_y - 18);
        vertex(gameChar_x - 22, gameChar_y - 18);
    endShape(CLOSE);
    
    //----------JUMPING_LEFT_RightThigh----------
    
    beginShape();
        vertex(gameChar_x + 7, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 12);
        vertex(gameChar_x - 5, gameChar_y - 32);
    endShape(CLOSE);
    
    //----------JUMPING_LEFT_RightShin----------
    
    beginShape();
        vertex(gameChar_x + 5, gameChar_y - 17);
        vertex(gameChar_x + 24, gameChar_y - 7);
        vertex(gameChar_x + 5, gameChar_y - 10);
    endShape(CLOSE);
    
    //----------JUMPING_LEFT_RightFeet----------
    
    beginShape();
        vertex(gameChar_x + 24, gameChar_y - 10);
        vertex(gameChar_x + 24, gameChar_y);
        vertex(gameChar_x + 21, gameChar_y);
        vertex(gameChar_x + 21, gameChar_y - 10);
    endShape(CLOSE);
    
    pop();
    
    
    
    //!---------JUMPING_LEFT_CLOTHES----------
    
    //----------JUMPING_LEFT_Chestpiece----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_2);
    triangle(gameChar_x - 15, gameChar_y - 57,
                gameChar_x + 15, gameChar_y - 57,
                    gameChar_x, gameChar_y - 42);
    
    strokeWeight(1);
    stroke('Black');
    beginShape();
        vertex(gameChar_x - 3, gameChar_y - 53);
        vertex(gameChar_x + 3, gameChar_y - 53);
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x - 4, gameChar_y - 50);
        vertex(gameChar_x + 4, gameChar_y - 50);
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x, gameChar_y - 45)
        vertex(gameChar_x, gameChar_y - 50);
        vertex(gameChar_x - 3, gameChar_y - 53);
    endShape();
    
    pop();
    
    //----------JUMPING_LEFT_Skirt----------
    
    push()
    stroke(0);
    strokeWeight(1);
    fill(char.col_cloth_1);
    
    beginShape();
        vertex(gameChar_x - 7, gameChar_y - 32);
        vertex(gameChar_x - 15, gameChar_y - 23);
        vertex(gameChar_x, gameChar_y - 32);
        vertex(gameChar_x + 10, gameChar_y - 23);
        vertex(gameChar_x + 7, gameChar_y - 32);
    endShape();
    
    fill(char.col_cloth_2);
    triangle(gameChar_x - 15, gameChar_y - 22,
                gameChar_x, gameChar_y - 32,
                    gameChar_x + 10, gameChar_y - 23);
    
    pop();
    
    //----------JUMPING_LEFT_Belt-----------
    
    push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    pop();
    
    
    
    //!---------JUMPING_LEFT_HEAD----------
    
    //----------JUMPING_LEFT_Headress---------- 
    
    push();
    fill(char.col_cloth_1);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
        vertex(gameChar_x - 5, gameChar_y - 72);
        vertex(gameChar_x - 5, gameChar_y - 54);
        vertex(gameChar_x + 5, gameChar_y - 54);
        vertex(gameChar_x + 5, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 57);
        vertex(gameChar_x + 10, gameChar_y - 67);
        vertex(gameChar_x + 5, gameChar_y - 72);
    endShape(CLOSE);
    pop();
    
    push();
    stroke(char.col_accessories);
    strokeWeight(1);
    line(gameChar_x - 5, gameChar_y - 67, 
            gameChar_x + 10 - 1, gameChar_y - 67);
    line(gameChar_x - 5, gameChar_y - 67 + 2.5, 
            gameChar_x + 10 - 1, gameChar_y - 67 + 2.5);
    line(gameChar_x - 5, gameChar_y - 67 + 5, 
            gameChar_x + 10 - 1, gameChar_y - 67 + 5);
    line(gameChar_x - 5, gameChar_y - 67 + 7.5, 
            gameChar_x + 10 - 1, gameChar_y - 67 + 7.5);
    line(gameChar_x - 5, gameChar_y - 67 + 10, 
            gameChar_x + 5 - 1, gameChar_y - 67 + 10);
    pop();
    

    //----------JUMPING_LEFT_Emblem----------
    push()
    fill(char.col_accessories);
    stroke(0);
    strokeWeight(0.5);
        
    rect(gameChar_x - 5 - 2, gameChar_y - 67 - 2 - 2, 1, 3);
    
    //----------JUMPING_LEFT_Crown----------
    
    beginShape();
        vertex(gameChar_x - 5 - 2, gameChar_y - 67 - 2);
        vertex(gameChar_x - 5 - 1, gameChar_y - 67);
        vertex(gameChar_x - 5, gameChar_y - 67);
        vertex(gameChar_x - 5, gameChar_y - 67 - 2);
    endShape(CLOSE);
    


    //----------JUMPING_LEFT_Face----------
    
    push();
    fill(char.col_skin);
    stroke(0);
    strokeWeight(0.5);
    
    beginShape();
        vertex(gameChar_x - 5 , gameChar_y - 67);
        bezierVertex(gameChar_x - 5 - 3, gameChar_y - 67,
                        gameChar_x - 5 - 3, gameChar_y - 57,
                            gameChar_x - 5 - 3, gameChar_y - 62);
        bezierVertex(gameChar_x - 5 - 3, gameChar_y - 67,
                        gameChar_x - 5 - 3, gameChar_y - 57,
                            gameChar_x - 5 - 3, gameChar_y - 60);
        vertex(gameChar_x - 5, gameChar_y - 57);

    endShape(CLOSE);
    
    //----------JUMPING_LEFT_Eyes----------
    
    line(gameChar_x - 5 -  2, gameChar_y - 67 + 2.5, 
            gameChar_x - 5 - 1, gameChar_y - 67 + 2.5);
    line(gameChar_x - 5 -  1, gameChar_y - 67 + 2.5, 
            gameChar_x - 5 - 1, gameChar_y - 67 + 3);
    
    //----------JUMPING_LEFT_Nouse + Mouth----------
    
    ellipse(gameChar_x - 5 - 2, gameChar_y - 60, 2,1);


    //----------JUMPING_LEFT_Beard----------
    
    strokeWeight(0.5);
    line(gameChar_x - 5 - 2, gameChar_y - 60,
            gameChar_x - 5 - 2, gameChar_y - 56);

    
    //--------------------------JUMPING_LEFT_END----------------------------
    
}
