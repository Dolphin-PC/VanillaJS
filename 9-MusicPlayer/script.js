const musicContainer = document.getElementById("music-container"),
    playBtn = document.getElementById("play"),
    prevBtn = document.getElementById("prev"),
    nextBtn = document.getElementById("next"),
    audio = document.getElementById('audio'),
    progress = document.getElementById('progress'),
    progressContainer = document.getElementById('progress-container'),
    title = document.getElementById('title'),
    cover = document.getElementById('cover');

// Song Titles
const songs = ['hey','summer','ukulele'];

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex])

// Update song details
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

// Play song
function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}
// Pause song
function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause();
}

// Change song
function prevSong(){
    songIndex--;
    if(songIndex < 0 ){
        songIndex = songs.length-1
    }
    loadSong(songs[songIndex])
    playSong()
}
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// Update Progress
function updateProgress(e){
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

// Set progress bar
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = clickX / width * duration
}

// Time/song update
audio.addEventListener('timeupdate',updateProgress)

// Event listeners
playBtn.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

// Click on progress bar
progressContainer.addEventListener('click',setProgress)

// Song End
audio.addEventListener('ended',nextSong)