/*
The case of the Python Syndicate
Stage 3


Officer: 2481930
CaseNum: 301-2-99938713-2481930

Right kid let’s work out which of our ‘friends’ is connected to the syndicate.

- An object for Pawel karpinski has been declared and initialised
- Modify the x and y parameters of each image command using the x and y
properties from the Pawel karpinski object so the images remain at their correct
positions on the board.
- To do this you will need to combine add and subtract operators with the
relevant property for each parameter



*/

var photoBoard;
var robbie_kray_img;
var cecil_karpinski_img;
var countess_hamilton_img;
var bones_karpinski_img;
var pawel_karpinski_img;
var lina_lovelace_img;

var pawel_karpinski_object;




function preload()
{
	photoBoard = loadImage('photoBoard.png');
	robbie_kray_img = loadImage("krayBrothers2.png");
	cecil_karpinski_img = loadImage("karpinskiBros1.png");
	countess_hamilton_img = loadImage("countessHamilton.png");
	bones_karpinski_img = loadImage("karpinskiDog.png");
	pawel_karpinski_img = loadImage("karpinskiBros2.png");
	lina_lovelace_img = loadImage("lina.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
	pawel_karpinski_object = {
		x: 408,
		y: 309,
		image: pawel_karpinski_img
	};
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(pawel_karpinski_object.image, pawel_karpinski_object.x, pawel_karpinski_object.y);

	image(robbie_kray_img, 
          pawel_karpinski_object.x - (408 - 115),
          pawel_karpinski_object.y + (40 - 309));
	image(cecil_karpinski_img,
          pawel_karpinski_object.x,
          pawel_karpinski_object.y + (40 - 309));
	image(countess_hamilton_img,
          pawel_karpinski_object.x + (701 - 408), 
          pawel_karpinski_object.y + (40 - 309));
	image(bones_karpinski_img,
          pawel_karpinski_object.x - (408 - 115), 
          pawel_karpinski_object.y);
	image(lina_lovelace_img,
          pawel_karpinski_object.x + (701 - 408),
          pawel_karpinski_object.y);

}