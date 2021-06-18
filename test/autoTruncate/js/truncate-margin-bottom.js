function TrunCards(parentClass = '.row.active', cardClass = '.col-md-6', trunClass = 'card-mb-0'){
	//Initialize variables
	let cardParent;
	let cardArr;

	//Check DOM elements
	let getElements = function(){
		cardParent = document.querySelector(parentClass);
		cardArr = cardParent.querySelectorAll(cardClass);
	}

	//Clear "truncated" class
	let clear = function(){
		for(let i = 0; i < cardArr.length; i++){
			cardArr[i].classList.remove(trunClass);
		}
	}

	//Add "truncated" class to all cards that doesn't fit in
	let trunc = function(modNumber){
		let trunCount = cardArr.length % modNumber;

		for(let i = cardArr.length - trunCount - (trunCount==0)*modNumber; i < cardArr.length; i++){
			cardArr[i].classList.add(trunClass);
		}

	}

	//Update function that changes truncation
	this.update = function(){
		getElements();
		let parentWidth = cardParent.getBoundingClientRect().width;
		let cardWidth = cardArr[0].getBoundingClientRect().width;
		let modNumber = Math.floor(parentWidth/cardWidth);

		clear();
		trunc(modNumber);
	}

	//Initial truncation
	this.update();

	//Adaptive truncation
	window.addEventListener('resize', ()=>{this.update()})
}

//Initialize auto-truncate
let autoTruncate = new TrunCards();

//Select all control buttons
let ctrlBtns = document.querySelector('.mixitBlock-menu').children;

//Activate auto-truncate for all buttons
for(let i = 0; i < ctrlBtns.length; i++){
	ctrlBtns[i].addEventListener('click', ()=>{autoTruncate.update()})
}