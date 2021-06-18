/* 
FIX LIST:
1) Combine Next + Prev Song functions into one
2) When add/del song dont stop and not move select from current song

*/

let playlist = [];
let player = {playlist: [],
                volume: 1,
                repeatSong: false,
                loopPlaylist: false,
                shufflePlay: false,
                cycleEnd: false};
let curSong;
let sampleSound = 'jump.wav';

let controls;
let vis;
let fourier;

function setup(){
    //-----------------------------------------------------
    let visualContainer = document.querySelector('#visual');
    let a = createCanvas (1000, 800);
    a.parent(visualContainer);
    background(0);
    //-----------------------------------------------------
    controls = new ControlsAndInput();

    fourier = new p5.FFT();

    vis = new Visualisations();
    vis.add(new Spectrum());
    vis.add(new WavePattern());
    vis.add(new Needles());
}

function preload(){
    curSong = loadSound(sampleSound);
    // curSong = loadSound('Sample.mp3');
}

window.onload = function(){
    //---PLAYLIST---
    let dropZone = document.querySelector('#dropField');

    //AddSongBtn
    document.querySelector('#btnAddSong').addEventListener('change', (e)=>{

        //Read and load input files
        loadFiles(e.target, player.playlist);

        //Show playlist
        showPlaylist(player.playlist, dropZone);

        e.target.value = '';
    });
    
    //Custom drag'N'drop field
    dropZone.addEventListener('dragover', (e) => {
        e.stopPropagation();
        e.preventDefault();

        e.dataTransfer.dropEffect = 'copy';
    });

    dropZone.addEventListener('drop', (e) => {
        e.stopPropagation();
        e.preventDefault();

        //Read and load input files
        loadFiles(e.dataTransfer, player.playlist);

        //Show playlist
        showPlaylist(player.playlist, dropZone);

    });
    
    //DelSongBtn
    document.querySelector('#btnDelSong').addEventListener('click', (e)=>{
        e.stopPropagation();
        
        //First click sets value
        if (!e.target.hasAttribute('value')) e.target.value = false;

        //The first click activate "Edit mode", the second click confirms "Delete"
        if (e.target.value == "false"){
            //Show checkboxes 
            for(let i = 0; i < player.playlist.length; i++){
                let checkBox = document.createElement('input');
                checkBox.type = 'checkbox';
                dropZone.appendChild(checkBox);
            }
            e.target.classList.add('btnPressed');
            e.target.innerHTML = "Confirm DELETE"
        }else {
            let checkArr = document.querySelectorAll('#dropField input');
            
            //Delete "checked" tracks
            let c = 0;
            for (let i = 0; i < checkArr.length; i++){ 
                if (checkArr[i].checked) {player.playlist.splice(i - c, 1); c++}
            }

            //Update playlist div
            showPlaylist(player.playlist, dropZone);
           
            // Switch "deleted" track
            // Select next selected track or 'sample' if playlist empty
            if(document.querySelector('.selected') != null){
                if(curSong.file != document.querySelector('.selected').value){
                curSong.stop();
                curSong = loadSound(document.querySelector('.selected').value)
                }
            }else{
                curSong.stop();
                curSong = loadSound(sampleSound);
            }

            e.target.classList.remove('btnPressed');
            e.target.innerHTML = "Delete";
        };

        //Toggle "Edit mode"
        if (e.target.value == 'false'){
            e.target.value = 'true'
        }else e.target.value = 'false'

    });

    //BUTTONS------------------------------------------------------------
    //Play button
    document.querySelector('#btnPlay').addEventListener('click', (e)=>{
        if (!curSong.isPlaying()){
            loadPlayerSettings(player);
            curSong.play();
        }
    });

    //Pause button
    document.querySelector('#btnPause').addEventListener('click', (e)=>{
        curSong.pause();
    });

    //Stop button
    document.querySelector('#btnStop').addEventListener('click', (e)=>{
        curSong.stop();
    });
    
    //Previous track button
    document.querySelector('#btnPrevious').addEventListener('click', (e)=>{
        newTrack(prevSong(player));
    });

    //Next track button

    document.querySelector('#btnNext').addEventListener('click', (e)=>{
        newTrack(nextSong(player));
    });

    //Repeat button
    document.querySelector('#btnRepeat').addEventListener('click', (e)=>{
        curSong.setLoop(!player.repeatSong);
        if (!player.repeatSong){
            e.target.innerHTML = "REPEAT MODE: ON";
            e.target.classList.add('btnPressed');
            player.repeatSong = !player.repeatSong;
        } else {
            e.target.innerHTML = "REPEAT MODE: OFF";
            e.target.classList.remove('btnPressed');
            player.repeatSong = !player.repeatSong;
        }
    });

    //Shuffle play
    document.querySelector('#btnShuffle').addEventListener('click', (e)=>{
        if (!player.shufflePlay){
            e.target.innerHTML = "SHUFFLE: ON";
            e.target.classList.add('btnPressed');
            player.shufflePlay = !player.shufflePlay;
        } else {
            e.target.innerHTML = "SHUFFLE: OFF";
            e.target.classList.remove('btnPressed');
            player.shufflePlay = !player.shufflePlay;
        }
    });

    //Loop playlist
    document.querySelector('#btnLoop').addEventListener('click', (e)=>{
        if (!player.loopPlaylist){
            e.target.innerHTML = "LOOP PLAYLIST: ON";
            e.target.classList.add('btnPressed');
            player.loopPlaylist = !player.loopPlaylist;
        } else {
            e.target.innerHTML = "LOOP PLAYLIST: OFF";
            e.target.classList.remove('btnPressed');
            player.loopPlaylist = !player.loopPlaylist;
        }
    });

    document.querySelector('#rangeVolume').addEventListener('change', (e)=>{
        player.volume = e.target.value;
        curSong.setVolume(+player.volume);
    })

}

function draw(){
    background(0);

	//draw the selected visualisation
    vis.selectedVisual.draw();
    
    //draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	// controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

function loadFiles(source, playlistArr){
    let fileList = source.files;
    
    for (let i = 0; i < fileList.length; i++){
        //Add only media files
        if (fileList[i].type == 'audio/mpeg'){
            playlistArr.push(fileList[i])
        }
    }
}

function showPlaylist(playlistArr, playlistDiv){
    //Clear playlist screen
    playlistDiv.innerHTML = '';

    //Show track's and their metadata 
    for (let i = 0; i < playlistArr.length; i++){
        let track = document.createElement('div');
        let trackName = playlistArr[i].name.substring(0, playlistArr[i].name.lastIndexOf('.'));
        let trackFormat = playlistArr[i].name.substring(playlistArr[i].name.lastIndexOf('.')+1, playlistArr[i].name.length);
        track.innerHTML += `${i+1}) ${trackName} ...... ${trackFormat}`;
        track.value = playlistArr[i];
        playlistDiv.appendChild(track);
    }

    //Select the 1st track if there is no selected
    let playNode = document.querySelectorAll(`#${playlistDiv.id} div`);

    if ((document.querySelector('.selected') == null)&&(playNode.length > 0)){
        //Mark first element
        playNode[0].classList.add('selected');
        //Load the 1st track
        curSong.stop();
        curSong = loadSound(playNode[0].value);
    }

    //Ability to switch active track
    for (let i = 0; i < playNode.length; i++){
        playNode[i].addEventListener('click', (e)=>{
            newTrack(e.target)
        })
    }
}

function newTrack(trackLine){
    let selected = document.querySelector('.selected');
    //Clear prev track selection and add new
    if(selected != null){
        selected.classList.remove('selected');
        trackLine.classList.add('selected');
        
        //Switch active song
        if (curSong.isPlaying() || curSong.isPaused()){
            curSong.stop();
            curSong = loadSound(trackLine.value);
            // curSong = loadSound(trackLine.value);
            //Keep player settings
            loadPlayerSettings(player);
        }else curSong = loadSound(trackLine.value);

        // curSong = loadSound(trackLine.value, ()=>{curSong.});
    }
}

function loadPlayerSettings(playerObj){
    //Keep loop
    if (playerObj.repeatSong) curSong.setLoop(playerObj.repeatSong);
    //Keep volume
    let v = +playerObj.volume;
    curSong.setVolume(v); 
}

function playCycle(){
    curSong.play();
    curSong.onended(()=>{newTrack(nextSong(player))});
    
}

function indexCurrent(playerObj){
    let curTrack = document.querySelector('.selected')
    if(curTrack != null) return playerObj.playlist.indexOf(curTrack.value);
}

function indexRandom(playerObj){
    let playlistLength = playerObj.playlist.length;
    return Math.floor(Math.random()*playlistLength)
}

function nextSong(playerObj){
    let dropZone = document.querySelectorAll('#dropField div');
    let curInd = indexCurrent(playerObj); 
    player.cycleEnd = false;

    if (playerObj.playlist.length > 0){
        //Random song if shuffleON
        if(playerObj.shufflePlay){
            let a = indexRandom(playerObj);
            
            while (a == curInd){
            a = indexRandom(playerObj)
            }

            return dropZone[a];
        }
        else{
            //Return to 1st track when finished
            if(!playerObj.loopPlaylist){
                if(curInd+1 < dropZone.length) return dropZone[curInd+1];
                else{
                    player.cycleEnd = true;
                    return dropZone[curInd];
                };
            }else return dropZone[(curInd+1)%dropZone.length];
        }  
    }  
};

function prevSong(playerObj){
    let dropZone = document.querySelectorAll('#dropField div');
    let curInd = indexCurrent(playerObj)

    if (playerObj.playlist.length > 0){
        //Random song if shuffleON
        if(playerObj.shufflePlay){
            let a = indexRandom(playerObj);
            
            while (a == curInd){
            a = indexRandom(playerObj)
            }

            // return PL[a];
            return dropZone[a];
        }
        else{
            //Return to 1st track when finished
            if(!playerObj.loopPlaylist){
                if(curInd-1 >= 0) return dropZone[curInd-1];
                else return dropZone[0];
            }else if(curInd-1 < 0) return dropZone[dropZone.length - 1];
            else return dropZone[curInd - 1];
        }  
    }  
};