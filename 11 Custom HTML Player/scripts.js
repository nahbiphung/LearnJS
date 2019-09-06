/* Get our Element */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggleButton = player.querySelector('.toggle');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const rangeButton = player.querySelectorAll('.player__slider');
const skipButton = player.querySelectorAll('[data-skip]');

/* Build our Function */
function playVid() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggleButton.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
/* Hook up the event listeners */

video.addEventListener('click', playVid);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggleButton.addEventListener('click', playVid);
skipButton.forEach(skipBtn => skipBtn.addEventListener('click', skip));
rangeButton.forEach(rangeBtn => rangeBtn.addEventListener('click', handleRangeUpdate));
rangeButton.forEach(rangeBtn => rangeBtn.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);