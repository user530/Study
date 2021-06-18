function Snakeline(){

    this.name = 'Snake line';

    this.draw = function(){

        //ROTATION BLOCK
        let blockSide = map(bass, 0, 255, 20, 100);
        let incr = width/(10 - 1);
        push();

            translate(width/2, height/2);

            if(bass != 0 && bass < 210){
                rot += 1;    
            }
            
            rotate(rot);
        
            stroke(255,0,0);
            fill(255,0,0);
            rectMode('center');
            for(let i = 0 ; i < 10; i++){
                rect(i * incr - width/2, 0, blockSide, blockSide);
            }

        pop();

        //SNAKE LINE

        let noiseStep = 0.001;
        beginShape();
        for (let i = 0; i < 1000; i++){
            
            let x = width/2 + map(noise(i * noiseStep + step), 0, 1, - width/2, width/2);
            let y = height/2 + map(noise(i * noiseStep + step + 1000), 0, 1, -height/2, height/2);
            vertex(x, y);
        }
        endShape();
        if (bass > 210){
        step += 0.01;
        }
}
}