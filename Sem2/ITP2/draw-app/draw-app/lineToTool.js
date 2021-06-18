function LineToTool(){
    //set an icon and a name for the object
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";
    
    //initialize "previous" location before we started drawing
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function(){
        //if this is first click we set initial point and set "drawing" state
		if(mouseIsPressed){
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
                
                //save state of pixels and load them to the array
				loadPixels();
			}

			else{
                /*load state of pixels when mouse was initially pressed, 
                    allowing to move line until mouseButton is held and only showing one at a time */
				updatePixels();
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}
        
        //return to "initial state" after mouse buttion is released
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
