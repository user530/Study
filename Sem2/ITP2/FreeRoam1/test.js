let audio = new AudioContext();

let offAudio = new OfflineAudioContext(2,44100*40,44100);
let offSource = offAudio.createBufferSource();

function loadAndAnalyze(songURL){
    let req = new XMLHttpRequest();

    req.open('GET', songURL, true);

    req.responseType = 'arraybuffer';

    req.onload = function(){
        let audioData = req.response;
        
        audio.decodeAudioData(audioData, function(buffer){
             offSource.buffer = buffer;
             offSource.connect(offAudio.destination);
             offSource.start();
             
             offAudio.startRendering().then(function(renderBuffer){
                 console.log('Offline Render complete!');
                 console.log(renderBuffer);

                 let song = audio.createBufferSource();
                 song.buffer = renderBuffer;

                 song.connect(audio.destination);

                 play.onclick = function(){
                     song.start();
                 }
                }).catch(function(err){
                    console.log('Error! Rendering failed: ' + err)
                });
        });
    };

    req.send();
};