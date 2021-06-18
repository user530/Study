/*

Officer: 2481930
CaseNum: 701-1-82152925-2481930

Case 701 - Credible cat thief - stage 2

Kid they need you down at the precinct again.
This time it's a sneaky cat thief who has been absconding with the neighbourhoods felines for some time.
Luckily old Mrs Olivetti caught a glimpse of them as they disappeared over her back fence.
We’ve a bunch of likely characters lined-up but we need your brains to solve the mystery.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a boolean value indicating whether or not they match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.
It should only return "true" if the suspect matches the description in full.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function checkSuspect(suspectObj){}
 - if()

Witness statement:

I remember walking down the street and then I saw them. By the look of them they were younger than 46. It's hard to say. It's hard to say. They wore cheap plastic glasses. I distinctly remember that they were wearing a dotted necktie, I remember thinking that was quite unusual. I'll never forget their pale eyes. I think they were more than 157 cm tall. The person I saw was male. That's all I know officer. 

*/

var suspectsArray = [
	{ 
		"name": "DARBY ADVERSANE",
		"item": "pink scarf",
		"gender": "male",
		"eyes": "green",
		"height": 175,
		"age": 45
	},
	{ 
		"name": "JENIFFER GOODBURY",
		"item": "pair of leather trousers",
		"gender": "female",
		"eyes": "pale",
		"height": 178,
		"age": 38
	},
	{ 
		"name": "BRAD DAVISWOOD",
		"item": "dotted necktie",
		"gender": "male",
		"eyes": "pale",
		"height": 165,
		"age": 36
	},
	{ 
		"name": "JESSIA PEGORD",
		"item": "purple hat",
		"gender": "male",
		"eyes": "brown",
		"height": 172,
		"age": 43
	},
	{ 
		"name": "SUMMER BROADVIEW",
		"item": "orange socks",
		"gender": "female",
		"eyes": "brown",
		"height": 150,
		"age": 47
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

function checkSuspect(suspectsArray)
{
    if ((suspectsArray.age < 46) && (suspectsArray.item == "dotted necktie") && (suspectsArray.eyes == "pale") && (suspectsArray.height > 157) && (suspectsArray.gender == "male"))
        {
            return true;
        }
}


function draw()
{
  //You don't need to alter this code
  image(backgroundImg, 0, 0);

  for(let i = 0 ; i < suspectsArray.length; i++){
    if(checkSuspect(suspectsArray[i]) == true){
      fill(255,0,0);
      text(suspectsArray[i].name + " is guilty!", 60, 60 + i * 20);
    }else{
      fill(0,155,0);
      text(suspectsArray[i].name + " is not guilty", 60, 60 + i * 20 );
    }
  }
}
