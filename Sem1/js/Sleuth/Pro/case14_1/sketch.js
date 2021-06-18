/*

Officer: 2481930
CaseNum: 702-0-98990055-2481930

Case 702 - The case of Vanishing Vannevar
Stage 1 - Mobilise

“Calling all units: the notorious criminal and speedster known as Vanishing Vannevar is on the run.
All cars to mobilise.” Word has it that you’re pretty nifty behind the wheel. I want you in on
this action kid. Get your car on the road by completing the </DRIVE_NAME/> function below.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- increment variables
	- random
	- constrain
	- calling functions

HINT: make sure you take a look at the initialisation of investigator_carObject to understand it's properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function Drive_Vehicle()
{
        
	/*
	This function should do the following: 
	 - increment investigator_carObject's miles_amt property by its speed_amount property 
	 - add a random amount between -0.06 and 0.06 to investigator_carObject's engineShudder_amt property
	 - use the constrain function to constrain investigator_carObject's engineShudder_amt property to values between 0.05 and 1.13
	 - call the Cycle_Motor function passing investigator_carObject as an argument
	*/
    
    investigator_carObject.miles_amt += investigator_carObject.speed_amount;
    investigator_carObject.engineShudder_amt += random(-0.06, 0.06);
    investigator_carObject.engineShudder_amt = constrain(investigator_carObject.engineShudder_amt, 0.05, 1.13);
    Cycle_Motor(investigator_carObject);

}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var investigator_carObject;

var roadWidth = 400;
var roadLeftEdge = 200;
var carImages = {};


function preload()
{
	carImages.detective = loadImage("cars/detective.png");
}

function setup()
{
	createCanvas(800,800);

	investigator_carObject = 
	{
		x_coord: roadLeftEdge + roadWidth/4,
		y_coord: 300,
		miles_amt: 0,
		speed_amount: 3,
		engineShudder_amt: 0,
		vehicle_type: 'detective',
		licence_plate: '5L3UTH',
		exhaust: []
	}


}



function draw()
{
	background(0);


	Drive_Vehicle();


	drawRoad();
	drawCars();
    
//    console.log(investigator_carObject.engineShudder_amt);
}

/////////////////////////DRAWING FUNCTIONS////////////////////////

function drawRoad()
{
	stroke(100);
	fill(50);
	rect(roadLeftEdge,0,roadWidth,800);
	stroke(255);

	for(var i = -1; i < 20; i++)
	{
		line(
		roadLeftEdge + roadWidth/2 , i * 100 + (investigator_carObject.miles_amt%100),
		roadLeftEdge + roadWidth/2 , i * 100 + 70 + (investigator_carObject.miles_amt%100)
		);
	}
}

function drawCars()
{
	//draw the detective car

	image
	drawExhaust(investigator_carObject);
	image
	(
		carImages["detective"],
		investigator_carObject.x_coord - carImages["detective"].width/2 + random(-investigator_carObject.engineShudder_amt, investigator_carObject.engineShudder_amt),
		investigator_carObject.y_coord + random(-investigator_carObject.engineShudder_amt, investigator_carObject.engineShudder_amt)
	);

}

function Cycle_Motor(car)
{

	car.exhaust.push({size: 2, x: car.x_coord, y: car.y_coord + carImages[car.vehicle_type].height});

	for(var i = car.exhaust.length -1; i >= 0 ; i--)
	{

		car.exhaust[i].y  += max(0.75, car.speed_amount/3);
		car.exhaust[i].x += random(-1,1);
		car.exhaust[i].size += 0.5;

		if(car.exhaust[i].y  > height)
		{
			car.exhaust.splice(i,1);
		}
	}
}


function drawExhaust(car)
{
		noStroke();
		for(var i = 0; i < car.exhaust.length; i++)
		{
				var alpha = map(car.exhaust[i].size, 0, 40, 50,0);
				fill(125,alpha);
				ellipse(car.exhaust[i].x + 20, car.exhaust[i].y , car.exhaust[i].size);

		}
}
