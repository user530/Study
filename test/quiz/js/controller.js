;(function(){
    'use strict'

    const api = {};
    window.controller = api;

    // Initialize the base element variable, that we will use later
    let baseElement = null;

    // Helper function to update GUI
    api.update = () => {
        // Get the current card number
        const plateNum = model.getCurrentPlate(); 

        // Get the current card data
        const plateData = model.getPlateData(plateNum);

        // Get the current card
        const plateElement = view.getPlate(plateNum, plateData);


        // Clear base
        baseElement.innerHTML = ``;

        // Put the card to the base 
        baseElement.append(plateElement);
    }

    // Initialization
    api.start = initBase => {
        // Save the initBase to the baseElement for future use
        baseElement = initBase;
        // Display the initial plate
        api.update();
    };

    // React to the data change
    model.dispatch = () => {
        // Setup new card on the data change
        api.update();
    };

    // Information from the click handler from GUI
    view.clickHandler = (element, event) => {
        event.preventDefault()
        const plateNumber = model.getCurrentPlate();

        switch (plateNumber){
            case 1:
                // Move to the next plate
                if(element.textContent === 'Пройти тест'){
                    model.toNextPlate();
                }
                break
            case 2:
                // If click on input -> save data to model
                if(element.tagName === `INPUT`){
                model.setPlateData(plateNumber, {
                    item: element.value
                });
                // else -> move to another plate
                }
                else if(element.textContent === `Назад`){
                    model.toPrevPlate();
                }
                else{
                    const curData = model.getPlateData(plateNumber)
                    if(curData.item){
                        model.toNextPlate();
                    }
                    else{
                        alert(`Выберите вариант ответа!`);
                    }
                };
                break
            case 3:
                if(element.tagName === `INPUT`){
                    const curData = model.getPlateData(plateNumber).items
                    
                    // If click is on input and it's not in data 'add', else 'delete'
                    if(!curData.includes(element.value)){
                        curData.push(element.value)
                    }else{
                        curData.splice(curData.indexOf(element.value),1)
                    }
                    // Add new data to model
                    model.setPlateData(plateNumber, {
                        items: curData
                    });
                }
                else if(element.textContent === `Назад`){
                    model.toPrevPlate();
                }
                else{
                    const curData = model.getPlateData(plateNumber)
                    if(curData.items.length > 0){
                        model.toNextPlate();
                    }
                    else{
                        alert(`Выберите вариант ответа!`);
                    }
                };
                break
            case 4:
            case 5:
            case 6:
        }
    };
})();