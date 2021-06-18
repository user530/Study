function setup()
{
	createCanvas(800, 600);
    background(255,255,255);
    strokeWeight(1);
    fill(255,0,0);
    rect(0,0,50,50);
    
    fill(0,255,0);
    rect(50,0,50,50);
    
    fill(0,0,255);
    rect(100,0,50,50);
    
    noFill();
    rect(0,50,50,50);
    rect(50,50,50,50);
    rect(100,50,50,50);
    fill(0);
    ellipse(50/2,50+50/2,10);
    ellipse(50+50/2,50+50/2,25);
    ellipse(100+50/2,50+50/2,40);
}



function draw()
{
    
}
    function mousePressed(){
        if (mouseX < 50 && mouseY < 50) {
            stroke(255,0,0);
        } else if (mouseX > 50 && mouseX < 100 && mouseY < 50) {
            stroke(0,255,0);
        } else if (mouseX > 100 && mouseX < 150 && mouseY < 50) {
            stroke(0,0,255);
        } else if (mouseX < 50 && mouseY > 50 && mouseY < 100) {
            strokeWeight(1);
        } else if (mouseX > 50 && mouseX < 100 && mouseY > 50 && mouseY < 100) {
            strokeWeight(3);
        } else if (mouseX > 100 && mouseX < 150 && mouseY > 50 && mouseY < 100) {
            strokeWeight(9);
        }
        
    
    
    
    } 
    
    function mouseDragged(){
        if (mouseX<150 && mouseY<100){
        } else {line(pmouseX,pmouseY,mouseX,mouseY);
               }
    }
