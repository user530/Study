/*

Officer: 2481930
CaseNum: 401-2-24564609-2481930

Case 401 - The Case of Norbert's Weiner Stand
Stage 3 - Bilious bagel

As I suspected Norbert has struck again. Ever inventive he’s set up a bagel stand and
has laced the cream cheese with an ingenious but vicious toxin. This one is quite
deadly so get yourself down to the lab right away.

You must develop the antidote by using conditional statements in the draw loop to
do the following.

	- When either cyanide dips below 0.63, amanita_mushrooms dips below 0.51, or perhaps sarin goes above 0.5, decrease Beta_Blocker by 0.02
	- When warfarin goes above 0.74 or alcohol dips below 0.74, increment Beta_Blocker by 0.04
	- If warfarin dips below 0.52 and alcohol dips below 0.39, decrease antibodies by 0.02
	- When either amanita_mushrooms dips below 0.6, sarin goes above 0.67, or perhaps cyanide dips below 0.75, increase antibodies by 0.02
	- When deadly_nightshade dips below 0.7 and sarin goes above 0.73, reduce glucagon by 0.01
	- If alcohol goes above 0.54 or warfarin goes above 0.68, raise glucagon by 0.04
	- When deadly_nightshade goes above 0.25 and amanita_mushrooms goes above 0.41, decrement aspirin by 0.02
	- When cyanide dips below 0.57, whilst at the same time, warfarin goes above 0.45 or alcohol dips below 0.7, increment aspirin by 0.02


Your conditional statements should:

consider the following poisons:

	- deadly_nightshade
	- warfarin
	- sarin
	- alcohol
	- amanita_mushrooms
	- cyanide


and modify the following antidotes:

	- Beta_Blocker
	- antibodies
	- glucagon
	- aspirin


- There are many ways to complete this task but you should only use the
following commands:

	if(){}
	+=
	-=

*/

//Declare the poison variables
var deadly_nightshade;
var warfarin;
var sarin;
var alcohol;
var amanita_mushrooms;
var cyanide;


//Declare the antidote variables
var Beta_Blocker;
var antibodies;
var glucagon;
var aspirin;


//This variable is used for drawing the graph
var graphs;


function setup()
{

	createCanvas(800,600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	deadly_nightshade = 0.5;
	warfarin = 0.5;
	sarin = 0.5;
	alcohol = 0.5;
	amanita_mushrooms = 0.5;
	cyanide = 0.5;
	Beta_Blocker = 0.5;
	antibodies = 0.5;
	glucagon = 0.5;
	aspirin = 0.5;


	//fills the graph with empty values
	graphs = [];

	for(var i = 0; i < 6; i++)
	{
		graphs.push([]);
		for(var j = 0; j < 512; j++)
		{
			graphs[i].push(0.5);
		}
	}

}

function draw()
{

	//Develop the antidote below
	//Write conditional statements to change the amount of each substance ...

    if ((cyanide < 0.63) || (amanita_mushrooms < 0.51) || (sarin > 0.5)){
        Beta_Blocker -= 0.02;
        }
	if ((warfarin > 0.74) || (alcohol < 0.74)){
        Beta_Blocker += 0.04;
    }
	if ((warfarin < 0.52) && (alcohol < 0.39)){
        antibodies -= 0.02;
    }
	if ((amanita_mushrooms < 0.6) || (sarin > 0.67) || (cyanide < 0.75)){
        antibodies += 0.02;
    }
	if ((deadly_nightshade < 0.7) && (sarin > 0.73)){
        glucagon -= 0.01;
    }
	if ((alcohol > 0.54) || (warfarin > 0.68)){
        glucagon += 0.04;
    }
	if ((deadly_nightshade > 0.25) && (amanita_mushrooms > 0.41)){
        aspirin -= 0.02;
    }
	if ((cyanide < 0.57) && ((warfarin > 0.45) || (alcohol < 0.7))){
        aspirin += 0.02;
    }


	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	deadly_nightshade = nextValue(graphs[0],deadly_nightshade);
	warfarin = nextValue(graphs[1],warfarin);
	sarin = nextValue(graphs[2],sarin);
	alcohol = nextValue(graphs[3],alcohol);
	amanita_mushrooms = nextValue(graphs[4],amanita_mushrooms);
	cyanide = nextValue(graphs[5],cyanide);


	Beta_Blocker = constrain(Beta_Blocker, 0, 1);
	antibodies = constrain(antibodies, 0, 1);
	glucagon = constrain(glucagon, 0, 1);
	aspirin = constrain(aspirin, 0, 1);


	///////// DO NOT CHANGE THE CODE BELOW ///////////

	//drawing code

	// set background
	background(0);
	noFill();

	//draw the graphs for the vitals
	var colors = [
	color(255, 0, 0),
	color(0, 255, 0),
	color(0, 0, 255),
	color(255, 0, 255),
	color(255, 255, 0),
	color(0, 255, 255)
	];

	for(var i = 0; i < graphs.length; i++)
	{
		stroke(colors[i]);
		drawGraph(graphs[i]);
	}

	//draw the poisons as text
	noStroke();
	fill(colors[0]);
	text('deadly_nightshade: ' + nf(deadly_nightshade,1,2), 20,20);
	fill(colors[1]);
	text('warfarin: ' + nf(warfarin,1,2), 20,40);
	fill(colors[2]);
	text('sarin: ' + nf(sarin,1,2), 20,60);
	fill(colors[3]);
	text('alcohol: ' + nf(alcohol,1,2), 20,80);
	fill(colors[4]);
	text('amanita_mushrooms: ' + nf(amanita_mushrooms,1,2), 20,100);
	fill(colors[5]);
	text('cyanide: ' + nf(cyanide,1,2), 20,120);


	//draw the antidotes bar chart
	drawBar(Beta_Blocker,50,'Beta_Blocker');
	drawBar(antibodies,200,'antibodies');
	drawBar(glucagon,350,'glucagon');
	drawBar(aspirin,500,'aspirin');


}

function nextValue(graph, val)
{
	//gets the next value for a vital and puts it in an array for drawing
	var delta = random(-0.03,0.03);

	val += delta;
	if(val > 1 || val < 0)
	{
		delta *= -1;
		val += delta * 2;
	}

	graph.push(val)
	graph.shift();
	return val;
}

function drawGraph(graph)
{
	//draws an array as a graph
	beginShape();
	for(var i = 0; i < graph.length; i++)
	{
			vertex(width * i/512, height * 0.5 - graph[i]* height/3)
	}
	endShape();
}


function drawBar(val, x, name)
{
	//draws the bars for bar chart
    noStroke();
    fill(0,100,100);
	var mh = height * 0.4 - 50;
	rect(x,(height - 50) - val*mh, 100, val*mh);
    fill(255);
	text(name + ": " + val, x, height - 20);
}
