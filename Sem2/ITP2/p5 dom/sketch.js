var myRobot;


function setup() {
	// put setup code here
	createCanvas(500, 500);
	myRobot = new Robot("grey", false, "marvin", 0);
    angleMode(DEGREES);
    
    
    var myDiv = select("#myDiv");
	select("#myDiv").style("width", "200px");
}

function draw() {
	// put drawing code here
	background(50);
    
//    myRobot.transmitting = transmitButton.value();
//    
//    myRobot.colour = colourSelect.selected();
//    
//    myRobot.rotation = rotationSlider.value();
//    
//    myRobot.name = nameText.value();
        
	myRobot.drawRobot();
    
    textSize(32);
    textAlign(CENTER);
    fill(255);
    text(myRobot.name, 0, 200);
}

function Robot(colour, transmitting, name, rotation) {
	this.colour = colour;
	this.rotation = rotation;
	this.transmitting = transmitting;
	this.name = name;
    
    var self = this; 
    
    //add dom controls
    var transmitButton;
    transmitButton = createButton("transmit");
    transmitButton.parent(myDiv);
    transmitButton.mousePressed(function(){self.transmitting = !self.transmitting});
    
    var rotationSlider;
    rotationSlider = createSlider(-360, 360, 0, 10);
    rotationSlider.parent(myDiv);
    rotationSlider.input(function(){self.rotation = this.value()})
    
    var nameText;
    nameText = createInput("marvin");
    nameText.parent(myDiv);
    nameText.input(function(){self.name = this.value()});
    
    var colourSelect;
    colourSelect = createSelect();
    colourSelect.parent(myDiv);
    
    var colours = ["red", "green", "blue"];
    for (let i = 0; i < colours.length; i++){
        colourSelect.option(colours[i]);
    }
    
    colourSelect.input(function(){self.colour = this.value()});
    
    
    
    
    
    
    
    
    
	this.drawRobot = function() {
		translate(width / 2, height / 2);
		//robots head
		fill(this.colour);
		strokeWeight(4);
        
        rotate(this.rotation);
        
		rect(-150, -150, 300, 300, 20);

		//robots antenna
		if (this.transmitting) {
			fill(250, 250, 0);
		} else {
			fill(255, 255, 200);
		}

		ellipse(0, -180, 60, 60);

		fill(200, 0, 200);
		rect(-40, -170, 80, 30);

		//robots eyes
		fill(255);
		ellipse(-75, -50, 80, 80);
		point(-75, -50);
		ellipse(75, -50, 80, 80);
		point(75, -50);


		//robots nose
		fill(255, 0, 0);
		triangle(0, -30, -50, 50, 50, 50);

		//robots ears
		rect(-170, -70, 30, 100);
		rect(140, -70, 30, 100);

		//robots mouth
		noFill();
		beginShape();
		vertex(-75, 90);
		vertex(-50, 120);
		vertex(-25, 90);
		vertex(0, 120);
		vertex(25, 90);
		vertex(50, 120);
		vertex(75, 90);
		endShape();
	}
}