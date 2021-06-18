let playlist = [];
let player = {playlist: [],
                volume: 1,
                repeatSong: false,
                loopPlaylist: false,
                shufflePlay: false};
let curSong;

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
    curSong = loadSound('jump.wav');
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
            if((document.querySelector('.selected') != null)&&(curSong.file != document.querySelector('.selected').value)){
                curSong.stop();
                curSong = loadSound(document.querySelector('.selected').value);
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
        if(!player.shufflePlay){}
        else {}
    });

    //Next track button

    document.querySelector('#btnNext').addEventListener('click', (e)=>{

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
            playlistArr.push(
                {file: fileList[i],
                 fileName: fileList[i].name,
                 fileType: fileList[i].type,
                 fileSize: fileList[i].size,
                 trackName: fileList[i].name.substring(0, fileList[i].name.lastIndexOf('.')),
                 trackFormat: fileList[i].name.substring(fileList[i].name.lastIndexOf('.')+1, fileList[i].name.length)}
            )
        }
    }
}

function showPlaylist(playlistArr, playlistDiv){
    //Clear playlist screen
    playlistDiv.innerHTML = '';

    //Show track's and their metadata 
    for (let i = 0; i < playlistArr.length; i++){
        let track = document.createElement('div');
        track.innerHTML += `${i+1}) ${playlistArr[i].trackName} ...... ${playlistArr[i].trackFormat}`;
        track.value = playlistArr[i].file;
        playlistDiv.appendChild(track);
    }

    //Select 1st track if there is no selected
    let playNode = document.querySelectorAll(`#${playlistDiv.id} div`);

    if ((document.querySelector('.selected') == null)&&(playNode.length > 0)){
        playNode[0].classList.add('selected');
    }

    //Ability to switch active track
    for (let i = 0; i < playNode.length; i++){
        playNode[i].addEventListener('click', (e)=>{
            newTrack(e.target)
        })
    }
}

function newTrack(trackLine){
    //Clear prev track selection and add new
    document.querySelector('.selected').classList.remove('selected');
    trackLine.classList.add('selected');
    
    //Switch active song
    if (curSong.isPlaying() || curSong.isPaused()){
        curSong.stop();
        curSong = loadSound(trackLine.value, ()=>{curSong.play()});
        //Keep player settings
        loadPlayerSettings(player);
    }else curSong = loadSound(trackLine.value);
}

function loadPlayerSettings(playerObj){
    //Keep loop
    if (playerObj.repeatSong) curSong.setLoop(playerObj.repeatSong);
    //Keep volume
    curSong.setVolume(playerObj.volume); 
}

function playCicle(song){
    song.play()
    song.onended(()=>{curSong = loadSound(player.playlist[0].file, ()=>{curSong.play()})})
}
