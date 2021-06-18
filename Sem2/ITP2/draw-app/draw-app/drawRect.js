function drawRect(){
    //set an icon and a name for the object
    this.icon = "assets/rect.jpg";
    this.name = "drawRect";
    
    //to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
    var startMouseX = -1;
    var startMouseY = -1;
    var startDraw = false;
    
    this.draw = function(){
        if (mouseIsPressed){
            if (startMouseX == -1){
                startMouseX = mouseX;
                startMouseY = mouseY;
                startDraw = true;
                loadPixels();
            }
            else{
                updatePixels();
                rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
            }
        }
        else if (startDraw){
            startMouseX = -1;
            startMouseY = -1;
            startDraw = false;
        }
        
    }
    
}