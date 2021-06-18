// =============выбор дополнительных продуктов в модальном окне
const productCard = document.querySelectorAll('.productCard-item');
const productModal = document.querySelectorAll('.productModal');
for(let i = 0; i < productCard.length; i++){
	
	productCard[i].addEventListener('click', function(e){
		
		let cardBody = productCard[i].querySelector('.productCard');
		let modalImg;
		for(item of productModal){
			modalImg = item.querySelector('.modal-body-img img');
			if(e.target == cardBody){
			let cardImg =  cardBody.querySelector('img');
			let cardImgSrc =cardImg.getAttribute('src');
			modalImg.setAttribute('src',cardImgSrc);
		}
		}
	})
}
/**************************** */
function massClassTogle(elemClass, toggleClass = 'active'){
	let elements = document.querySelectorAll(elemClass);
	for(let i = 0; i < elements.length; i++){
		elements[i].addEventListener('click', 
		(e)=>{
			e.stopPropagation();
			e.target.classList.toggle(toggleClass);
		})
	}
}
massClassTogle('.addProduct-item');
// ============= end выбор дополнительных продуктов в модальном окне

//================================CUSTOM MIXIT UP =============
const mixBlock = document.querySelector('#mixit-block');
if(mixBlock){
	const mixitBtns = mixBlock.querySelectorAll('.mixitBlock-menu button');
	const mixitContents = mixBlock.querySelectorAll('.mixitBlock-content');
		for (let i = 0; i <  mixitBtns.length; i++){
			mixitBtns[i].addEventListener('click',
			(e)=>{
				e.preventDefault();
				if(!e.target.classList.contains('active'))e.target.classList.add('active')
	
				for(let j = 0; j < mixitBtns.length; j++){
					if(i != j) mixitBtns[j].classList.remove('active');
				}
				const thisData = mixitBtns[i].getAttribute('data-btn');
				for(let k=0; k < mixitContents.length; k++){
					mixitContents[k].classList.remove('active');
					const contentData = mixitContents[k].getAttribute('data-content');
					if(contentData == thisData) mixitContents[k].classList.add('active');
				}
			});
		} 
	}
//================================END CUSTOM MIXIT UP =============