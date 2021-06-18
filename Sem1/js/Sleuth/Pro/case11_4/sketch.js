/*

Officer: 2481930
CaseNum: 502-3-32071511-2481930

Case 502 - A donation - stage 4

This final document will seal the deal kid. C’mon kid. Let’s send these crooks down.

In setup, fill in the redactedText String variable by replacing the redacted words
with references to the two arrays containing the missing pieces.
you can do this by indexing the appropriate items from the respective arrays.

There are many possible ways of completing this task,
but you should ONLY use the following commands:

" + array[index].property[index] + "

*/

// you dont need to change these
var missingWords;
var redactedText;

// arrays containing the names needed to fill in the paragraph
var recordA = [
{
	redactedWord0: {element0: "succeed", element1: "play", element2: "play", element3: "plug"}, 
	redactedWord1: {element0: "stuff", element1: "tug", element2: "consider", element3: "fence"}, 
	redactedWord2: {element0: "rejoice", element1: "sail", element2: "succeed", element3: "ALGOL"}
},
{
	redactedWord0: {element0: "play", element1: "clip", element2: "Governor Zuckerberg", element3: "charge"}, 
	redactedWord1: {element0: "sail", element1: "protect", element2: "stuff", element3: "tug"}, 
	redactedWord2: {element0: "stuff", element1: "clip", element2: "play", element3: "Edsger"}
},
{
	redactedWord0: {element0: "plug", element1: "start", element2: "sail", element3: "sail"}, 
	redactedWord1: {element0: "radiate", element1: "hurry", element2: "succeed", element3: "$200,000"}, 
	redactedWord2: {element0: "protect", element1: "meddle", element2: "hurry", element3: "start"}
},
{
	redactedWord0: {element0: "ALGOL fish wholesalers", element1: "bake", element2: "development", element3: "bake"}, 
	redactedWord1: {element0: "protect", element1: "succeed", element2: "plug", element3: "play"}, 
	redactedWord2: {element0: "start", element1: "smile", element2: "bake", element3: "rejoice"}
},
{
	redactedWord0: {element0: "charge", element1: "meddle", element2: "fence", element3: "sneeze"}, 
	redactedWord1: {element0: "consider", element1: "smile", element2: "smile", element3: "mend"}, 
	redactedWord2: {element0: "succeed", element1: "play", element2: "consider", element3: "start"}
}];

var recordB = [
{
	redactedWord0: {element0: "sneeze", element1: "tug", element2: "stuff", element3: "radiate"}, 
	redactedWord1: {element0: "you", element1: "charge", element2: "meddle", element3: "rejoice"}, 
	redactedWord2: {element0: "syndicate", element1: "fence", element2: "smile", element3: "sneeze"}
},
{
	redactedWord0: {element0: "meddle", element1: "mend", element2: "start", element3: "rejoice"}, 
	redactedWord1: {element0: "sneeze", element1: "clip", element2: "succeed", element3: "protect"}, 
	redactedWord2: {element0: "protect", element1: "sail", element2: "fence", element3: "hurry"}
},
{
	redactedWord0: {element0: "charge", element1: "play", element2: "hurry", element3: "charge"}, 
	redactedWord1: {element0: "hurry", element1: "bake", element2: "start", element3: "bake"}, 
	redactedWord2: {element0: "succeed", element1: "sneeze", element2: "charge", element3: "start"}
},
{
	redactedWord0: {element0: "charge", element1: "radiate", element2: "smile", element3: "protect"}, 
	redactedWord1: {element0: "charge", element1: "COBOL", element2: "sneeze", element3: "clip"}, 
	redactedWord2: {element0: "clip", element1: "stuff", element2: "start", element3: "protect"}
},
{
	redactedWord0: {element0: "stuff", element1: "succeed", element2: "stuff", element3: "succeed"}, 
	redactedWord1: {element0: "bake", element1: "plug", element2: "clip", element3: "hurry"}, 
	redactedWord2: {element0: "stuff", element1: "succeed", element2: "succeed", element3: "donation"}
}];

var myFont;
var backgroundImg;

function preload() {
  myFont = loadFont('SpecialElite.ttf');
  backgroundImg = loadImage("Background.png");
}

function setup()
{
  createCanvas(1280, 800);

  // replace all redacted words with the correct values from the data structures above

  missingWords = "Edsger, donation, $200,000, ALGOL, you, ALGOL fish wholesalers, syndicate, development, COBOL, Governor Zuckerberg";

  redactedText = "My dearest " + recordA[1].redactedWord2.element3 + ", I have just received your very generous " + recordB[4].redactedWord2.element3 + " of " + recordA[2].redactedWord1.element3 + ". Thank you. This will be invaluable to our campaign." + recordA[0].redactedWord2.element3 + " is a stalwart part of the community and I look forward to continuing our strong partnership in the future. Regard the other matter, I think you will find that all has been satisfactorily dealt with. Just read this morning’s front pages. You can rest assured that no mention was made of " + recordB[0].redactedWord1.element0 + " or " + recordA[3].redactedWord0.element0 + " to the " +  recordB[0].redactedWord2.element0 + ". Your new " + recordA[3].redactedWord0.element2 + " at the " + recordB[3].redactedWord1.element1 + " can now proceed without impediment. Yours sincerely, " + recordA[1].redactedWord0.element2;

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
