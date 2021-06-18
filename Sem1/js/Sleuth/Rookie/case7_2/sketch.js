/*

Officer: 2481930
CaseNum: 401-1-45630707-2481930

Case 401 - The Case of Norbert's Weiner Stand
Stage 2 - Toxic Burrito

Norbert is at it again. This time he’s set up a burrito stall and is lacing burritos
with his foul toxin. The chaos is spreading. People are dropping like flies and burrito
sales have fallen through the floor. To make matters worse it seems Norbert has cottoned
on to our methods and has upped the complexity of his poison. You’ll find the antidote
harder to develop this time. So kid, head down to the lab and get working.

You must develop the antidote by using conditional statements in the draw loop to
do the following.

	- When mercury dips below 0.44, decrement glucagon by 0.02
	- If insecticide goes above 0.57, increment glucagon by 0.03
	- When mercury goes above 0.6, decrease beta_blocker by 0.02
	- If insecticide dips below 0.37, try increasing beta_blocker by 0.04
	- If ricin dips below 0.31 or warfarin dips below 0.37, try decreasing plasma by 0.01
	- When mercury dips below 0.59, try increasing plasma by 0.05
	- If insecticide dips below 0.39, reduce charcoal by 0.05
	- When mercury dips below 0.73, raise charcoal by 0.04


Your conditional statements should:

consider the following poisons:

	- insecticide
	- ricin
	- mercury
	- warfarin


and modify the following antidotes:

	- glucagon
	- beta_blocker
	- plasma
	- charcoal


- There are many ways to complete this task but you should only use the
following commands:

	if(){}
	+=
	-=

*/

//Declare the poison variables
var insecticide;
var ricin;
var mercury;
var warfarin;


//Declare the antidote variables
var glucagon;
var beta_blocker;
var plasma;
var charcoal;


//This variable is used for drawing the graph
var graphs;


function setup()
{

	createCanvas(800,600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	insecticide = 0.5;
	ricin = 0.5;
	mercury = 0.5;
	warfarin = 0.5;
	glucagon = 0.5;
	beta_blocker = 0.5;
	plasma = 0.5;
	charcoal = 0.5;


	//fills the graph with empty values
	graphs = [];

	for(var i = 0; i < 4; i++)
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

	if (mercury < 0.44){
        glucagon -= 0.02;
    }
    
    if (insecticide > 0.57){
        glucagon += 0.03;
    }
	if (mercury > 0.6){
        beta_blocker -= 0.02;
    }
	if (insecticide < 0.37){
        beta_blocker += 0.04;
    }
	if ((ricin < 0.31) || (warfarin < 0.37)){
        plasma -= 0.01;
    }
	if (mercury < 0.59){
        plasma += 0.05;
    }
	if (insecticide < 0.39){
        charcoal -= 0.05;
    }
	if (mercury < 0.73){
        charcoal += 0.04;
    }


	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	insecticide = nextValue(graphs[0],insecticide);
	ricin = nextValue(graphs[1],ricin);
	mercury = nextValue(graphs[2],mercury);
	warfarin = nextValue(graphs[3],warfarin);


	glucagon = constrain(glucagon, 0, 1);
	beta_blocker = constrain(beta_blocker, 0, 1);
	plasma = constrain(plasma, 0, 1);
	charcoal = constrain(charcoal, 0, 1);


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
	text('insecticide: ' + nf(insecticide,1,2), 20,20);
	fill(colors[1]);
	text('ricin: ' + nf(ricin,1,2), 20,40);
	fill(colors[2]);
	text('mercury: ' + nf(mercury,1,2), 20,60);
	fill(colors[3]);
	text('warfarin: ' + nf(warfarin,1,2), 20,80);


	//draw the antidotes bar chart
	drawBar(glucagon,50,'glucagon');
	drawBar(beta_blocker,200,'beta_blocker');
	drawBar(plasma,350,'plasma');
	drawBar(charcoal,500,'charcoal');


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
