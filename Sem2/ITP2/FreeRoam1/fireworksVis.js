function Fireworks(){
    let fireworks = [];
    


    this.addFirework = function(){
        let f_color = color(random(0,255), random(0,255), random(0,255));
        let f_x = random(width*0.2, width*0.8);
        let f_y = random(height*0.2, height*0.8);

        fireworks.push(new Firework(f_color, f_x, f_y));
    }

    this.update = function(){
        for(let i = 0; i < fireworks.length; i++){
            fireworks[i].draw();
            if(fireworks[i].depleted){
                fireworks.splice(i,1);
            }
        }
    }
}