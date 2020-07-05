const video = document.getElementById('video');
const btnPlay = document.getElementById('play');
const btnStop = document.getElementById('stop');
const progresssBar = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');


let shouldUpdateVideo = true;

/**
 * Creates a timestamp format from the input in seconds
 * @param {Number} time 
 * @returns {string}
 */
function secondsToTimestamp(time) {
    const mins = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${seconds < 10 ? '0' : ''}${seconds.toFixed(0)}`
}

/**
 * Play and Pause video
 */
function toggleVideoStatus() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

/**
 * Updates the play/pause icon
 */
function updatePlayIcon() {
    if(video.paused) {
        btnPlay.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        btnPlay.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

/**
 * Updates both the progressBar and the timestamp elements
 */
function updateProgress(e) {
    if(!shouldUpdateVideo) {
        return;
    }
    progresssBar.value = (video.currentTime / video.duration) * 100;
    timestamp.innerText = secondsToTimestamp(video.currentTime) + '/' + secondsToTimestamp(video.duration);
}

/**
 * Set video time to progress
 */
function setVideoProgress() {
    shouldUpdateVideo = true;
    video.currentTime = (parseInt(progresssBar.value) / 100) * video.duration;
}

/**
 * Stop video
 */
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// Event Listeners for the video element
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

// Event Listeners for the play button
btnPlay.addEventListener('click', toggleVideoStatus);


// Event Listeners for the stop button
btnStop.addEventListener('click', stopVideo);

// Event Listeners for the progress bar
progresssBar.addEventListener('change', setVideoProgress);
progresssBar.addEventListener('input', e => {
    shouldUpdateVideo = false;
    timestamp.innerText = secondsToTimestamp(video.duration * (e.target.value / 100)) + '/' + secondsToTimestamp(video.duration);;
})