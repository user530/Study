/*
802 - The case of Monte Carlo
Stage 2 - King of Cards


Officer: 2481930
CaseNum: 802-1-21109722-2481930

You aren’t going to look like much of a Poker player unless you can do a good shuffle. We’ll need to be able to do this with one hand tied behind our back if we are going to pose as pros at the big game.

* Write a function called fill_shuffle_array.
* Declare an empty array in the function.
* Using a for loop fill the array with 52 random integers between 4 and 94.
* Make sure you use the push method to add values to your array and the round function to convert your random values to integers.
* Return the array at the end of the function.
* Call fill_shuffle_array in setup.
* Call Shuffle deck using the return value from fill_shuffle_array as the argument.

*/

var playing_cards = [{"suit":"Spades","v":"A"},{"suit":"Spades","v":"2"},{"suit":"Spades","v":"3"},{"suit":"Spades","v":"4"},{"suit":"Spades","v":"5"},{"suit":"Spades","v":"6"},{"suit":"Spades","v":"7"},{"suit":"Spades","v":"8"},{"suit":"Spades","v":"9"},{"suit":"Spades","v":"10"},{"suit":"Spades","v":"J"},{"suit":"Spades","v":"Q"},{"suit":"Spades","v":"K"},{"suit":"Clubs","v":"A"},{"suit":"Clubs","v":"2"},{"suit":"Clubs","v":"3"},{"suit":"Clubs","v":"4"},{"suit":"Clubs","v":"5"},{"suit":"Clubs","v":"6"},{"suit":"Clubs","v":"7"},{"suit":"Clubs","v":"8"},{"suit":"Clubs","v":"9"},{"suit":"Clubs","v":"10"},{"suit":"Clubs","v":"J"},{"suit":"Clubs","v":"Q"},{"suit":"Clubs","v":"K"},{"suit":"Hearts","v":"A"},{"suit":"Hearts","v":"2"},{"suit":"Hearts","v":"3"},{"suit":"Hearts","v":"4"},{"suit":"Hearts","v":"5"},{"suit":"Hearts","v":"6"},{"suit":"Hearts","v":"7"},{"suit":"Hearts","v":"8"},{"suit":"Hearts","v":"9"},{"suit":"Hearts","v":"10"},{"suit":"Hearts","v":"J"},{"suit":"Hearts","v":"Q"},{"suit":"Hearts","v":"K"},{"suit":"Diamonds","v":"A"},{"suit":"Diamonds","v":"2"},{"suit":"Diamonds","v":"3"},{"suit":"Diamonds","v":"4"},{"suit":"Diamonds","v":"5"},{"suit":"Diamonds","v":"6"},{"suit":"Diamonds","v":"7"},{"suit":"Diamonds","v":"8"},{"suit":"Diamonds","v":"9"},{"suit":"Diamonds","v":"10"},{"suit":"Diamonds","v":"J"},{"suit":"Diamonds","v":"Q"},{"suit":"Diamonds","v":"K"}];
var deck_img;
var table_img;
var drawCounter = 0;

function preload()
{
	deck_img = loadImage("deck.png");
	table_img = loadImage("table.png");
}

function setup()
{
	createCanvas(table_img.width, table_img.height);
	frameRate(30);

	//call your fill_shuffle_array function here. Followed by a call to shuffleDeck with the return value of fill_shuffle_array as an argument.

    fill_shuffle_array();    
    shuffleDeck(fill_shuffle_array());
}

//write your fill_shuffle_array function here
function fill_shuffle_array()
    {
        let numbers = [];
        for (let i = 0 ; i < playing_cards.length ; i++)
            {
                numbers.push(round(random(4, 94)));
            }
        return numbers ;
    }


/////////////////////DON'T CHANGE ANYTHING BELOW HERE/////////////////////////
function shuffleDeck(shuffleSeed)
{
		//shuffle the deck by rotating the cards location with the values in
		//shuffleSeed. Repeat this a random number of times between 20 and 50
    var shuffleIterations = parseInt(random(20, 50));
    for(var i = 0; i < shuffleIterations; i++)
    {
	   for (var j = 0; j < playing_cards.length; j++)
	   {
		  var tempCard = playing_cards.splice(j, 1);
          var newLoc = (j + shuffleSeed[j])%52;
          playing_cards.splice(newLoc, 0, tempCard[0]);
	   }
    }
}

function draw()
{
	image(table_img, 0, 0);

	if (frameCount % 7 == 0)
	{
		drawCounter++;
		if (drawCounter == 52)
		{
			noLoop();
		}
	}
	for (var i = 0; i < drawCounter; i++)
	{
		if (playing_cards[i].marked)
		{
			drawCard(playing_cards[i], 400 + i * 18, 230);
		}
		else
		{
			drawCard(playing_cards[i], 400 + i * 18, 250);
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
			if (card.v == values[j] && card.suit == suits[i])
			{
			//img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				image(deck_img, j * 200, i * 300, 200, 300, x, y, 100, 150);
				break;
			}
		}
	}
}
