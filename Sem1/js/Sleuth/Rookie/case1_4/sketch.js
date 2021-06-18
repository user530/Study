/*

Officer: 2481930
CaseNum: 101-3-74026846-2481930

Case 101 - The Case of Lina Lovelace
Stage 4 - The Plaza Hotel

Okay this place is more Lina’s style. Now’s our chance to find out the root of all
of this. Lets see who is Lina meeting.

Identify Lina by drawing a Red filled rectangle with a Magenta outline.
She’s the woman in the red dress of course.

Identify the man with the monocle smoking the cigar by drawing a Purple filled
rectangle with a Coral outline around him.

Identify the man reading the newspaper by drawing a Gold filled rectangle
with a Sea Green outline around him.

Identify the woman with the dog by drawing a Dark Orange filled rectangle with a
Chocolate outline around her. Make sure you include the dog too.

The rectangles should cover the targets as accurately as possible without
including anything else.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  rect()
  fill() Use r,g,b values between 0 and 255. Set alpha to 100 for some opacity.
	stroke() Use r,g,b values between 0 and 255.

*/

var img;

function preload()
{
	img = loadImage('img.jpg');
}

function setup()
{
	createCanvas(img.width,img.height);
	strokeWeight(2);
}

function draw()
{
	image(img,0,0);

	//Write your code below here ...
    fill(255, 0, 0);
    stroke(255, 0, 255);
    rect(350, 20, 255, 530);
    
    fill(128, 0, 128);
    stroke(255, 127, 80);
    rect(180, 140, 130, 170);
    
    fill(255, 215, 0);
    stroke(46, 139, 87);
    rect(80, 20, 60, 130);
    
    fill(255, 140, 0);
    stroke(210, 105, 30);
    rect(905, 40, 175, 370);

}
