;(function () {
	'use strict'

	let montedElement = null

	const api = {}

	model.dispatch = function dispatch () {
		api.update()
	}

	view.clickHandler = function clickHandler (element, event) {
		const plateNumber = model.getCurrentPlateNumber()
		const plateData = model.getPlateData(plateNumber)

		event.preventDefault()

		if (plateNumber === 1) {
			if (element.textContent === 'Пройти тест') {
				model.toNextPlate()
			}
		}

		else if (plateNumber === 2) {
			if (element.tagName === 'INPUT') {
				model.setPlateData(plateNumber, {
					item: element.value
				})				
			}

			else if (element.tagName === 'A' && element.textContent === 'Назад') {
				model.toPrevPlate()
			}

			else if (element.tagName === 'A' && element.textContent === 'Далее') {
				if (plateData.item) {
					model.toNextPlate()
				}

				else {
					alert('Выберите вариант ответа')
				}
			}
		}

		else if (plateNumber === 3) {
			if (element.tagName === 'INPUT') {
				const value = element.value

				if (plateData.items.includes(value)) {
					const index = plateData.items.indexOf(value)
					plateData.items.splice(index, 1)
				}

				else {
					plateData.items.push(value)
				}

				model.setPlateData(plateNumber, plateData)

				console.log(plateData.items)
			}

			else if (element.tagName === 'A' && element.textContent === 'Назад') {
				model.toPrevPlate()
			}

			else if (element.tagName === 'A' && element.textContent === 'Далее') {
				if (plateData.items.length) {
					model.toNextPlate()
				}

				else {
					alert('Выберите вариант ответа')
				}
			}
		}
	}

	api.start = function start (initMontedElement) {
		montedElement = initMontedElement
		api.update()
	}

	api.update = function update () {
		const plateNumber = model.getCurrentPlateNumber()
		const plateData = model.getPlateData(plateNumber)
		const plateElement = view.getPlate(plateNumber, plateData)

		montedElement.innerHTML = ''
		montedElement.append(plateElement)
	}

	window.controller = api
})();