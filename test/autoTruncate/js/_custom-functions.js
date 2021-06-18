// Переключение класса для кастомного радиобатон
// 1-й аргумент - класс радиобатон
// 2-1 аргумент(опционально, по умолчанию - active) класс который будет переключаться на клик
function massUniqueToggle(elemClass, toggleClass = 'active'){
	let elements = document.querySelectorAll(elemClass);
	for (let i = 0; i < elements.length; i++){
		elements[i].addEventListener('click',
		(e)=>{
			e.preventDefault();
			if(!e.target.classList.contains(toggleClass))e.target.classList.add(toggleClass)

			for(let j = 0; j < elements.length; j++){
				if(i != j) elements[j].classList.remove(toggleClass);
			}
		}
		)
	} 
}

// Переключение классов у кастомных чекбоксов
// 1-й аргумент - класс чекбокса
// 2-1 аргумент(опционально, по умолчанию - active) класс который будет переключаться на клик
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

