const ytKey = `AIzaSyDdHUm9xraWGj8y2ZDkuojhqiPSiBhjvAg`;
const clientID = `651105053019-kd1jj77atdeigr5c0g5kjuehnhv69mfn.apps.googleusercontent.com`

const gloAcademyList = document.querySelector(`.glo-academy-list`);
const trendingList = document.querySelector('.trending-list');
const musicList = document.querySelector('.music-list');

const createCard = (videoObj)=>{
    const vidID = typeof(videoObj.id) === 'string' ? videoObj.id : videoObj.id.videoId;
    const vidImg = videoObj.snippet.thumbnails.default.url;
    const vidTitl = videoObj.snippet.title;
    const vidDate = new Date (videoObj.snippet.publishedAt).toLocaleString('RU-ru');
    const vidChan = videoObj.snippet.channelTitle;
    const vidCnt = videoObj.statistics?.viewCount;

    const card = document.createElement('div');
    card.classList.add('video-card');
    card.innerHTML = `
        <div class="video-thumb">
            <a class="link-video youtube-modal" href="https://youtu.be/${vidID}">
                <img src="${vidImg}" alt="" class="thumbnail">
            </a>
        </div>
        
        <h3 class="video-title">${vidTitl}</h3>
        <div class="video-info">
            <span class="video-counter">
            <span class="video-date">${vidDate}</span>
            </span>

            ${vidCnt ? `<span>${vidCnt}</span>` : ``}
            
            <span class="video-channel">${vidChan}</span>
        </div>
    `;
    return card
}

const createList = (wrapper, videoList)=>{
    wrapper.textContent = ``;

    videoList.forEach((elem)=>{wrapper.append(createCard(elem))})
}

createList(gloAcademyList,gloAcademy)
createList(trendingList,trending)
createList(musicList,music)


// YT part

const authBtn = document.querySelector('.auth-btn');
const userAvt = document.querySelector('.user-avatar');

const handleAuth = ()=>{
    console.log(gapi.auth2)
}

const handleSignout = ()=>{

}


function initClient() {
    gapi.client.init({
        'apiKey': ytKey,
        'clientId': clientID,
        'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    }).then(()=>{
        authBtn.addEventListener('click',handleAuth);
        userAvt.onclick = ()=>handleSignout;
    });
}

gapi.load('client:auth2', initClient)