//constructor for the Zombies
function zombie(y) {
	//initial x so all zombies start to the left of the screen
	this.x = -10;
	this.y = y;
	//set a random speed
	this.speed = random(0.2, 0.5);
    //set a starting health
    this.health = 3;
    
    var hp_color = [0, 255, 0];
    
	//draw the zombie to the screen
	this.draw = function() {
        
        push();
		//arms
		fill(128, 0, 128);
		rect(this.x - 10, this.y - 50, 65, 15);
		rect(this.x - 10, this.y + 35, 65, 15);
		//shoulders
		rect(this.x - 20, this.y - 50, 35, 100, 10);
		//head
		fill(50);
		ellipse(this.x, this.y, 50);
        
        //hp color
        if (this.health == 2) {
            hp_color = [255, 255, 0];
        } else if (this.health < 2) {
            hp_color = [255, 0, 0];
        }
        
        //healthbar
        noFill();
        stroke(0);
        strokeWeight(6);
        rect(this.x - 30, this.y - 30, 60, 5);
        
        noStroke();
        fill(hp_color);
        rect(this.x - 30, this.y - 30, 20 * this.health, 5);
        
		pop();
	}

	//update the zombies x location as it lumbers across the screen
	this.updateLocation = function() {
		this.x += this.speed;
        

        
        
	}
    
    this.isClicked = function(x,y) {
        if((x > (this.x - 25) && x < (this.x + 25)) &&
                (y > (this.y - 25) && y < (this.y + 25))){
            this.health -= 1;
            
            return true;
        } else{
            return false;
        }
    }
}