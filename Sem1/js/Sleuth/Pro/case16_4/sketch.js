/*
802 - The case of Monte Carlo
Stage 4 - Club criminal


Officer: 2481930
CaseNum: 802-3-22831434-2481930

The card sharks from Rossling Polling are not pleased with your stellar performance and suspect foul play. They are challenging you to find a single card in the deck in just one cut.
The card you are looking for is stored in the cutHere object. Cut the deck at this exact location and they will give up their secrets.

* Using a for loop search for the card represented by cutHere in the card_deck array.
* Do this in a function called deck_cut and call it from setup.
* We need to be quick to not be spotted. Make sure you use a for loop and the break statement when you find a match in the deck.
* Store the cut card and all the elements after from the card_deck array in the deck_upto_cut array. Do this using the JavaScript splice() function
* You’ll then need to reverse the elements in deck_upto_cut so that the card we cut the deck at is the last element and not the first. Unfortunatly, if we use the JavaScript inbuilt reverse() function we’ll be spotted. You’ll have to write this yourself kid. Do this in the deck_cut after you have filled deck_upto_cut.


*You also need to write a shuffleSeed() function. Same as before, it needs to return an array of 52 random integers but set the random value to start at 1 and end at 100.
Make sure you use the push method to add values to your array and the round function to convert your random values to integers.
*Call shuffleSeed in setup and use the return value as the argument for shuffleDeck().

*/

var card_deck = [{"card_suit":"Spades","no":"A"},{"card_suit":"Spades","no":"2"},{"card_suit":"Spades","no":"3"},{"card_suit":"Spades","no":"4"},{"card_suit":"Spades","no":"5"},{"card_suit":"Spades","no":"6"},{"card_suit":"Spades","no":"7"},{"card_suit":"Spades","no":"8"},{"card_suit":"Spades","no":"9"},{"card_suit":"Spades","no":"10"},{"card_suit":"Spades","no":"J"},{"card_suit":"Spades","no":"Q"},{"card_suit":"Spades","no":"K"},{"card_suit":"Clubs","no":"A"},{"card_suit":"Clubs","no":"2"},{"card_suit":"Clubs","no":"3"},{"card_suit":"Clubs","no":"4"},{"card_suit":"Clubs","no":"5"},{"card_suit":"Clubs","no":"6"},{"card_suit":"Clubs","no":"7"},{"card_suit":"Clubs","no":"8"},{"card_suit":"Clubs","no":"9"},{"card_suit":"Clubs","no":"10"},{"card_suit":"Clubs","no":"J"},{"card_suit":"Clubs","no":"Q"},{"card_suit":"Clubs","no":"K"},{"card_suit":"Hearts","no":"A"},{"card_suit":"Hearts","no":"2"},{"card_suit":"Hearts","no":"3"},{"card_suit":"Hearts","no":"4"},{"card_suit":"Hearts","no":"5"},{"card_suit":"Hearts","no":"6"},{"card_suit":"Hearts","no":"7"},{"card_suit":"Hearts","no":"8"},{"card_suit":"Hearts","no":"9"},{"card_suit":"Hearts","no":"10"},{"card_suit":"Hearts","no":"J"},{"card_suit":"Hearts","no":"Q"},{"card_suit":"Hearts","no":"K"},{"card_suit":"Diamonds","no":"A"},{"card_suit":"Diamonds","no":"2"},{"card_suit":"Diamonds","no":"3"},{"card_suit":"Diamonds","no":"4"},{"card_suit":"Diamonds","no":"5"},{"card_suit":"Diamonds","no":"6"},{"card_suit":"Diamonds","no":"7"},{"card_suit":"Diamonds","no":"8"},{"card_suit":"Diamonds","no":"9"},{"card_suit":"Diamonds","no":"10"},{"card_suit":"Diamonds","no":"J"},{"card_suit":"Diamonds","no":"Q"},{"card_suit":"Diamonds","no":"K"}];
var deck_img;
var table_img;
var drawCounter = 0;
                                                                                        //DELETE
//                                                                                        var a = [0,1,2,3,4,5,6,7,8,9];
//                                                                                        var b = ["A","B","C","D","E"];
                                                                                        //var c = [];

var cutHere = {"cardSuit":"Hearts","value":"4"};
var deck_upto_cut = [];

function preload()
{
	deck_img = loadImage("deck.png");
	table_img = loadImage("table.png");
}
function setup()
{
	createCanvas(table_img.width, table_img.height);
	frameRate(30);
//                                                                                            console.log(b);
//                                                                                            b = a.splice(6,a.length - 6);
//                                                                                            b.push(a);
//                                                                                            console.log(b);
    
	//call your shuffleSeed() function here. Followed by a call to shuffleDeck with the return value of shuffleSeed() as an argument.
    shuffleSeed();
    shuffleDeck(shuffleSeed());
	//call your deck_cut function here

    deck_cut();
}

//write your deck_cut function here

function deck_cut()
{
    console.log(card_deck);
    for (let i = 0 ; i < card_deck.length ; i++)
        {
            if ((card_deck[i].card_suit == cutHere.cardSuit) && (card_deck[i].no == cutHere.value))
                {
                    for (let j = i ; j < card_deck.length; j++)
                        {
                            splice(deck_upto_cut, card_deck[j], 0);
                        }
                    break;
                }
        }
}

//write your shuffleSeed() function here.

function shuffleSeed()
{
    let seedNumbers = [];
    for (let i = 0 ; i < card_deck.length ; i++)
        {
            seedNumbers.push(round(random(1, 100)));
        }
    return seedNumbers;
}

/////////////////////DON'T CHANGE ANYTHING BELOW HERE/////////////////////////
function shuffleDeck(shuffleSeed)
{
		//shuffle the deck by rotating the cards location with the values in
		//shuffleSeed. Repeat this a random number of times between 20 and 50
    var shuffleIterations = parseInt(random(20, 50));
    for(var i = 0; i < shuffleIterations; i++)
    {
	   for (var j = 0; j < card_deck.length; j++)
	   {
		  var tempCard = card_deck.splice(j, 1);
          var newLoc = (j + shuffleSeed[j])%52;
          card_deck.splice(newLoc, 0, tempCard[0]);
	   }
    }
}

function draw()
{
	image(table_img, 0, 0);

	if (frameCount % 7 == 0)
	{
		drawCounter++;
		if (drawCounter == 5)
		{
			noLoop();
		}
	}
	for (var i = 0; i < drawCounter; i++)
	{
		if(i < deck_upto_cut.length)
		{
			drawCard(deck_upto_cut[i], 880 + i * 18, 750);
		}
	}


}


function drawCard(card, x, y)
{

	var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	var suits = ["Spades", "Clubs", "Hearts", "Diamonds"];

	for (var i = 0; i < suits.length; i++)
	{
		for (var j = 0; j < values.length; j++)
		{
			if (card.no == values[j] && card.card_suit == suits[i])
			{
			//img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				image(deck_img, j * 200, i * 300, 200, 300, x, y, 100, 150);
				break;
			}
		}
	}
}
