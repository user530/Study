function Particle(x, y, color, angle, speed){
    let p_x = x;
    let p_y = y;
    let p_color = color;
    let p_angle = angle;

    this.speed = speed;

    this.draw = function(){
        update();
        fill(p_color);
        ellipse(p_x, p_y, 5, 5);
    }

    function update(){
        this.speed -= 0.1;

        p_x += speed * cos(p_angle);
        p_y += speed * sin(p_angle);
    }
}