/*

Officer: 2481930
CaseNum: 701-2-62989976-2481930

Case 701 - Recognisable robber - stage 3

Kid you’re becoming a victim of your own success.
I just had a call from DI Max down at the precinct. He specifically requested your services.
They finally have a reliable witness for a robber who has been causing mayhem for some months.
Luckily they have a witness statement from bridget symmes. You know what to do kid.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a number value indicating how many of their properties match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function testSuspect(suspectObj){}
 - if()

Witness statement:

It was last Thursday, I heard noises outside so I looked out and saw a person in the steet. It was very dark and I could barely see, They seemed to be between the age of 38 and 41 years old. They were wearing a green army coat. They were fairly tall, I think between a height of 151 and 180 cm. It's so hard to remember right now. I distinctly remember that they were wearing a dotted necktie, I remember thinking that was quite unusual. Their expression seemed menacing. I remember they had a anchor tattoo. They brobably weigh between 58 and 81 kg. They had dark brown hair. Can I go home now Sir? 

*/

var suspectsArray = [
	{ 
		"name": "JENIFFER SYMMES",
		"hair": "thick black",
		"tattoo": "jellyfish",
		"item": "pink scarf",
		"coat": "red parka",
		"weight": 81,
		"height": 177,
		"age": 49
	},
	{ 
		"name": "LAVERNE OORIN",
		"hair": "ginger",
		"tattoo": "sword",
		"item": "pair of leather trousers",
		"coat": "green jacket",
		"weight": 71,
		"height": 160,
		"age": 54
	},
	{ 
		"name": "TAMICA WARMAN",
		"hair": "thin blond",
		"tattoo": "big arrow",
		"item": "net weave shirt",
		"coat": "black overcoat",
		"weight": 67,
		"height": 175,
		"age": 39
	},
	{ 
		"name": "MAJORIE BROADVIEW",
		"hair": "dark brown",
		"tattoo": "anchor",
		"item": "dotted necktie",
		"coat": "green army coat",
		"weight": 76,
		"height": 167,
		"age": 39
	},
	{ 
		"name": "BRAD COURTWOOD",
		"hair": "no",
		"tattoo": "dragon",
		"item": "orange socks",
		"coat": "yellow poncho",
		"weight": 72,
		"height": 183,
		"age": 55
	},
	{ 
		"name": "HANG ASHELY",
		"hair": "shaved",
		"tattoo": "dark black",
		"item": "red necktie",
		"coat": "blue overcoat",
		"weight": 86,
		"height": 174,
		"age": 42
	},
	{ 
		"name": "TU DORCEY",
		"hair": "long white",
		"tattoo": "ox",
		"item": "purple hat",
		"coat": "black hoodie",
		"weight": 76,
		"height": 180,
		"age": 42
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
function testSuspect(suspectsArray)
{
    let n = 0;
    if ((suspectsArray.age > 38) && (suspectsArray.age < 41))
        {
            n += 1;
        }
    if (suspectsArray.coat == "green army coat")
        {
            n += 1;
        }
    if ((suspectsArray.height > 151) && (suspectsArray.height < 180))
        {
            n += 1;
        }
    if (suspectsArray.item == "dotted necktie")
        {
            n += 1;
        }
    if (suspectsArray.tattoo == "anchor")
        {
            n += 1;
        }
    if ((suspectsArray.weight > 58) && (suspectsArray.weight < 81))
        {
            n += 1;
        }
    if (suspectsArray.hair == "dark brown")
        {
            n += 1;
        }
    return n;
//    return (((suspectsArray.age > 38) && (suspectsArray.age < 41)) + 
//                (suspectsArray.coat == "green army coat") +
//                    ((suspectsArray.height > 151) && (suspectsArray.height < 180)) + 
//                        (suspectsArray.item == "dotted necktie") +
//                            (suspectsArray.tattoo == "anchor") +
//                                ((suspectsArray.age > 58) && (suspectsArray.age < 81)) +
//                                    (suspectsArray.hair == "dark brown"));
}


function draw()
{
  //You don't need to alter this code
  image(backgroundImg, 0, 0);

  for(let i = 0 ; i < suspectsArray.length; i++){
    let matchingProperties = testSuspect(suspectsArray[i]);
    fill(50 * matchingProperties,250 - (50 * matchingProperties),0);
    text("found " + matchingProperties + " matching properties for " + suspectsArray[i].name, 60, 60 + i * 20);
  }
}
