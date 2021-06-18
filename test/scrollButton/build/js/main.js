$(document).ready(function () {
	
	// SHOW MOB MENU
	const bodyEl = document.body;
	const menuToggle = document.querySelector('.menu-toggle');
	const mobMenu = document.querySelector('.header-navigation');
	const mobMenuItem = document.querySelectorAll('.header-navigation li');
	
	if (menuToggle) {
		menuToggle.addEventListener('click', function () {
			if (this.classList.contains('active')) {
				this.classList.remove('active');
				mobMenu.classList.remove('active');
				bodyEl.classList.remove('noscroll');
				

			} else {
				this.classList.add('active');
				mobMenu.classList.add('active');
				bodyEl.classList.add('noscroll');
				// let delay = 0;
				// for (let item of mobMenuItem) {
				// 	setTimeout(function () {
				// 		item.classList.add('animate');
				// 	}, 50 + delay)
				// 	delay += 150;
				// }

			}
		});
		window.addEventListener('resize', function () {
			menuToggle.classList.remove('active');
			bodyEl.classList.remove('noscroll');
			mobMenu.classList.remove('active');
			

		});
		mobMenu.addEventListener('click', function () {
			this.classList.remove('active');
			 menuToggle.classList.remove('active');
		 	bodyEl.classList.remove('noscroll');

		})
	}
	//mainPage carousel
   let caseSlider = $('.case-slider');
   let caseSliderArrowLeft = $('button.arr-left');
   let caseSliderArrowRight = $('button.arr-right');
   if(caseSlider){
	    caseSlider.owlCarousel({
		items:1,
		loop: true,
		navSpeed: 800,
		smartSpeed:800,
		
	});
	
	caseSliderArrowLeft.click(function () {
		caseSlider.trigger("next.owl.carousel");
	});
	caseSliderArrowRight.click(function () {
		caseSlider.trigger("prev.owl.carousel");
	});  
	}
	// Careers page carousel
	if($('#careers-slider1')){
		$('#careers-slider1').on('init', function(){
			$('.slick-active').eq(0).addClass('big');
			
		});
		$('#careers-slider1').slick({
			centerMode: true,
			centerPadding: '190px',
			slidesToShow: 5,
			infinite:true,
			arrows: false,
			asNavFor: '#careers-slider2',
			responsive: [
				{
					breakpoint: 1919,
					settings: {
					  slidesToShow: 4,
					}
				  },
				  {
					breakpoint: 1499,
					settings: {
					  slidesToShow: 3,
					}
				  },
				{
					breakpoint: 1199,
					settings: {
					  slidesToShow: 2,
					  
					 variableWidth: true,
					 centerMode: false,
					 variableWidth: true,
					  
					}
				  },
				{
				  breakpoint: 1023,
				  settings: {
					slidesToShow: 2,
					centerPadding: '30px',
					centerMode: false,
					variableWidth: true,
					
				  }
				}
			  ]
		});

		$('#careers-slider1').on('afterChange', function(){
			$('.careers-slider1__item').each(function(index, item){
				$(item).removeClass('big');
			});
			$('.slick-active').eq(0).addClass('big');
			
		});

		$('#careers-slider2').slick({
			slidesToShow: 1,
			arrows: false,
			fade: true,
			dots: true,
			asNavFor: '#careers-slider1'
		});
		
		$('.careers-slider-nextBtn').on('click', function() {
			$('#careers-slider2').slick('slickNext');
			$('#careers-slider1').slick('slickNext');
		  });
		$('.careers-slider-prevBtn').on('click', function() {
			$('#careers-slider2').slick('slickPrev');
			$('#careers-slider1').slick('slickPrev');
		});
	}
	//SHOW/HIDE PASSWORD
	let inputPassIcon = document.querySelectorAll('.icon-passw');
	if(inputPassIcon){
		for(let item of inputPassIcon){
			item.addEventListener('click', function(){
				const thisParent = this.closest('.form-item');
				const inputItem = thisParent.querySelector('input');
				const thisImgs = this.querySelectorAll('img');
				for(let img of thisImgs){
					img.classList.toggle('active');
				}
				let inputType = inputItem.getAttribute('type');
				if(inputType == 'password'){
					inputItem.setAttribute('type', 'text');
				}
				else{
					inputItem.setAttribute('type', 'password');
				}
			});
		}
	}
	// BORDER BOTTOM FOR INPUT:FOCUS
	let inputsArrow= document.querySelectorAll('input');
	for(let item of inputsArrow){
		let inputParent = item.closest('.form-item');
		item.addEventListener('focus', function(){
			inputParent.classList.add('form-item--focus');
			console.log(inputParent);
		});
		item.addEventListener('blur', function(){
			inputParent.classList.remove('form-item--focus');
		});
	}
	//TOGGLE ARROW FOR SELECR COUNTRY
	const selectCountry = document.querySelector('#select-country');
	if(selectCountry){
		const thisArrow = document.querySelector('.select-arr');
		selectCountry.addEventListener('click', function(){
			thisArrow.classList.toggle('rotate');
			
		});
	}
	//PLAY VIDEO
	$('.video-modal').hide(0);
	$('.button-playVideo, .button-video').each(function(i, item){
		$(item).on('click', function(){
			$('.video-modal').fadeIn();
			$('body').addClass('noscroll');
			$('.videoTag')[0].play();

		});
	});
	
	$('.close-btn').on('click', function(){
		$(this).closest('.video-modal').fadeOut();;
		$('body').removeClass('noscroll');
		$('.videoTag')[0].pause();
	});
	// CALC INFO-CARD HEIGHT
	function equalizeText(rowClassName,blockClassName){
		
		let rowArray = document.querySelectorAll(`.${rowClassName}`);
			
		// Cycle through each row
			for (let i = 0; i < rowArray.length; i++){
				let cardBodyArr = rowArray[i].querySelectorAll(`.${blockClassName}`);
				let maxHeight = 0;

				//Cycle through all div-s to let them auto-calculate heights depending on content
				for (let k = 0 ; k < cardBodyArr.length; k++){
					cardBodyArr[k].style.height = `auto`;
				}

				//Cycle through all div-s in the row and find maxHeight
				for (let j = 0; j < cardBodyArr.length; j++){
					if (cardBodyArr[j].offsetHeight > maxHeight) maxHeight = cardBodyArr[j].offsetHeight;
				}
				
				//Cycle through all div's and change height if not moile
				if(window.innerWidth >=768){
				for (let k = 0 ; k < cardBodyArr.length; k++){
						cardBodyArr[k].style.height = `${maxHeight}px`;
					}
				}
			}
				
	}
	equalizeText("infocard-block__row","info-card__body");
	window.addEventListener('resize', function(){
		equalizeText("infocard-block__row","info-card__body");
	});
	window.addEventListener('scroll', function(){
		equalizeText("infocard-block__row","info-card__body");
	});

	//SHOW JOB OPENNING CARDS	
	if($('.vacancy-card')){
		function showJobCards(arr, obj){
			if(obj.width() >=768){
				$(arr).each( function(index, item){
					$(item).show();
					if(index > 2){
						$(item).hide();	
					}	
				});
			}
			else{
				$(arr).each( function(index, item){
					$(item).show();
					if(index > 0){
						$(item).hide();	
					}	
				});
			}
		}
	
		showJobCards($('.vacancy-card'), $(window) );
		//SHOW JOB OPENNING CARDS ON RESIZE
		$(window).on('resize', function(){
			showJobCards($('.vacancy-card'), $(this));
		});

		//SHOW JOB OPENNING CARDS ON CLICK
		$('#showVacancy').on('click', function(){
			$('.vacancy-card').fadeIn();
			$(this).hide();
			if($(window).width() <768){
				$(this).closest('.button-box').css('margin-bottom', '30px');
			}
		});
		
	}
	
	//RESOURCES SLIDERS

	function doubleSlederText(sliderBlock, sliderImages) {
		$(sliderBlock).slick({
			slidesToShow:1,
			arrows: false,
			dots: false,
			fade: true,
			infinite: true,
			speed:1000,
			autoplay: true,
			asNavFor: $(sliderImages)
		});
		$(sliderImages).slick({
			slidesToShow:1,
			arrows: false,
			dots: true,
			// fade: true,
			autoWidth: true,
			infinite: true,
			speed:1000,
			autoplay: true,
			asNavFor: $(sliderBlock),
			focusOnSelect: true
		  });
	}

	doubleSlederText('#case-images', '#case-slider');
	doubleSlederText('#nailing-images', '#nailing-slider');
	doubleSlederText('#talk-images', '#talk-slider');
	doubleSlederText('#captured-images', '#captured-slider');
	

	$('.case-prev').on('click', function() {
		$('#case-slider').slick('slickPrev');
	});
	$('.case-next').on('click', function() {
		$('#case-slider').slick('slickNext');
	});
	$('.nailing-prev').on('click', function() {
		$('#nailing-slider').slick('slickPrev');
	});
	$('.nailing-next').on('click', function() {
		$('#nailing-slider').slick('slickNext');
	});
	$('.talk-prev').on('click', function() {
		$('#talk-slider').slick('slickPrev');
		console.log('123');
	});
	$('.talk-next').on('click', function() {
		$('#talk-slider').slick('slickNext');
		console.log('123');
	});
	$('.captured-prev').on('click', function() {
		$('#captured-slider').slick('slickPrev');
	});
	$('.captured-next').on('click', function() {
		$('#captured-slider').slick('slickNext');
	});

	//====== SHOW MODAL FORM ======
	const overlay = document.getElementById('overlay');
	const modalForm = document.getElementById('modal-block');
	const btnOpenModalForm = document.getElementsByClassName('btn-open-modal');
	const btnCloseModalForm = document.querySelector('.close-modal');
	
		for(let item of btnOpenModalForm){
			item.addEventListener('click', function(){
				overlay.classList.add('active');
				modalForm.classList.add('active');
				bodyEl.classList.add('noscroll');
			})
		}

	if(btnCloseModalForm){
		btnCloseModalForm.addEventListener('click', function(){
			overlay.classList.remove('active');
			modalForm.classList.remove('active');
			bodyEl.classList.remove('noscroll');
		});
		overlay.addEventListener('click', function(){
			this.classList.remove('active');
			modalForm.classList.remove('active');
			bodyEl.classList.remove('noscroll');
		});
	}
	// partners-slider
	$('.partners-slider').slick({
		slidesToShow:4,
		slidesToScroll:4,
		speed:1500,
		responsive: [
			{
			  breakpoint: 1199,
			  settings: {
				
				slidesToShow: 3
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
				
				slidesToShow: 2
			  }
			},
			{
			  breakpoint: 599,
			  settings: {
				slidesToShow: 1
			  }
			}
		  ]
	});
		
	AOS.refresh();
	window.addEventListener("scroll", onScrollEventHanlder);

	let bars = document.querySelectorAll(".progress-bar");
	let BAR_WIDTH = window.innerWidth >= 424 ? 424 : window.innerWidth;
	for (let bar of bars) {
		 bar.style.width = BAR_WIDTH+"px";
		
	}

	function onScrollEventHanlder(scrollEvent){
		let lowerScreenBoundary = Math.ceil(window.innerHeight+window.scrollY);
		
		for (let bar of bars) {
			let maxWidth = bar.parentElement.offsetWidth;
			

			let computedOffset = Math.round(-BAR_WIDTH + ((window.innerHeight - bar.getBoundingClientRect().top)/window.innerHeight)*(maxWidth+BAR_WIDTH));
			let computedWidth = computedOffset < 0 ? computedOffset+BAR_WIDTH : maxWidth-computedOffset;
			computedOffset = Math.max(0, Math.min(maxWidth, computedOffset));
			computedWidth = Math.max(0, Math.min(BAR_WIDTH, computedWidth));
			
			bar.style.width = computedWidth+"px";
			if(bar.classList.contains("progress-bar--right"))
				bar.style.right = computedOffset+"px";
			else
				bar.style.left = computedOffset+"px";
		}
	}

	
})