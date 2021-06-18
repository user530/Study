

var house;
var windows;
var ground;

function setup()
{
    createCanvas(800,600);
    
    ground = {x: 0,
              y: height * 0.8,
              color : [120, 100, 150]}
    
    house = {x: width * 0.2,
             y: height * 0.3,
             width: width * 0.6,
             height: height * 0.5,
             color_main: [190, 190, 190],
             color_add: [150, 50, 0]};
    
    windows = [{x: house.x + 40, 
                y: house.y + 50,
                height: 70,
                width: 100,
                color_on: [200, 200, 100],
                color_off: [0, 0, 0],
                on: false}, 
               {x: house.x + house.width - 140, 
                y: house.y + 50,
                height: 70,
                width: 100,
                color_on: [200, 200, 100],
                color_off: [0, 0, 0],
                on: false}, 
               {x: house.x + house.width/2 - 50, 
                y: house.y + 50,
                height: 70,
                width: 100,
                color_on: [200, 200, 100],
                color_off: [0, 0, 0],
                on: false}, 
               {x: house.x + 40, 
                y: house.y + house.height - 140,
                height: 70,
                width: 100,
                color_on: [200, 200, 100],
                color_off: [0, 0, 0],
                on: false}, 
               {x: house.x + house.width - 140, 
                y: house.y + house.height - 140,
                height: 70,
                width: 100,
                color_on: [200, 200, 100],
                color_off: [0, 0, 0],
                on: false}]
}

function draw()
{
    
    background(150,180,255);
    noStroke();
    drawGround();
    drawHouse();
    
    for (let i = 0 ; i < windows.length ; i++)
        {
            drawWindows(windows[i]);
        }
    
}

function drawHouse()
{
    //draw a house
    push();
    stroke(0, 0, 0);
    fill(house.color_main);
    rect(house.x, house.y, house.width, house.height);
    
    fill(house.color_add);
    triangle(house.x - 50, house.y, house.x + house.width/2, height * 0.10, house.x + house.width + 50, house.y);
    rect(house.x + house.width/2 - 25, house.y + house.height - 100, 50, 100);
    pop();
}

function drawGround()
{
    fill(ground.color);
    rect(ground.x, ground.y, width, height - ground.y);
}

function drawWindows(window)
{
    push();
    stroke(0, 0, 0);
    if (window.on)fill(window.color_on);
    else fill(window.color_off);
    rect(window.x, window.y, window.width, window.height);
    pop();
}

function switchLight(room)
{
    room.on = !room.on;
}

function mousePressed()
{
    for (let i = 0 ; i < windows.length ; i++)
        {
            if (((mouseX >= windows[i].x) && (mouseX <= windows[i].x + windows[i].width)) && 
            ((mouseY >= windows[i].y) && (mouseY <= windows[i].y + windows[i].height)))
                {
                    switchLight(windows[i]);
                }
        }
    
}
