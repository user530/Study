/*
201 - The case of Judge Hopper
Stage 4 - The warehouse

Officer: 2481930
CaseNum: 201-3-76038294-2481930

As you enter the ALGOL warehouse you are struck by the most horrendous stench - it’s not the fish. Lying amongst piles of fish carcasses you find the body of Judge Hopper. Gathering yourself together, you tie a handkerchief around your nose and mouth and quickly set about recording the evidence.

Draw around the Judge’s body ...

You should need around 20 vertices to draw round the judge and make sure you close your shape!


*/

var img;

function preload()
{
    img = loadImage('scene.png');
}

function setup()
{
    createCanvas(img.width,img.height);
}

function draw()
{

    image(img,0,0);
    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();

    // write the code to draw around the Judge's body below
    beginShape();
    vertex(600, 190);
    vertex(594, 226);
    vertex(565, 208);
    vertex(453, 178);
    vertex(438, 147);
    vertex(420, 145);
    vertex(430, 197);
    vertex(550, 250);
    vertex(410, 475);
    vertex(410, 527);
    vertex(502, 548);
    vertex(565, 495);
    vertex(640, 330);
    vertex(682, 354);
    vertex(745, 305);
    vertex(733, 286);
    vertex(712, 286);
    vertex(685, 320);
    vertex(655, 210);
    vertex(640, 190);
    endShape(CLOSE);
    
    

}
