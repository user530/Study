/*
Officer: 2481930
CaseNum: 601-3-84167085-2481930

Case 601 - Narrowing in - stage 4

Casey Fry is on a killing spree and we still haven’t caught her.
We need a more sophisticated approach.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, MediumOrchid fill rectangles centered over each location.

In addition, we've assembled a list of recent thefts in the area. Using another for loop to traverse the
recent crime records, you should mark those locations on the map. Do this by drawing small, DarkOrange fill ellipses at each location.

This time we will catch Fry by comparing both distance from the crimes and dates of sightings.
If she was within less than 71 pixels of any of the crimes within no more than 3 days of their occurrence then the details
should be pushed to the list of possible matches with the following format.

{ crime:{x: 0, y:0, victimName: "John Doe"}, suspect:{x: 0, y:0} }

Note that the possible matches are already being drawn.
Your job is to fill the array with the correct data.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

For this mission you will need ONLY the following:

- for loop
- if()
- dist()
- abs()
- fill
- rect() NB. Draw each rectangle with the point at its center.

- fill
- ellipse()


*/

var countyMap;

var possibleMatches = [];

//Sightings of Casey Fry.

var fugitive_record = [ 
  { posX : 518, posY : 471, day : 12},
  { posX : 486, posY : 508, day : 12},
  { posX : 475, posY : 566, day : 13},
  { posX : 376, posY : 554, day : 13},
  { posX : 316, posY : 559, day : 13},
  { posX : 265, posY : 614, day : 14},
  { posX : 253, posY : 609, day : 14},
  { posX : 240, posY : 604, day : 14},
  { posX : 220, posY : 597, day : 15},
  { posX : 178, posY : 600, day : 15},
  { posX : 199, posY : 604, day : 17},
  { posX : 146, posY : 582, day : 18},
  { posX : 115, posY : 551, day : 20},
  { posX : 67, posY : 495, day : 21},
  { posX : 39, posY : 493, day : 22},
  { posX : 68, posY : 461, day : 24} 
];


//Recent crime records.

var attack_logbook = {
	point_x: [438, 408, 408, 642, 623, 95, 75, 269, 389, 484, 496, 546, 538, 702, 817],
	point_y: [420, 451, 377, 289, 279, 488, 522, 597, 554, 549, 484, 463, 359, 412, 474],
	date: [11, 11, 13, 16, 16, 17, 18, 26, 28, 2, 9, 14, 12, 17, 18],
	killed_: ['TAMICA MAUBERT', 'MAJORIE JENI', 'TU DAVISWOOD', 'LAVERNE JACQUELIN', 'LIANNE COURTWOOD', 'SUMMER CASIMERE', 'ERMELINDA OORIN', 'JULIANA ADVERSANE', 'HANG NIEMELA', 'DEEDEE PHINNEY', 'DRUSILLA WARMAN', 'NELSON TINTLE', 'DARBY MYRLE', 'KITTY THAXTER', 'NICOLE ASHELY'],
};

function preload()
{
	countyMap = loadImage("map.png")
}

function setup()
{
  createCanvas(countyMap.width, countyMap.height);

	image(countyMap, 0,0);

	//add your code below here

    for (let i = 0 ; i < fugitive_record.length ; i++)
        {
            fill(186, 85, 211);
            noStroke();
            rect(fugitive_record[i].posX - 5, fugitive_record[i].posY - 5, 10, 10);
        }
    
    for (let i = 0 ; i < attack_logbook.point_x.length ; i++)
        {
            fill(255, 140, 0);
            noStroke();
            ellipse(attack_logbook.point_x[i], attack_logbook.point_y[i], 10, 10);
            
            for (let j = 0 ; j < fugitive_record.length ; j++)
                {
                    if ((dist(attack_logbook.point_x[i], attack_logbook.point_y[i], 
                                  fugitive_record[j].posX, fugitive_record[j].posY) <= 71) && 
                                        (attack_logbook.date[i] - fugitive_record[j].day <= 3))
                        {
                            possibleMatches.push({ crime: {x: attack_logbook.point_x[i], y: attack_logbook.point_y[i], victimName: attack_logbook.killed_[i]}, suspect: {x: fugitive_record[j].posX, y: fugitive_record[j].posY}});
                        }
                }
        }
    
    console.log(possibleMatches);

	// code to draw the matches ( if any)
	for(let i = 0 ; i < possibleMatches.length ; i++)
	{
		stroke(127);
		strokeWeight(3);
		line(possibleMatches[i].crime.x, possibleMatches[i].crime.y, possibleMatches[i].suspect.x, possibleMatches[i].suspect.y);

		noStroke();
		fill(127);
		text(possibleMatches[i].crime.victimName, possibleMatches[i].crime.x + 15, possibleMatches[i].crime.y + 15);
	}
}

//We are not using the draw function this time
