const word = document.getElementById("word")
const text = document.getElementById("text")
const scoreEl = document.getElementById("score")
const timeEl = document.getElementById("time")
const endGameEl = document.getElementById("end-game-container")
const settingsBtn = document.getElementById("settings-btn")
const settings = document.getElementById("settings")
const settingsForm = document.getElementById("settings-form")
const difficultySelect = document.getElementById("difficulty")

const words = [
    'sigh',
    'tense'
]

// Init word
let randomWord;

// Init score
let score = 0;

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty'):'medium'
let difficulty = difficultySelect.value

// Init time
let time = 10;

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000)

// Generate Random word from array
function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)]
}

// Add word to DOM
function addWordToDOM(){
    randomWord = getRandomWord();
    console.log(randomWord);
    word.innerHTML = randomWord;
}

// Update score
function updateScore(){
    score++;
    scoreEl.innerHTML = score
}

// Update Time
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's'

    if(time === 0){
        clearInterval(timeInterval)
        // end game
        gameOver();
    }
}

// Game over show screen
function gameOver(){
    endGameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

    endGameEl.style.display = 'flex'
}

addWordToDOM();

// Typing
text.addEventListener('input',e => {
    const insertedText = e.target.value;
    
    if(insertedText == randomWord){
        addWordToDOM();
        updateScore();

        // Clear TextInput
        e.target.value = ''
        switch(difficulty){
            case 'hard': time +=2; break;
            case 'medium': time +=3; break;
            case 'easy': time +=5; break;
        }
        updateTime()
    }
})

// Settings btn click
settingsBtn.addEventListener('click',()=>{
    settings.classList.toggle('hide')
})

// Settings select
settingsForm.addEventListener('change',e=>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty)
})