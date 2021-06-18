/*
The case of the Python Syndicate
Stage 4

Officer: 2481930
CaseNum: 301-3-32359659-2481930

To really crack the Python Syndicate we need to go in deep. I want to understand
all the connections. I have the data but it’s a mess and I need you to sort it out.

Organise each syndicate member into an object. I’ve done one for you as an example.
Be sure to replicate the naming conventions for your own objects.
Use image command together with the objects you created to organise the mugshots.

- Once you have done this you can comment out or delete the old variables.

*/

var photoBoard;
var countess_hamilton_img;
var bones_karpinski_img;
var lina_lovelace_img;
var anna_karpinski_img;
var cecil_karpinski_img;
var rocky_kray_img;

var lina_lovelace_obj;


//declare your new objects below
var countess_hamilton_obj;
var bones_karpinski_obj;
var anna_karpinski_obj;
var cecil_karpinski_obj;
var rocky_kray_obj;

var countess_hamilton_position_x = 115;
var countess_hamilton_position_y = 40;
var bones_karpinski_position_x = 408;
var bones_karpinski_position_y = 40;
var anna_karpinski_position_x = 115;
var anna_karpinski_position_y = 309;
var cecil_karpinski_position_x = 408;
var cecil_karpinski_position_y = 309;
var rocky_kray_position_x = 701;
var rocky_kray_position_y = 309;


function preload()
{
	photoBoard = loadImage('photoBoard.png');
	countess_hamilton_img = loadImage("countessHamilton.png");
	bones_karpinski_img = loadImage("karpinskiDog.png");
	lina_lovelace_img = loadImage("lina.png");
	anna_karpinski_img = loadImage("karpinskiWoman.png");
	cecil_karpinski_img = loadImage("karpinskiBros1.png");
	rocky_kray_img = loadImage("krayBrothers1.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
	lina_lovelace_obj = {
		x: 701,
		y: 40,
		image: lina_lovelace_img
	};



	//define your new objects below
    
    countess_hamilton_obj = {
		x: countess_hamilton_position_x,
		y: countess_hamilton_position_y,
		image: countess_hamilton_img
	};
    
    bones_karpinski_obj = {
		x: bones_karpinski_position_x,
		y: bones_karpinski_position_y,
		image: bones_karpinski_img
	};
    
    anna_karpinski_obj = {
		x: anna_karpinski_position_x,
		y: anna_karpinski_position_y,
		image: anna_karpinski_img
	};
    
    cecil_karpinski_obj = {
		x: cecil_karpinski_position_x,
		y: cecil_karpinski_position_y,
		image: cecil_karpinski_img
	};
    
    rocky_kray_obj = {
		x: rocky_kray_position_x,
		y: rocky_kray_position_y,
		image: rocky_kray_img
	};
    
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(countess_hamilton_obj.image,
          countess_hamilton_obj.x,
          countess_hamilton_obj.y);
	image(bones_karpinski_obj.image,
          bones_karpinski_obj.x,
          bones_karpinski_obj.y);
	image(lina_lovelace_obj.image,
          lina_lovelace_obj.x,
          lina_lovelace_obj.y);
	image(anna_karpinski_obj.image,
          anna_karpinski_obj.x,
          anna_karpinski_obj.y);
	image(cecil_karpinski_obj.image,
          cecil_karpinski_obj.x,
          cecil_karpinski_obj.y);
	image(rocky_kray_obj.image,
          rocky_kray_obj.x,
          rocky_kray_obj.y);


}