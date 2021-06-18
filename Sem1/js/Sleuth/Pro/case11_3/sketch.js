/*

Officer: 2481930
CaseNum: 502-2-79172535-2481930

Case 502 - Out of the picture - stage 3

Yet another document has come my way. This one is even more tricky to decipher.
The Governor must really have something to hide.

In setup, fill in the redactedText String variable by replacing the redacted words
with references to the two arrays containing the missing pieces.
you can do this by indexing the appropriate items from the respective arrays.

There are many possible ways of completing this task,
but you should ONLY use the following commands:

" + object.property[index] + "

*/

// you dont need to change these
var missingWords;
var redactedText;

// arrays containing the names needed to fill in the paragraph
var Record_A = {
	Word_0: [ "plug", "clip", "radiate"], 
	Word_1: [ "a donation", "protect", "succeed"], 
	Word_2: [ "stuff", "Governor Zuckerberg", "$200,000"], 
	Word_3: [ "hit", "plug", "meddle"], 
	Word_4: [ "hurry", "smile", "charge"], 
	Word_5: [ "play", "play", "meddle"], 
	Word_6: [ "Hopper", "clip", "clip"], 
	Word_7: [ "stuff", "plug", "succeed"], 
	Word_8: [ "campaign", "meddle", "consider"], 
	Word_9: [ "sail", "mend", "Edsger"]
};

var Record_B = {
	Word_0: [ "consider", "ALGOL", "smile"], 
	Word_1: [ "charge", "play", "charge"], 
	Word_2: [ "charge", "succeed", "hurry"], 
	Word_3: [ "rejoice", "mend", "stuff"], 
	Word_4: [ "rejoice", "sail", "bake"], 
	Word_5: [ "plug", "succeed", "charge"], 
	Word_6: [ "protect", "syndicate", "succeed"], 
	Word_7: [ "mend", "sail", "fence"], 
	Word_8: [ "radiate", "consider", "radiate"], 
	Word_9: [ "start", "radiate", "sneeze"]
};

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

  missingWords = "Governor Zuckerberg, a donation, campaign, $200,000, Hopper, syndicate, hit, ALGOL, Edsger";

  redactedText = "Dear " + Record_A.Word_2[1] + ", I am sure that something could be worked out in terms of " + Record_A.Word_1[0] + " for your " + Record_A.Word_8[0] + ". How does " + Record_A.Word_2[2] + " sound ? I am afraid I will need to be so crude as to spell out what ALGOL requires in return. " + Record_A.Word_6[0] + " needs to be out of the picture. She’s caused enough trouble. Get the " + Record_B.Word_6[1] + " to organise the " + Record_A.Word_3[0] + " but I’d prefer it you don’t mention me or " + Record_B.Word_0[1] + ". I owe them enough favours already. Your old friend, " + Record_A.Word_9[2];

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
