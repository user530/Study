/*

Officer: 2481930
CaseNum: 202-1-36658825-2481930

Case 202 - The case of Bob and Daisy - stage 2

Here’s another letter kid. This time it’s from Daisy (aka. Woz).
Decode it to uncover more about Woz and Job’s dastardly plan.

Discover the hidden code by commenting out all text commands except
those which produce Orchid filled text with a Lime outline.
Only comment out text commands - leave fill & stroke commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	letterFont = loadFont('Melissa.otf');
}

function setup()
{
	createCanvas(576,502);
	textFont(letterFont);
	textSize(26);
}

function draw()
{
	background(255);

	fill(0,250,154);
	stroke(32,178,170);
//	text("small", 270,277);
	fill(255,255,0);
	stroke(0,0,255);
//	text("I", 125,131);
	fill(0,250,154);
//	text("you", 8,277);
	fill(218,112,214);
	stroke(0,255,0);
	text("bank", 186,307);
	text("the", 406,78);
	fill(255,0,0);
	stroke(34,139,34);
//	text("?", 103,131);
	fill(0,139,139);
	stroke(0,0,139);
//	text("Forever", 8,359);
	fill(222,184,135);
	stroke(255,69,0);
//	text("be", 440,217);
	fill(106,90,205);
	stroke(154,205,50);
//	text("think", 469,157);
	fill(50,205,50);
	stroke(218,165,32);
//	text("store", 8,217);
	fill(148,0,211);
	stroke(25,25,112);
//	text("?", 181,246);
	fill(0,255,0);
	stroke(0,128,128);
//	text("to", 529,189);
	fill(0,191,255);
	stroke(165,42,42);
//	text("de", 10,307);
	fill(34,139,34);
	stroke(128,0,128);
//	text("will", 345,217);
	fill(123,104,238);
	stroke(25,25,112);
//	text("do", 401,189);
	fill(238,130,238);
	stroke(148,0,211);
//	text("around", 307,78);
	fill(25,25,112);
	stroke(0,100,0);
//	text("the", 305,246);
	fill(124,252,0);
	stroke(139,69,19);
//	text("I", 519,131);
	fill(255,215,0);
	stroke(148,0,211);
//	text("return.", 473,307);
	stroke(255,69,0);
//	text("having", 157,78);
	fill(0,255,127);
	stroke(255,215,0);
//	text("night", 209,157);
	fill(184,134,11);
	stroke(0,0,128);
//	text("How", 10,104);
	fill(153,50,204);
	stroke(210,105,30);
//	text("we", 395,217);
	fill(240,230,140);
//	text("I", 442,189);
	fill(144,238,144);
	stroke(139,0,0);
//	text("and", 342,157);
	fill(0,206,209);
	stroke(199,21,133);
//	text("swift", 404,307);
	fill(138,43,226);
	stroke(128,0,0);
//	text("my", 389,131);
	fill(135,206,250);
	stroke(199,21,133);
//	text("Even", 203,246);
	fill(106,90,205);
	stroke(220,20,60);
//	text("it", 289,104);
	fill(238,130,238);
	stroke(153,50,204);
//	text("nce", 335,104);
	fill(128,128,0);
	stroke(255,0,0);
//	text("this", 82,217);
	fill(173,255,47);
	stroke(0,206,209);
//	text("to", 205,131);
	fill(106,90,205);
	stroke(148,0,211);
//	text("?", 241,217);
	fill(220,20,60);
	stroke(255,0,255);
//	text("of", 70,189);
	fill(0,128,128);
	stroke(199,21,133);
//	text("kissed", 12,131);
	fill(64,224,208);
	stroke(255,255,0);
//	text("on", 298,307);
	fill(255,255,0);
	stroke(255,140,0);
//	text("x", 88,411);
	fill(255,127,80);
	stroke(46,139,87);
//	text("stare", 10,157);
	fill(0,0,139);
	stroke(127,255,0);
//	text("without", 445,246);
	fill(219,112,147);
	stroke(0,0,139);
//	text("longing", 137,217);
	fill(75,0,130);
	stroke(0,139,139);
//	text("only", 8,189);
	fill(186,85,211);
	stroke(139,0,0);
//	text("yours,", 114,359);
	fill(123,104,238);
	stroke(148,0,211);
//	text("miss", 89,78);
	fill(186,85,211);
	stroke(139,0,139);
//	text("arms.", 437,131);
	fill(0,0,205);
	stroke(75,0,130);
//	text("ing", 250,307);
	fill(205,133,63);
	stroke(255,255,0);
//	text("ag", 101,246);
	fill(176,224,230);
	stroke(0,206,209);
//	text("your", 338,307);
	fill(148,0,211);
	stroke(34,139,34);
//	text("Daisy", 8,411);
	fill(135,206,250);
	stroke(160,82,45);
//	text("side,", 145,277);
	fill(250,128,114);
	stroke(255,215,0);
//	text("you", 303,131);
	fill(65,105,225);
	stroke(0,250,154);
//	text("united", 11,246);
	fill(128,0,128);
	stroke(139,0,0);
//	text("much", 231,189);
	fill(25,25,112);
	stroke(107,142,35);
//	text("long", 141,131);
	fill(255,255,0);
	stroke(139,0,139);
//	text("I", 399,157);
	fill(238,130,238);
	stroke(0,0,139);
//	text("at", 63,277);
	fill(0,128,128);
	stroke(0,255,127);
//	text("solate.", 43,307);
	fill(184,134,11);
	stroke(0,100,0);
//	text("have", 458,189);
	fill(255,105,180);
	stroke(0,206,209);
//	text("in", 358,131);
	fill(0,255,127);
	stroke(139,0,139);
//	text("ain", 134,246);
	fill(255,99,71);
//	text("I'm", 138,307);
	stroke(0,0,139);
//	text("I", 73,78);
	fill(220,20,60);
	stroke(127,255,0);
//	text("last", 434,104);
	fill(184,134,11);
	stroke(0,206,209);
//	text("darling", 51,26);
	fill(255,127,80);
	stroke(0,255,127);
//	text("this", 215,277);
	fill(0,100,0);
	stroke(255,0,0);
//	text("many", 75,104);
	stroke(139,69,19);
//	text("months", 155,104);
	fill(178,34,34);
	stroke(0,255,127);
//	text("my", 97,277);
	fill(250,128,114);
	stroke(0,255,255);
//	text("When", 263,217);
	fill(153,50,204);
	stroke(218,165,32);
//	text("hold", 239,131);
	fill(106,90,205);
	stroke(0,128,128);
//	text("we", 389,104);
	fill(255,127,80);
	stroke(220,20,60);
//	text("si", 314,104);
	fill(222,184,135);
	stroke(148,0,211);
//	text("you", 252,78);
	fill(240,128,128);
	stroke(0,0,205);
//	text("How", 8,78);
	fill(220,20,60);
	stroke(218,165,32);
//	text("the", 159,157);
	fill(72,209,204);
	stroke(0,139,139);
//	text("in", 274,246);
	fill(240,230,140);
	stroke(0,0,139);
//	text("Bob,", 150,26);
	fill(25,25,112);
	stroke(0,0,205);
//	text("you.", 103,189);
	fill(64,224,208);
	stroke(255,0,0);
//	text("up", 84,157);
	stroke(0,255,0);
//	text("feels", 418,277);
	fill(210,105,30);
	stroke(139,0,139);
//	text("How", 166,189);
	fill(0,191,255);
	stroke(25,25,112);
//	text("longer", 310,189);
	fill(30,144,255);
	stroke(0,255,0);
//	text("can", 415,157);
	fill(218,112,214);
	text("spring", 355,246);
	text("is", 260,104);
	fill(64,224,208);
	stroke(139,0,139);
//	text("My", 6,26);
	fill(218,112,214);
	stroke(0,255,0);
	text("town", 347,277);
	text("at", 125,157);
	text("place", 456,78);
	fill(147,112,219);
	stroke(0,191,255);
//	text("sky,", 283,157);



}
