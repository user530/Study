/*

Officer: 2481930
CaseNum: 202-3-61649775-2481930

Case 202 - The case of Bob and Daisy - stage 4

Here’s the final letter from Daisy (aka. Woz). Decode it to uncover the
final details about Woz and Job’s dastardly plan.

Discover the hidden code by commenting out all text commands except
those which produce Brown filled text with a Fire Brick outline in Melissa font.
Only comment out text commands - leave fill & stroke, push and pop commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	Ballpointprint = loadFont('Ballpointprint.ttf');
	Melissa = loadFont('Melissa.otf');
	Diggity = loadFont('Diggity.ttf');
	RonsFont = loadFont('RonsFont.ttf');
}

function setup()
{
	createCanvas(585,577);
	textSize(34);
}

function draw()
{
	background(255);

	push();
	fill(0,255,255);
	stroke(0,250,154);
	textFont(RonsFont);
//	text("sure", 373,262);
	pop();
	fill(173,255,47);
	stroke(210,105,30);
	textFont(Diggity);
//	text("ays.", 203,262);
	fill(65,105,225);
	stroke(0,255,255);
//	text("I", 56,223);
	push();
	fill(255,255,0);
	stroke(0,0,128);
	textFont(Melissa);
//	text("a", 153,144);
	pop();
	stroke(0,128,0);
//	text("Bob,", 165,34);
	fill(160,82,45);
	stroke(32,178,170);
	textFont(RonsFont);
//	text("you", 69,102);
	fill(178,34,34);
	stroke(0,191,255);
//	text("Perhaps", 267,102);
	fill(255,0,255);
	stroke(255,255,0);
	textFont(Diggity);
//	text("these", 15,262);
	push();
	fill(233,150,122);
	stroke(0,0,255);
//	text("cash.", 178,223);
	pop();
	stroke(255,69,0);
	textFont(Melissa);
//	text("I", 84,302);
	push();
	fill(128,0,128);
	stroke(128,0,0);
//	text("send", 127,223);
	pop();
	stroke(128,0,128);
	textFont(RonsFont);
//	text("ignore", 429,223);
	fill(240,128,128);
	stroke(34,139,34);
	textFont(Melissa);
//	text("I", 244,223);
	fill(128,0,0);
	stroke(128,0,0);
	textFont(Ballpointprint);
//	text("we", 375,102);
	fill(199,21,133);
	stroke(0,0,255);
//	text("relationship", 28,186);
	fill(128,0,128);
	stroke(199,21,133);
	textFont(Diggity);
//	text("so", 100,342);
	push();
	fill(100,149,237);
	stroke(0,128,0);
//	text("so,", 16,223);
	pop();
	fill(153,50,204);
	textFont(Ballpointprint);
//	text("Are", 251,186);
	fill(100,149,237);
	stroke(127,255,0);
	textFont(Melissa);
//	text("not", 334,262);
	push();
	fill(0,255,0);
	stroke(128,128,0);
//	text("money", 444,186);
	pop();
	fill(0,255,255);
	stroke(0,0,139);
	textFont(Diggity);
//	text("?", 225,186);
	fill(0,206,209);
	stroke(0,0,205);
//	text("del", 175,262);
	push();
	fill(144,238,144);
	stroke(218,165,32);
	textFont(Ballpointprint);
//	text("can", 73,223);
	pop();
	fill(75,0,130);
//	text("My", 19,34);
	fill(238,232,170);
	stroke(199,21,133);
	textFont(Melissa);
//	text("much", 511,262);
	fill(255,0,255);
	stroke(0,255,255);
	textFont(RonsFont);
//	text("sometimes.", 215,342);
	fill(139,69,19);
	stroke(0,206,209);
//	text("darling", 59,34);
	fill(255,69,0);
	stroke(0,0,139);
//	text("all", 376,144);
	fill(0,139,139);
	stroke(0,0,205);
	textFont(Melissa);
//	text("me", 209,102);
	push();
	fill(240,128,128);
	stroke(139,0,0);
	textFont(Ballpointprint);
//	text("I'm", 256,262);
	pop();
	stroke(165,42,42);
//	text("no", 312,223);
	fill(186,85,211);
	stroke(0,128,128);
//	text("of", 415,186);
	fill(0,128,0);
	stroke(255,69,0);
//	text("short", 354,186);
	fill(0,128,128);
	stroke(25,25,112);
	textFont(RonsFont);
//	text("Daisy", 19,478);
	fill(0,255,0);
	stroke(0,0,255);
	textFont(Melissa);
//	text("this", 331,144);
	fill(154,205,50);
	stroke(0,128,0);
//	text("should", 428,102);
	fill(255,140,0);
	stroke(0,250,154);
	textFont(RonsFont);
//	text("away", 18,144);
	fill(255,0,255);
	stroke(139,0,0);
	textFont(Ballpointprint);
//	text("out.", 418,144);
	fill(238,232,170);
	stroke(0,0,139);
	textFont(Melissa);
//	text("you", 316,186);
	fill(184,134,11);
	stroke(0,128,128);
	textFont(Ballpointprint);
//	text("yours,", 126,410);
	fill(127,255,0);
	stroke(184,134,11);
	textFont(Diggity);
//	text("are", 49,342);
	fill(255,127,80);
	stroke(0,206,209);
//	text("Are", 14,102);
	fill(65,105,225);
	stroke(0,255,255);
	textFont(Ballpointprint);
//	text("Forever", 12,410);
	fill(123,104,238);
	stroke(128,0,0);
	textFont(Diggity);
//	text("?", 510,186);
	fill(0,128,128);
	stroke(128,128,0);
	textFont(Ballpointprint);
//	text("longer", 341,223);
	fill(34,139,34);
	stroke(154,205,50);
//	text("for", 98,144);
	fill(127,255,212);
	stroke(128,128,0);
	textFont(Diggity);
//	text("more", 17,302);
	fill(238,232,170);
	stroke(160,82,45);
	textFont(RonsFont);
//	text("Is", 471,144);
	fill(218,165,32);
	stroke(0,255,0);
	textFont(Diggity);
//	text("crets,", 324,302);
	push();
	fill(0,0,255);
	stroke(0,0,139);
//	text("can", 102,302);
	pop();
	fill(128,0,0);
	stroke(128,0,128);
	textFont(Melissa);
//	text("our", 515,144);
	fill(106,90,205);
	stroke(0,0,255);
//	text("break", 172,144);
	fill(139,69,19);
	stroke(0,250,154);
//	text("ed", 186,342);
	fill(30,144,255);
	stroke(199,21,133);
	textFont(Ballpointprint);
//	text("silence.", 440,302);
	push();
	fill(165,42,42);
	stroke(178,34,34);
	textFont(Melissa);
	text("guard", 136,342);
	text("safe", 174,186);
	text("avoid", 128,102);
	pop();
	fill(75,0,130);
	stroke(128,0,0);
	textFont(RonsFont);
//	text("?", 202,302);
	fill(0,255,0);
	stroke(153,50,204);
//	text("?", 243,102);
	fill(186,85,211);
	stroke(154,205,50);
	textFont(Diggity);
//	text("If", 536,186);
	fill(25,25,112);
	stroke(0,0,128);
	textFont(Melissa);
//	text("continual", 88,262);
	fill(0,128,0);
	stroke(107,142,35);
//	text("ing", 176,102);
	fill(32,178,170);
	stroke(25,25,112);
	textFont(Ballpointprint);
//	text("The", 226,302);
	push();
	fill(106,90,205);
	stroke(255,215,0);
	textFont(Diggity);
//	text("se", 301,302);
	pop();
	fill(152,251,152);
	stroke(153,50,204);
	textFont(RonsFont);
//	text("x", 97,478);
	fill(0,0,128);
	stroke(0,0,255);
	textFont(Diggity);
//	text("can", 262,223);
	fill(135,206,235);
	stroke(46,139,87);
	textFont(Ballpointprint);
//	text("go", 493,102);
	push();
	fill(128,0,0);
	stroke(124,252,0);
	textFont(Melissa);
//	text("You", 8,342);
	pop();
	fill(153,50,204);
	stroke(255,0,255);
	textFont(Diggity);
//	text("sort", 271,144);
	push();
	fill(0,0,139);
	stroke(0,206,209);
//	text("how", 454,262);
	pop();
	fill(34,139,34);
	stroke(34,139,34);
	textFont(Melissa);
//	text("and", 231,144);
	fill(165,42,42);
	stroke(178,34,34);
	text("take", 152,302);
	text("the", 401,302);



}
