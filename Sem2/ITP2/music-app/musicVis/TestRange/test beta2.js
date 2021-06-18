let playlist = [];
let player = {playlist: [],
                volume: 1,
                repeatSong: false};
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
    curSong = loadSound('Sample.mp3');
}

window.onload = function(){

    //Custom dragNdrop field
    //-----------------------------------------------------
    let dropZone = document.querySelector('#dropField');

    dropZone.addEventListener('dragover', (e) => {
        e.stopPropagation();
        e.preventDefault();

        e.dataTransfer.dropEffect = 'copy';
    });

     dropZone.addEventListener('drop', (e) => {
        e.stopPropagation();
        e.preventDefault();
        let fileList = e.dataTransfer.files;

        dropZone.innerHTML = '';

        //Create playlist array with songs info
        for (let i = 0; i < fileList.length; i++){
            if (fileList[i].type == 'audio/mpeg'){
                player.playlist.push(
                    {file: fileList[i],
                        fileName: fileList[i].name,
                    fileType: fileList[i].type,
                    fileSize: fileList[i].size,
                    trackName: fileList[i].name.substring(0, fileList[i].name.lastIndexOf('.')),
                    trackFormat: fileList[i].name.substring(fileList[i].name.lastIndexOf('.')+1, fileList[i].length),
                    // trackURL: window.URL.createObjectURL(fileList[i])
                    });
            }
        }

        //Show information of all track's
        for (let i = 0; i < player.playlist.length; i++){
            // e.target.innerHTML += `Track ${i+1}: ${fileList[i].name} <br>`;
            let track = document.createElement('div');
            track.innerHTML += `${i+1}) ${player.playlist[i].trackName} ...... ${player.playlist[i].trackFormat}`;
            track.value = player.playlist[i].file;
            dropZone.appendChild(track);
        }
        
        let playNode = document.querySelectorAll('#dropField div');

        if (document.querySelector('.selected') == null){
            playNode[0].classList.add('selected')
        }

        for (let i = 0; i < playNode.length; i++){
            //Add "clickable" select for the playlist
            playNode[i].addEventListener('click', (e) => {

                //When clicked clear selected status from track and attach to new
                document.querySelector('.selected').classList.remove('selected');
                e.target.classList.add('selected');
                
                //Load new song a current
                if (curSong.isPlaying() || curSong.isPaused()){
                    curSong.stop();
                    curSong = loadSound(e.target.value, ()=>{curSong.play()})
                    //Load current settings if needed
                    if (player.repeatSong) curSong.setLoop(player.repeatSong)
                }                
                else curSong = loadSound(e.target.value);
            })
        }
        

    });


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


    // let audio = new AudioContext();
    // playSound(trackSource, audio);
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
        track.value = playlistArr.file;
        playlistDiv.appendChild(track);
    }

    //Select 1st track if there is no selected
    let playNode = document.querySelectorAll(`#${playlistDiv} div`);
    if (document.querySelectorAll('.selected') == null){
        playNode[0].classList.add('selected');
    }

    //Ability to switch active track
    for (let i = 0; i < playNode.length; i++){
        playNode[i].addEventListener('click', (e)=>{

            //Clear prev track selection and add new
            document.querySelector('.selected').classList.remove('selected');
            e.target.classList.add('selected');

            //Switch active song
            if (curSong.isPlaying() || curSong.isPaused()){
                curSong.stop();
                curSong = loadSound(e.target.value, ()=>{curSong.play()});
                //Keep player settings
                loadPlayerSettings(player);
            }else curSong = loadSound(e.target.value);
        })
    }
}

function newTrack(playerListDiv, currentSong){
    //Clear prev track selection and add new
    document.querySelector('.selected').classList.remove('selected');
    e.target.classList.add('selected');

    //Switch active song
    if (curSong.isPlaying() || curSong.isPaused()){
        curSong.stop();
        curSong = loadSound(e.target.value, ()=>{curSong.play()});
        //Keep player settings
        loadPlayerSettings(player);
    }else curSong = loadSound(e.target.value);
}

function loadPlayerSettings(playerObj){
    //Keep loop
    if (playerObj.repeatSong) curSong.setLoop(playerObj.repeatSong);
    //Keep volume
    curSong.setVolume(playerObj.volume); 
}
