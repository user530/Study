/*

Officer: 2481930
CaseNum: 202-0-32694819-2481930

Case 202 - The case of Bob and Daisy - stage 1

That pair of notorious criminals Woz and Jobs are up to no good again.
I’ve intercepted letters sent between them. It seems that they are
communicating through an ingenious code in which they masquerade as
besotted lovers, Dais y and Bob. I need you crack their code and determine
the details of their next heist so that we can catch them in the act.

Discover the hidden code by commenting out all text commands except
those which produce Lawn Green text. Only comment out text commands.
Leave fill commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	letterFont = loadFont('Ballpointprint.ttf');
}

function setup()
{
	createCanvas(556,591);
	textFont(letterFont);
	textSize(27);
}

function draw()
{
	background(255);

	fill(0,0,205);
//	text("the", 228,295);
	fill(0,250,154);
//	text("kiest", 322,295);
	fill(0,255,255);
//	text("makea", 92,205);
//	text("our", 90,350);
	fill(0,139,139);
//	text("From", 9,81);
	fill(135,206,235);
//	text("your", 468,81);
//	text("seconds", 9,142);
	fill(176,224,230);
//	text("music", 318,266);
	fill(184,134,11);
//	text("the", 85,81);
	fill(210,105,30);
//	text("must", 108,295);
	fill(255,215,0);
//	text("one", 379,142);
	fill(128,0,128);
//	text("eyes.", 279,378);
	fill(0,255,255);
//	text("I", 179,109);
	fill(0,255,0);
//	text("your", 468,238);
//	text("x", 71,486);
//	text("am", 170,322);
	fill(165,42,42);
//	text("that", 88,322);
	fill(240,128,128);
//	text("Bob", 9,486);
//	text("of", 407,266);
//	text("I", 389,81);
	fill(127,255,0);
//	text("darling,", 79,378);
	fill(0,250,154);
//	text("saw", 406,81);
	fill(199,21,133);
//	text("I", 91,295);
//	text("face,", 102,109);
//	text("only", 349,350);
	fill(124,252,0);
	text("chosen", 292,322);
	fill(34,139,34);
//	text("It", 371,205);
	fill(138,43,226);
//	text("that", 315,238);
	fill(50,205,50);
//	text("ely", 103,27);
	fill(255,215,0);
//	text("the", 182,238);
	fill(75,0,130);
//	text("last", 144,350);
//	text("luc", 282,295);
	fill(32,178,170);
//	text("I", 274,350);
//	text("can", 291,350);
	fill(127,255,212);
//	text("you", 194,142);
	fill(0,0,139);
//	text("I", 512,205);
//	text("lov", 62,27);
//	text("Daisy,", 153,27);
	fill(178,34,34);
//	text("few", 434,109);
	fill(255,255,0);
//	text("are", 142,173);
	fill(255,99,71);
//	text("my", 328,142);
	fill(222,184,135);
//	text("am", 11,238);
//	text("alone", 63,238);
	fill(135,206,250);
//	text("voi", 12,266);
	fill(178,34,34);
//	text("lov", 10,173);
	fill(219,112,147);
//	text("hear", 397,238);
	fill(173,255,47);
//	text("blessed", 205,266);
	fill(0,100,0);
//	text("ce", 53,266);
	fill(255,165,0);
//	text("your", 9,378);
	fill(135,206,250);
//	text("and", 83,432);
	fill(240,230,140);
//	text("when", 430,205);
	fill(0,0,255);
//	text("knew", 196,109);
//	text("ive", 38,322);
	fill(238,232,170);
//	text("person", 397,295);
	fill(240,230,140);
//	text("Love", 9,432);
	fill(218,112,214);
//	text("like", 94,266);
	fill(0,128,0);
//	text("You", 86,173);
	fill(139,69,19);
//	text("were", 253,142);
	fill(238,130,238);
//	text("true", 439,142);
	fill(0,0,128);
//	text("the", 151,266);
//	text("?", 348,205);
	fill(0,0,139);
//	text("my", 195,173);
//	text("harp.", 11,295);
	fill(139,0,139);
//	text("e.", 51,173);
	fill(255,0,255);
//	text("since", 10,350);
//	text("think", 416,350);
//	text("m", 201,81);
	fill(65,105,225);
//	text("in", 148,238);
	fill(255,0,0);
//	text("those", 349,109);
	fill(148,0,211);
//	text("Oh", 15,27);
	fill(139,0,139);
//	text("that", 324,81);
	fill(100,149,237);
//	text("lovely", 11,109);
	fill(250,128,114);
//	text("of", 494,350);
	fill(75,0,130);
//	text("your", 222,322);
	fill(173,216,230);
//	text("green", 192,378);
	fill(240,128,128);
//	text("the", 443,266);
	fill(123,104,238);
//	text("I", 153,322);
	fill(218,112,214);
//	text("confession", 193,205);
	fill(238,130,238);
//	text("quiet", 236,238);
	fill(184,134,11);
//	text("from", 277,109);
	fill(139,0,0);
//	text("I", 380,238);
	fill(0,255,255);
//	text("Ever", 398,322);
	fill(30,144,255);
//	text("be", 185,295);
	fill(0,100,0);
//	text("April.", 429,173);
	fill(173,216,230);
//	text("oment", 227,81);
	fill(255,127,80);
//	text("that", 129,142);
	fill(128,128,0);
//	text("al", 13,322);
	fill(0,255,127);
//	text("kisses,", 143,432);
	fill(139,69,19);
//	text("I", 75,205);
	fill(173,216,230);
//	text("sunny", 246,173);
	fill(124,252,0);
	text("date", 203,350);
	text("May", 10,205);
	text("is", 399,205);
	text("in", 395,173);
	text("day", 336,173);
	text("first", 139,81);



}
