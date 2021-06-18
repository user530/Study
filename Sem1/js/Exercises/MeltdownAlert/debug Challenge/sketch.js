var redButton;
var alertFlash = true;

function setup()
{
	createCanvas(600, 700);

	redButton = {
		x: width / 2,
		y: height / 2,
		dia: 200,
		activated: false
	}

}

function mousePressed()
{
    
	if (dist(mouseX, mouseY, redButton.x, redButton.y) < redButton.dia/2)
	{
		if (redButton.activated == true)
		{
			redButton.activated = false;
		}
		else
		{
			redButton.activated = true;
		}
	}
}

function draw()
{
	background(255);

	if (frameCount / 30 == parseInt(frameCount / 30))
	{
		if (alertFlash == true)
		{
			alertFlash = false;
		}
		else
		{
			alertFlash = true;
		}
	}

	if (redButton.activated == true)
	{
		background(250, 250, 0);

		if (alertFlash)
		{
			textSize(35);
			text("Meltdown Sequence Initiated!!!", width / 2, height / 2 - redButton.dia);
		}

	}


	fill(255, 0, 0);
	stroke(200, 30, 30);
	strokeWeight(20);
	ellipse(redButton.x, redButton.y, redButton.dia);
	noFill();
	stroke(255, 100, 100);
	arc(redButton.x, redButton.y, redButton.dia, redButton.dia, PI, PI * 2);


	textAlign(CENTER);
	textSize(40);
	strokeWeight(1);
	stroke(0);
	fill(0);
	text("DO NOT PRESS", width / 2, height / 2 + redButton.dia);

}

