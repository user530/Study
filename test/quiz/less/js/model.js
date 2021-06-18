;(function () {
	'use strict'

	const database = {
		currentPlateNumber: 3,

		plate1: {},

		plate2: {
			item: null
		},

		plate3: {
			items: []
		},

		plate4: {
			item: null
		},

		plate5: {
			email: null,
			agreement: false
		},

		plate6: {}
	}

	const api = {
		dispatch () {},

		getCurrentPlateNumber () {
			return database.currentPlateNumber
		},

		toNextPlate () {
			if (database.currentPlateNumber < 6) {
				database.currentPlateNumber++
				api.dispatch()
			}

			return database.currentPlateNumber
		},

		toPrevPlate () {
			if (database.currentPlateNumber > 1) {
				database.currentPlateNumber--
				api.dispatch()
			}

			return database.currentPlateNumber
		},

		getPlateData (n) {
			return JSON.parse(JSON.stringify(database['plate' + n]))
		},

		setPlateData (n, data) {
			database['plate' + n] = JSON.parse(JSON.stringify(data))
			api.dispatch()
		}
	}

	window.model = api
})();