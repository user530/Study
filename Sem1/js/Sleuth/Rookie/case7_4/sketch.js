/*

Officer: 2481930
CaseNum: 401-3-81011799-2481930

Case 401 - The Case of Norbert's Weiner Stand
Stage 4 - Mortal Cupcake

It seems that Norbert is getting desperate now. In what appears to be his final
stand he has set up his own cupcake shop. The laced cupcakes look delicious but
they are extremely dangerous. Just a brief whiff of one can induce a series of
deadly symptoms. This is Norbert’s most complex poison to date, so you’ll have
to work hard to produce a viable antidote.

You must develop the antidote by using conditional statements in the draw loop to
do the following.

	- When either lead dips below 0.25, strychnine dips below 0.32, sarin goes above 0.66, or perhaps Amanita_Mushrooms dips below 0.41, decrease chalk by 0.01
	- If either arsenic goes above 0.64, warfarin goes above 0.54, methanol dips below 0.42, or perhaps botulinium dips below 0.32, increment chalk by 0.05
	- When sarin dips below 0.31, strychnine goes above 0.62, and also warfarin dips below 0.41, try decreasing protamine by 0.02
	- When either methanol goes above 0.71, botulinium goes above 0.71, Amanita_Mushrooms goes above 0.34, or perhaps lead goes above 0.65, try increasing protamine by 0.02
	- If botulinium dips below 0.48 and Amanita_Mushrooms goes above 0.44, or on the other hand, methanol goes above 0.61 or strychnine goes above 0.73, decrement charcoal by 0.05
	- When warfarin dips below 0.74 and lead dips below 0.39, or on the other hand, arsenic dips below 0.72 or sarin dips below 0.36, increase charcoal by 0.03
	- If Amanita_Mushrooms dips below 0.49 and methanol dips below 0.44, or on the other hand, arsenic goes above 0.43, reduce SodiumBicarbonate by 0.03
	- If sarin goes above 0.75 or botulinium dips below 0.65, or on the other hand, warfarin goes above 0.74 and strychnine goes above 0.32, increase SodiumBicarbonate by 0.04
	- When either botulinium goes above 0.52, arsenic goes above 0.66, or perhaps warfarin goes above 0.51, decrease glucagon by 0.05
	- If lead dips below 0.4 and methanol goes above 0.42, or on the other hand, sarin goes above 0.39 and Amanita_Mushrooms dips below 0.32, raise glucagon by 0.04


Your conditional statements should:

consider the following poisons:

	- strychnine
	- botulinium
	- lead
	- arsenic
	- sarin
	- warfarin
	- Amanita_Mushrooms
	- methanol


and modify the following antidotes:

	- chalk
	- protamine
	- charcoal
	- SodiumBicarbonate
	- glucagon


- There are many ways to complete this task but you should only use the
following commands:

	if(){}
	+=
	-=

*/

//Declare the poison variables
var strychnine;
var botulinium;
var lead;
var arsenic;
var sarin;
var warfarin;
var Amanita_Mushrooms;
var methanol;


//Declare the antidote variables
var chalk;
var protamine;
var charcoal;
var SodiumBicarbonate;
var glucagon;


//This variable is used for drawing the graph
var graphs;


function setup()
{

	createCanvas(800,600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	strychnine = 0.5;
	botulinium = 0.5;
	lead = 0.5;
	arsenic = 0.5;
	sarin = 0.5;
	warfarin = 0.5;
	Amanita_Mushrooms = 0.5;
	methanol = 0.5;
	chalk = 0.5;
	protamine = 0.5;
	charcoal = 0.5;
	SodiumBicarbonate = 0.5;
	glucagon = 0.5;


	//fills the graph with empty values
	graphs = [];

	for(var i = 0; i < 8; i++)
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


    if ((lead < 0.25)||(strychnine < 0.32)||
        (sarin > 0.66)||(Amanita_Mushrooms < 0.41)){
        chalk -= 0.01;
    }
	if ((arsenic > 0.64)||(warfarin > 0.54)||
        (methanol < 0.42)||(botulinium < 0.32)){
        chalk += 0.05;
    }
	if ((sarin < 0.31)&&(strychnine > 0.62)&&(warfarin < 0.41)){
        protamine -= 0.02;
    }
	if ((methanol > 0.71)|| (botulinium > 0.71)||
        (Amanita_Mushrooms > 0.34)||(lead > 0.65)){
        protamine += 0.02;
    }
	if (((botulinium < 0.48)&&(Amanita_Mushrooms > 0.44))||
            ((methanol > 0.61) || (strychnine > 0.73))){
        charcoal -= 0.05;
    }
	if (((warfarin < 0.74) && (lead < 0.39)) || 
            ((arsenic < 0.72) || (sarin < 0.36))){
        charcoal += 0.03;
    }
	if (((Amanita_Mushrooms < 0.49) && (methanol < 0.44)) ||
            (arsenic > 0.43)){
        SodiumBicarbonate -= 0.03;
    }
	if (((sarin > 0.75) || (botulinium < 0.65)) || 
            ((warfarin > 0.74) && (strychnine > 0.32))){
        SodiumBicarbonate += 0.04;
    }
	if (((botulinium > 0.52) || (arsenic > 0.66)) ||
            (warfarin > 0.51)){
        glucagon -= 0.05;
    }
	if (((lead < 0.4) && (methanol > 0.42)) || 
            ((sarin > 0.39) && (Amanita_Mushrooms < 0.32))){
        glucagon += 0.04;
    }

	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	strychnine = nextValue(graphs[0],strychnine);
	botulinium = nextValue(graphs[1],botulinium);
	lead = nextValue(graphs[2],lead);
	arsenic = nextValue(graphs[3],arsenic);
	sarin = nextValue(graphs[4],sarin);
	warfarin = nextValue(graphs[5],warfarin);
	Amanita_Mushrooms = nextValue(graphs[6],Amanita_Mushrooms);
	methanol = nextValue(graphs[7],methanol);


	chalk = constrain(chalk, 0, 1);
	protamine = constrain(protamine, 0, 1);
	charcoal = constrain(charcoal, 0, 1);
	SodiumBicarbonate = constrain(SodiumBicarbonate, 0, 1);
	glucagon = constrain(glucagon, 0, 1);


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
		color(0, 255, 255),
		color(255, 100, 100),
		color(255, 100, 0)
	];

	for(var i = 0; i < graphs.length; i++)
	{
		stroke(colors[i]);
		drawGraph(graphs[i]);
	}

	//draw the poisons as text
	noStroke();
	fill(colors[0]);
	text('strychnine: ' + nf(strychnine,1,2), 20,20);
	fill(colors[1]);
	text('botulinium: ' + nf(botulinium,1,2), 20,40);
	fill(colors[2]);
	text('lead: ' + nf(lead,1,2), 20,60);
	fill(colors[3]);
	text('arsenic: ' + nf(arsenic,1,2), 20,80);
	fill(colors[4]);
	text('sarin: ' + nf(sarin,1,2), 20,100);
	fill(colors[5]);
	text('warfarin: ' + nf(warfarin,1,2), 20,120);
	fill(colors[6]);
	text('Amanita_Mushrooms: ' + nf(Amanita_Mushrooms,1,2), 20,140);
	fill(colors[7]);
	text('methanol: ' + nf(methanol,1,2), 20,160);


	//draw the antidotes bar chart
	drawBar(chalk,50,'chalk');
	drawBar(protamine,200,'protamine');
	drawBar(charcoal,350,'charcoal');
	drawBar(SodiumBicarbonate,500,'SodiumBicarbonate');
	drawBar(glucagon,650,'glucagon');


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
