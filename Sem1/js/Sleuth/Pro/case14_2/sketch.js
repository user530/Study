/*

Officer: 2481930
CaseNum: 702-1-79057862-2481930

Case 702 - The case of Vanishing Vannevar
Stage 2 - Downtown traffic

“All units: Vannevar is heading into the downtown area. Heavy traffic ahead. Drive safely.”
Complete the helper functions below to drive the car and avoid other vehicles. Keep on it kid.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of Chase_Car and the cars in
carData to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function DriveCar()
{
	/*
	This function should do the following: 
	 - increment Chase_Car's Miles_Amount property by its Speed_Amt property 
	 - add a random amount between -0.08 and 0.08 to Chase_Car's EngineShudder_Amount property
	 - use the constrain function to constrain Chase_Car's EngineShudder_Amount property to values between 0.1 and 1.03
	 - call the RunEngine function passing Chase_Car as an argument
	*/
    
    Chase_Car.Miles_Amount += Chase_Car.Speed_Amt;
    Chase_Car.EngineShudder_Amount += random(-0.08, 0.08);
    Chase_Car.EngineShudder_Amount = constrain(Chase_Car.EngineShudder_Amount, 0.1, 1.03);
    RunEngine(Chase_Car);
}


function SwapLanes(target_car)
{
	/*
	This function should do the following: 
	 - move target_car from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use Lane_CoordinateA and Lane_CoordinateB to effect the change.
	 hint: You will need to modify the Coordinate_X property of target_car.
	*/
    if (target_car.Coordinate_X == Lane_CoordinateA)
        {
            target_car.Coordinate_X = Lane_CoordinateB;
        }
    else
        {
            target_car.Coordinate_X = Lane_CoordinateA;
        }
    
}


function CheckVehicleAhead( carObjA, carObjB )
{
	/*
	This function should do the following: 
	 - determine if carObjA is in the same lane and less than 200px behind carObjB.
	 - do this by comparing the two cars' Miles_Amount properties
	 - if these requirements are met then return carObjB. Otherwise return false.
	*/
//    console.log("CarA_X: " + carObjA.Coordinate_X + " ; CarB_X: " + carObjB.Coordinate_X);
//    console.log("CarA_M: " + carObjA.Miles_Amount + " ; CarB_M: " + carObjB.Miles_Amount);
    if ((carObjA.Coordinate_X == carObjB.Coordinate_X) && (carObjB.Miles_Amount > carObjA.Miles_Amount) && (carObjB.Miles_Amount - carObjA.Miles_Amount < 200))
        {
//            console.log("RETURNED!");
//            console.log("CarA_M: " + carObjA.Miles_Amount + " ; CarB_M: " + carObjB.Miles_Amount);
            return carObjB;
        }
    else 
        {
            return false;
        }
    
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var Chase_Car;

var roadWidth;
var roadLeftEdge;
var Lane_CoordinateA;
var Lane_CoordinateB;
var carImages = {};

var carData = [
{ Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: -200, Vehicle_Model: 'redCar', Number_Plate: '6GRJP6', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 200, Vehicle_Model: 'redCar', Number_Plate: 'K2MVRD', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 500, Coordinate_Y: 0, Miles_Amount: 600, Vehicle_Model: 'greenCar', Number_Plate: 'N3G10K', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 500, Coordinate_Y: 0, Miles_Amount: 1000, Vehicle_Model: 'blueCar', Number_Plate: 'I36T2V', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 500, Coordinate_Y: 0, Miles_Amount: 1400, Vehicle_Model: 'blueCar', Number_Plate: 'ISVPZK', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 1800, Vehicle_Model: 'redCar', Number_Plate: '1B11RU', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 2200, Vehicle_Model: 'greenCar', Number_Plate: '3K6B2L', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 2600, Vehicle_Model: 'blueCar', Number_Plate: 'IZ2N96', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 3000, Vehicle_Model: 'redCar', Number_Plate: 'IOR4UH', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 3400, Vehicle_Model: 'whiteCar', Number_Plate: '5Y7KLZ', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 3800, Vehicle_Model: 'redCar', Number_Plate: 'RC7EPL', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 500, Coordinate_Y: 0, Miles_Amount: 4200, Vehicle_Model: 'redCar', Number_Plate: 'MZ328Z', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 4600, Vehicle_Model: 'blueCar', Number_Plate: 'Y07U2I', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 5000, Vehicle_Model: 'redCar', Number_Plate: '1L381D', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 5400, Vehicle_Model: 'greenCar', Number_Plate: 'UK2HLB', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 5800, Vehicle_Model: 'whiteCar', Number_Plate: 'A1GR3A', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 6200, Vehicle_Model: 'redCar', Number_Plate: 'HJVA3Y', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 500, Coordinate_Y: 0, Miles_Amount: 6600, Vehicle_Model: 'whiteCar', Number_Plate: 'HBQIX6', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 500, Coordinate_Y: 0, Miles_Amount: 7000, Vehicle_Model: 'blueCar', Number_Plate: 'WMMN3M', Speed_Amt: 2, exhaust: [  ]} , { Coordinate_X: 300, Coordinate_Y: 0, Miles_Amount: 7400, Vehicle_Model: 'greenCar', Number_Plate: 'HXL0BW', Speed_Amt: 2, exhaust: [  ]} 
];



function preload()
{
	var carTypes = [
		"detective",
		"redCar",
		"greenCar",
		"blueCar",
		"whiteCar",
	];

	for(var i = 0; i < carTypes.length; i++)
	{
		carImages[carTypes[i]] = loadImage("cars/" + carTypes[i] + ".png");
	}
}

function setup()
{
	createCanvas(800,800);

	roadWidth = 400;
	roadLeftEdge = 200;
	Lane_CoordinateA = 300;
	Lane_CoordinateB = 500;

	Chase_Car = 
	{
		Coordinate_X: roadLeftEdge + roadWidth/4,
		Coordinate_Y: 550,
		Miles_Amount: 0,
		Speed_Amt: 3,
		EngineShudder_Amount: 0,
		Vehicle_Model: 'detective',
		Number_Plate: '5L3UTH',
		exhaust: []
	}


}



function draw()
{
	background(0);



	drawRoad();
	drawCars();

	////////////////////// HANDLE DETECTIVE /////////////////////////


	DriveCar();
	for(var i = 0; i < carData.length; i++)
	{
        var b2b = CheckVehicleAhead(Chase_Car, carData[i]);
		if(b2b)SwapLanes(Chase_Car);
	}


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for(var i = 0; i < carData.length; i++)
	{
		carData[i].Miles_Amount += carData[i].Speed_Amt;
		carData[i].Coordinate_Y = Chase_Car.Coordinate_Y - carData[i].Miles_Amount + Chase_Car.Miles_Amount;
	}

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
		roadLeftEdge + roadWidth/2 , i * 100 + (Chase_Car.Miles_Amount%100),
		roadLeftEdge + roadWidth/2 , i * 100 + 70 + (Chase_Car.Miles_Amount%100)
		);
	}
}

function drawCars()
{
	//draw the detective car

	image
	drawExhaust(Chase_Car);
	image
	(
		carImages["detective"],
		Chase_Car.Coordinate_X - carImages["detective"].width/2 + random(-Chase_Car.EngineShudder_Amount, Chase_Car.EngineShudder_Amount),
		Chase_Car.Coordinate_Y + random(-Chase_Car.EngineShudder_Amount, Chase_Car.EngineShudder_Amount)
	);

	//draw all other cars

	for(var i = 0; i < carData.length; i ++)
	{
		if(carData[i].Coordinate_Y < height && carData[i].Coordinate_Y > -height/2)
		{
			image(
			carImages[carData[i].Vehicle_Model],
			carData[i].Coordinate_X - carImages[carData[i].Vehicle_Model].width/2,
			carData[i].Coordinate_Y
			);
			RunEngine(carData[i]);

			drawExhaust(carData[i]);
		}
	}

}

function RunEngine(car)
{

	car.exhaust.push({size: 2, x: car.Coordinate_X, y: car.Coordinate_Y + carImages[car.Vehicle_Model].height});

	for(var i = car.exhaust.length -1; i >= 0 ; i--)
	{

		car.exhaust[i].y  += max(0.75, car.Speed_Amt/3);
		if(car.Vehicle_Model != "detective")car.exhaust[i].y += (Chase_Car.Speed_Amt - car.Speed_Amt);
		car.exhaust[i].x += random(-1,1);
		car.exhaust[i].size += 0.5;

		if(car.exhaust[i].y  > height || car.exhaust[i].y < 0)
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
