//document.addEventListener('DOMContentLoaded', () => {
//  var canvas = document.createElement('canvas')
//
//  var container = document.querySelector('.TestDIV')
//
//  container.appendChild(canvas);
//    
var x;
var speed_x;
var y;
var speed_y;
var a;
var b;
var figure1;

function setup()
{
	createCanvas(1000, 500);
    figure1 = {
        x: width/2 + random(0, 100),
        y: height/2 + random(0, 100),
        a: 50,
        b: 10,
        speed_x: random(1, 3),
        speed_y: random(1, 3)}

}

function draw()
{
    
background(255,255,255);
 strokeWeight(4);
 stroke(255,0,0);
 fill(255,0,0);

//Borders
push();
noFill();
rect(0,0, width, height);
pop();
    
// Figure
    
rect(figure1.x, figure1.y, figure1.a, figure1.b);

    
    
if (frameCount > 40)
    {
        figure1.x += figure1.speed_x;
        figure1.y += figure1.speed_y;
    }
    
if ((figure1.x < 0) || (figure1.x + figure1.a > width))
    {
        figure1.speed_x = - figure1.speed_x;
    }

if ((figure1.y < 0) || (figure1.y + figure1.b > height))
    {
        figure1.speed_y = - figure1.speed_y;
    }
}
//});
