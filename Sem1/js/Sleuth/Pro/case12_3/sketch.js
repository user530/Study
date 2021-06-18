/*
Officer: 2481930
CaseNum: 601-2-47757353-2481930

Case 601 - Murdering Again - stage 3

Now murders are beginning to occur - we're pretty sure that this is the work of Fry.
If we can place her near any of the recent crime scenes in the area we should be able narrow down her location.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing MediumVioletRed stroke vertexes at each location.

In addition, we've assembled a list of recent thefts in the area. Using another for loop to traverse the
recent crime records, you should mark those locations on the map. Do this by drawing small, DarkBlue fill rectangles centered over each location.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

Let's try to catch Fry by looking patterns between sightings and crimes. If she was within less than 42 pixels of any of the crimes then the details
should be pushed to possible matches with the following format.

{ crime:{x: 0, y:0, victimName: "John Doe"}, suspect:{x: 0, y:0} }

Note that the possible matches are already being drawn.
Your job is simply to fill the array with the correct data.

For this mission you will need ONLY the following:

- for loop
- dist()
- if()
- stroke()
- beginShape(), endShape(), vertex()

- fill
- rect() NB. Draw each rectangle with the point at its center.


*/

var countyMap;
var a = 10;
var possibleMatches = [];

//Sightings of Casey Fry.

var CaseyLogbook_PointX = [639, 681, 712, 756, 715, 701, 753, 815, 795, 788, 781, 768, 750, 732, 714, 695, 693, 654, 624, 594, 555];
var CaseyLogbook_PointY = [288, 286, 293, 310, 368, 425, 436, 468, 506, 497, 486, 489, 500, 506, 514, 531, 552, 523, 500, 484, 474];


//Recent crime records.

var AttackLogbook = {
	Coord_X: [409, 443, 465, 709, 695, 652, 641, 119, 114, 90, 76, 615, 349, 456],
	Coord_Y: [446, 419, 548, 552, 421, 268, 306, 344, 359, 490, 516, 741, 796, 770],
	Murdered_: ['TU DAVISWOOD', 'LESLEY MONKSFORD', 'GAYLA WILLMAR', 'DEEDEE PHINNEY', 'JESSIA PORTOS', 'JAUNITA JOYER', 'TAMICA MAUBERT', 'JESUS FORSLIN', 'ERMELINDA OORIN', 'JENIFFER DEAUVILLE', 'KITTY THAXTER', 'HANG NIEMELA', 'LINETTE MOHWAWK', 'DARBY MYRLE'],
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
    for (let i = 0 ; i  < CaseyLogbook_PointX.length ; i++)
        {
            noFill();
            stroke(199, 21, 133);
//            strokeWeight(10);
            beginShape(POINTS);
                vertex(CaseyLogbook_PointX[i], CaseyLogbook_PointY[i]);
            endShape();
            for (let j = 0 ; j < AttackLogbook.Coord_X.length ; j++)
                {
//                    console.log("i = " + i + "; j = " + j);
//                    console.log("Casey: " + CaseyLogbook_PointX[i] + ", " + CaseyLogbook_PointY[i] + " // Attack: " + AttackLogbook.Coord_X[j] + ", " + AttackLogbook.Coord_Y[j]);
//                    console.log(dist(CaseyLogbook_PointX[i], CaseyLogbook_PointY[i], AttackLogbook.Coord_X[j], AttackLogbook.Coord_Y[j]));
                    if (dist(CaseyLogbook_PointX[i], CaseyLogbook_PointY[i], AttackLogbook.Coord_X[j], AttackLogbook.Coord_Y[j]) < 42)
                        {
                            possibleMatches.push({ crime:{x: AttackLogbook.Coord_X[j], y: AttackLogbook.Coord_Y[j], victimName: AttackLogbook.Murdered_[j]}, suspect:{x: CaseyLogbook_PointX[i], y: CaseyLogbook_PointY[i]} });
                        }
                }
        }
    
//    console.log(possibleMatches);
    
    for (let i = 0 ; i < AttackLogbook.Coord_X.length ; i++)
        {
            fill(0, 0, 139);
            noStroke();
            rect(AttackLogbook.Coord_X[i] - a/2, AttackLogbook.Coord_Y[i] - a/2, a, a);
        }

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
