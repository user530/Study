/*

Officer: 2481930
CaseNum: 403-1-42748739-2481930

Case 403 - Stake out - stage 2

I've gotten hold of a hot tip that Shiffman is hiding out at Norbert's Begel Emporium.
We've alerted the local precinct but they cannot act unless they know for certain that he's within 229 meters (pixels) of the spot.

Whenever Shiffman (signified by the mouse) is within 229 pixels of Norbert's Begel Emporium - draw a Chartreuse ellipse with a radius of 229 around it.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  if()
  fill()
  ellipse()
  dist()
  mouseX
  mouseY

*/

var img;

function preload()
{
	img = loadImage('map.jpg');
}

function setup()
{
	createCanvas(img.width,img.height);
}

function draw()
{
    // draw the image
    image(img,0,0);

    //Write your code below here ...

    if (dist(1024, 705, mouseX, mouseY) <= 229)
        {
            fill(127, 255, 0);
            ellipse(1024, 705, 229 * 2);
        }
    
    text('X:'+mouseX+' Y:'+mouseY+' D:'+dist(1025, 705, mouseX, mouseY), mouseX, mouseY);

    // finally, draw Shiffman's position
    strokeWeight(2);
    stroke(255);
    fill(255,0,0);
    ellipse(mouseX, mouseY, 10, 10);
}
