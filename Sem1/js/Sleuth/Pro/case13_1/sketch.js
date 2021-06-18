/*

Officer: 2481930
CaseNum: 701-0-93690295-2481930

Case 701 - Probable pick pocket - stage 1

There has been a spate of pickpocketing downtown and we’ve been asked to lend a hand down at the precinct.
They’ve managed to collect a witness statement from an unsuspecting tourist tu crome and also rounded up a bunch of the usual suspects.
We need you to unravel this mess and work out who is the guilty one.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a boolean value indicating whether or not they match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.
It should only return "true" if the suspect matches the description in full.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function testSuspect(suspectObj){}
 - if()

Witness statement:

I remember walking down the street and then I saw them. They were carrying a plastic box. It's hard to say. It was very dark and I could barely see, I'll never forget their black eyes. I remember they had a jellyfish tattoo. Can I go home now Sir? 

*/

var suspectList = [
	{ 
		"name": "DEEDEE JENI",
		"eyes": "green",
		"accessory": "laptop bag",
		"tattoo": "dragon"
	},
	{ 
		"name": "MAJORIE NIEMELA",
		"eyes": "black",
		"accessory": "plastic box",
		"tattoo": "jellyfish"
	},
	{ 
		"name": "SUMMER PEGORD",
		"eyes": "black",
		"accessory": "orange plasic bag",
		"tattoo": "chinese lettering"
	}
];

var myFont;
var backgroundImg;

function preload() {
  myFont = loadFont('SpecialElite.ttf');
  backgroundImg = loadImage("Background.png");
}

function setup()
{
	createCanvas(640,480);
	textFont(myFont);
}

// Declare your function here
function testSuspect(suspectList){
    if ((suspectList.eyes == "black")&&(suspectList.accessory == "plastic box")&&(suspectList.tattoo == "jellyfish"))
        {
            return true;
        }
}


function draw()
{
  //You don't need to alter this code
  image(backgroundImg, 0, 0);

  for(let i = 0 ; i < suspectList.length; i++){
//      console.log("i = " + i);
//      console.log("Suspect " + suspectList[i].name + " ; Eyes: " + suspectList[i].eyes + " ; Accessory: " + suspectList[i].accessory + " ; Tattoo: " + suspectList[i].tattoo);
    if(testSuspect(suspectList[i]) == true){
      fill(255,0,0);
      text(suspectList[i].name + " is guilty!", 60, 60 + i * 20);
    }else{
      fill(0,155,0);
      text(suspectList[i].name + " is not guilty", 60, 60 + i * 20 );
    }
  }
}
