$(document).ready(function () {

	$("#feedback-form--main").on('submit', function (event) {
		event.preventDefault();
		if($('.required-email').val() !== '' && $('.required-phone').val() !== ''){
		let string = $("#feedback-form--main").serialize(); // Соханяем данные введенные в форму в строку.

		// Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$("#feedback-form--main").slideUp(800);
				$('#answer').html(html);

			}
		});

		return false;
		}
		else{
			if($('.required-email').val() == ''){
				$('.required-email').addClass('error');
				$('.required-email').closest('.form-input').find('.error').show();
				$('.required-email').closest('.form-input').find('.ps-text').hide();
			}
			if($('.required-phone').val() == ''){
				$('.required-phone').addClass('error');
				$('.required-phone').closest('.form-input').find('.error').show();
				$('.required-phone').closest('.form-input').find('.ps-text').hide();
			}
		}
		});



})