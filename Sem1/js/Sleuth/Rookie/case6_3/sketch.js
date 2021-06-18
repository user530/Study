/*

Officer: 2481930
CaseNum: 303-2-85225908-2481930

Case 303 - The Case of the Crooked Attorney
Stage 3 - The Gates Bank

I’ve made an appointment for you at the Gates Bank to retrieve your safe deposit box from the vault.
Actually you will break into Torvalds’ one.

Crack the safe by doing the following:

	When the mouse button is pressed:
	- Make HiddenVaultValA equal to the value of mouseY
	- Use the 'max' function to prevent HiddenVaultValA from falling below 3

	When the mouse button is released:
	- Increment HiddenVaultValB by 2
	- Use the 'constrain' function to prevent HiddenVaultValB from falling below 3 and going above 13

	Whilst the mouse is being dragged:
	- Make HiddenVaultValC equal to the value of mouseY
	- Use the 'constrain' function to prevent HiddenVaultValC from falling below 2 and going above 16

	Whilst the mouse is moving:
	- Increment HiddenVaultValD by 3
	- Use the 'min' function to prevent HiddenVaultValD from going above 17

	When the mouse button is released:
	- Make HiddenVaultValE equal to the value of mouseX
	- Use the 'min' function to prevent HiddenVaultValE from going above 69



This time you'll need to create the relevant event handlers yourself.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

	- The assignment operator aka. the equals sign !
	- mouseX, mouseY
	- Incrementing +=
	- Decrementing -=
	- min, max
	- constrain

*/

//declare the variables

var HiddenVaultValA;
var HiddenVaultValB;
var HiddenVaultValC;
var HiddenVaultValD;
var HiddenVaultValE;


function preload()
{
	//IMAGES WILL BE LOADED HERE

}

function setup()
{
	createCanvas(512,512);

	//initialise the variables
	HiddenVaultValA = 0;
	HiddenVaultValB = 0;
	HiddenVaultValC = 0;
	HiddenVaultValD = 0;
	HiddenVaultValE = 0;

}

///////////////////EVENT HANDLERS///////////////////

//Create event handlers here to open the safe ...

function mousePressed(){
    HiddenVaultValA = max(3, mouseY);
}

function mouseReleased(){
    //HiddenVaultValB = constrain(HiddenVaultValB+2, 3, 13);
    HiddenVaultValB += 2;
    HiddenVaultValB = constrain(HiddenVaultValB, 3, 13);
    
    HiddenVaultValE = min(69, mouseX);
    console.log(HiddenVaultValB);
}

function mouseDragged(){
    HiddenVaultValC = constrain(mouseY, 2, 16);
}

function mouseMoved(){
    HiddenVaultValD += 3;
    HiddenVaultValD = min(17, HiddenVaultValD);
}

///////////////DO NOT CHANGE CODE BELOW THIS POINT///////////////////

function draw()
{

	//Draw the safe door
	background(70);
	noStroke();
	fill(29,110,6);
	rect(26,26,width-52,width-52);

	//Draw the combination dials
	push();
	translate(120,170);
	drawDial(140,HiddenVaultValA, 16);
	pop();

	push();
	translate(120,380);
	drawDial(140,HiddenVaultValB, 19);
	pop();

	push();
	translate(280,170);
	drawDial(140,HiddenVaultValC, 21);
	pop();

	push();
	translate(280,380);
	drawDial(140,HiddenVaultValD, 21);
	pop();

	//Draw the lever
	push();
	translate(width - 125,256);
	drawLever(HiddenVaultValE);
	pop();


}

function drawDial(diameter,num,maxNum)
{
	//the combination lock

	var r = diameter * 0.5;
	var p = r * 0.6;

	stroke(0);
	fill(255,255,200);
	ellipse(0,0,diameter,diameter);
	fill(100);
	noStroke();
	ellipse(0,0,diameter*0.66,diameter*0.66);
	fill(150,0,0);
	triangle(
		-p * 0.4,-r-p,
		p * 0.4,-r-p,
		0,-r-p/5
	);

	noStroke();

	push();
	var inc = 360/maxNum;

	rotate(radians(-num * inc));
	for(var i = 0; i < maxNum; i++)
	{
		push();
		rotate(radians(i * inc));
		stroke(0);
		line(0,-r*0.66,0,-(r-10));
		noStroke();
		fill(0);
		text(i,0,-(r-10));
		pop();
	}

	pop();
}

function drawLever(rot)
{
	push();
	rotate(radians(-rot))
	stroke(0);
	fill(100);
	rect(-10,0,20,100);
	ellipse(0,0,50,50);
	ellipse(0,100,35,35);
	pop();
}
