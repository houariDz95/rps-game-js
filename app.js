const resultDispay = document.querySelector('#text');
const play = document.querySelector('.play');
const weapons = document.querySelectorAll('.weapons div');
const reset = document.querySelector('.reset')
const choices = ['rock', 'paper', 'scissors']
let userChoice;
let computerChoice;
let userScore = 0;
let computerScore = 0;
let isGameOver = false;

play.addEventListener('click', () => {
    if(userChoice !== ""){
      showResult();
      changeWidth();
      gameOver();
      addActive(); 
      userChoice = ""
      showText(100); 
    }else{
      resultDispay.innerHTML = "choose your weapon"
      showText(400)
    }
    document.querySelector('#rock').style.borderBottom = '3px solid transparent'
    document.querySelector('#paper').style.borderBottom = '3px solid transparent'
    document.querySelector('#scissors').style.borderBottom = '3px solid transparent'
})

reset.addEventListener('click', () =>  {
  userScore = 0;
  computerScore = 0;
  setIsGameOver();
  reset.style.display = "none";
  play.style.display = "block";
  changeWidth();
  resultDispay.innerHTML = "";
})


weapons.forEach(weapon => {
  weapon.addEventListener('click', (e) => {
    addActive()
    userChoice = weapon.id;
    compChoice();
    play.style.animation = 'none'
    borderBottom(userChoice)
  })
})  


function compChoice (){
  const randomChoice = Math.floor(Math.random() * weapons.length);
  computerChoice = choices[randomChoice];
}

function showResult() {
  switch(userChoice + computerChoice){
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      resultDispay.innerHTML = "Tie";
      document.querySelector('.play').style.animation = 'tie 1s';
      break;
    case "rockscissors":
    case "scissorspaper":
    case "paperrock":
      resultDispay.innerHTML = victoryPhrases();
      userScore++;
      play.style.animation = 'win 1s';
      break;
      case "scissorsrock":
      case "paperscissors":
      case "rockpaper":
        resultDispay.innerHTML = lossPhrases();
        computerScore++;
        play.style.animation = 'loss 1s';
      break;
  }
}

function gameOver(){
  if(userScore === 5){
    resultDispay.innerHTML = "You are victorious!";
    reset.style.display = "block";
    play.style.display = "none";
    setIsGameOver();   
  }else if(computerScore === 5){
    resultDispay.innerHTML = "Computer won...";
    reset.style.display = "block";
    play.style.display = "none";
    setIsGameOver();
  }
}
const victoryPhrases = () => {
  let options = [ 'Keep it up!', 'You got him!', 'Alhamdullilah, victory!', 'You\'re a killer!', '<i class="icon fa-solid fa-face-smile-wink"></i>', '<i class="icon fa-solid fa-face-laugh-beam"></i>', '<i class="icon fa-solid fa-face-laugh-wink"></i>', '<i class="icon fa-solid fa-face-grin-wide"></i>'];
  let choice = Math.floor(Math.random() * options.length);
  let result = options[choice]; 
  return result;
}
  
  const lossPhrases = () => {
  let options = ['Oops...', '<i class="icon fa-solid fa-face-frown"></i>', 'We\'ll get\'em next time...', 'Yalla next time InshaAllah', '<i class="icon fa-solid fa-face-frown-open"></i>', '<i class="icon fa-solid fa-face-meh"></i>', '<i class="icon fa-solid fa-face-frown-open"></i>'];
  let choice = Math.floor(Math.random() * options.length);
  let result = options[choice];
  return result;
}

function changeWidth() {
  let humbar = document.querySelector(".humbar")
  let compbar = document.querySelector(".compbar")
  humbar.style.width = `${(computerScore / 5) * 100}%`
  compbar.style.width = `${(userScore / 5) * 100}%`
}

function addActive(){
  weapons.forEach(weapon => {
    weapon.classList.remove('active');
    weapon.addEventListener('click', () => {  weapon.classList.add('active');})
  })
}

function showText(duration) {
  resultDispay.style.opacity = "0"
  setTimeout(() => {
    resultDispay.style.opacity = "1"
    
  }, duration)
}

function setIsGameOver(){
  if(computerScore === 5 || userScore === 5){
    isGameOver = true
    document.querySelector('.weapons').style.opacity = '0'
  }else{
    isGameOver = false
    document.querySelector('.weapons').style.opacity = '1'
  }
}

function borderBottom(weapon) {
  if (weapon === "rock") {
    document.querySelector('#rock').style.borderBottom = '3px solid #FFF'
    document.querySelector('#paper').style.borderBottom = '3px solid transparent'
    document.querySelector('#scissors').style.borderBottom = '3px solid transparent'
  }
  if (weapon === "paper") {
    document.querySelector('#rock').style.borderBottom = '3px solid transparent'
    document.querySelector('#paper').style.borderBottom = '2px solid #FFF'
    document.querySelector('#scissors').style.borderBottom = '3px solid transparent'
  }
  if (weapon === "scissors") {
    document.querySelector('#rock').style.borderBottom = '3px solid transparent'
    document.querySelector('#paper').style.borderBottom = '3px solid transparent'
    document.querySelector('#scissors').style.borderBottom = '2px solid #FFF'
  }
}