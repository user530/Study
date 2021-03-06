/*
801
Stage 1: Rigoletto

Officer: 2481930
CaseNum: 801-0-75082601-2481930

The deeper we dig into the underworld of this city the higher up the echelons of power we find ourselves.  These aren’t just small time crooks kid. We are looking into the secret orders, societies and gangs. They are cultured, educated and filthy smart. We are sure they are all connected to the Cooley gang, the real owners of this city. Their power and influence make them hard to track down.

Word has it that Order of The Knuth's are at the command performance of Rigoletto at the console city Opera house tonight. Lucky for us, our person on the inside is working the box office. We’ve got their seat numbers and access to the lighting desk. Set the spotlights to shine on the member’s of the order. This is where they will be seated:

the 5th row, 3rd seat
the 7th row, 6th seat
the 3rd row, 7th seat
the 5th row, 8th seat
the 10th row, 9th seat
the 7th row, 3rd seat
the 5th row, 7th seat
the 10th row, 3rd seat


Set the highlighted property of the operaBuffs to true and the lights will highlight the gang in the darkness. I’ll be hiding in the wings to nab a photo during the first act and we’ll be able to ID this secret society.

Oh yeah, I almost forgot. Our informant also told us to look out for the orders trademark moustache, it’ll help us in our task. This is our first step in covering the network of secret organisations which will lead us to the Cooley's.

There are many ways to complete the case but you should only use:
operaBuffs[#][#] to update the property


*/

var crowdImg;
var spotlight;

var operaBuffs = [
    [{"x":50,"y":50,"highlighted":false},{"x":150,"y":50,"highlighted":false},{"x":250,"y":50,"highlighted":false},{"x":350,"y":50,"highlighted":false},{"x":450,"y":50,"highlighted":false},{"x":550,"y":50,"highlighted":false},{"x":650,"y":50,"highlighted":false},{"x":750,"y":50,"highlighted":false},{"x":850,"y":50,"highlighted":false},{"x":950,"y":50,"highlighted":false}],
    
    [{"x":50,"y":130,"highlighted":false},{"x":150,"y":130,"highlighted":false},{"x":250,"y":130,"highlighted":false},{"x":350,"y":130,"highlighted":false},{"x":450,"y":130,"highlighted":false},{"x":550,"y":130,"highlighted":false},{"x":650,"y":130,"highlighted":false},{"x":750,"y":130,"highlighted":false},{"x":850,"y":130,"highlighted":false},{"x":950,"y":130,"highlighted":false}],
    
    [{"x":50,"y":210,"highlighted":false},{"x":150,"y":210,"highlighted":false},{"x":250,"y":210,"highlighted":false},{"x":350,"y":210,"highlighted":false},{"x":450,"y":210,"highlighted":false},{"x":550,"y":210,"highlighted":false},{"x":650,"y":210,"highlighted":false},{"x":750,"y":210,"highlighted":false},{"x":850,"y":210,"highlighted":false},{"x":950,"y":210,"highlighted":false}],
    
    [{"x":50,"y":290,"highlighted":false},{"x":150,"y":290,"highlighted":false},{"x":250,"y":290,"highlighted":false},{"x":350,"y":290,"highlighted":false},{"x":450,"y":290,"highlighted":false},{"x":550,"y":290,"highlighted":false},{"x":650,"y":290,"highlighted":false},{"x":750,"y":290,"highlighted":false},{"x":850,"y":290,"highlighted":false},{"x":950,"y":290,"highlighted":false}],
    
    [{"x":50,"y":370,"highlighted":false},{"x":150,"y":370,"highlighted":false},{"x":250,"y":370,"highlighted":false},{"x":350,"y":370,"highlighted":false},{"x":450,"y":370,"highlighted":false},{"x":550,"y":370,"highlighted":false},{"x":650,"y":370,"highlighted":false},{"x":750,"y":370,"highlighted":false},{"x":850,"y":370,"highlighted":false},{"x":950,"y":370,"highlighted":false}],
    
    [{"x":50,"y":450,"highlighted":false},{"x":150,"y":450,"highlighted":false},{"x":250,"y":450,"highlighted":false},{"x":350,"y":450,"highlighted":false},{"x":450,"y":450,"highlighted":false},{"x":550,"y":450,"highlighted":false},{"x":650,"y":450,"highlighted":false},{"x":750,"y":450,"highlighted":false},{"x":850,"y":450,"highlighted":false},{"x":950,"y":450,"highlighted":false}],
    
    [{"x":50,"y":530,"highlighted":false},{"x":150,"y":530,"highlighted":false},{"x":250,"y":530,"highlighted":false},{"x":350,"y":530,"highlighted":false},{"x":450,"y":530,"highlighted":false},{"x":550,"y":530,"highlighted":false},{"x":650,"y":530,"highlighted":false},{"x":750,"y":530,"highlighted":false},{"x":850,"y":530,"highlighted":false},{"x":950,"y":530,"highlighted":false}],
    
    [{"x":50,"y":610,"highlighted":false},{"x":150,"y":610,"highlighted":false},{"x":250,"y":610,"highlighted":false},{"x":350,"y":610,"highlighted":false},{"x":450,"y":610,"highlighted":false},{"x":550,"y":610,"highlighted":false},{"x":650,"y":610,"highlighted":false},{"x":750,"y":610,"highlighted":false},{"x":850,"y":610,"highlighted":false},{"x":950,"y":610,"highlighted":false}],
    
    [{"x":50,"y":690,"highlighted":false},{"x":150,"y":690,"highlighted":false},{"x":250,"y":690,"highlighted":false},{"x":350,"y":690,"highlighted":false},{"x":450,"y":690,"highlighted":false},{"x":550,"y":690,"highlighted":false},{"x":650,"y":690,"highlighted":false},{"x":750,"y":690,"highlighted":false},{"x":850,"y":690,"highlighted":false},{"x":950,"y":690,"highlighted":false}],
    
    [{"x":50,"y":770,"highlighted":false},{"x":150,"y":770,"highlighted":false},{"x":250,"y":770,"highlighted":false},{"x":350,"y":770,"highlighted":false},{"x":450,"y":770,"highlighted":false},{"x":550,"y":770,"highlighted":false},{"x":650,"y":770,"highlighted":false},{"x":750,"y":770,"highlighted":false},{"x":850,"y":770,"highlighted":false},{"x":950,"y":770,"highlighted":false}]];

function setup()
{
	createCanvas(1100, 1100);

	crowdImg = loadImage("crowd.png");
	spotlight = loadImage("spotlight.png");
}



function draw()
{
	image(crowdImg, 0, 0);
	////////////YOUR CODE GOES HERE////////////////////////

    operaBuffs[4][2].highlighted = true;
    operaBuffs[6][5].highlighted = true;
    operaBuffs[2][6].highlighted = true;
    operaBuffs[4][7].highlighted = true;
    operaBuffs[9][8].highlighted = true;
    operaBuffs[6][2].highlighted = true;
    operaBuffs[4][6].highlighted = true;
    operaBuffs[9][2].highlighted = true;
//    the 5th row, 3rd seat
//the 7th row, 6th seat
//the 3rd row, 7th seat
//the 5th row, 8th seat
//the 10th row, 9th seat
//the 7th row, 3rd seat
//the 5th row, 7th seat
//the 10th row, 3rd seat


	///////////DON'T CHANGE ANY CODE BELOW HERE////////////
	blendMode(BLEND);
	background(80);
	highlight();
	blendMode(DARKEST);
	image(crowdImg, 0, 0);
}

function highlight()
{
	fill(255, 0, 0, 100);

	for (var i = 0; i < operaBuffs.length; i++)
	{
		for (var j = 0; j < operaBuffs[i].length; j++)
		{
			if (operaBuffs[i][j].highlighted)
			{
				image(spotlight, operaBuffs[i][j].x, operaBuffs[i][j].y, 100 , 100 );
			}
		}
	}
}
