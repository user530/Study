/*
Officer: 2481930
CaseNum: 601-0-50713976-2481930

Case 601 - Escaped - stage 1

We've got an emergency here. The notorious killer Casey Fry has escaped from the Federal Correctional Institution.
She is on the loose and we have been asked to track her movements.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, MediumBlue stroke ellipses at each location.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

For this mission you will need ONLY the following:

- for loop
- stroke
- ellipse()


*/

var countyMap;

//Sightings of Casey Fry.

var Suspect_Record = [ 
  { coordX : 127, coordY : 175},
  { coordX : 156, coordY : 158},
  { coordX : 179, coordY : 192},
  { coordX : 200, coordY : 154},
  { coordX : 220, coordY : 133},
  { coordX : 228, coordY : 168},
  { coordX : 249, coordY : 149},
  { coordX : 269, coordY : 139},
  { coordX : 292, coordY : 168},
  { coordX : 321, coordY : 133},
  { coordX : 354, coordY : 159},
  { coordX : 390, coordY : 144},
  { coordX : 396, coordY : 225},
  { coordX : 429, coordY : 228},
  { coordX : 456, coordY : 230},
  { coordX : 467, coordY : 277},
  { coordX : 483, coordY : 267},
  { coordX : 531, coordY : 291},
  { coordX : 547, coordY : 278},
  { coordX : 571, coordY : 274},
  { coordX : 589, coordY : 318},
  { coordX : 637, coordY : 280} 
];


function preload()
{
	countyMap = loadImage("map.png")
}

function setup()
{
  createCanvas(countyMap.width, countyMap.height);

	image(countyMap, 0,0);
	//add your code below here
for (let i = 0 ; i < Suspect_Record.length ; i++)
    {
        noFill();
        stroke(0, 0, 205);
        ellipse(Suspect_Record[i].coordX, Suspect_Record[i].coordY, 30, 30);
    }

}

//We are not using the draw function this time
