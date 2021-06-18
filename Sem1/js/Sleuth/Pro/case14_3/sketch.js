/*

Officer: 2481930
CaseNum: 702-2-29248653-2481930

Case 702 - The case of Vanishing Vannevar
Stage 3 - Where's Vannevar

“All units: Vannevar’s car has been sighted. It is a green car with a licence_plate of DYWQ30. Approach with
caution.” This is your big chance kid. Don’t blow it. Complete the helper functions below to
drive through the traffic and locate Vannevar.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random, min, abs, and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of sleuthPI_car and the cars in
vehicles_data to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function moveCar()
{
	/*
	This function should do the following: 
	 - increment sleuthPI_car's distance_travelled property by its gas_amount property 
	 - add a random amount between -0.1 and 0.1 to sleuthPI_car's vibrate_val property
	 - use the constrain function to constrain sleuthPI_car's vibrate_val property to values between 0.09 and 1.12
	 - call the cycleEngine function passing sleuthPI_car as an argument
	*/
//    
    sleuthPI_car.distance_travelled += sleuthPI_car.gas_amount;
    sleuthPI_car.vibrate_val += random(-0.1, 0.1);
    sleuthPI_car.vibrate_val = constrain(sleuthPI_car.vibrate_val, 0.09, 1.12);
    cycleEngine(sleuthPI_car);
}


function swapLanes(carObj)
{
	/*
	This function should do the following: 
	 - move carObj from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use LanePosition_a and LanePosition_b to effect the change.
	 - finally you should return carObj at the end of the function.
	 hint: You will need to modify the coord_x property of carObj.
	*/
    
    if (carObj.coord_x == LanePosition_a)
        {
            carObj.coord_x = LanePosition_b;
        }
    else
        {
            carObj.coord_x = LanePosition_a;
        }
    return carObj;
}


function searchVehicleInfront( car )
{
	/*
	This function should do the following: 
	 - determine if car is in the same lane and less than 200px behind any of the cars in vehicles_data.
	 - do this by traversing vehicles_data and comparing each car's distance_travelled property to that of car.
	 - use the licence_plate property of each car to ignore cars that match car.
	 - if you find a car that matches these requirements then return the index representing the car's position in vehicles_data. Otherwise return false.
	*/
    
    for (let i = 0 ; i < vehicles_data.length ; i++)
        {
            if ((vehicles_data[i].coord_x == car.coord_x) && 
                (vehicles_data[i].distance_travelled > car.distance_travelled) && 
                (vehicles_data[i].distance_travelled - car.distance_travelled < 200) && 
                (vehicles_data[i].licence_plate != car.licence_plate))
                {
                    return i;
                }
             
        }
    
    return false;
    
}


function carIsBySide( target_car )
{
	/*
	This function should do the following: 
	 - determine if target_caris parallel with sleuthPI_car.
	 - if target_car is found to be parallel to sleuthPI_car then return 	 - cars are considered parallel if the absolute difference between their distance_travelled properties is less than 25 px and they have non-matching coord_x properties	*/
    
    return ((target_car.coord_x != sleuthPI_car.coord_x) && 
            (abs(target_car.distance_travelled - sleuthPI_car.distance_travelled) <= 25))

    
    
    
}


function checkCriminal()
{
	/*
	This function should do the following: 
	 - Check cars passing parallel to sleuthPI_car to see if they match the licence_plate property in the criminal description.
	 - it does this by traversing vehicles_data and calling carIsBySide for each car
.	 - if a positive result is returned then the licence_plate property of the found car is then checked against the criminal description.
	 - if a match is found then the car in question is assigned to the global variable criminal.
	*/
    
    for (let i = 0 ; i < vehicles_data.length ; i++)
        {
            if (carIsBySide(vehicles_data[i]))
            {
//                console.log(carIsBySide(vehicles_data[i])); 
//                console.log(carIsBySide(vehicles_data[i]).licence_plate);
                if (vehicles_data[i].licence_plate == "DYWQ30")
                    {
                        criminal = vehicles_data[i];
                    }                
            }            
        }
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var sleuthPI_car;

var roadWidth;
var roadLeftEdge;
var LanePosition_a;
var LanePosition_b;
var carImages = {};
var criminal;

var vehicles_data = [
{ coord_x: 300, coord_y: 0, distance_travelled: -200, vehicle_variety: 'redCar', licence_plate: 'CHSKF3', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 200, vehicle_variety: 'whiteCar', licence_plate: '8C26XJ', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 600, vehicle_variety: 'whiteCar', licence_plate: 'KGOSCH', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 1000, vehicle_variety: 'greenCar', licence_plate: 'JRVWMP', gas_amount: 2, exhaust: [  ]} , { coord_x: 300, coord_y: 0, distance_travelled: 1400, vehicle_variety: 'blueCar', licence_plate: 'X5WV3U', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 1800, vehicle_variety: 'greenCar', licence_plate: 'DYWQ30', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 2200, vehicle_variety: 'redCar', licence_plate: 'MR091A', gas_amount: 2, exhaust: [  ]} , { coord_x: 300, coord_y: 0, distance_travelled: 2600, vehicle_variety: 'greenCar', licence_plate: '4YDXTJ', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 3000, vehicle_variety: 'whiteCar', licence_plate: 'RDB2OP', gas_amount: 2, exhaust: [  ]} , { coord_x: 300, coord_y: 0, distance_travelled: 3400, vehicle_variety: 'blueCar', licence_plate: 'O93NEL', gas_amount: 2, exhaust: [  ]} , { coord_x: 300, coord_y: 0, distance_travelled: 3800, vehicle_variety: 'redCar', licence_plate: '2TN8ZG', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 4200, vehicle_variety: 'whiteCar', licence_plate: 'GPMJ80', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 4600, vehicle_variety: 'blueCar', licence_plate: 'U4UUJ1', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 5000, vehicle_variety: 'whiteCar', licence_plate: '3OPV97', gas_amount: 2, exhaust: [  ]} , { coord_x: 300, coord_y: 0, distance_travelled: 5400, vehicle_variety: 'whiteCar', licence_plate: 'QEFG1F', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 5800, vehicle_variety: 'whiteCar', licence_plate: 'TTWCD8', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 6200, vehicle_variety: 'whiteCar', licence_plate: 'RRD6F3', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 6600, vehicle_variety: 'greenCar', licence_plate: 'QESDYR', gas_amount: 2, exhaust: [  ]} , { coord_x: 500, coord_y: 0, distance_travelled: 7000, vehicle_variety: 'redCar', licence_plate: 'WUBDP3', gas_amount: 2, exhaust: [  ]} , { coord_x: 300, coord_y: 0, distance_travelled: 7400, vehicle_variety: 'whiteCar', licence_plate: 'MZ3ZU5', gas_amount: 2, exhaust: [  ]} 
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
	LanePosition_a = 300;
	LanePosition_b = 500;

	sleuthPI_car = 
	{
		coord_x: roadLeftEdge + roadWidth/4,
		coord_y: 550,
		distance_travelled: 0,
		gas_amount: 3,
		vibrate_val: 0,
		vehicle_variety: 'detective',
		licence_plate: '5L3UTH',
		exhaust: []
	}


}



function draw()
{
	background(0);



	drawRoad();
	drawCars();

	if(criminal)
	{
		fill(255);

		text("criminal found !", width/2, height/2);
		return;
	}

	////////////////////// HANDLE DETECTIVE /////////////////////////

	moveCar();
	var b2b = searchVehicleInfront( sleuthPI_car );
	if(b2b)swapLanes(sleuthPI_car);
	checkCriminal();

	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for(var i = 0; i < vehicles_data.length; i++)
	{
		vehicles_data[i].distance_travelled += vehicles_data[i].gas_amount;
		vehicles_data[i].coord_y = sleuthPI_car.coord_y - vehicles_data[i].distance_travelled + sleuthPI_car.distance_travelled;
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
		roadLeftEdge + roadWidth/2 , i * 100 + (sleuthPI_car.distance_travelled%100),
		roadLeftEdge + roadWidth/2 , i * 100 + 70 + (sleuthPI_car.distance_travelled%100)
		);
	}
}

function drawCars()
{
	//draw the detective car

	image
	drawExhaust(sleuthPI_car);
	image
	(
		carImages["detective"],
		sleuthPI_car.coord_x - carImages["detective"].width/2 + random(-sleuthPI_car.vibrate_val, sleuthPI_car.vibrate_val),
		sleuthPI_car.coord_y + random(-sleuthPI_car.vibrate_val, sleuthPI_car.vibrate_val)
	);

	//draw all other cars

	for(var i = 0; i < vehicles_data.length; i ++)
	{
		if(vehicles_data[i].coord_y < height && vehicles_data[i].coord_y > -height/2)
		{
			image(
			carImages[vehicles_data[i].vehicle_variety],
			vehicles_data[i].coord_x - carImages[vehicles_data[i].vehicle_variety].width/2,
			vehicles_data[i].coord_y
			);
			cycleEngine(vehicles_data[i]);

			drawExhaust(vehicles_data[i]);
		}
	}

}

function cycleEngine(car)
{

	car.exhaust.push({size: 2, x: car.coord_x, y: car.coord_y + carImages[car.vehicle_variety].height});

	for(var i = car.exhaust.length -1; i >= 0 ; i--)
	{

		car.exhaust[i].y  += max(0.75, car.gas_amount/3);
		if(car.vehicle_variety != "detective")car.exhaust[i].y += (sleuthPI_car.gas_amount - car.gas_amount);
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
