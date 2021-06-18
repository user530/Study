let demoAnimation;

// ====== ЭФФЕКТ ДО/ПОСЛЕ ======
$(document).ready(function(){
	// Setup timer and start demo
	const timer = 3000;
	demo(timer);

	// Start animation
	var lineBar = new ProgressBar.Line("#line-container", {
		strokeWidth: 8,
		trailWidth: 4,
		from: { color: "#ff09a2" },
		to: { color: "#2ca3dd" },
		text: {
		  value: '0',
		  className: 'progress-text',
		  style: {
			color: '#000',
			position: 'absolute',
			top: '-80px',
			padding: 0,
			margin: 0,
			transform: null
		  }
		},
		step: (state, shape) => {
		  shape.path.setAttribute("stroke", state.color);
		  shape.setText('<p class="progress-content"><span>Подождите, идет загрузка</span><span>Это может занять несколько минут</span></p>');
		//   shape.setText(Math.round(shape.value() * 100) + ' %');
		}
	  });
	  
	  lineBar.animate(1, {
		duration: timer
	  });



	  /****************************** */
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
	  /******************************* */


})

// Function that handles demo animation
function demo(loadTime){
	// loading states
	const loading = document
					.querySelector('#demo-preview')
					.querySelectorAll('p');
	// Setup the animation
	let i = 0;
	demoAnimation = setInterval(() => {
		// toggle active class
		if(i + 1 < loading.length){
			loading[i].classList.toggle('active');
			loading[i + 1].classList.toggle('active');
			i++;
		}
		// in the end show demo result and terminate animation
		else{
			document.querySelector('#main-demo').classList.add('visible-block');
			clearTimeout(demoAnimation);
		}
	}, loadTime/loading.length);
}

// Click handler on the button
document
.querySelector('#check-btn')
.addEventListener('click', (ev)=>{
	ev.preventDefault();
	const phone = document.querySelector('.phone');
	if(phone.value.length > 0){
		// stop demo
		clearTimeout(demoAnimation);
		
		// toggle visibility
		const elements = [
			document.querySelector('form.contact-form'),
			document.querySelector('#demo-preview'),
			document.querySelector('#main-demo'),
			document.querySelector('#circle-container')
		]
		
		elements.forEach((el)=>{
			el.classList.remove('visible-block');
			el.classList.toggle('block-hidden')})
		
		// start circle loading animation
		circleLoading();
		}

		// form submit placeholder
		// !POST REQUEST!
	})
	
// Function that handles animation after submit
function circleLoading(){
	// Circle loading animation
	const loadTime = 3500;
	const circleBar = new ProgressBar.Circle("#circle-container", {
		color: "white",
		strokeWidth: 2,
		trailWidth: 25,
		trailColor: "black",
		easing: "easeInOut",
		from: { color: "#FF9900", width: 1 },
		to: { color: "#FF0099", width: 25 },
		text: {
			value: '0',
			className: 'progress-text',
			style: {
			color: 'black',
			position: 'absolute',
			top: '45%',
			left: '42%',
			padding: 0,
			margin: 0,
			transform: null
			}
		},
		step: (state, shape) => {
			shape.path.setAttribute("stroke", state.color);
			shape.path.setAttribute("stroke-width", state.width);
			shape.setText(Math.round(shape.value() * 100) + ' %');
		}
		});
		
	circleBar.animate(1, {
		duration: loadTime
	});

	// Change visibility of the elements after circle loading is complete
	setTimeout(()=>{
		const wrappers = [
			document.querySelector('.form-wrapper__content-1'),
			document.querySelector('.form-wrapper__content-2')
		]

		wrappers.forEach((el)=>{
			el.classList.toggle('block-hidden')
		})
		
	}, loadTime)
}
	