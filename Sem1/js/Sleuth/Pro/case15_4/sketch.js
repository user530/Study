/*
801
Stage 4: The Marriage of Figaro

Officer: 2481930
CaseNum: 801-3-74501637-2481930

One last chance to record the Cooley gang before the curtain comes down on the Marriage of Figaro. They might be the most influential group in console city but they still have their quirks and will be spotable thanks their trademark bowler hat.

Our guy on the inside has only been able to provide us with the ticket stubs, they are in order and marked with true if they are in the gang. It’ll be tough but I’m sure you are up to it kid!

You’ll want to set the selected property of the viewers array to true when the equivalent element of the underSuspicion is also true.

Complete the case using
For
viewers[ ][ ]
You can create an additional variable if it helps.


*/

var crowdImg;
var spotlight;

var viewers = [[{"x":50,"y":50,"selected":false},{"x":150,"y":50,"selected":false},{"x":250,"y":50,"selected":false},{"x":350,"y":50,"selected":false},{"x":450,"y":50,"selected":false},{"x":550,"y":50,"selected":false},{"x":650,"y":50,"selected":false},{"x":750,"y":50,"selected":false},{"x":850,"y":50,"selected":false},{"x":950,"y":50,"selected":false}],[{"x":50,"y":130,"selected":false},{"x":150,"y":130,"selected":false},{"x":250,"y":130,"selected":false},{"x":350,"y":130,"selected":false},{"x":450,"y":130,"selected":false},{"x":550,"y":130,"selected":false},{"x":650,"y":130,"selected":false},{"x":750,"y":130,"selected":false},{"x":850,"y":130,"selected":false},{"x":950,"y":130,"selected":false}],[{"x":50,"y":210,"selected":false},{"x":150,"y":210,"selected":false},{"x":250,"y":210,"selected":false},{"x":350,"y":210,"selected":false},{"x":450,"y":210,"selected":false},{"x":550,"y":210,"selected":false},{"x":650,"y":210,"selected":false},{"x":750,"y":210,"selected":false},{"x":850,"y":210,"selected":false},{"x":950,"y":210,"selected":false}],[{"x":50,"y":290,"selected":false},{"x":150,"y":290,"selected":false},{"x":250,"y":290,"selected":false},{"x":350,"y":290,"selected":false},{"x":450,"y":290,"selected":false},{"x":550,"y":290,"selected":false},{"x":650,"y":290,"selected":false},{"x":750,"y":290,"selected":false},{"x":850,"y":290,"selected":false},{"x":950,"y":290,"selected":false}],[{"x":50,"y":370,"selected":false},{"x":150,"y":370,"selected":false},{"x":250,"y":370,"selected":false},{"x":350,"y":370,"selected":false},{"x":450,"y":370,"selected":false},{"x":550,"y":370,"selected":false},{"x":650,"y":370,"selected":false},{"x":750,"y":370,"selected":false},{"x":850,"y":370,"selected":false},{"x":950,"y":370,"selected":false}],[{"x":50,"y":450,"selected":false},{"x":150,"y":450,"selected":false},{"x":250,"y":450,"selected":false},{"x":350,"y":450,"selected":false},{"x":450,"y":450,"selected":false},{"x":550,"y":450,"selected":false},{"x":650,"y":450,"selected":false},{"x":750,"y":450,"selected":false},{"x":850,"y":450,"selected":false},{"x":950,"y":450,"selected":false}],[{"x":50,"y":530,"selected":false},{"x":150,"y":530,"selected":false},{"x":250,"y":530,"selected":false},{"x":350,"y":530,"selected":false},{"x":450,"y":530,"selected":false},{"x":550,"y":530,"selected":false},{"x":650,"y":530,"selected":false},{"x":750,"y":530,"selected":false},{"x":850,"y":530,"selected":false},{"x":950,"y":530,"selected":false}],[{"x":50,"y":610,"selected":false},{"x":150,"y":610,"selected":false},{"x":250,"y":610,"selected":false},{"x":350,"y":610,"selected":false},{"x":450,"y":610,"selected":false},{"x":550,"y":610,"selected":false},{"x":650,"y":610,"selected":false},{"x":750,"y":610,"selected":false},{"x":850,"y":610,"selected":false},{"x":950,"y":610,"selected":false}],[{"x":50,"y":690,"selected":false},{"x":150,"y":690,"selected":false},{"x":250,"y":690,"selected":false},{"x":350,"y":690,"selected":false},{"x":450,"y":690,"selected":false},{"x":550,"y":690,"selected":false},{"x":650,"y":690,"selected":false},{"x":750,"y":690,"selected":false},{"x":850,"y":690,"selected":false},{"x":950,"y":690,"selected":false}],[{"x":50,"y":770,"selected":false},{"x":150,"y":770,"selected":false},{"x":250,"y":770,"selected":false},{"x":350,"y":770,"selected":false},{"x":450,"y":770,"selected":false},{"x":550,"y":770,"selected":false},{"x":650,"y":770,"selected":false},{"x":750,"y":770,"selected":false},{"x":850,"y":770,"selected":false},{"x":950,"y":770,"selected":false}]];
var underSuspicion = [false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,true,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false];

var help = [];

function setup()
{
	createCanvas(1100, 1100);

	crowdImg = loadImage("crowd.png");
	spotlight = loadImage("spotlight.png");
    
//    for (let i = 0 ; i < underSuspicion.length ; i++)
//        {
//            if (underSuspicion[i] == true)
//            {
//                help.push(i);
//            }
//        }
////    console.log(help);
}

function draw()
{
	image(crowdImg, 0, 0);
	////////////YOUR CODE GOES HERE////////////////////////

//    for (let i = 0 ; i < underSuspicion.length ; i++)
//        {
//            console.log(floor(help[i]/10));
//            console.log(help[i]%10);
//            viewers[floor(help[i]/10)][help[i]%10].selected = true;
//        }
            
            // Variant_2
//            if (underSuspicion[i] == true)
//                {
//                    viewers[floor(i/10)][i%10].selected = true;
//                }
//            
//           }

    for (let i = 0 ; i < viewers.length ; i++)
        {
            for (let j = 0 ; j < viewers[0].length ; j++)
                {
                    if (underSuspicion[i * 10 + j])
                        {
                            viewers[i][j].selected = true;
                        }
                }
        }
            

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

	for (var i = 0; i < viewers.length; i++)
	{
		for (var j = 0; j < viewers[i].length; j++)
		{
			if (viewers[i][j].selected)
			{
				image(spotlight, viewers[i][j].x, viewers[i][j].y, 100 , 100 );
			}
		}
	}
}
