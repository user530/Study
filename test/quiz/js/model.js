;(function(){
    'use strict'

    const api = {
        // Method that fires when data is changed
        dispatch: ()=>{},

        // Method that returns current plate number
        getCurrentPlate(){
            return data.currentPlate
        },

        // Method that increments the currentPlate by 1 (if possible)
        toNextPlate(){
            if(data.currentPlate < 6){
                data.currentPlate ++

                // Call dispatch, to signal data change
                api.dispatch();
            }
            return data.currentPlate
        },

        // Method that decrements the currentPlate by 1 (if possible)
        toPrevPlate(){
            if(data.currentPlate > 1){
                data.currentPlate --

                // Call dispatch, to signal data change
                api.dispatch();
            }
            
            return data.currentPlate
        },

        // Method that return the data of selected plate 
        getPlateData(number){
            // Parse/Stringify combo to clone data and preserve the original
            return JSON.parse(JSON.stringify(data[`plate${number}`]))
        },

        // Method that adds a new data to the selected plate
        setPlateData(number, newData){
            // Set the copy of the data to the selected plate object
            data[`plate${number}`] = JSON.parse(JSON.stringify(newData));
            api.dispatch();
        }
    };
    window.model = api;

    const data = {
        currentPlate: 1,

        plate1:{},

        plate2:{
            item: null
        },

        plate3:{
            items: []
        },

        plate4:{
            item: null
        },

        plate5:{
            email: null,
            agreement: false
        },

        plate6:{},
    }
})();