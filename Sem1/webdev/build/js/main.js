$(document).ready(function () {
	/* MIXITUP3*/
	let containerEl = document.querySelector('.blog-tabs__content');
	if (containerEl) {
		let mixer = mixitup(containerEl, {
			classNames: {
				block: ""
			}
		})
	}

	const menuToggle = document.querySelector('#menu-toggle');
	const mobMenu = document.querySelector('.nav-menu');
	const overlayBlock = document.querySelector('#overlay');
	const backTopButton = document.querySelector('#back-top');
	//FIX MENU
	const toggleFixMenu = document.querySelector('#menu-toggle--fix');
	const fixMenu = document.querySelector('.fix-navigation');

	const bodyEl = document.body;
	if (menuToggle) {
		menuToggle.addEventListener('click', function () {
			if (this.classList.contains('active')) {
				this.classList.remove('active');
				// mobMenu.classList.remove('active');
				fixMenu.classList.remove('active');
				// overlayBlock.classList.remove('active');
				bodyEl.classList.remove('noscroll');

			} else {
				this.classList.add('active');
				// mobMenu.classList.add('active');
				// overlayBlock.classList.add('active');
				fixMenu.classList.add('active');
				bodyEl.classList.add('noscroll');

			}
		});
		window.addEventListener('resize', function () {
			menuToggle.classList.remove('active');
			// overlayBlock.classList.remove('active');
			bodyEl.classList.remove('noscroll');
			// mobMenu.classList.remove('active');
			fixMenu.classList.remove('active');
			toggleFixMenu.classList.remove('active');

		});
		// mobMenu.addEventListener('click', function () {
		// 	this.classList.remove('active');
		// 	menuToggle.classList.remove('active');
		// 	overlayBlock.classList.remove('active');
		// 	bodyEl.classList.remove('noscroll');

		// })
		fixMenu.addEventListener('click', function () {
			this.classList.remove('active');
			menuToggle.classList.remove('active');
			toggleFixMenu.classList.remove('active');
			// overlayBlock.classList.remove('active');
			bodyEl.classList.remove('noscroll');

		})
	}

	// ПОКАЗАТЬ ФИКС МЕНЮ 
	window.addEventListener('scroll', function () {
		const fixHeaderTop = document.querySelector('.header-fix');
		if (this.pageYOffset > 50) {
			fixHeaderTop.classList.add('active')
		} else {
			fixHeaderTop.classList.remove('active')
		}
	})
	//Click FixMenuToggle	
	if (toggleFixMenu) {

		toggleFixMenu.addEventListener('click', function () {
			console.log('555');
			if (this.classList.contains('active')) {
				this.classList.remove('active');
				fixMenu.classList.remove('active');
				// overlayBlock.classList.remove('active');
				bodyEl.classList.remove('noscroll');

			} else {
				this.classList.add('active');
				fixMenu.classList.add('active');
				// overlayBlock.classList.add('active');
				bodyEl.classList.add('noscroll');

			}
		});

	}
	// маска для телефона
	$(".phone").mask("+7(999)999-99-99");
	$.fn.setCursorPosition = function (pos) {
		if ($(this).get(0).setSelectionRange) {
			$(this).get(0).setSelectionRange(pos, pos);
		} else if ($(this).get(0).createTextRange) {
			var range = $(this).get(0).createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};
	$('input.phone').click(function () {
		$(this).setCursorPosition(3); // set position number
	});
	/*---ПОКАЗАТЬ ВОСКЛИЦАТЕЛЬНЫЙ ЗНАК В ИНПУТЕ */
	const checkboxGroup = document.querySelectorAll('label.form-label');
	const requiredInputs = document.querySelectorAll('.form-group  input[type="text"]');
	const textareaElement = document.querySelector('.form-group textarea');
	for (let item of requiredInputs) {
		//по клику в текстовый инпут убираем восклиц знак и активируем плейсхолдер
		const thisParent = item.closest('.form-group');
		item.addEventListener('focus', function () {
			thisParent.classList.remove('error');
			thisParent.querySelector('.fake-placeholder').classList.add('active');

		});
		//по блюру у пустого инпута деактивируем плейсхолдер
		item.addEventListener('blur', function () {
			if (this.value.length == 0) {
				thisParent.querySelector('.fake-placeholder').classList.remove('active');
			}
		})
	}
	// для текстареа активируем и деактивируем кастомный плейсхолдер при фокусе и блюре
	if (textareaElement) {
		textareaElement.addEventListener('focus', function () {
			const thisParent = this.closest('.form-group');
			thisParent.querySelector('.fake-placeholder').classList.add('active');

		});
		textareaElement.addEventListener('blur', function () {
			const thisParent = this.closest('.form-group');
			if (this.value.length == '0') {
				thisParent.querySelector('.fake-placeholder').classList.remove('active');

			}
		});
	}

	/*ВАЛИДАЦИЯ ФОРМЫ */
	$("form").on('submit', function (event) {
		event.preventDefault();

		let success = false;

		for (let item of requiredInputs) {
			const thisParent = item.closest('.form-group');

			if (item.value.length == 0) {
				thisParent.classList.add('error');
				success = false;

			} else {
				success = true;
			}
		}
	})

	//success works slider

	let successSlider = $('.success-works');
	successSlider.owlCarousel({
		items: 1,
		loop: true,
		margin: 30,
		navSpeed: 1000,
		smartSpeed: 1000,
		mouseDrag: false,
		dots: false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		// responsive: {
		// 	767: {
		// 		dots: false
		// 	}
		// }
	});
	// add animate.css class(es) to the elements to be animated
	function setAnimation(_elem, _InOut) {
		// Store all animationend event name in a string.
		// cf animate.css documentation
		var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

		_elem.each(function () {
			var $elem = $(this);
			var $animationType = 'animated ' + $elem.data('animation-' + _InOut);

			$elem.addClass($animationType).one(animationEndEvent, function () {
				$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
			});
		});
	}

	// Fired before current slide change
	successSlider.on('change.owl.carousel', function (event) {
		var $currentItem = $('.owl-item', successSlider).eq(event.item.index);
		var $elemsToanim = $currentItem.find("[data-animation-out]");
		setAnimation($elemsToanim, 'out');
	});

	// Fired after current slide has been changed
	successSlider.on('changed.owl.carousel', function (event) {

		var $currentItem = $('.owl-item', successSlider).eq(event.item.index);
		var $elemsToanim = $currentItem.find("[data-animation-in]");
		setAnimation($elemsToanim, 'in');
	});

	//-function SELECT IMAGE for slide
	function selectPicture(slider, activeSlideClass, picturClass) {
		let activeSlide = slider.find('.owl-item.active ' + activeSlideClass)
		let activeSlideData = activeSlide.data('index');
		picturClass.each(function (item) {
			$(this).removeClass('active')
			let picData = $(this).attr('data-img')
			if (picData == activeSlideData) {
				$(this).addClass('active')
			}

		})
	}

	let slidePic = $('.success-work__img');

	$(".success-next").click(function () {
		successSlider.trigger("next.owl.carousel");
		selectPicture(successSlider, '.success-work-slider', slidePic)



	});
	$(".success-prev").click(function () {
		successSlider.trigger("prev.owl.carousel");
		selectPicture(successSlider, '.success-work-slider', slidePic)
	});

	//team
	let teamSlider = $('.team-slider');
	teamSlider.owlCarousel({
		items: 1,
		loop: true,
		margin: 30,
		navSpeed: 1000,
		smartSpeed: 1000,
		dots: false,
		animateOut: 'fadeOut',
		mouseDrag: false,
		animateIn: 'fadeIn',

	})

	let slidePicTeam = $('.team-slide__img');
	let teammateSertificate = $('.certificate');

	function selectSerificate() {
		let activeTeamSlide = teamSlider.find('.owl-item.active .team-slide__text')
		let activeTeamSlideData = activeTeamSlide.data('index');
		teammateSertificate.each(function (item) {
			$(this).removeClass('active')
			let sertificateData = $(this).attr('data-link')
			if (sertificateData == activeTeamSlideData) {
				$(this).addClass('active')
			}

		})
	}
	$(".team-slider-next").click(function () {
		teamSlider.trigger("next.owl.carousel");
		selectPicture(teamSlider, '.team-slide__text', slidePicTeam);
		selectSerificate();

	});
	$(".team-slider-prev").click(function () {
		teamSlider.trigger("prev.owl.carousel");
		selectPicture(teamSlider, '.team-slide__text', slidePicTeam);
		selectSerificate();
	});


	//  slider REVIEW
	let reviewSlider = $('.reviews-slider');
	let reviewAuthor = $('.review-author__img ');
	reviewSlider.owlCarousel({
		items: 1,
		loop: true,
		navSpeed: 1200,
		animateOut: 'fadeOut',
		mouseDrag: false,
		animateIn: 'fadeIn',
		// animateOut: 'slideOutDown',
		// animateIn: 'flipInX',
		smartSpeed: 500,
		dots: false
	});
	$(".review-slider-next").click(function () {
		reviewSlider.trigger("next.owl.carousel");
		selectPicture(reviewSlider, '.reviews-text', reviewAuthor);

	});
	$(".review-slider-prev").click(function () {
		reviewSlider.trigger("prev.owl.carousel");
		selectPicture(reviewSlider, '.reviews-text', reviewAuthor);
	});
	// SLIDER PARTNERS

	$('.partners-logo').owlCarousel({
		items: 1,
		loop: true,
		dots: true,
		dotsSpeed: 800,
		smartSpeed: 800,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,

		responsive: {
			425: {
				items: 2
			},
			600: {
				items: 3
			}
		}
	})

	// ПАРАЛЛАКС ДВИЖЕНИЯ ЗА МЫШКОЙ

	let quote = document.querySelectorAll('.quot-item');
	window.addEventListener('mousemove', function (e) {
		let x = e.clientX / window.innerWidth;
		let y = e.clientY / window.innerHeight;
		for (let item of quote) {
			item.style.transform = 'translate(-' + x * 20 + 'px, -' + y * 20 + 'px)';
		}

	});

	//аккордеон развернуть стрелку
	$('.collapsable').on('show.bs.collapse', function () {
		let tabIcon = $("#" + $(this).attr("aria-labelledby")).find(".arrow");
		tabIcon.addClass("rotate");
	});
	$('.collapsable').on('hide.bs.collapse', function () {
		let tabIcon = $("#" + $(this).attr("aria-labelledby")).find(".arrow");
		tabIcon.removeClass("rotate");
	});

})