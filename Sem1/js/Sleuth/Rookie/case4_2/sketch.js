/*
The case of the Python Syndicate
Stage 2


Officer: 2481930
CaseNum: 301-1-66510995-2481930

- Word on the street is that there is a new gang in town - The Python Syndicate.
It seems my bones were correct on this one. I need you to organise the gang
around the suspected leader Countess hamilton

- The variables for Countess hamilton have been declared and
initialised.
- Modify the x and y parameters of each image command using these two variables
so the images maintain their correct positions their correct positions on the board.
- To do this you will need to combine add and subtract operators with variables
Countess hamilton for for each parameter.
- Do not create any new variables
- Do not add any additional commands


*/

var photoBoard;
var bonesKarpinskiImg;
var cecilKarpinskiImg;
var countessHamiltonImg;
var annaKarpinskiImg;
var pawelKarpinskiImg;
var rockyKrayImg;


var countessHamiltonXPos = 701;
var countessHamiltonYPos = 40;


function preload()
{
	photoBoard = loadImage('photoBoard.png');
	bonesKarpinskiImg = loadImage("karpinskiDog.png");
	cecilKarpinskiImg = loadImage("karpinskiBros1.png");
	countessHamiltonImg = loadImage("countessHamilton.png");
	annaKarpinskiImg = loadImage("karpinskiWoman.png");
	pawelKarpinskiImg = loadImage("karpinskiBros2.png");
	rockyKrayImg = loadImage("krayBrothers1.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(countessHamiltonImg, countessHamiltonXPos, countessHamiltonYPos);

	image(bonesKarpinskiImg, 
          countessHamiltonXPos - 586, 
          countessHamiltonYPos);
	image(cecilKarpinskiImg, 
          countessHamiltonXPos - 293, 
          countessHamiltonYPos);
	image(annaKarpinskiImg, 
          countessHamiltonXPos - 586, 
          countessHamiltonYPos + 269);
	image(pawelKarpinskiImg, 
          countessHamiltonXPos - 293, 
          countessHamiltonYPos + 269);
	image(rockyKrayImg, 
          countessHamiltonXPos, 
          countessHamiltonYPos + 269);

}