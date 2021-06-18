/*

Officer: 2481930
CaseNum: 701-3-68228436-2481930

Case 701 - Believable burglar - stage 4

Those guys down at the precinct need to take your brain for one final spin.
This burglar has been a particularly slippery character and now they believe that they have them.
Luckily they have a have a witness statement from jesus daviswood.
All they need is for you to do the detective work.

This time you must implement two functions:

- A testSuspect function that takes a suspect object as parameter from the data structure below.
Your function should return a number value indicating how many of their properties match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.

- A getSuspectMatch function which traverses the array of suspects and returns the object representing the guilty suspect,
otherwise - return an empty object.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function testSuspect(suspectObj){}
 - function getSuspectMatch(){}
 - if()

Witness statement:

It was last Thursday, I heard noises outside so I looked out and saw a person in the steet. They had long white hair. It's so hard to remember right now. They seemed to be between the age of 34 and 50 years old. I'll never forget their pale eyes. It's hard to say. I remember they had a dark black tattoo. They were fairly tall, I think between a height of 165 and 185 cm. They brobably weigh between 64 and 95 kg. Their expression seemed menacing. They wore black glasses. I distinctly remember that they were wearing a pair of leather trousers, I remember thinking that was quite unusual. It was very dark and I could barely see, Can I go home now Sir? 

*/

var suspectList = [
	{ 
		"name": "LINETTE DEAUVILLE",
		"expression": "nerveous",
		"glasses": "dark brown",
		"tattoo": "anchor",
		"hair": "no",
		"height": 182,
		"age": 37,
		"weight": 86
	},
	{ 
		"name": "HANG GOODBURY",
		"expression": "menacing",
		"glasses": "blue",
		"tattoo": "neck",
		"hair": "thick black",
		"height": 167,
		"age": 19,
		"weight": 81
	},
	{ 
		"name": "DRUSILLA THAXTER",
		"expression": "menacing",
		"glasses": "black",
		"tattoo": "dark black",
		"hair": "long white",
		"height": 169,
		"age": 38,
		"weight": 76
	},
	{ 
		"name": "BRIDGET ASHELY",
		"expression": "blank",
		"glasses": "very thick",
		"tattoo": "dragon",
		"hair": "dark brown",
		"height": 163,
		"age": 43,
		"weight": 64
	},
	{ 
		"name": "RANDEE TINTLE",
		"expression": "confused",
		"glasses": "cheap plastic",
		"tattoo": "jellyfish",
		"hair": "short black",
		"height": 181,
		"age": 45,
		"weight": 61
	},
	{ 
		"name": "SUMMER DAVISWOOD",
		"expression": "sad",
		"glasses": "red",
		"tattoo": "facial",
		"hair": "ginger",
		"height": 199,
		"age": 36,
		"weight": 72
	},
	{ 
		"name": "KITTY MOHWAWK",
		"expression": "empty",
		"glasses": "light tan",
		"tattoo": "ox",
		"hair": "thin blond",
		"height": 167,
		"age": 54,
		"weight": 72
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

// Declare both your functions here

function testSuspect(suspectObj)
{
    let matches = 0;
    if (suspectObj.hair == "long white") {matches += 1;}
    
    if ((suspectObj.age > 34) && (suspectObj.age < 50)) {matches += 1;}
    
    if (suspectObj.tattoo == "dark black") {matches += 1;}
    
    if ((suspectObj.height > 165) && (suspectObj.height < 185)) {matches += 1;}
    
    if ((suspectObj.weight > 64) && (suspectObj.weight < 95)) {matches += 1;}
    
    if (suspectObj.expression == "menacing") {matches += 1;}
    
    if (suspectObj.glasses == "black") {matches += 1;}
    
    return matches;
}

function getSuspectMatch()
{
    for (let i = 0 ; i < suspectList.length ; i++)
        {
//            console.log("Testing " + suspectList[i].name + "...");
            if (testSuspect(suspectList[i]) == 7)
                {
                    return suspectList[i];
                }
        }
}


function draw()
{
  //You don't need to alter this code
  image(backgroundImg, 0, 0);

  fill(255,0,0);
  text(getSuspectMatch().name + " is guilty!", 60, 80);
}
