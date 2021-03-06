function setup()
{
	//create your canvas here
    createCanvas(1000, 1000);
    background(255,140,0);
}

function draw()
{
	//do your drawing here
    strokeWeight(10);
    
    fill(0,0,0,0);
    ellipse(500,-100,1500,1500);
    ellipse(500,-100,1500,1750);
    ellipse(500,-100,1500,2000);
    triangle(500,-100,-50,1200,1050,1200);
    triangle(500,-100-100,-50-100,1200,1050+100,1200);
    triangle(500,-100-200,-50-200,1200,1050+200,1200);
    fill(255,255,255);
    triangle(50,150,950,150,500,950);
    
    fill(255,140,0);
    triangle(50,150,250,150,150,315);
    triangle(950,150,750,150,850,315);
    strokeWeight(5);
    fill(255,255,255);
    triangle(80,170,220,170,150,285);
    triangle(920,170,780,170,850,285);
    strokeWeight(10);
    
    fill(102,205,170);
    line(250,330,350,350);
    ellipse(340,400,105);
    line(750,330,650,350);
    ellipse(660,400,105);
    
    stroke(255,140,0);
    line(290,500,710,500);
    line(320,550,680,550);
    stroke(0);
    
    fill(0);
    ellipse(340,400,10,50);
    ellipse(660,400,10,50);
        
    fill(255,140,0);
    line(300,200,700,200);
    line(330,250,670,250);
    rect(450,150,100,400);
    triangle(340,650,660,650,500,300);
    
    strokeWeight(5);
    noFill();
    triangle(340,650,500,650,420,800);
    point(340+30,650+30);
    point(340+60,650+30);
    point(340+90,650+30);
    point(340+120,650+30);
    point(360+30,680+30);
    point(360+60,680+30);
    point(360+90,680+30);
    point(380+30,710+30);
    point(400+30,710+30);
    point(420,740+30);
    
    triangle(660,650,500,650,580,800);
    point(500+30,650+30);
    point(500+60,650+30);
    point(500+90,650+30);
    point(500+120,650+30);
    point(520+30,680+30);
    point(520+60,680+30);
    point(520+90,680+30);
    point(540+30,710+30);
    point(560+30,710+30);
    point(580,740+30);
    
    fill(255,192,203);
    triangle(500,650+80,370,550+40,630,550+40);
    
    strokeWeight(5);
    line(500,735,500,755);
    line(420,800,500,755);
    line(580,800,500,755);

    
}