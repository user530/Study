/*

Officer: 2481930
CaseNum: 502-1-95710897-2481930

Case 502 - A delicate matter - stage 2

We’re hot on the trail kid, and another document has come my way.
It’s a little more tricky to decipher but I know you can do it.

In setup, fill in the redactedText String variable by replacing the redacted words
with references to the two arrays containing the missing pieces.
you can do this by indexing the appropriate items from the respective arrays.

There are many possible ways of completing this task,
but you should ONLY use the following commands:

" + Array[index].property + "

*/

// you dont need to change these
var missingWords;
var redactedText;

// arrays containing the names needed to fill in the paragraph
var AListing = [
	{Component0: "bake", Component1: "syndicate", Component2: "COBOL"}, 
	{Component0: "tug", Component1: "start", Component2: "fence"}, 
	{Component0: "consider", Component1: "romantic", Component2: "succeed"}, 
	{Component0: "delicate", Component1: "clip", Component2: "tug"}, 
	{Component0: "consider", Component1: "play", Component2: "clip"}, 
	{Component0: "fence", Component1: "charge", Component2: "charge"}, 
	{Component0: "plug", Component1: "succeed", Component2: "smile"}, 
	{Component0: "succeed", Component1: "radiate", Component2: "clip"}, 
	{Component0: "charge", Component1: "Governor Zuckerberg", Component2: "fence"}, 
	{Component0: "hurry", Component1: "hurry", Component2: "start"}
];

var BListing = [
	{Component0: "plug", Component1: "mend", Component2: "sneeze"}, 
	{Component0: "rejoice", Component1: "hurry", Component2: "sail"}, 
	{Component0: "rejoice", Component1: "stuff", Component2: "radiate"}, 
	{Component0: "rejoice", Component1: "she has", Component2: "sail"}, 
	{Component0: "capital", Component1: "play", Component2: "meddle"}, 
	{Component0: "play", Component1: "Edsger", Component2: "sneeze"}, 
	{Component0: "plug", Component1: "clip", Component2: "fence"}, 
	{Component0: "bake", Component1: "mend", Component2: "Hopper’s"}, 
	{Component0: "clip", Component1: "meddle", Component2: "tug"}, 
	{Component0: "hurry", Component1: "a donation", Component2: "mend"}
];

var myFont;
var backgroundImg;

function preload() {
  myFont = loadFont('SpecialElite.ttf');
  backgroundImg = loadImage("Background.png");
}

function setup()
{
  createCanvas(1280,800);

  // replace all redacted words with the correct values from the data structures above

  missingWords = "Edsger, Hopper’s, she has, romantic, COBOL, syndicate, delicate, capital, a donation, Governor Zuckerberg";

  redactedText = "My dearest " + BListing[5].Component1 + ", Please don’t doubt my sincerity when I say that I hadn’t the faintest idea about " + BListing[7].Component2 + " intervention. I suspect that " + BListing[3].Component1 + " a " + AListing[2].Component1 + " interest at the " + AListing[0].Component2 + ". I and the " + AListing[0].Component1 + " appreciate your many contributions over the years. However, this is a most " + AListing[3].Component0 + " matter which would require significant " + BListing[4].Component0 + " for me to deal with it satisfactorily. I would not be so crude as to suggest a sum but perhaps " + BListing[9].Component1 + " to my forthcoming campaign would help. Yours sincerely, " + AListing[8].Component1;

}

function draw()
{
  // you don't need to change this
  image(backgroundImg, 0, 0);
  stroke(0);
  strokeWeight(3);
  line(width/2, 10, width/2, height - 10);
  noStroke();
  textFont(myFont);
  textSize(14);
  text(redactedText, 30, 100, 580, 600);
  text(missingWords, 670, 100, 580, 600);
}
