
var saucer;
var saucer_army;
var ground_level;
var beam_timer;
let fft;
let bass;
let lowMid;
let mid;
let highMid;
let treble;
let spectrum;
let step = 0.1;
let rot = 0;
let beatDetector;
let fireworks;


function preload(){
    // curSong = loadSound('Monthy.mp3');
    curSong = loadSound('Sample.mp3');
}

function setup()
{
    createCanvas(1200, 600);
    frameRate(60);
    angleMode(DEGREES);

    fft = new p5.FFT;
    beatDetector = new BeatDetector();
    fireworks = new Fireworks();
}

function draw()
{
    spectrum = fft.analyze();
    bass = fft.getEnergy('bass');
    lowMid = fft.getEnergy('lowMid');
    mid = fft.getEnergy('mid');
    highMid = fft.getEnergy('highMid');
    treble = fft.getEnergy('treble');


    background(0);
    
    noFill();
    stroke(255,255,0);
    strokeWeight(2);

    if(beatDetector.detectBeat(spectrum)){
        push();
        noStroke();
        // fireworks.addFirework();
        // fireworks.update();
        pop();
    };





    
    //---

    // //DOTS
    // beginShape(POINTS);
    // for(let i = 0; i < 600; i++){
    //     let ang = (i * 360 / 600);
    //     let r = spectrum[i];
    //         strokeWeight(0.1);
    //     stroke(255,0,0);
    //     // fill(map(noise(i),0,1,0,255),
    //     //         map(noise(ang),0,1,0,255),
    //     //             spectrum[i]);    
    //     push();
    //         vertex(width/2 + cos(ang)*50 + cos(ang)*r, 
    //                 height/2 + sin(ang)*50 + sin(ang)*r);
    //         pop();
    // }
    // endShape();
    // //---


    // //COVID
    // beginShape();
    // for(let i = 0; i < 500; i++){
    //     let ang = (i * 360 / 500) + (frameCount * 2)% 360;
    //     let r;
    //     if (i < 50){
    //         r = spectrum[i] * 0.6;
    //     }else r = spectrum[i]

    //     strokeWeight(1);
    //     stroke(255,0,0);
    //     // fill(map(noise(i),0,1,0,255),
    //     //         map(noise(ang),0,1,0,255),
    //     //             spectrum[i]);    
    //     push();
    //         vertex(width/2 + cos(ang)*50 + cos(ang)*r, 
    //                 height/2 + sin(ang)*50 + sin(ang)*r);
    //         pop();
    // }
    // endShape(CLOSE);
    // //---

    // //COMET
    // beginShape(LINES);
    //     for(let i = 0; i < 1024; i++){
    //         let ang = (i * 360 / 1024) + (frameCount * 2)% 360 + (map(spectrum[i],0,255,0,360));
    //         let r = map(spectrum[i], 0, 255, -50, 300);
    //         let spec_noise = noise(spectrum[i]);

    //         stroke(255,0,0);
    //         // fill(map(noise(i),0,1,0,255),
    //         //         map(noise(ang),0,1,0,255),
    //         //             spectrum[i]);    
    //         push();
    //             vertex(width/2 + cos(ang)*50 + cos(ang)*r, 
    //                     height/2 + sin(ang)*50 + sin(ang)*r);
    //             pop();
    //     }
    // endShape();
    // //---

    // for(let i = 0; i < 10; i++){
    //     // let ang = (i * 360 / 10) + (frameCount * 2)% 360;
    //     let ang = (i * 360 / 10) + (map(spectrum[i],0,255,0,360));
    //     // line(width/2, height/2, width/2 + 200 * cos(ang), height/2 + 200 * sin(ang))
    //     // bezier(width/2, height/2,
    //     //             width/2 + 50 * cos(ang + 30), height/2 + 50 * sin(ang + 30),
    //     //                 width/2 + 100 * cos(ang + 30), height/2 + 100 * sin(ang + 30),
    //     //                     width/2 + 150 * cos(ang), height/2 + 150 * sin(ang))
        
    //     beginShape();
    //     for(let j = 0; j < 1024; j++){
    //         vertex(width/2 + j * 100/1024 * cos(ang), height/2 + j * 100/1024 * sin(ang))
    //     }
    //     endShape();
    
    // }


}
