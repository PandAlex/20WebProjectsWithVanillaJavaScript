const musicContainer = document.getElementById('music-container');

const btnPlay = document.getElementById('play');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

//  Initially load song details into DOM
loadSong(songs[songIndex]);

/**
 * Update song details
 * @param {string} song 
 */
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
}

/**
 * Play Song
 */
function playSong() {
    musicContainer.classList.add('play');
    btnPlay.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
    audio.play();
}


/**
 * Pause Song
 */
function pauseSong() {
    musicContainer.classList.remove('play');
    btnPlay.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
    audio.pause();
}

/**
 * Previous Song
 */
function prevSong() {
    if(audio.currentTime > 4) {
        audio.currentTime = 0;
        return;
    }
    songIndex--;
    songIndex = songIndex < 0 ? songs.length -1 : songIndex;
    loadSong(songs[songIndex]);
    playSong();
}

/**
 * Next Song
 */
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

/**
 * Update progress bar
 * @param {Event} song 
 */
function udpateProgress(event) {
    const { duration, currentTime } = event.srcElement;
    progress.style.width = `${(currentTime / duration) * 100}%`;
}

/**
 * 
 * @param {Event} event 
 */
function setProgress(event) {
    audio.currentTime = (event.offsetX / this.clientWidth) * audio.duration;
}

// Event Listeners
btnPlay.addEventListener('click', _ => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
btnPrev.addEventListener('click', prevSong);
btnNext.addEventListener('click', nextSong);

// Time / song update
audio.addEventListener('timeupdate', udpateProgress);
// Song ends
audio.addEventListener('ended', nextSong);

// Click on Progress bar
progressContainer.addEventListener('click', setProgress);

// FIXED: If video duration under threshold, go to song start (function "prevSong")