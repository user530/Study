/*

Officer: 2481930
CaseNum: 702-2-11916117-2481930

Case 702 - The case of Vanishing Vannevar
Stage 3 - Where's Vannevar

“All units: Vannevar’s car has been sighted. It is a red car with a numberPlate of RK2TLE. Approach with
caution.” This is your big chance kid. Don’t blow it. Complete the helper functions below to
drive through the traffic and locate Vannevar.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random, min, abs, and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of sleuthCarObject and the cars in
Vehicles_List to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function move_vehicle()
{
	/*
	This function should do the following: 
	 - increment sleuthCarObject's kmsAmnt property by its speedAmt property 
	 - add a random amount between -0.01 and 0.01 to sleuthCarObject's engineVibrateAmt property
	 - use the constrain function to constrain sleuthCarObject's engineVibrateAmt property to values between 0.08 and 1.21
	 - call the drive_motor function passing sleuthCarObject as an argument
	*/
    
    sleuthCarObject.kmsAmnt += sleuthCarObject.speedAmt;
    sleuthCarObject.engineVibrateAmt += random(-0.01, 0.01);
    sleuthCarObject.engineVibrateAmt = constrain(sleuthCarObject.engineVibrateAmt, 0.08, 1.21);
    drive_motor(sleuthCarObject);
}


function swap_lanes(target_vehicle)
{
	/*
	This function should do the following: 
	 - move target_vehicle from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use Lane_coordinate_A and Lane_coordinate_B to effect the change.
	 - finally you should return target_vehicle at the end of the function.
	 hint: You will need to modify the x property of target_vehicle.
	*/
    
    if (target_vehicle.x == Lane_coordinate_A)
        {
            target_vehicle.x = Lane_coordinate_B;
        }
    else 
        {
            target_vehicle.x = Lane_coordinate_A;
        }
    
    return target_vehicle;
    
}


function search_ahead( Target_vehicle_A, Target_vehicle_B )
{
	/*
	This function should do the following: 
	 - determine if Target_vehicle_A is in the same lane and less than 200px behind Target_vehicle_B.
	 - do this by comparing the two cars' kmsAmnt properties
	 - if these requirements are met then return Target_vehicle_B. Otherwise return false.
	*/
    
    if ((Target_vehicle_B.x == Target_vehicle_A.x) && 
            (Target_vehicle_B.kmsAmnt > Target_vehicle_A.kmsAmnt) && 
                (Target_vehicle_B.kmsAmnt - Target_vehicle_A.kmsAmnt < 200))
        {
            return Target_vehicle_B;
        }
    
}


function check_isBySide( target_car )
{
	/*
	This function should do the following: 
	 - determine if target_caris parallel with sleuthCarObject.
	 - if target_car is found to be parallel to sleuthCarObject then return true.
	 - cars are considered parallel if the absolute difference between their kmsAmnt properties is less than 25 px and they have non-matching x properties	*/
    
    
    if ((target_car.x != sleuthCarObject.x) &&
            (abs(target_car.kmsAmnt - sleuthCarObject.kmsAmnt) < 25))
        {
            return true;
        }
    
}


function detect_suspect()
{
	/*
	This function should do the following: 
	 - Check cars passing parallel to sleuthCarObject to see if they match the numberPlate property in the suspect description.
	 - it does this by traversing Vehicles_List and calling check_isBySide for each car
.	 - if a positive result is returned then the numberPlate property of the found car is then checked against the suspect description.
	 - if a match is found then the car in question is assigned to the global variable suspect.
	*/
    
    for (let i = 0 ; i < Vehicles_List.length ; i++)
        {
            if (check_isBySide(Vehicles_List[i]))
                {
                    if (Vehicles_List[i].numberPlate == "RK2TLE")
                        {
                            suspect = Vehicles_List[i];
                        }
                }
        }
    
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var sleuthCarObject;

var roadWidth;
var roadLeftEdge;
var Lane_coordinate_A;
var Lane_coordinate_B;
var carImages = {};
var suspect;

var Vehicles_List = [
{ x: 500, y: 0, kmsAmnt: -200, vehicleCategory: 'greenCar', numberPlate: '0N6ZV5', speedAmt: 2, exhaust: [  ]} , { x: 500, y: 0, kmsAmnt: 200, vehicleCategory: 'blueCar', numberPlate: 'OFBFW1', speedAmt: 2, exhaust: [  ]} , { x: 300, y: 0, kmsAmnt: 600, vehicleCategory: 'blueCar', numberPlate: '92Q8AH', speedAmt: 2, exhaust: [  ]} , { x: 300, y: 0, kmsAmnt: 1000, vehicleCategory: 'blueCar', numberPlate: 'R8NC6Y', speedAmt: 2, exhaust: [  ]} , { x: 300, y: 0, kmsAmnt: 1400, vehicleCategory: 'whiteCar', numberPlate: 'UWG6CX', speedAmt: 2, exhaust: [  ]} , { x: 500, y: 0, kmsAmnt: 1800, vehicleCategory: 'redCar', numberPlate: 'RK2TLE', speedAmt: 2, exhaust: [  ]} , { x: 300, y: 0, kmsAmnt: 2200, vehicleCategory: 'redCar', numberPlate: 'F7TLAB', speedAmt: 2, exhaust: [  ]} , { x: 500, y: 0, kmsAmnt: 2600, vehicleCategory: 'blueCar', numberPlate: '7FDN0S', speedAmt: 2, exhaust: [  ]} , { x: 500, y: 0, kmsAmnt: 3000, vehicleCategory: 'blueCar', numberPlate: 'TMOD5L', speedAmt: 2, exhaust: [  ]} , { x: 500, y: 0, kmsAmnt: 3400, vehicleCategory: 'blueCar', numberPlate: 'B309NN', speedAmt: 2, exhaust: [  ]} , { x: 500, y: 0, kmsAmnt: 3800, vehicleCategory: 'blueCar', numberPlate: 'TX4KTV', speedAmt: 2, exhaust: [  ]} , { x: 500, y: 0, kmsAmnt: 4200, vehicleCategory: 'whiteCar', numberPlate: '7IWNIS', speedAmt: 2, exhaust: [  ]} , { x: 500, y: 0, kmsAmnt: 4600, vehicleCategory: 'greenCar', numberPlate: '2O2RSL', speedAmt: 2, exhaust: [  ]} , { x: 300, y: 0, kmsAmnt: 5000, vehicleCategory: 'redCar', numberPlate: 'OQ6Q93', speedAmt: 2, exhaust: [  ]} , { x: 300, y: 0, kmsAmnt: 5400, vehicleCategory: 'greenCar', numberPlate: '60D27U', speedAmt: 2, exhaust: [  ]} , { x: 500, y: 0, kmsAmnt: 5800, vehicleCategory: 'greenCar', numberPlate: 'RA8YYO', speedAmt: 2, exhaust: [  ]} , { x: 500, y: 0, kmsAmnt: 6200, vehicleCategory: 'greenCar', numberPlate: 'SVRSKM', speedAmt: 2, exhaust: [  ]} , { x: 300, y: 0, kmsAmnt: 6600, vehicleCategory: 'whiteCar', numberPlate: 'NCG4DZ', speedAmt: 2, exhaust: [  ]} , { x: 500, y: 0, kmsAmnt: 7000, vehicleCategory: 'whiteCar', numberPlate: 'LHVEOS', speedAmt: 2, exhaust: [  ]} , { x: 300, y: 0, kmsAmnt: 7400, vehicleCategory: 'redCar', numberPlate: 'G0UWOH', speedAmt: 2, exhaust: [  ]} 
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
	Lane_coordinate_A = 300;
	Lane_coordinate_B = 500;

	sleuthCarObject = 
	{
		x: roadLeftEdge + roadWidth/4,
		y: 550,
		kmsAmnt: 0,
		speedAmt: 3,
		engineVibrateAmt: 0,
		vehicleCategory: 'detective',
		numberPlate: '5L3UTH',
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
		fill(255);

		text("suspect found !", width/2, height/2);
		return;
	}

	////////////////////// HANDLE DETECTIVE /////////////////////////

	move_vehicle();
	for(var i = 0; i < Vehicles_List.length; i++)
	{
var b2b = search_ahead(sleuthCarObject, Vehicles_List[i]);
		if(b2b)swap_lanes(sleuthCarObject);
	}
	detect_suspect();


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for(var i = 0; i < Vehicles_List.length; i++)
	{
		Vehicles_List[i].kmsAmnt += Vehicles_List[i].speedAmt;
		Vehicles_List[i].y = sleuthCarObject.y - Vehicles_List[i].kmsAmnt + sleuthCarObject.kmsAmnt;
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
		roadLeftEdge + roadWidth/2 , i * 100 + (sleuthCarObject.kmsAmnt%100),
		roadLeftEdge + roadWidth/2 , i * 100 + 70 + (sleuthCarObject.kmsAmnt%100)
		);
	}
}

function drawCars()
{
	//draw the detective car

	image
	drawExhaust(sleuthCarObject);
	image
	(
		carImages["detective"],
		sleuthCarObject.x - carImages["detective"].width/2 + random(-sleuthCarObject.engineVibrateAmt, sleuthCarObject.engineVibrateAmt),
		sleuthCarObject.y + random(-sleuthCarObject.engineVibrateAmt, sleuthCarObject.engineVibrateAmt)
	);

	//draw all other cars

	for(var i = 0; i < Vehicles_List.length; i ++)
	{
		if(Vehicles_List[i].y < height && Vehicles_List[i].y > -height/2)
		{
			image(
			carImages[Vehicles_List[i].vehicleCategory],
			Vehicles_List[i].x - carImages[Vehicles_List[i].vehicleCategory].width/2,
			Vehicles_List[i].y
			);
			drive_motor(Vehicles_List[i]);

			drawExhaust(Vehicles_List[i]);
		}
	}

}

function drive_motor(car)
{

	car.exhaust.push({size: 2, x: car.x, y: car.y + carImages[car.vehicleCategory].height});

	for(var i = car.exhaust.length -1; i >= 0 ; i--)
	{

		car.exhaust[i].y  += max(0.75, car.speedAmt/3);
		if(car.vehicleCategory != "detective")car.exhaust[i].y += (sleuthCarObject.speedAmt - car.speedAmt);
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
