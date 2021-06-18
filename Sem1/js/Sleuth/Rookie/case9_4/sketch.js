/*

Officer: 2481930
CaseNum: 403-3-18785840-2481930

Case 403 - Captured - stage 4

A coordinated action is under way to arrest Shiffman. Police are currently in pursuit on Gosling Road.
In order to catch him we must be able to alert all forces of his whereabouts according to the following rules:

- if Shiffman is within 66 meters from Department of Justice then alert local police by drawing a Green circle around it with a radius of 66 pixels.
- if Shiffman is in City Narrows then the neighbourhood watch must be notified by drawing a Gold rectangle around it.
- if Shiffman is in neither position, a global alert must be issued by drawing a DarkOrange rectangle covering the area between Ada Avenue, Turing Place, Gosling Road and Mullenweg Street.

Shiffman's position is signified by the mouse.

Note: all road coordinates are measured from their center.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  if()
  fill()
  rect()
  ellipse()
  dist()

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
    
    if (dist(999, 522, mouseX, mouseY) <= 66)
        {
            fill(0, 128, 0);
            ellipse(999, 522, 66*2);
        }
    
    if ((mouseX >= 1790 && mouseX <= 1903) && (mouseY >= 58 && mouseY <= 166))
        {
            fill(255, 215, 0);
            rect(1790, 58, 113, 108);
        }
    
    if ((dist(999, 522, mouseX, mouseY) > 66) && ((mouseX < 1790 || mouseX > 1903) || (mouseY < 58 || mouseY > 166)))
        {
            fill(255, 140, 0);
            rect(255, 195, 1115 - 255, 775 - 195);
        }
    

    fill(255, 0, 0);
    text('X:'+mouseX+' Y:'+mouseY, mouseX, mouseY);
    
    // finally, draw Shiffman's position
    strokeWeight(2);
    stroke(255);
    fill(255,0,0);
    ellipse(mouseX, mouseY, 10, 10);
}
