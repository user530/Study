const timer = 18000;

// ====== ЭФФЕКТ ДО/ПОСЛЕ ======
$(document).ready(function(){
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
	
})

const loading = document
				.querySelector('#demo-preview')
				.querySelectorAll('p');


function loadingAnimation(){
	let i = 0;
	const change = setInterval(() => {
		if(i + 1 < loading.length){
			loading[i].classList.toggle('active');
			loading[i + 1].classList.toggle('active');
			i++;
		}
		else{
			document.querySelector('#main-demo').classList.add('visible-block');
			clearTimeout(change);
		}
	}, timer/loading.length);
}

loadingAnimation();
