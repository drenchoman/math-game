// Query selectors

let home = document.querySelector(".home")
let settings = document.querySelector(".settings");
let leaderBoard = document.querySelector(".leaderboard");
let addition = document.querySelector(".addition");
let subtraction =document.querySelector(".subtraction");
let gameMain = document.querySelector(".game-main");
let answerBox = document.querySelectorAll(".answerBox")
let clockSpan = document.createElement("span");
let clockTime = document.createElement("span");
let clockDiv = document.createElement("div");
let body = document.querySelector("body");
let settingsButton = document.querySelector(".settingsButton");
clockSpan.classList.add("clockSpan");
clockTime.classList.add("clockTime");
clockDiv.classList.add("clockDiv");
let gameMode = "";
let answer = "";
let health = 3;
let score = 0;
let streak = 0;
let bestStreak = 0;
let myTimer;
let selectedNum;
let answerTime;
let highScores = JSON.parse(localStorage.getItem(["highScores"])) || [];
let highStreaks = JSON.parse(localStorage.getItem(["highStreaks"])) || [];
let difficulty = 0;
let subHighScore = 0;
let subHighStreak = 0;


addAnswerListener();
addPlayAgainListener();
addSettingsListener();

function increaseDifficulty(){
  difficulty++;
  console.log("difficulty is: " + difficulty);
  if(difficulty === 5){
    selectedNum = selectedNum * 2;
    return;
  } else if (difficulty === 10){
    selectedNum = selectedNum * 2;
    return;
  } else if (difficulty === 20){
    selectedNum = selectedNum * 2;
    return;
  } else if (difficulty === 35){
    selectedNum = selectedNum * 2;
    return;
  } else{
    return
  }
}


function configSettings(gameMode){
  checkSelectedNum();
  checkAnswerTime()
  gameSettings(gameMode)
}

function checkSelectedNum(){
  let selnum = localStorage.getItem("selectedNum");
  if (selnum === null){
    selectedNum = 12
  } else{
    selectedNum = parseInt(selnum);

  }
}
function checkAnswerTime(){
  let ansum = localStorage.getItem("answerTime");
  if (ansum === null){
    answerTime = 40
  } else {
    answerTime = parseInt(ansum);
  }
}

addition.addEventListener("click", () =>{
  gameMain.textContent = "";
  configSettings("addition");
  loadQuestions();

})

subtraction.addEventListener("click", () => {
  gameMain.textContent = "";
  configSettings("subtraction");
  loadQuestions();
});

leaderBoard.addEventListener("click", () =>{
  // let highScoreBoard = JSON.parse(localStorage.getItem(["highScores"]));
  // let highStreaksBoard = JSON.parse(localStorage.getItem(["highStreaks"]));
  // console.log(highScoreBoard)
  openLeaderboard(highStreaks, highScores);
})

home.addEventListener("click", () =>{
  window.location.reload();
});


function gameSettings(setting){
  gameMode = setting
  console.log(gameMode);
};

function randomNumber(selectedNum){
  let num = toInteger(selectedNum)
  return Math.floor(Math.random() * num)
}


function loadQuestions(){
  increaseDifficulty();
  gameMain.textContent = "";
  let numberA= randomNumber(selectedNum)
  let numberB= randomNumber(selectedNum)
  console.log(numberA);
  console.log(numberB);
  if(gameMode === "addition"){
    let symbol = "+"
    generateQuestion(numberA, numberB, symbol);
    generateAnswer(numberA, numberB, symbol);
    clock(answerTime);
    showHealth(health);
    showScore();
    showStreak();
    return;
  } else if(gameMode === "subtraction"){
    let symbol = "-"
    generateQuestion(numberA, numberB, symbol)
    generateAnswer(numberA, numberB, symbol)
    clock(answerTime);
    showHealth(health);
    showScore();
    showStreak();
    return;
  } console.log("something went wrong when Loading Questions")

}

function generateQuestion(num1, num2, symbol){
  let questionDiv = document.createElement("div")
  let newQ = document.createElement("span")
  let question = document.createElement("span");
  questionDiv.classList.add('questionDiv')
  newQ.textContent = "Question:"
  if(symbol === "-" && num2 > num1){
    question.textContent= (num2 + " " + symbol + " " + num1);
    questionDiv.appendChild(newQ);
    questionDiv.appendChild(question);
    gameMain.appendChild(questionDiv)
    return;
  } else{
    question.textContent= (num1 + " " + symbol + " " + num2)
    questionDiv.appendChild(newQ);
    questionDiv.appendChild(question);
    gameMain.appendChild(questionDiv)
  }
};

function shuffleAnswers(array){
  let currentIndex = array.length, randomIndex;

  while (0 !== currentIndex){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] =
    [array[randomIndex], array[currentIndex]];

  }
  return array;
};

function generateAnswer(num1, num2, symbol){
  if (symbol === "+"){
    answer = (num1 + num2);
    let fakeAnswer = randomNumber(selectedNum);
    let fakeAnswer2 = randomNumber(selectedNum);
    let answers = [answer, fakeAnswer, fakeAnswer2]
    answers = shuffleAnswers(answers);
    console.log("The answer is " + answer);
    generateAnswerField(answers);
    return;
  } else if (symbol === "-"){
    if(num2 > num1){
      answer = (num2 - num1);
      let fakeAnswer = randomNumber(selectedNum);
      let fakeAnswer2 = randomNumber(selectedNum);
      let answers = [answer, fakeAnswer, fakeAnswer2]
      answers = shuffleAnswers(answers);
      console.log("The answer is " + answer);
      generateAnswerField(answers);
      return;
    } else {
    answer = (num1 - num2);
    let fakeAnswer = randomNumber(selectedNum);
    let fakeAnswer2 = randomNumber(selectedNum);
    let answers = [answer, fakeAnswer, fakeAnswer2]
    answers = shuffleAnswers(answers);
    console.log("The answer is " + answer);
    generateAnswerField(answers);
    return;
  }
  }
  console.log("OOOPS")
};


function generateAnswerField(answers){
let answerOne = document.createElement("button");
let answerTwo = document.createElement("button");
let answerThree = document.createElement("button");
let answerDiv = document.createElement("div");


answerOne.classList.add("answerBox");
answerTwo.classList.add("answerBox");
answerThree.classList.add("answerBox");



answerDiv.classList.add("answerDiv")
answerOne.textContent = (answers[0])
answerTwo.textContent = (answers[1])
answerThree.textContent = (answers[2])

answerDiv.appendChild(answerOne);
answerDiv.appendChild(answerTwo);
answerDiv.appendChild(answerThree);
gameMain.appendChild(answerDiv);
}

function addAnswerListener(){
  body.addEventListener('click', event => {
    if (event.target.matches('.answerBox')){
      checkAnswer(event.target.innerText);
      clearInterval(myTimer);
    }
  })
};

function addPlayAgainListener(){
body.addEventListener("click", event => {
  if (event.target.matches(".playAgain")){
    window.location.reload();
  }
})
};

function addSettingsListener(){
  body.addEventListener("click", event => {
    if (event.target.matches(".settingsButton")){
      let answerTime = document.querySelector(".answerTime");
      let answerSetting = answerTime.value
      let highestNumber = document.querySelector(".highestNumber")
      let highestSetting = highestNumber.value;
      let hTime = checkSettings(answerSetting)
      let hNum = checkSettings(highestSetting)
      localStorage.setItem("selectedNum", hNum);
      localStorage.setItem("answerTime", hTime);
      window.location.reload();
    }
  })
};



function checkSettings(num){
  if(num === ""){
    num = 20
    return num
  } else if (num !== ""){
    return num
  }
};


settings.addEventListener("click", ()=>{
  openSettings();
})




function checkAnswer(answerToCheck){
  console.log(typeof(answerToCheck));
  if(answerToCheck === "out"){
    health--
    saveStreak(streak);
    streak = 0
    let healthCheck = checkHealth();
    if (healthCheck === true){
      gameOver();
      return;
    } else{
      timeOut();
      setTimeout(function(){
        loadQuestions()
      }, 3000);
      return;
    }
  }
  let newAnswer =toInteger(answerToCheck)
  console.log(newAnswer);
  if(newAnswer === answer){
    score++;
    streak++;
    correctAnswer();
    setTimeout(function(){
      loadQuestions()
    }, 1500);
  } else if (newAnswer !== answer){
    health--
    saveStreak(streak);
    streak = 0;
    let healthCheck = checkHealth()
    if (healthCheck === true){
      gameOver();
      return;
    } else {
    wrongAnswer();
    setTimeout(function(){
      loadQuestions();
    }, 1500);
  }
}
}


function clock(answerTime){
  myTimer= setInterval(myClock, 1000);
  let c = answerTime;

  function myClock(){

    clockSpan.textContent = "Time"
    clockTime.textContent = --c
    clockDiv.appendChild(clockSpan);
    clockDiv.appendChild(clockTime);
    gameMain.appendChild(clockDiv);
    if (c === 0){
      checkAnswer("out");
      clearInterval(myTimer);

    }
  }
};


function correctAnswer(){
  gameMain.textContent = "";
  let correctDiv = document.createElement("div");
  correctDiv.classList.add("correctDiv");
  let correctSpan = document.createElement("span");
  correctSpan.classList.add("correctSpan");
  let correctImage = document.createElement("img");
  correctImage.src = "public/images/unicorn.jpg"
  correctImage.classList.add("correctImage");
  correctSpan.textContent = "Correct!"
  correctDiv.appendChild(correctSpan);
  correctDiv.appendChild(correctImage);
  gameMain.appendChild(correctDiv);

}

function timeOut(){
    gameMain.textContent = "";
    let timeOutDiv = document.createElement("div");
    timeOutDiv.classList.add("timeOutDiv");
    let timeOutSpan = document.createElement("span");
    let timeOutImage = document.createElement("img");
    timeOutImage.src = "public/images/shocked.jpg"
    timeOutImage.classList.add("timeOutImage");
    timeOutSpan.classList.add("timeOutSpan")
    timeOutSpan.textContent = "You ran out of time!"
    timeOutDiv.appendChild(timeOutSpan);
    timeOutDiv.appendChild(timeOutImage);
    gameMain.appendChild(timeOutDiv)
  };


function wrongAnswer(){
    gameMain.textContent = "";
    let wrongDiv = document.createElement("div");
    wrongDiv.classList.add("wrongDiv");
    let wrongSpan = document.createElement("span");
    let wrongImage = document.createElement("img");
    wrongImage.src = "public/images/sadcat.jpg"
    wrongImage.classList.add("wrongImage");
    wrongSpan.classList.add("wrongSpan")
    wrongSpan.textContent = "You've lost a life!"
    wrongDiv.appendChild(wrongSpan);
    wrongDiv.appendChild(wrongImage);
    gameMain.appendChild(wrongDiv)
  };



function toInteger(x){
  return parseInt(x, 10);
}

function showHealth(health){
  let healthDiv = document.createElement("div");
  healthDiv.classList.add("healthDiv")
  let healthList = document.createElement("ul")
  healthList.classList.add("healthList");
  let hp1 = document.createElement("li");
  let hp2 = document.createElement("li");
  let hp3 = document.createElement("li");
  let healthText = document.createElement("span");
  healthText.textContent = "Lives"

  if (health === 3){
    let health1 = document.createElement("img");
    let health2 = document.createElement("img");
    let health3 = document.createElement("img");

    health1.src = "public/images/heart.svg"
    health2.src = "public/images/heart.svg"
    health3.src = "public/images/heart.svg"

    hp1.appendChild(health1);
    hp2.appendChild(health2);
    hp3.appendChild(health3);

    healthList.appendChild(hp1);
    healthList.appendChild(hp2);
    healthList.appendChild(hp3);
    healthDiv.appendChild(healthText);
    healthDiv.appendChild(healthList);
    gameMain.appendChild(healthDiv);
  }
  else if (health === 2){
    let health1 = document.createElement("img");
    let health2 = document.createElement("img");


    health1.src = "public/images/heart.svg"
    health2.src = "public/images/heart.svg"


    hp1.appendChild(health1);
    hp2.appendChild(health2);


    healthList.appendChild(hp1);
    healthList.appendChild(hp2);
    healthDiv.appendChild(healthText);
    healthDiv.appendChild(healthList);
    gameMain.appendChild(healthDiv);
  }
  else if (health === 1){
    let health1 = document.createElement("img");
    health1.src = "public/images/heart.svg"
    hp1.appendChild(health1);
    healthList.appendChild(hp1);
    healthDiv.appendChild(healthText);
    healthDiv.appendChild(healthList);
    gameMain.appendChild(healthDiv);
  }

}

function checkHealth(){
  if (health === 0){
    return true
  } return false

};


function gameOver(){
  gameMain.textContent = "";
  let gameOverDiv = document.createElement("div");
  gameOverDiv.classList.add("gameOverDiv");
  let gameOverText = document.createElement("h2");
  gameOverText.classList.add("gameOverText");
  gameOverText.textContent = "You ran out of lives!"
  let playAgain = document.createElement("button");
  playAgain.textContent = "Play again?"
  playAgain.classList.add("playAgain")
  let highScore = document.createElement("span");
  highScore.textContent = ("Highscore: " + score)
  let bestStreakText = document.createElement("span");
  bestStreakText.textContent = `Best streak: ${bestStreak}`;
  let nHighScore = newHighScore(score, highScores);
  setHighScore("highScores", nHighScore)
  let nHighStreak = newHighScore(bestStreak, highStreaks);
  setHighScore("highStreaks", nHighStreak)
  gameOverDiv.appendChild(gameOverText);
  gameOverDiv.appendChild(highScore);
  gameOverDiv.appendChild(bestStreakText);
  gameOverDiv.appendChild(playAgain);
  gameMain.appendChild(gameOverDiv);
}

function setHighScore(list, score){
  console.log("list to add: " + list + "score to add: " + score)
  console.log(typeof(score))
 if (list === "highScores"){
   localStorage["highScores"] = JSON.stringify(score);
   return
 } else {
   localStorage["highStreaks"] = JSON.stringify(score);
   return;
 }

};



function trimScoreBoard(listToSort){
  console.log(listToSort)
  console.log(typeof(listToSort))
  let newScoreBoard = sortList(listToSort)
  if(newScoreBoard.length >= 5){
    newScoreBoard.length = 5
    return newScoreBoard
  } else if (newScoreBoard.length < 5){
    return newScoreBoard
  }
};

function sortList(listToSort){
  listToSort.sort((a, b) => b - a);
  return listToSort
}

function checkArrayLength(arr){
  if(arr.length === 0){
    return true
  } return false
};

function newHighScore(score, arr){
  // arrayToCheck = JSON.parse.getItem((localStorage[arr]));
  if (checkArrayLength(arr) === true){
    arr.push(score);
    return arr
  } else {
    for (let i = 0; i < arr.length; i++){
      if (score > arr[i]){
        arr.push(score)
        console.log(arr + " new highscore board")
        return arr
      } else if ( score < arr[i]){
          console.log(typeof(arr))
        console.log(" no new score")
        return arr
      }

    }
  }

}

function showScore(){
  let scoreDiv = document.createElement("div");
  let scoreText = document.createElement("span");
  scoreDiv.classList.add("scoreDiv")
  scoreText.textContent= ("Score: " + score);

  scoreDiv.appendChild(scoreText);
  gameMain.appendChild(scoreDiv);
}

function showStreak(){
  let streakDiv = document.createElement("div");
  let streakText = document.createElement("span");
  streakDiv.classList.add("streakDiv");
  streakText.textContent= ("Streak: " + streak);

  streakDiv.appendChild(streakText);
  gameMain.appendChild(streakDiv);
}

function saveStreak(streak){
  if (streak > bestStreak){
    bestStreak = streak
    return;
  } return;

};

function openLeaderboard(streaks, hScores){
  gameMain.textContent = ""
  let leaderBoardDiv = document.createElement("div");
  leaderBoardDiv.classList.add("leaderBoardDiv");
  leaderTable = document.createElement("div");
  leaderTable.classList.add("leaderTable")
  sortedHighScores = trimScoreBoard(hScores);
  sortedHighStreaks = trimScoreBoard(streaks);
  createList(leaderTable, "Highscores", sortedHighScores)
  createList(leaderTable, "Best Streak", sortedHighStreaks)
}


function createList(div, scoreHeader, scoreType){
  ul = document.createElement("ul");
  ul.classList.add("leaderBoardScores")
  scoreType.forEach(function(score){
    let li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML += score
  })
  header = document.createElement("h3")
  scoreList = document.createElement("div")
  scoreList.classList.add("scoreList")
  header.textContent = scoreHeader
  div.appendChild(header)
  scoreList.appendChild(ul)
  div.appendChild(scoreList)
  gameMain.appendChild(div);

}

function openSettings(){
  gameMain.textContent= ""
  let settingsDiv = document.createElement("div");
  settingsDiv.classList.add("settingsDiv");
  let settingsTitle = document.createElement("span");
  settingsTitle.textContent = "Settings:";
  let formDiv = document.createElement("form");
  formDiv.classList.add("formDiv");
  let highestNumber = document.createElement("input");
  highestNumber.setAttribute("type", "number");
  highestNumber.classList.add("highestNumber");
  let highestLabel = document.createElement("Label");
  highestLabel.textContent = "Set largest number";
  let answerLabel = document.createElement("label");
  answerLabel.textContent = "Set Answer Time"
  answerLabel.classList.add("answerLabel")
  let answerTime = document.createElement("input");
  answerTime.setAttribute("type", "number");
  answerTime.classList.add("answerTime");
  let settingsButton = document.createElement("button")
  settingsButton.textContent= "Submit"
  settingsButton.classList.add("settingsButton");
  formDiv.appendChild(highestLabel);
  formDiv.appendChild(highestNumber);
  formDiv.appendChild(answerLabel);
  formDiv.appendChild(answerTime);
  formDiv.appendChild(settingsButton);
  settingsDiv.appendChild(settingsTitle);
  settingsDiv.appendChild(formDiv);
  gameMain.appendChild(settingsDiv);

}
