/*

The Game Project

Part 4

*/

var floorPos_y;

var gameChar_x;
var gameCharAbs_x;
var gameChar_y;
var isLeft = false;
var isRight = false;
var isFalling = false;
var isJumping = false;
var isPlummeting = false;
var gameChar_verSpeed = 0;
var gravity = 1.1;
var scrollPos = 0;

var levelWidth = 3000;

var treePos_X;
var treePos_y;

var canyon;
var collectable;

var mountain;
var cloud;
var sun;
var char;
var bg;

function setup()
{
    
	createCanvas(1024, 576);
	floorPos_y = 432; //Variable for the floor position

	//Character start
    gameCharAbs_x = 35;
	gameChar_y = floorPos_y;

    //Trees (column) position(s)
	treePos_X = [200, 700, 1000, 1900, 2600];
	treePos_y = floorPos_y;
    
    //BG_Clouds position(s)
    cloud = [{pos_x: random(-levelWidth, levelWidth),
             pos_y: 25 + random(-10, 30),
             d: 26 + random(-5, 5),
             color: [230, 230, 250, 250]},
             {pos_x: random(-levelWidth, levelWidth),
             pos_y: 29 + random(-10, 30),
             d: 21 + random(-5, 5),
             color: [230, 230, 250, 250]},
             {pos_x: random(-levelWidth, levelWidth),
             pos_y: 21 + random(-10, 30),
             d: 25 + random(-5, 5),
             color: [230, 230, 250, 250]}];
    
    //BG_Mountain position(s)
    mountain = {pos_x: 240,
                pos_y: 295};
    
    //BG_Sun position(s)
    sun = {pos_x: 50,
           pos_y: 50,
           d: 5,
           color: [255, 239, 50, 240]};
    
    //Canyon position(s)
    canyon = [{pos_x: 400,
              pos_y: floorPos_y,
              width: 100,
              br_height: 35,
              br_width: 10},
              {pos_x: 1200,
              pos_y: floorPos_y,
              width: 120,
              br_height: 35,
              br_width: 10},
              {pos_x: 1450,
              pos_y: floorPos_y,
              width: 150,
              br_height: 35,
              br_width: 10},
              {pos_x: 2200,
              pos_y: floorPos_y,
              width: 150,
              br_height: 35,
              br_width: 10}];
    
    //Collectable position(s)
    collectable = [{pos_x: 850,
                   pos_y: floorPos_y - 32,
                   size: 50,
                   isFound: false},
                  {pos_x: canyon[1].pos_x + canyon[1].width + 70,
                   pos_y: floorPos_y - 32,
                   size: 50,
                   isFound: false},
                  {pos_x: levelWidth - 100,
                   pos_y: floorPos_y - 32,
                   size: 50,
                   isFound: false}];
    
    //Scenery colours
    bg = {col_sand_dark: [205, 133, 63],
          col_sand_light: [244, 164, 96],
          col_stone: [255, 248, 220],
          col_green: [0, 128, 0],
          col_blue: [135, 206, 250],
          col_brown: [139, 69, 19],
          col_sky: [100, 155, 255]};
    
    //Character colours
    char = {col_skin: [210, 180, 140],
            col_cloth_1:[0, 0, 255],
            col_cloth_2:[255, 255, 255],
            col_accessories:[255, 204, 0]};
    
}
    

function draw()
{
//----------------------------------------------------------------------------------------------------BACKGROUND_START
    push();
    translate(scrollPos, 0);  
        
	//---Sky---
    background(bg.col_sky); 
    
    //---Sun---
    noStroke();
    
    fill(sun.color);
    ellipse(sun.pos_x, sun.pos_y, sun.d * 8);

    //pop();
    
    //---Sun_movement
    sun.pos_y = 50 + frameCount / 360
        
    //---Background_Desert---
    for (let i = 0 ; i < round(levelWidth/width, 0) ; i++)
    {
        //push();
        noStroke();
        strokeWeight(1);
        fill(bg.col_sand_light);

        beginShape();
            vertex(0 + (i * width), 187);
            vertex(240 + (i * width), 187);
            vertex(370 + (i * width), 190);
            vertex(465 + (i * width), 195);
            vertex(545 + (i * width), 186);
            vertex(675 + (i * width), 192);
            vertex(780 + (i * width), 190);
            vertex(910 + (i * width), 180);
            vertex(width + (i * width), 187);
            vertex(width + (i * width), height);
            vertex(0 + (i * width), height);
        endShape(CLOSE);

        stroke(0);
        line(0 + (i * width), 222, 105 + (i * width), 187);
        line(105 + (i * width), 187, 190 + (i * width), 201);
        line(190 + (i * width), 201, 324 + (i * width), 188);
        line(0 + (i * width), 335, 180 + (i * width), 376);    


        fill(bg.col_sand_dark);
        beginShape();
            vertex(755 + (i * width), 237);
            vertex(832 + (i * width), 172);
            vertex(width + (i * width), 247);
        endShape(CLOSE);

        beginShape();
            vertex(180 + (i * width), 376);
            vertex(457 + (i * width), 284);
            vertex(764 + (i * width), 417);
        endShape(CLOSE);

        fill(bg.col_sand_light);
        beginShape();
            vertex(764 + (i * width), 417);
            vertex(457 + (i * width), 284);
            vertex(584 + (i * width), 246);
            vertex(755 + (i * width), 237);
            vertex(width + (i * width), 247);
        endShape(CLOSE);

        //pop();


        //---Oasis
        //push();
        strokeWeight(1);
        stroke(0);

        fill(bg.col_green);
        ellipse(676 + (i * width), 208, 120, 9);

        fill(bg.col_blue);
        ellipse(670 + (i * width), 208, 90, 4);

        //---BG_TreeTrunk#1

        fill(bg.col_brown);
        beginShape();
            vertex(726 + (i * width), 206);
            vertex(724 + (i * width), 200);
            vertex(720 + (i * width), 170);
            vertex(724 + (i * width), 177);
        endShape(CLOSE);

        //---BG_TreeTrunk#2
        beginShape();
            vertex(700 + (i * width), 210);
            vertex(697 + (i * width), 176);
            vertex(702 + (i * width), 175);
        endShape(CLOSE);

        //---BG_TreeTrunk#3
        beginShape();
            vertex(630 + (i * width), 205);
            vertex(627 + (i * width), 197);
            vertex(628 + (i * width), 182);
        endShape(CLOSE);

        //---BG_TreeCanopy#1
        fill(bg.col_green);

        beginShape();
            vertex(711 + (i * width), 165);
            vertex(728 + (i * width), 176);
            vertex(734 + (i * width), 166);
            vertex(711 + (i * width), 172);
        endShape(CLOSE);

        //---BG_TreeCanopy#2
        beginShape();
            vertex(706 + (i * width), 177);
            vertex(704 + (i * width), 168);
            vertex(690 + (i * width), 179);
            vertex(685 + (i * width), 170);
        endShape(CLOSE);

        //---BG_TreeCanopy#3
        beginShape();
            vertex(633 + (i * width), 176);
            vertex(638 + (i * width), 180);
            vertex(618 + (i * width), 187);
            vertex(615 + (i * width), 179);
        endShape(CLOSE);
        //pop();

        //---Pyramid_(Mountain)---
        //push();
        strokeWeight(1);
        fill(bg.col_stone);
        beginShape(TRIANGLES);
            vertex(mountain.pos_x - 170 + (i * width), mountain.pos_y - 50);
            vertex(mountain.pos_x + (i * width), mountain.pos_y);
            vertex(mountain.pos_x + (i * width), mountain.pos_y - 205);
            vertex(mountain.pos_x + 80 + (i * width), mountain.pos_y - 89);
            vertex(mountain.pos_x + (i * width), mountain.pos_y);
            vertex(mountain.pos_x + (i * width), mountain.pos_y - 205);
        endShape(CLOSE);

        line(mountain.pos_x - 148 + (i * width), mountain.pos_y - 71,
                mountain.pos_x - 1 + (i * width), mountain.pos_y - 31);
        line(mountain.pos_x - 125 + (i * width), mountain.pos_y - 92,
                mountain.pos_x - 1 + (i * width), mountain.pos_y - 60);
        line(mountain.pos_x - 103 + (i * width), mountain.pos_y - 112,
                mountain.pos_x - 1 + (i * width), mountain.pos_y - 90);
        line(mountain.pos_x - 82 + (i * width), mountain.pos_y - 131,
                mountain.pos_x - 1 + (i * width), mountain.pos_y - 115);
        line(mountain.pos_x - 59 + (i * width), mountain.pos_y - 152,
                mountain.pos_x - 1 + (i * width), mountain.pos_y - 143);
        line(mountain.pos_x - 34 + (i * width), mountain.pos_y - 175,
                mountain.pos_x + 1 + (i * width), mountain.pos_y - 172);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 172,
                mountain.pos_x + 15 + (i * width), mountain.pos_y - 184);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 143,
                mountain.pos_x + 25 + (i * width), mountain.pos_y - 167);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 115,
                mountain.pos_x + 35 + (i * width), mountain.pos_y - 151);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 90,
                mountain.pos_x + 47 + (i * width), mountain.pos_y - 137);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 60,
                mountain.pos_x + 57 + (i * width), mountain.pos_y - 121);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 30,
                mountain.pos_x + 69 + (i * width), mountain.pos_y - 105);

        line(mountain.pos_x - 115 + (i * width), mountain.pos_y - 63,
                mountain.pos_x - 126 + (i * width), mountain.pos_y - 39);
        line(mountain.pos_x - 76 + (i * width), mountain.pos_y - 51,
                mountain.pos_x - 86 + (i * width), mountain.pos_y - 25);
        line(mountain.pos_x - 35 + (i * width), mountain.pos_y - 39,
                mountain.pos_x - 44 + (i * width), mountain.pos_y - 15);
        line(mountain.pos_x - 123 + (i * width), mountain.pos_y - 92,
                mountain.pos_x - 135 + (i * width), mountain.pos_y - 69);
        line(mountain.pos_x - 87 + (i * width), mountain.pos_y - 82,
                mountain.pos_x - 96 + (i * width), mountain.pos_y - 58);
        line(mountain.pos_x - 46 + (i * width), mountain.pos_y - 72,
                mountain.pos_x - 57 + (i * width), mountain.pos_y - 47);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 60,
                mountain.pos_x - 8 + (i * width), mountain.pos_y - 34);
        line(mountain.pos_x - 93 + (i * width), mountain.pos_y - 110,
                mountain.pos_x - 104 + (i * width), mountain.pos_y - 88);
        line(mountain.pos_x - 58 + (i * width), mountain.pos_y - 103,
                mountain.pos_x - 69 + (i * width), mountain.pos_y - 79);
        line(mountain.pos_x - 16 + (i * width), mountain.pos_y - 93,
                mountain.pos_x - 27 + (i * width), mountain.pos_y - 68);
        line(mountain.pos_x - 69 + (i * width), mountain.pos_y - 127,
                mountain.pos_x - 78 + (i * width), mountain.pos_y - 107);
        line(mountain.pos_x - 28 + (i * width), mountain.pos_y - 121,
                mountain.pos_x - 37 + (i * width), mountain.pos_y - 98);
        line(mountain.pos_x - 40 + (i * width), mountain.pos_y - 149,
                mountain.pos_x - 50 + (i * width), mountain.pos_y - 124);
        line(mountain.pos_x - 3 + (i * width), mountain.pos_y - 143,
                mountain.pos_x - 13 + (i * width), mountain.pos_y - 118);
        line(mountain.pos_x - 16 + (i * width), mountain.pos_y - 174,
                mountain.pos_x - 28 + (i * width), mountain.pos_y - 148);

        line(mountain.pos_x + 65 + (i * width), mountain.pos_y - 74,
                mountain.pos_x + 58 + (i * width), mountain.pos_y - 94);
        line(mountain.pos_x + 45 + (i * width), mountain.pos_y - 51,
                mountain.pos_x + 37 + (i * width), mountain.pos_y - 70);
        line(mountain.pos_x + 24 + (i * width), mountain.pos_y - 30,
                mountain.pos_x + 18 + (i * width), mountain.pos_y - 51);
        line(mountain.pos_x + 16 + (i * width), mountain.pos_y - 79,
                mountain.pos_x + 25 + (i * width), mountain.pos_y - 59);
        line(mountain.pos_x + 47 + (i * width), mountain.pos_y - 82,
                mountain.pos_x + 40 + (i * width), mountain.pos_y - 102);
        line(mountain.pos_x + 17 + (i * width), mountain.pos_y - 108,
                mountain.pos_x + 27 + (i * width), mountain.pos_y - 90);
        line(mountain.pos_x + 49 + (i * width), mountain.pos_y - 112,
                mountain.pos_x + 40 + (i * width), mountain.pos_y - 129);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 115,
                mountain.pos_x + 7 + (i * width), mountain.pos_y - 97);
        line(mountain.pos_x + 19 + (i * width), mountain.pos_y - 136,
                mountain.pos_x + 30 + (i * width), mountain.pos_y - 120);
        line(mountain.pos_x + 4 + (i * width), mountain.pos_y - 147,
                mountain.pos_x + 13 + (i * width), mountain.pos_y - 130);
        line(mountain.pos_x + 21 + (i * width), mountain.pos_y - 163,
                mountain.pos_x + 30 + (i * width), mountain.pos_y - 146);
        line(mountain.pos_x + 6 + (i * width), mountain.pos_y - 178,
                mountain.pos_x + 13 + (i * width), mountain.pos_y - 157);
        //pop();
    }
    //---Clouds
    //---CloudCluster #1
    for( let i = 0 ; i < cloud.length ; i++ )
    {
        //push();
        noStroke();
        fill(cloud[i].color);

        ellipse(cloud[i].pos_x, 
                cloud[i].pos_y,
                cloud[i].d);
        ellipse(cloud[i].pos_x - cloud[i].d/2, 
                cloud[i].pos_y,
                cloud[i].d * 0.7 );
        ellipse(cloud[i].pos_x + cloud[i].d/2, 
                cloud[i].pos_y,
                cloud[i].d * 0.7);
        ellipse(cloud[i].pos_x - 150,
                cloud[i].pos_y + 20,
                cloud[i].d * 1.15);
        ellipse(cloud[i].pos_x - cloud[i].d/2 - 150,
                cloud[i].pos_y + 20,
                cloud[i].d * 0.7 * 1.15);
        ellipse(cloud[i].pos_x + cloud[i].d/2 - 150,
                cloud[i].pos_y + 20,
                cloud[i].d * 0.7 * 1.15); 


        //---CloudCluster #2
    //    
    //    ellipse(cloud[i].pos_x - 185,
    //            cloud[i].pos_y,
    //            cloud[i].d);
    //    ellipse(cloud[i].pos_x - cloud[i].d/2 - 185,
    //            cloud[i].pos_y,
    //            cloud[i].d * 0.7 * 1.15);
    //    ellipse(cloud[i].pos_x + cloud[i].d/2 - 185,
    //            cloud[i].pos_y,
    //            cloud[i].d * 0.7 * 1.15);
    //    ellipse(cloud[i].pos_x - 215,
    //            cloud[i].pos_y + 15,
    //            cloud[i].d);
    //    ellipse(cloud[i].pos_x - cloud[i].d/2 - 215,
    //            cloud[i].pos_y + 15,
    //            cloud[i].d * 0.7 * 1.15);
    //    ellipse(cloud[i].pos_x + cloud[i].d/2 - 215,
    //            cloud[i].pos_y + 15,
    //            cloud[i].d * 0.7 * 1.15);
    //    
    //    //---CloudCluster #3
    //    ellipse(cloud[i].pos_x + 400,
    //            cloud[i].pos_y + 5,
    //            cloud[i].d);
    //    ellipse(cloud[i].pos_x + 400 - cloud[i].d/2,
    //            cloud[i].pos_y + 5,
    //            cloud[i].d * 0.85 );
    //    ellipse(cloud[i].pos_x + 400 + cloud[i].d/2,
    //            cloud[i].pos_y + 5,
    //            cloud[i].d * 0.85); 
    //    ellipse(cloud[i].pos_x + 500 + 50,
    //            cloud[i].pos_y + 30,
    //            cloud[i].d * 1.1);
    //    ellipse(cloud[i].pos_x + 500 - cloud[i].d/2 + 50,
    //            cloud[i].pos_y + 30,
    //            cloud[i].d * 0.7 * 1.1);
    //    ellipse(cloud[i].pos_x + 500 + cloud[i].d/2 + 50,
    //            cloud[i].pos_y + 30,
    //            cloud[i].d * 0.7 * 1.1);
    //    ellipse(cloud[i].pos_x + 443 + 15,
    //            cloud[i].pos_y + 45,
    //            cloud[i].d);
    //    ellipse(cloud[i].pos_x + 443 - cloud[i].d/2 + 15,
    //            cloud[i].pos_y + 45,
    //            cloud[i].d * 0.7 * 1.2);
    //    ellipse(cloud[i].pos_x + 443 + cloud[i].d/2 + 15,
    //            cloud[i].pos_y + 45,
    //            cloud[i].d * 0.7 * 1.2);   
    //    ellipse(cloud[i].pos_x + 550 + 50,
    //            cloud[i].pos_y + 15,
    //            cloud[i].d);
    //    ellipse(cloud[i].pos_x + 550 - cloud[i].d/2 + 50,
    //            cloud[i].pos_y + 15,
    //            cloud[i].d * 0.7 * 1.05);
    //    ellipse(cloud[i].pos_x + 550 + cloud[i].d/2 + 50,
    //            cloud[i].pos_y + 15,
    //            cloud[i].d * 0.7 * 1.05);

        //---Clouds_movement
            if (cloud[i].pos_x > levelWidth)
            {
                cloud[i].pos_x = - 600;
            }
            else 
            {
                cloud[i].pos_x += 1
            }
    }
        
    //---Ground---
	strokeWeight(3);
    stroke(0);
    fill(bg.col_stone);
    
    for (let i = 0 ; i < 50 ; i++ )
    {
        beginShape(QUAD_STRIP);
            vertex(i * 100, floorPos_y);
            vertex(i * 100, height);
            vertex((i + 1) * 100, floorPos_y);
            vertex((i + 1) * 100, height);
        endShape();
    }
    //---Column#1(BigTree)---
    //push();
    for( let i = 0 ; i < treePos_X.length ; i++ )
    {
    
        stroke(0);
        strokeWeight(2);
        fill('Purple');


        beginShape();
        vertex(treePos_X[i] - 30, treePos_y);
        vertex(treePos_X[i] - 30, treePos_y - 10);
        vertex(treePos_X[i] + 30, treePos_y - 10);
        vertex(treePos_X[i] + 30, treePos_y);
        endShape(CLOSE);

        fill('white');
        beginShape();
        vertex(treePos_X[i] - 30, treePos_y - 10);
        vertex(treePos_X[i] - 15, treePos_y - 30);
        vertex(treePos_X[i] - 15, treePos_y - 80);
        vertex(treePos_X[i] + 15, treePos_y - 80);
        vertex(treePos_X[i] + 15, treePos_y - 30);
        vertex(treePos_X[i] + 30, treePos_y - 10);
        endShape(CLOSE);

        fill('Cyan');
        beginShape();
        vertex(treePos_X[i] - 15, treePos_y - 80);
        vertex(treePos_X[i] - 15, treePos_y - 100);
        vertex(treePos_X[i] + 15, treePos_y - 100);
        vertex(treePos_X[i] + 15, treePos_y - 80);
        endShape(CLOSE);

        fill('White');
        beginShape();
        vertex(treePos_X[i] - 15, treePos_y - 100);
        vertex(treePos_X[i] - 15, treePos_y - 120);
        vertex(treePos_X[i] + 15, treePos_y - 120);
        vertex(treePos_X[i] + 15, treePos_y - 100);
        endShape(CLOSE);

        fill('Blue');
        beginShape();
        vertex(treePos_X[i] - 15, treePos_y - 120);
        vertex(treePos_X[i] - 15, treePos_y - 140);
        vertex(treePos_X[i] + 15, treePos_y - 140);
        vertex(treePos_X[i] + 15, treePos_y - 120);
        endShape(CLOSE);

        fill('Crimson');
        beginShape();
        vertex(treePos_X[i] - 15, treePos_y - 140);
        vertex(treePos_X[i] - 25, treePos_y - 150);
        vertex(treePos_X[i] + 25, treePos_y - 150);
        vertex(treePos_X[i] + 15, treePos_y - 140);
        endShape(CLOSE);

        fill('White');
        beginShape();
        vertex(treePos_X[i] - 15, treePos_y - 150);
        vertex(treePos_X[i] - 25, treePos_y - 160);
        vertex(treePos_X[i] + 25, treePos_y - 160);
        vertex(treePos_X[i] + 15, treePos_y - 150);
        endShape(CLOSE);

        fill(char.col_accessories);
        beginShape();
        vertex(treePos_X[i] - 25, treePos_y - 160);
        vertex(treePos_X[i] - 30, treePos_y - 200);
        vertex(treePos_X[i] + 30, treePos_y - 200);
        vertex(treePos_X[i] + 25, treePos_y - 160);
        endShape(CLOSE);

        //---Column#2_Left(SmallTree)---
        //push();
        stroke(0);
        strokeWeight(2);
        fill('Purple');

        beginShape();
        vertex(treePos_X[i] - 80 - 30, treePos_y);
        vertex(treePos_X[i] - 80 - 30, treePos_y - 10);
        vertex(treePos_X[i] - 80 + 30, treePos_y - 10);
        vertex(treePos_X[i] - 80 + 30, treePos_y);
        endShape(CLOSE);

        fill('White');
        beginShape();
        vertex(treePos_X[i] - 80 - 30, treePos_y - 10);
        vertex(treePos_X[i] - 80 - 15, treePos_y - 30);
        vertex(treePos_X[i] - 80 - 15, treePos_y - 60);
        vertex(treePos_X[i] - 80 + 15, treePos_y - 60);
        vertex(treePos_X[i] - 80 + 15, treePos_y - 30);
        vertex(treePos_X[i] - 80 + 30, treePos_y - 10);
        endShape(CLOSE);

        fill('Cyan');
        beginShape();
        vertex(treePos_X[i] - 80 - 15, treePos_y - 60);
        vertex(treePos_X[i] - 80 - 15, treePos_y - 80);
        vertex(treePos_X[i] - 80 + 15, treePos_y - 80);
        vertex(treePos_X[i] - 80 + 15, treePos_y - 60);
        endShape(CLOSE);

        fill('Blue');
        beginShape();
        vertex(treePos_X[i] - 80 - 15, treePos_y - 80);
        vertex(treePos_X[i] - 80 - 15, treePos_y - 100);
        vertex(treePos_X[i] - 80 + 15, treePos_y - 100);
        vertex(treePos_X[i] - 80 + 15, treePos_y - 80);
        endShape(CLOSE);

        fill('Crimson');
        beginShape();
        vertex(treePos_X[i] - 80 - 15, treePos_y - 100);
        vertex(treePos_X[i] - 80 - 25, treePos_y - 110);
        vertex(treePos_X[i] - 80 + 25, treePos_y - 110);
        vertex(treePos_X[i] - 80 + 15, treePos_y - 100);
        endShape(CLOSE);

        fill('White');
        beginShape();
        vertex(treePos_X[i] - 80 - 15, treePos_y - 110);
        vertex(treePos_X[i] - 80 - 25, treePos_y - 130);
        vertex(treePos_X[i] - 80 + 25, treePos_y - 130);
        vertex(treePos_X[i] - 80 + 15, treePos_y - 110);
        endShape(CLOSE);

        fill(char.col_accessories);
        beginShape();
        vertex(treePos_X[i] - 80 - 25, treePos_y - 130);
        vertex(treePos_X[i] - 80 - 30, treePos_y - 160);
        vertex(treePos_X[i] - 80 + 30, treePos_y - 160);
        vertex(treePos_X[i] - 80 + 25, treePos_y - 130);
        endShape(CLOSE);

        //---Column#3_Right(SmallTree)---
        //push();
        stroke(0);
        strokeWeight(2);
        fill('Purple');

        beginShape();
        vertex(treePos_X[i] + 80 - 30, treePos_y);
        vertex(treePos_X[i] + 80 - 30, treePos_y - 10);
        vertex(treePos_X[i] + 80 + 30, treePos_y - 10);
        vertex(treePos_X[i] + 80 + 30, treePos_y);
        endShape(CLOSE);

        fill('White');
        beginShape();
        vertex(treePos_X[i] + 80 - 30, treePos_y - 10);
        vertex(treePos_X[i] + 80 - 15, treePos_y - 30);
        vertex(treePos_X[i] + 80 - 15, treePos_y - 60);
        vertex(treePos_X[i] + 80 + 15, treePos_y - 60);
        vertex(treePos_X[i] + 80 + 15, treePos_y - 30);
        vertex(treePos_X[i] + 80 + 30, treePos_y - 10);
        endShape(CLOSE);

        fill('Cyan');
        beginShape();
        vertex(treePos_X[i] + 80 - 15, treePos_y - 60);
        vertex(treePos_X[i] + 80 - 15, treePos_y - 80);
        vertex(treePos_X[i] + 80 + 15, treePos_y - 80);
        vertex(treePos_X[i] + 80 + 15, treePos_y - 60);
        endShape(CLOSE);

        fill('Blue');
        beginShape();
        vertex(treePos_X[i] + 80 - 15, treePos_y - 80);
        vertex(treePos_X[i] + 80 - 15, treePos_y - 100);
        vertex(treePos_X[i] + 80 + 15, treePos_y - 100);
        vertex(treePos_X[i] + 80 + 15, treePos_y - 80);
        endShape(CLOSE);

        fill('Crimson');
        beginShape();
        vertex(treePos_X[i] + 80 - 15, treePos_y - 100);
        vertex(treePos_X[i] + 80 - 25, treePos_y - 110);
        vertex(treePos_X[i] + 80 + 25, treePos_y - 110);
        vertex(treePos_X[i] + 80 + 15, treePos_y - 100);
        endShape(CLOSE);

        fill('White');
        beginShape();
        vertex(treePos_X[i] + 80 - 15, treePos_y - 110);
        vertex(treePos_X[i] + 80 - 25, treePos_y - 130);
        vertex(treePos_X[i] + 80 + 25, treePos_y - 130);
        vertex(treePos_X[i] + 80 + 15, treePos_y - 110);
        endShape(CLOSE);

        fill(char.col_accessories);
        beginShape();
        vertex(treePos_X[i] + 80 - 25, treePos_y - 130);
        vertex(treePos_X[i] + 80 - 30, treePos_y - 160);
        vertex(treePos_X[i] + 80 + 30, treePos_y - 160);
        vertex(treePos_X[i] + 80 + 25, treePos_y - 130);
        endShape(CLOSE);
    
    }
    //pop();
    
    //---Canyon---
    
    for (let i = 0 ; i < canyon.length ; i++)
    {
        //push();

        //---Crane---
        noFill();
        stroke(bg.col_brown);
        strokeWeight(10);
        beginShape();
            vertex(canyon[i].pos_x - 10, canyon[i].pos_y);
            vertex(canyon[i].pos_x + canyon[i].width / 2, 25);
            vertex(canyon[i].pos_x + canyon[i].width + 10, canyon[i].pos_y);
        endShape();

        stroke(0);
        strokeWeight(3);
        triangle(canyon[i].pos_x, 50, 
                    canyon[i].pos_x + canyon[i].width / 2, 25,
                        canyon[i].pos_x + canyon[i].width, 50);

        fill(bg.col_stone);
        rect(canyon[i].pos_x, 50, canyon[i].width, height - floorPos_y);

        //---PIT---
        fill(bg.col_sand_light);
        noStroke();
        rect(canyon[i].pos_x, canyon[i].pos_y - 3 , canyon[i].width, height - floorPos_y + 3);

        //pop();
    }
    
    //---Collectable---
    for (let i = 0 ; i < collectable.length ; i++)
    {
        stroke(0);
        if (collectable[i].isFound == false){
        //push();

        fill(char.col_accessories);
        beginShape(TRIANGLES);
        vertex(collectable[i].pos_x - collectable[i].size / 10, collectable[i].pos_y);
        vertex(collectable[i].pos_x + collectable[i].size / 10, collectable[i].pos_y);
        vertex(collectable[i].pos_x, collectable[i].pos_y - collectable[i].size / 2);
        vertex(collectable[i].pos_x,
               collectable[i].pos_y - collectable[i].size / 2);
        vertex(collectable[i].pos_x + collectable[i].size / 4,
               collectable[i].pos_y - collectable[i].size / 3);
        vertex(collectable[i].pos_x + collectable[i].size / 4,
               collectable[i].pos_y - collectable[i].size / 2);
        vertex(collectable[i].pos_x,
               collectable[i].pos_y - collectable[i].size / 2);
        vertex(collectable[i].pos_x - collectable[i].size / 4,
               collectable[i].pos_y - collectable[i].size / 3);
        vertex(collectable[i].pos_x - collectable[i].size / 4,
               collectable[i].pos_y - collectable[i].size / 2);
        vertex(collectable[i].pos_x,
               collectable[i].pos_y - collectable[i].size / 3);
        vertex(collectable[i].pos_x - collectable[i].size / 4,
               collectable[i].pos_y - collectable[i].size / 1.05);
        vertex(collectable[i].pos_x + collectable[i].size / 4,
               collectable[i].pos_y - collectable[i].size / 1.05);
        endShape(CLOSE);

        fill('Crimson')
        beginShape();
        vertex(collectable[i].pos_x,
               collectable[i].pos_y - collectable[i].size / 1.8);
        vertex(collectable[i].pos_x - collectable[i].size / 9,
               collectable[i].pos_y - collectable[i].size / 1.2);
        vertex(collectable[i].pos_x + collectable[i].size / 9,
               collectable[i].pos_y - collectable[i].size / 1.2);
        endShape(CLOSE);
        }
        //---Postament
        fill(bg.col_stone);
        beginShape();
            vertex(collectable[i].pos_x - 15, floorPos_y);
            vertex(collectable[i].pos_x - 15, floorPos_y - 15);
            vertex(collectable[i].pos_x + 15, floorPos_y - 15);
            vertex(collectable[i].pos_x + 15, floorPos_y);
        endShape(CLOSE);

        fill('Crimson')
        beginShape();
            vertex(collectable[i].pos_x - 15, floorPos_y - 15);
            vertex(collectable[i].pos_x - 25, floorPos_y - 30);
            vertex(collectable[i].pos_x + 25, floorPos_y - 30);
            vertex(collectable[i].pos_x + 15, floorPos_y - 15);
        endShape(CLOSE);
        //pop();
    }
//    //---POOL---
//    //push();
//    
//        //---Crocodile---
//        fill(bg.col_green);
//        beginShape();
//        vertex(canyon[i].pos_x + canyon[i].width / 2 - 30, canyon[i].pos_y);
//        vertex(canyon[i].pos_x + canyon[i].width / 2 - 30, canyon[i].pos_y - 3);
//        vertex(canyon[i].pos_x + canyon[i].width / 2 - 10, canyon[i].pos_y - 3);
//        vertex(canyon[i].pos_x + canyon[i].width / 2 - 10, canyon[i].pos_y - 5);
//        vertex(canyon[i].pos_x + canyon[i].width / 2, canyon[i].pos_y - 5);
//        vertex(canyon[i].pos_x + canyon[i].width / 2, canyon[i].pos_y - 3);
//        vertex(canyon[i].pos_x + canyon[i].width / 2 + 33, canyon[i].pos_y - 2);
//        vertex(canyon[i].pos_x + canyon[i].width / 2 + 40, canyon[i].pos_y);
//        endShape();
//    
//        //---Water---
//        fill(bg.col_blue);
//        rect(canyon[i].pos_x, canyon[i].pos_y , canyon[i].width2, 200);
//
//        fill(char.col_accessories);
//    
//        //---Bridge_Pylons---
//        rect(canyon[i].pos_x - canyon[i].br_width, canyon[i].pos_y - canyon[i].br_height,
//             canyon[i].br_width, canyon[i].br_height);
//        rect(canyon[i].pos_x + canyon[i].width2, canyon[i].pos_y - canyon[i].br_height,
//             canyon[i].br_width, canyon[i].br_height);
//
//        //---Destroyed_Bridge---
//        line(canyon[i].pos_x, canyon[i].pos_y - canyon[i].br_height, 
//              canyon[i].pos_x + canyon[i].br_width, canyon[i].pos_y - canyon[i].br_width);
//        fill(bg.col_sand_dark);
//        rect(canyon[i].pos_x, canyon[i].pos_y - canyon[i].br_width, 
//              canyon[i].br_width, canyon[i].width2);
//
//    //pop();
//    
    //---StartPointEntrance---
    //push();
    
    fill(bg.col_stone);
    rect(0, floorPos_y - 100, 20, 100);
    
pop();

//------------------------------------------------------------------------------------------------------BACKGROUND_END   

                                          //---AbsolutePosition---
gameChar_x = gameCharAbs_x + scrollPos;    
    
drawGameChar();

//--------------------------------------------------------------------------------------------------OVERLAPING_SCENERY
    
                                        //---Entrance_Dark---
push();
translate(scrollPos, 0);    
fill(0);
quad(0, floorPos_y + 10, 
     0, floorPos_y - 80,
     15, floorPos_y - 90,
     15, floorPos_y);
pop(); 
//-------------------------------------------------------------------------------------------------------------GRAVITY

                                        //---Plummeting---

for (let i = 0 ; i < canyon.length ; i++)
    {
        if ((gameCharAbs_x - 7 >= canyon[i].pos_x)&&(gameCharAbs_x + 7 <= canyon[i].pos_x + canyon[i].width))
            {
                isPlummeting = true;
                break;
            }
        else
            {
                isPlummeting = false;
            }
    }    
    
                                        //---Velocity---   
    
if ((gameChar_y < floorPos_y) || (isPlummeting == true))
{
    if((gameChar_y + gameChar_verSpeed) < max(floorPos_y, isPlummeting * height))
        {
            isFalling = true;
            gameChar_y += gameChar_verSpeed;
            gameChar_verSpeed = gameChar_verSpeed + Math.pow(gravity,1.001);
        }
    else
        {
            gameChar_y = max(floorPos_y, isPlummeting * height);
        }
}
    

                                        //---Stop_Falling---
    
else if (gameChar_y = floorPos_y){
    isFalling = false;
}

//-------------------------------------------------------------------------------------------------------------MOVEMENT

                                        //---Move_To_Left---
    
if (isLeft == true){

    if (isFalling == true)
    {
        if (gameCharAbs_x > 20)
        {
            gameCharAbs_x -= max(4, 6 - Math.pow(gravity,1.001));}
    }
    else
    {
        gameCharAbs_x = max(-10 ,gameCharAbs_x - 5);
    }    
    if ((gameCharAbs_x + scrollPos < 0.3 * width) && gameCharAbs_x > 0.3 * width)
    {
        scrollPos += 5;
    }   
}
    
                                        //---Move_To_Right---
    
else if (isRight == true){  
    if (isFalling == true){
        gameCharAbs_x += max(4, 6 - Math.pow(gravity,1.001));
    }
    else
    {
        gameCharAbs_x = min(levelWidth, gameCharAbs_x + 5);
    }
    if ((gameCharAbs_x + scrollPos > 0.7 * width) && (gameCharAbs_x  < levelWidth - 0.3 * width))
        {
            scrollPos -= 5;
        }
}

    
  
//---------------------------------------------------------------------------------------------------------INTERACTIONS

                                        //---Collectable_PickUp---
for (let i = 0 ; i < collectable.length ; i++)
{
    if (dist(gameCharAbs_x, gameChar_y, collectable[i].pos_x, collectable[i].pos_y + 30) <= 25){
        collectable[i].isFound = true;
    }    
}
                                        //---Canyon[i]_Walls---
for (let i = 0 ; i < canyon.length ; i++)
{
        if ((gameChar_y > floorPos_y) && (gameCharAbs_x <= canyon[i].pos_x + canyon[i].width) && (gameCharAbs_x >= canyon[i].pos_x))
            {
                if (gameCharAbs_x + 24 > canyon[i].pos_x + canyon[i].width)
                {
                    gameCharAbs_x = canyon[i].pos_x + canyon[i].width - 24;
                }
                else if (gameCharAbs_x - 24 < canyon[i].pos_x)
                {
                    gameCharAbs_x = canyon[i].pos_x + 24;
                }
            }
}

//----------------------------------------------------------------------------------------------------------END_OF_DRAW

}

//------------------------------------------------------------------------------------------------------------FUNCTIONS

                                    //---Key_Presses---

function keyPressed()
{
    if (keyCode == 39)
        {
            isRight = true;
            isLeft = false;
        }
    else if (keyCode == 37) 
        {
            isLeft = true;
            isRight = false;
        }
    else if ((keyCode == 32)&&(isFalling == false)&&(isJumping == false)&&(gameChar_x > 28))
        {
            isJumping = true;
            gameChar_y -= 5;
            gameChar_verSpeed = -18;
        }
}

                                    //---Key_Releases---

function keyReleased()
{
    if (keyCode == 39){
        isRight = false;
    }
    else if (keyCode == 37){
        isLeft = false;
    }
    else if (keyCode == 32){
        isJumping = false;
    }
}

function drawGameChar()
{
                                            //---Walking_Right---

    
    if ((isRight == true)&(isFalling == false)&&(isJumping == false))
{
//--------------------------------------------------------------------------------------------------WALKNG_RIGHT_START
    
    //!---------WALKING_RIGHT_TORSO----------
    
    //push();
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
    //pop();
    
    
    
    //!--------WALKING_RIGHT_HANDS---------
    
    //----------WALKING_RIGHT_RightHand----------
    
    //push();
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
    
    //pop();
    
    
    
    //!---------WALKING_RIGHT_LEGS----------
    
    //----------WALKING_RIGHT_RightThigh----------
    
    //push();
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
    
    //pop();
    
    
    
    //!---------WALKING_RIGHT_CLOTHES----------
    
    //----------WALKING_RIGHT_Chestpiece----------
    
    //push();
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
    
    //pop();
    
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
    
    //pop();
    
    //----------WALKING_RIGHT_Belt-----------
    
    //push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    //pop();
    
    
    
    //!---------WALKING_RIGHT_HEAD----------
    
    //----------WALKING_RIGHT_Headress---------- 
    
    //push();
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
    //pop();
    
    //push();
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
    //pop();
    

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
    
    //push();
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
    
//----------------------------------------------------------------------------------------------------WALKNG_RIGHT_END
}

                                        //---Walking_Left---
    
    else if ((isLeft == true)&(isFalling == false)&&(isJumping == false))
        
{
//---------------------------------------------------------------------------------------------------WALKNG_LEFT_START
    
    //!---------WALKING_LEFT_TORSO----------
    
    //push();
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
    //pop();
    
    
    
    //!--------WALKING_LEFT_HANDS---------
    
    //----------WALKING_LEFT_LeftHand----------
    
    //push();
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
    
    //pop();
    
    
    
    //!---------WALKING_LEFT_LEGS----------
    
    //----------WALKING_LEFT_LeftThigh----------
    
    //push();
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
    
    //pop();
    
    
    
    //!---------WALKING_LEFT_CLOTHES----------
    
    //----------WALKING_LEFT_Chestpiece----------
    
    //push();
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
    
    //pop();
    
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
    
    //pop();
    
    //----------WALKING_LEFT_Belt-----------
    
    //push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    //pop();
    
    
    
    //!---------WALKING_LEFT_HEAD----------
    
    //----------WALKING_LEFT_Headress---------- 
    
    //push();
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
    //pop();
    
    //push();
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
    //pop();
    

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
    
    //push();
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
    
//-----------------------------------------------------------------------------------------------------WALKNG_LEFT_END
}

                                        //---Jumping_Right---
    
    else if((isRight == true)&((isFalling == true) || (isJumping == true)))
    
{
//-------------------------------------------------------------------------------------------------JUMPING_RIGHT_START
    
    //!---------JUMPING_RIGHT_TORSO----------
    
    //push();
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
    //pop();
    
    
    
    //!--------JUMPING_RIGHT_HANDS---------
    
    //----------JUMPING_RIGHT_RightHand----------
    
    //push();
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
    
    //pop();
    
    
    
    //!---------JUMPING_RIGHT_LEGS----------
    
    //----------JUMPING_RIGHT_RightThigh----------
    
    //push();
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
    
    //pop();
    
    
    
    //!---------JUMPING_RIGHT_CLOTHES----------
    
    //----------JUMPING_RIGHT_Chestpiece----------
    
    //push();
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
    
    //pop();
    
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
    
    //pop();
    
    //----------JUMPING_RIGHT_Belt-----------
    
    //push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    //pop();
    
    
    
    //!---------JUMPING_RIGHT_HEAD----------
    
    //----------JUMPING_RIGHT_Headress---------- 
    
    //push();
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
    //pop();
    
    //push();
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
    //pop();
    

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
    
    //push();
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

    
    
//---------------------------------------------------------------------------------------------------JUMPING_RIGHT_END
}

                                        //---Jumping_Left---
    
    else if ((isLeft == true)&((isFalling == true) || (isJumping == true))) 
{
    
//--------------------------------------------------------------------------------------------------JUMPING_LEFT_START
    
    //!---------JUMPING_LEFT_TORSO----------
    
    //push();
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
    //pop();
    
    
    
    //!--------JUMPING_LEFT_HANDS---------
    
    //----------JUMPING_LEFT_LeftHand----------
    
    //push();
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
    
    //pop();
    
    
    
    //!---------JUMPING_LEFT_LEGS----------
    
    //----------JUMPING_LEFT_LeftThigh----------
    
    //push();
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
    
    //pop();
    
    
    
    //!---------JUMPING_LEFT_CLOTHES----------
    
    //----------JUMPING_LEFT_Chestpiece----------
    
    //push();
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
    
    //pop();
    
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
    
    //pop();
    
    //----------JUMPING_LEFT_Belt-----------
    
    //push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    //pop();
    
    
    
    //!---------JUMPING_LEFT_HEAD----------
    
    //----------JUMPING_LEFT_Headress---------- 
    
    //push();
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
    //pop();
    
    //push();
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
    //pop();
    

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
    
    //push();
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

    
//----------------------------------------------------------------------------------------------------JUMPING_LEFT_END   
}

                                        //---Neutral_Jump---
    
else if ((isFalling == true) || (isJumping == true))    
{
    
//----------------------------------------------------------------------------------------------------JUMP_FRONT_START
    
    //!---------JUMP_FRONT_TORSO----------
    
    //push();
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
    //pop();
    
    
    
    //!--------JUMP_FRONT_HANDS---------
    
    //----------JUMP_FRONT_LeftHand----------
    
    //push();
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
    
    //pop();
    
    
    
    //!---------JUMP_FRONT_LEGS----------
    
    //----------JUMP_FRONT_LeftThigh----------
    
    //push();
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
       
    //push();
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
    
    //pop();
    
    
    
    //!---------JUMP_FRONT_CLOTHES----------
    
    //----------JUMP_FRONT_Chestpiece----------
    
    //push();
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
    
    //pop();
    
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
    
    //pop();
    
    //----------JUMP_FRONT_Belt-----------
    
    //push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    //pop();
    
    
    
    //!---------JUMP_FRONT_HEAD----------
    
    //----------JUMP_FRONT_Headress---------- 
    
    //push();
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
    //pop();
    
    //push();
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
    //pop();
    
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
    
    //push();
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

    
//------------------------------------------------------------------------------------------------------JUMP_FRONT_END
}
    
                                        //---Standing_Still---    
else
{
    
//---------------------------------------------------------------------------------------------------STAND_FRONT_START
    
    //!---------STAND_FRONT_TORSO----------
    
    //push();
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
    //pop();
    
    
    
    //!--------STAND_FRONT_HANDS---------
    
    //----------STAND_FRONT_LeftHand----------
    
    //push();
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
    
    //pop();
    
    
    
    //!---------STAND_FRONT_LEGS----------
    
    //----------STAND_FRONT_LeftThigh----------
    
    //push();
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
    
    //pop();
    
    
    
    //!---------STAND_FRONT_CLOTHES----------
    
    //----------STAND_FRONT_Chestpiece----------
    
    //push();
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
    
    //pop();
    
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
    
    //pop();
    
    //----------STAND_FRONT_Belt-----------
    
    //push();
    stroke(0);
    strokeWeight(1);
    fill(char.col_accessories);
    rect(gameChar_x - 7, gameChar_y - 36, 14, 3);
    //pop();
    
    
    
    //!---------STAND_FRONT_HEAD----------
    
    //----------STAND_FRONT_Headress---------- 
    
    //push();
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
    //pop();
    
    //push();
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
    //pop();
    
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
    
    //push();
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
    
//-----------------------------------------------------------------------------------------------------STAND_FRONT_END
}
}

function colour_sky()
{
    background(bg.col_sky); 
}

function draw_sun()
{
    //Draw and Colour Sun
    noStroke(); 
    fill(sun.color);
    
    ellipse(sun.pos_x, sun.pos_y, sun.d * 8);
    
    //---Sun_movement
    sun.pos_y = 50 + frameCount / 360
}

function draw_desertBG()
{
    for (let i = 0 ; i < round(levelWidth/width, 0) ; i++)
    {
        noStroke();
        strokeWeight(1);
        fill(bg.col_sand_light);

        beginShape();
            vertex(0 + (i * width), 187);
            vertex(240 + (i * width), 187);
            vertex(370 + (i * width), 190);
            vertex(465 + (i * width), 195);
            vertex(545 + (i * width), 186);
            vertex(675 + (i * width), 192);
            vertex(780 + (i * width), 190);
            vertex(910 + (i * width), 180);
            vertex(width + (i * width), 187);
            vertex(width + (i * width), height);
            vertex(0 + (i * width), height);
        endShape(CLOSE);

        stroke(0);
        line(0 + (i * width), 222, 105 + (i * width), 187);
        line(105 + (i * width), 187, 190 + (i * width), 201);
        line(190 + (i * width), 201, 324 + (i * width), 188);
        line(0 + (i * width), 335, 180 + (i * width), 376);    


        fill(bg.col_sand_dark);
        beginShape();
            vertex(755 + (i * width), 237);
            vertex(832 + (i * width), 172);
            vertex(width + (i * width), 247);
        endShape(CLOSE);

        beginShape();
            vertex(180 + (i * width), 376);
            vertex(457 + (i * width), 284);
            vertex(764 + (i * width), 417);
        endShape(CLOSE);

        fill(bg.col_sand_light);
        beginShape();
            vertex(764 + (i * width), 417);
            vertex(457 + (i * width), 284);
            vertex(584 + (i * width), 246);
            vertex(755 + (i * width), 237);
            vertex(width + (i * width), 247);
        endShape(CLOSE);



        //---Oasis
        strokeWeight(1);
        stroke(0);

        fill(bg.col_green);
        ellipse(676 + (i * width), 208, 120, 9);

        fill(bg.col_blue);
        ellipse(670 + (i * width), 208, 90, 4);

        //---BG_TreeTrunk#1

        fill(bg.col_brown);
        beginShape();
            vertex(726 + (i * width), 206);
            vertex(724 + (i * width), 200);
            vertex(720 + (i * width), 170);
            vertex(724 + (i * width), 177);
        endShape(CLOSE);

        //---BG_TreeTrunk#2
        beginShape();
            vertex(700 + (i * width), 210);
            vertex(697 + (i * width), 176);
            vertex(702 + (i * width), 175);
        endShape(CLOSE);

        //---BG_TreeTrunk#3
        beginShape();
            vertex(630 + (i * width), 205);
            vertex(627 + (i * width), 197);
            vertex(628 + (i * width), 182);
        endShape(CLOSE);

        //---BG_TreeCanopy#1
        fill(bg.col_green);

        beginShape();
            vertex(711 + (i * width), 165);
            vertex(728 + (i * width), 176);
            vertex(734 + (i * width), 166);
            vertex(711 + (i * width), 172);
        endShape(CLOSE);

        //---BG_TreeCanopy#2
        beginShape();
            vertex(706 + (i * width), 177);
            vertex(704 + (i * width), 168);
            vertex(690 + (i * width), 179);
            vertex(685 + (i * width), 170);
        endShape(CLOSE);

        //---BG_TreeCanopy#3
        beginShape();
            vertex(633 + (i * width), 176);
            vertex(638 + (i * width), 180);
            vertex(618 + (i * width), 187);
            vertex(615 + (i * width), 179);
        endShape(CLOSE);

        //---Pyramid_(Mountain)---
        strokeWeight(1);
        fill(bg.col_stone);
        beginShape(TRIANGLES);
            vertex(mountain.pos_x - 170 + (i * width), mountain.pos_y - 50);
            vertex(mountain.pos_x + (i * width), mountain.pos_y);
            vertex(mountain.pos_x + (i * width), mountain.pos_y - 205);
            vertex(mountain.pos_x + 80 + (i * width), mountain.pos_y - 89);
            vertex(mountain.pos_x + (i * width), mountain.pos_y);
            vertex(mountain.pos_x + (i * width), mountain.pos_y - 205);
        endShape(CLOSE);

        line(mountain.pos_x - 148 + (i * width), mountain.pos_y - 71,
                mountain.pos_x - 1 + (i * width), mountain.pos_y - 31);
        line(mountain.pos_x - 125 + (i * width), mountain.pos_y - 92,
                mountain.pos_x - 1 + (i * width), mountain.pos_y - 60);
        line(mountain.pos_x - 103 + (i * width), mountain.pos_y - 112,
                mountain.pos_x - 1 + (i * width), mountain.pos_y - 90);
        line(mountain.pos_x - 82 + (i * width), mountain.pos_y - 131,
                mountain.pos_x - 1 + (i * width), mountain.pos_y - 115);
        line(mountain.pos_x - 59 + (i * width), mountain.pos_y - 152,
                mountain.pos_x - 1 + (i * width), mountain.pos_y - 143);
        line(mountain.pos_x - 34 + (i * width), mountain.pos_y - 175,
                mountain.pos_x + 1 + (i * width), mountain.pos_y - 172);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 172,
                mountain.pos_x + 15 + (i * width), mountain.pos_y - 184);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 143,
                mountain.pos_x + 25 + (i * width), mountain.pos_y - 167);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 115,
                mountain.pos_x + 35 + (i * width), mountain.pos_y - 151);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 90,
                mountain.pos_x + 47 + (i * width), mountain.pos_y - 137);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 60,
                mountain.pos_x + 57 + (i * width), mountain.pos_y - 121);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 30,
                mountain.pos_x + 69 + (i * width), mountain.pos_y - 105);

        line(mountain.pos_x - 115 + (i * width), mountain.pos_y - 63,
                mountain.pos_x - 126 + (i * width), mountain.pos_y - 39);
        line(mountain.pos_x - 76 + (i * width), mountain.pos_y - 51,
                mountain.pos_x - 86 + (i * width), mountain.pos_y - 25);
        line(mountain.pos_x - 35 + (i * width), mountain.pos_y - 39,
                mountain.pos_x - 44 + (i * width), mountain.pos_y - 15);
        line(mountain.pos_x - 123 + (i * width), mountain.pos_y - 92,
                mountain.pos_x - 135 + (i * width), mountain.pos_y - 69);
        line(mountain.pos_x - 87 + (i * width), mountain.pos_y - 82,
                mountain.pos_x - 96 + (i * width), mountain.pos_y - 58);
        line(mountain.pos_x - 46 + (i * width), mountain.pos_y - 72,
                mountain.pos_x - 57 + (i * width), mountain.pos_y - 47);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 60,
                mountain.pos_x - 8 + (i * width), mountain.pos_y - 34);
        line(mountain.pos_x - 93 + (i * width), mountain.pos_y - 110,
                mountain.pos_x - 104 + (i * width), mountain.pos_y - 88);
        line(mountain.pos_x - 58 + (i * width), mountain.pos_y - 103,
                mountain.pos_x - 69 + (i * width), mountain.pos_y - 79);
        line(mountain.pos_x - 16 + (i * width), mountain.pos_y - 93,
                mountain.pos_x - 27 + (i * width), mountain.pos_y - 68);
        line(mountain.pos_x - 69 + (i * width), mountain.pos_y - 127,
                mountain.pos_x - 78 + (i * width), mountain.pos_y - 107);
        line(mountain.pos_x - 28 + (i * width), mountain.pos_y - 121,
                mountain.pos_x - 37 + (i * width), mountain.pos_y - 98);
        line(mountain.pos_x - 40 + (i * width), mountain.pos_y - 149,
                mountain.pos_x - 50 + (i * width), mountain.pos_y - 124);
        line(mountain.pos_x - 3 + (i * width), mountain.pos_y - 143,
                mountain.pos_x - 13 + (i * width), mountain.pos_y - 118);
        line(mountain.pos_x - 16 + (i * width), mountain.pos_y - 174,
                mountain.pos_x - 28 + (i * width), mountain.pos_y - 148);

        line(mountain.pos_x + 65 + (i * width), mountain.pos_y - 74,
                mountain.pos_x + 58 + (i * width), mountain.pos_y - 94);
        line(mountain.pos_x + 45 + (i * width), mountain.pos_y - 51,
                mountain.pos_x + 37 + (i * width), mountain.pos_y - 70);
        line(mountain.pos_x + 24 + (i * width), mountain.pos_y - 30,
                mountain.pos_x + 18 + (i * width), mountain.pos_y - 51);
        line(mountain.pos_x + 16 + (i * width), mountain.pos_y - 79,
                mountain.pos_x + 25 + (i * width), mountain.pos_y - 59);
        line(mountain.pos_x + 47 + (i * width), mountain.pos_y - 82,
                mountain.pos_x + 40 + (i * width), mountain.pos_y - 102);
        line(mountain.pos_x + 17 + (i * width), mountain.pos_y - 108,
                mountain.pos_x + 27 + (i * width), mountain.pos_y - 90);
        line(mountain.pos_x + 49 + (i * width), mountain.pos_y - 112,
                mountain.pos_x + 40 + (i * width), mountain.pos_y - 129);
        line(mountain.pos_x - 1 + (i * width), mountain.pos_y - 115,
                mountain.pos_x + 7 + (i * width), mountain.pos_y - 97);
        line(mountain.pos_x + 19 + (i * width), mountain.pos_y - 136,
                mountain.pos_x + 30 + (i * width), mountain.pos_y - 120);
        line(mountain.pos_x + 4 + (i * width), mountain.pos_y - 147,
                mountain.pos_x + 13 + (i * width), mountain.pos_y - 130);
        line(mountain.pos_x + 21 + (i * width), mountain.pos_y - 163,
                mountain.pos_x + 30 + (i * width), mountain.pos_y - 146);
        line(mountain.pos_x + 6 + (i * width), mountain.pos_y - 178,
                mountain.pos_x + 13 + (i * width), mountain.pos_y - 157);
    }
}

function draw_clouds()
{
    //---Clouds
    for( let i = 0 ; i < cloud.length ; i++ )
    {
        noStroke();
        fill(cloud[i].color);

        ellipse(cloud[i].pos_x, 
                cloud[i].pos_y,
                cloud[i].d);
        ellipse(cloud[i].pos_x - cloud[i].d/2, 
                cloud[i].pos_y,
                cloud[i].d * 0.7 );
        ellipse(cloud[i].pos_x + cloud[i].d/2, 
                cloud[i].pos_y,
                cloud[i].d * 0.7);
        ellipse(cloud[i].pos_x - 150,
                cloud[i].pos_y + 20,
                cloud[i].d * 1.15);
        ellipse(cloud[i].pos_x - cloud[i].d/2 - 150,
                cloud[i].pos_y + 20,
                cloud[i].d * 0.7 * 1.15);
        ellipse(cloud[i].pos_x + cloud[i].d/2 - 150,
                cloud[i].pos_y + 20,
                cloud[i].d * 0.7 * 1.15);

        //---Clouds_movement
            if (cloud[i].pos_x > levelWidth)
            {
                cloud[i].pos_x = - 600;
            }
            else 
            {
                cloud[i].pos_x += 1
            }
    }
}