/*

Officer: 2481930
CaseNum: 702-3-83740754-2481930

Case 702 - The case of Vanishing Vannevar
Stage 4 - High speed chase

“All units: Vannevar is on the run. They are driving a red car with a licencePlate of 5I3T0O.  Pursue at speed.
I repeat pursue at speed.” Okay Vannevar’s game is nearly up. Go get him kid.
Complete the helper functions below to locate, chase and arrest Vannevar.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random, min, abs, and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of sleuthPIVehicleObject and the cars in
VehicleObjectsList to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function Move_Car()
{
	/*
	This function should do the following: 
	 - increment sleuthPIVehicleObject's distanceTravelled property by its gasVal property 
	 - add a random amount between -0.01 and 0.01 to sleuthPIVehicleObject's engineRumbleVal property
	 - use the constrain function to constrain sleuthPIVehicleObject's engineRumbleVal property to values between 0.06 and 0.78
	 - call the Cycle_CarMotor function passing sleuthPIVehicleObject as an argument
	*/
    
    sleuthPIVehicleObject.distanceTravelled += sleuthPIVehicleObject.gasVal;
    sleuthPIVehicleObject.engineRumbleVal += random(-0.01, 0.01);
    sleuthPIVehicleObject.engineRumbleVal = constrain(sleuthPIVehicleObject.engineRumbleVal, 0.06, 0.78);
    Cycle_CarMotor(sleuthPIVehicleObject);
    
}


function Change_Lanes(vehicle)
{
	/*
	This function should do the following: 
	 - move vehicle from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use Lane_PosA and Lane_PosB to effect the change.
	 - finally you should return vehicle at the end of the function.
	 hint: You will need to modify the xCoordinate property of vehicle.
	*/
    
    if (vehicle.xCoordinate == Lane_PosB)
        {
            vehicle.xCoordinate = Lane_PosA;
        }
    else 
        {
            vehicle.xCoordinate = Lane_PosB;
        }
    
    return vehicle;
    
}


function CheckCar_IsInfront( targetCar )
{
	/*
	This function should do the following: 
	 - determine if targetCar is in the same lane and less than 200px behind any of the cars in VehicleObjectsList.
	 - do this by traversing VehicleObjectsList and comparing each car's distanceTravelled property to that of targetCar.
	 - use the licencePlate property of each car to ignore cars that match targetCar.
	 - if you find a car that matches these requirements then return the index representing the car's position in VehicleObjectsList. Otherwise return false.
	*/
    
    for (let i = 0 ; i < VehicleObjectsList.length ; i++)
        {
            if ((targetCar.xCoordinate == VehicleObjectsList[i].xCoordinate) && 
                    (VehicleObjectsList[i].distanceTravelled > targetCar.distanceTravelled) &&
                        (VehicleObjectsList[i].distanceTravelled - targetCar.distanceTravelled < 200))
                {
                    if (VehicleObjectsList[i].licencePlate != targetCar.licencePlate)
                        {
                            return i;
                        }
                    return false;
                }

        }
    
}


function Car_IsAtSide( target_vehicle )
{
	/*
	This function should do the following: 
	 - traverse VehicleObjectsList and determine if any of the cars are parallel with target_vehicle.
	 - if a car is found to be parallel to target_vehicle then return that car object.
	 - cars are considered parallel if the absolute difference between their distanceTravelled properties is less than 25 px and they have non-matching xCoordinate properties	*/
    
    for (let i = 0; i < VehicleObjectsList.length ; i++)
        {
            if ((target_vehicle.xCoordinate != VehicleObjectsList[i].xCoordinate) && 
                    (abs(target_vehicle.distanceTravelled - VehicleObjectsList[i].distanceTravelled) < 25))
                {
                    return VehicleObjectsList[i];
                }
        }
    
}


function Spot_Suspect()
{
	/*
	This function should do the following: 
	 - Check cars passing parallel to sleuthPIVehicleObject to see if they match the licencePlate property in the suspect description.
	 - it does this by calling Car_IsAtSide.
	 - if a positive result is returned then the licencePlate property of the found car is then checked against the suspect description.
	 - if a match is found then the object of the car in question is returned.
	 - otherwise return false.
	*/
    let SideCar = Car_IsAtSide(sleuthPIVehicleObject);
    if (SideCar)
        {
            if (SideCar.licencePlate == "5I3T0O")
                {
                    return SideCar;
                }
            return false;
        }
    
    
}


function Tail_Suspect()
{
	/*
	This function should do the following: 
	 - only operate if the global variable suspect is assigned to an object.
	 - scale the gasVal property of sleuthPIVehicleObject by a factor of 1.001.
	 - use the min function to make sure that sleuthPIVehicleObject's gasVal property does not exceed 6.
	 - it should call CheckCar_IsInfront to detect any cars in front of sleuthPIVehicleObject.
	 - if a positive result is returned it should check to see if the licencePlate property of that car matches that of suspect.
	 - for a match, Arrest_Suspect should be called, otherwise call Change_Lanes.
	*/
    
    if (suspect)
        {
            sleuthPIVehicleObject.gasVal *= 1.001;
            sleuthPIVehicleObject.gasVal = min(6, sleuthPIVehicleObject.gasVal);
            let j = CheckCar_IsInfront(sleuthPIVehicleObject);
            if (j)
                {
                    if (VehicleObjectsList[j].licencePlate == "5I3T0O")
                        {
                            Arrest_Suspect(VehicleObjectsList[j]);
                        }
                    else 
                        {
                            Change_Lanes(sleuthPIVehicleObject);
                        }
                }
        }
}


function Arrest_Suspect(target_vehicle)
{
	/*
	This function should do the following: 
	 - set the apprehended property of target_vehicle to true.
	 - set the isApprehendingSuspect property of sleuthPIVehicleObject to true.
	 - set the gasVal properties of both vehicles to zero.
	*/
    
    target_vehicle.apprehended = true;
    sleuthPIVehicleObject.isApprehendingSuspect = true;
    target_vehicle.gasVal = 0;
    sleuthPIVehicleObject.gasVal = 0;
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var sleuthPIVehicleObject;

var roadWidth;
var roadLeftEdge;
var Lane_PosA;
var Lane_PosB;
var carImages = {};
var suspect;

var VehicleObjectsList = [
{ xCoordinate: 300, yCoordinate: 0, distanceTravelled: -200, carModel: 'redCar', licencePlate: 'OM0FR8', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 200, carModel: 'greenCar', licencePlate: 'BBTYOC', gasVal: 2, exhaust: [  ]} , { xCoordinate: 500, yCoordinate: 0, distanceTravelled: 600, carModel: 'greenCar', licencePlate: 'U74MGM', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 1000, carModel: 'whiteCar', licencePlate: 'C58QK1', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 1400, carModel: 'blueCar', licencePlate: 'BGON3Y', gasVal: 2, exhaust: [  ]} , { xCoordinate: 500, yCoordinate: 0, distanceTravelled: 1800, carModel: 'greenCar', licencePlate: '9GMWC0', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 2200, carModel: 'blueCar', licencePlate: 'QU8X6O', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 2600, carModel: 'blueCar', licencePlate: 'AGOUF2', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 3000, carModel: 'redCar', licencePlate: 'MJLDIB', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 3400, carModel: 'redCar', licencePlate: 'VSKR3R', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 3800, carModel: 'redCar', licencePlate: '5I3T0O', gasVal: 2, exhaust: [  ]} , { xCoordinate: 500, yCoordinate: 0, distanceTravelled: 4200, carModel: 'blueCar', licencePlate: 'YSJ4EZ', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 4600, carModel: 'blueCar', licencePlate: '8YL3VJ', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 5000, carModel: 'greenCar', licencePlate: 'S94ZWG', gasVal: 2, exhaust: [  ]} , { xCoordinate: 500, yCoordinate: 0, distanceTravelled: 5400, carModel: 'redCar', licencePlate: 'BC9RES', gasVal: 2, exhaust: [  ]} , { xCoordinate: 500, yCoordinate: 0, distanceTravelled: 5800, carModel: 'greenCar', licencePlate: 'QJ3EX0', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 6200, carModel: 'blueCar', licencePlate: '4IYKJL', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 6600, carModel: 'whiteCar', licencePlate: '4TXXRH', gasVal: 2, exhaust: [  ]} , { xCoordinate: 500, yCoordinate: 0, distanceTravelled: 7000, carModel: 'whiteCar', licencePlate: 'NSFSH2', gasVal: 2, exhaust: [  ]} , { xCoordinate: 300, yCoordinate: 0, distanceTravelled: 7400, carModel: 'whiteCar', licencePlate: 'EVE4AE', gasVal: 2, exhaust: [  ]} 
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
	textSize(30);
	textAlign(CENTER);

	roadWidth = 400;
	roadLeftEdge = 200;
	Lane_PosA = 300;
	Lane_PosB = 500;

	sleuthPIVehicleObject = 
	{
		xCoordinate: roadLeftEdge + roadWidth/4,
		yCoordinate: 550,
		distanceTravelled: 0,
		gasVal: 3,
		engineRumbleVal: 0,
		carModel: 'detective',
		licencePlate: '5L3UTH',
		isApprehendingSuspect: false,
		pursuingSuspect: false,
		exhaust: []
	}


}



function draw()
{
	background(0);

	drawRoad();
	drawCars();

	if(suspect)
	{
		if(suspect.apprehended)
		{
			fill(255);

			text("suspect apprehended!", width/2, height/2);
		}

	}


	////////////////////// HANDLE DETECTIVE /////////////////////////

	if(!sleuthPIVehicleObject.pursuingSuspect&& !sleuthPIVehicleObject.isApprehendingSuspect)
	{
		Move_Car();
		var b2b = CheckCar_IsInfront( sleuthPIVehicleObject );
		if(b2b)Change_Lanes(sleuthPIVehicleObject);
		var a = Spot_Suspect();
		if(a != false)suspect = a;
		if(suspect)sleuthPIVehicleObject.pursuingSuspect = true;
	}
	else if(!sleuthPIVehicleObject.isApprehendingSuspect)
	{
		Tail_Suspect();
		Move_Car();
	}


	////////////////////// HANDLE ASSAILANT /////////////////////////

	if(suspect)
	{
		if(!suspect.apprehended)
		{
			suspect.gasVal = 5;
			var b2b = CheckCar_IsInfront( suspect );
			if(b2b)
			{
				if(b2b.licencePlate != suspect.licencePlate)
				{
					Change_Lanes(suspect);
				}
			}
		}
	}


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for(var i = 0; i < VehicleObjectsList.length; i++)
	{
		VehicleObjectsList[i].distanceTravelled += VehicleObjectsList[i].gasVal;
		VehicleObjectsList[i].yCoordinate = sleuthPIVehicleObject.yCoordinate - VehicleObjectsList[i].distanceTravelled + sleuthPIVehicleObject.distanceTravelled;

		if(suspect)
		{
			if(suspect.apprehended)
			{
				if(VehicleObjectsList[i].xCoordinate==sleuthPIVehicleObject.xCoordinate)
				{
					if(VehicleObjectsList[i].distanceTravelled<sleuthPIVehicleObject.distanceTravelled)
					{
						if(VehicleObjectsList[i].distanceTravelled-sleuthPIVehicleObject.distanceTravelled < 200)
						{
							Change_Lanes(VehicleObjectsList[i]);
						}
					}
				}
			}
		}

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
		roadLeftEdge + roadWidth/2 , i * 100 + (sleuthPIVehicleObject.distanceTravelled%100),
		roadLeftEdge + roadWidth/2 , i * 100 + 70 + (sleuthPIVehicleObject.distanceTravelled%100)
		);
	}
}

function drawCars()
{
	//draw the detective car

	drawExhaust(sleuthPIVehicleObject);
	image
	(
		carImages["detective"],
		sleuthPIVehicleObject.xCoordinate - carImages["detective"].width/2 + random(-sleuthPIVehicleObject.engineRumbleVal, sleuthPIVehicleObject.engineRumbleVal),
		sleuthPIVehicleObject.yCoordinate + random(-sleuthPIVehicleObject.engineRumbleVal, sleuthPIVehicleObject.engineRumbleVal)
	);

	//draw all other cars

	for(var i = 0; i < VehicleObjectsList.length; i ++)
	{
		if(VehicleObjectsList[i].yCoordinate < height && VehicleObjectsList[i].yCoordinate > -height/2)
		{
			image(
			carImages[VehicleObjectsList[i].carModel],
			VehicleObjectsList[i].xCoordinate - carImages[VehicleObjectsList[i].carModel].width/2,
			VehicleObjectsList[i].yCoordinate
			);
			Cycle_CarMotor(VehicleObjectsList[i]);

			drawExhaust(VehicleObjectsList[i]);
		}
	}

}

function Cycle_CarMotor(car)
{

	car.exhaust.push({size: 2, x: car.xCoordinate, y: car.yCoordinate + carImages[car.carModel].height});

	for(var i = car.exhaust.length -1; i >= 0 ; i--)
	{

		car.exhaust[i].y  += max(0.75, car.gasVal/3);
		if(car.carModel != "detective")car.exhaust[i].y += (sleuthPIVehicleObject.gasVal - car.gasVal);
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
