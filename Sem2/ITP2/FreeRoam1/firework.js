function Firework(color, x, y){
    let f_color = color;
    let f_x = x;
    let f_y = y;

    let particles = [];
    this.depleted = false;

    for(let i = 0; i < 360; i+=18){
        particles.push(new Particle(f_x, f_y, f_color, i, 5));
    }

    this.draw = function(){
        for (let i = 0; i < particles.length; i++){
            particles[i].draw();

            if (particles[i].speed <= 0){
                this.depleted = true;
            }
        }
    }
}