const tracks = [
    {
        "title": "Lost in the City Lights",
        "artist": "Cosmo Sheldrake",
        "audio": "assets/public/music/lost-in-city-lights-145038.mp3",
        "image": "assets/public/images/cover-1.png",
    },
    {
        "title": "Forest Lullaby",
        "artist": "Lesfm",
        "audio": "assets/public/music/forest-lullaby-110624.mp3",
        "image": "assets/public/images/cover-2.png",
    }
]

let isPlaying = false;
let currentIndex = 0;
let currentAudio = undefined;
let maxAudioValue = 0;

let audioTrackInterval;

const titleDiv = document.getElementById("musicTitle");
const artistDiv = document.getElementById("musicArtist");
const musicImage = document.getElementById("musicImage");
const musicTrack = document.getElementById("musicTrack");
const remainTime = document.getElementById("remainTime");
const totalTime = document.getElementById("totalTime");

document.getElementById("btnPrev").addEventListener('click', previousTrack);
document.getElementById("btnPause").addEventListener('click', () => {
    if (isPlaying) pauseTrack();
    else playTrack(currentIndex);
});
document.getElementById("btnNext").addEventListener('click', nextTrack);

function playTrack(index) {
    index = index > tracks.length - 1 ? 0 : index < 0 ? tracks.length - 1 : index;
    const track = tracks[index];
    titleDiv.innerHTML = track.title;
    artistDiv.innerHTML = track.artist;
    musicImage.src = track.image;

    currentAudio = new Audio(track.audio);
    currentAudio.addEventListener('loadedmetadata', function () {
        maxAudioValue = parseInt(currentAudio.duration);
        musicTrack.max = maxAudioValue;
        totalTime.innerHTML = formatTime(maxAudioValue);
    });
    currentAudio.load();

    isPlaying = true;
    currentIndex = index;

    if (index === currentIndex) {
        changeTrackTime();
    }

    currentAudio.play();

    audioTrackInterval = setInterval(() => progressBar(), 1000);
}

function pauseTrack() {
    if (currentAudio === undefined) return;
    clearInterval(audioTrackInterval);
    isPlaying = false;
    currentAudio.pause();
}

function nextTrack() {
    pauseTrack();
    remainTime.innerHTML = formatTime(0);
    musicTrack.value = 0;
    playTrack(currentIndex + 1);
}

function previousTrack() {
    pauseTrack();
    remainTime.innerHTML = formatTime(0);
    musicTrack.value = 0;
    playTrack(currentIndex - 1);
}

function progressBar() {
    if (currentAudio === undefined) return;
    const currentValue = (musicTrack.value >= maxAudioValue || currentAudio.ended || !isPlaying) ? 0 : parseInt(musicTrack.value) + 1;
    console.log(currentValue);
    const newValue = parseFloat(currentValue);
    remainTime.innerHTML = formatTime(newValue);
    musicTrack.value = newValue;
}

function changeTrackTime() {
    currentAudio.currentTime = musicTrack.value;
}

function formatTime(value) {
    const minutes = `${Math.floor(value / 60)}`.padStart(2, "0");
    const seconds = `${value % 60}`.padStart(2, "0");
    return `${minutes}:${seconds}`;
}