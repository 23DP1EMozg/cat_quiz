//https://catfact.ninja/fact





  
const quiz = [
    {
      question: "What is the scientific name for the domestic cat?",
      answers: ["Felis canis", "Felis catus", "Canis lupus"],
      answer: 1
    },
    {
      question: "How many toes does a cat typically have on its front paws?",
      answers: ["4", "5", "6"],
      answer: 1
    },
    {
      question: "What part of a cat's body is as unique as a human fingerprint?",
      answers: ["Tail", "Nose", "Whiskers"],
      answer: 1
    },
    {
      question: "How many whiskers does a cat usually have in total?",
      answers: ["24", "10", "40"],
      answer: 0
    },
    {
      question: "Why do cats purr?",
      answers: ["Only when they are happy", "To communicate and even heal themselves", "To scare away predators"],
      answer: 1
    },
    {
      question: "What is the term for a group of cats?",
      answers: ["Pack", "Clowder", "Flock"],
      answer: 1
    },
    {
      question: "How high can a cat jump compared to its own height?",
      answers: ["About 1.5 times its height", "About 3 times its height", "About 5-6 times its height"],
      answer: 2
    },
    {
      question: "What is the world's largest breed of domestic cat?",
      answers: ["Siamese", "Maine Coon", "Bengal"],
      answer: 1
    },
    {
      question: "How do cats primarily communicate with humans?",
      answers: ["By barking", "By meowing", "By wagging their tails"],
      answer: 1
    },
    {
      question: "What does it mean when a cat’s tail is puffed up?",
      answers: ["It is feeling scared or threatened", "It is excited to see you", "It is relaxed and sleepy"],
      answer: 0
    },
    {
      question: "What is the name of the lucky cat figurine in Japanese culture?",
      answers: ["Maneki-neko", "Totoro", "Koi-koi"],
      answer: 0
    },
    {
      question: "What do cats use their whiskers for?",
      answers: ["To smell food", "To help with balance and navigation", "To scratch themselves"],
      answer: 1
    },
    {
      question: "How do cats mark their territory?",
      answers: ["By scratching surfaces", "By rubbing their scent glands on objects", "Both A and B"],
      answer: 2
    },
    {
      question: "Which famous Egyptian goddess was often depicted as a cat?",
      answers: ["Bastet", "Isis", "Anubis"],
      answer: 0
    },
    {
      question: "Which of these foods is toxic to cats?",
      answers: ["Chicken", "Chocolate", "Carrots"],
      answer: 1
    },
    {
      question: "What does it mean if a cat is kneading with its paws?",
      answers: ["It is sharpening its claws", "It is showing contentment and comfort", "It is trying to attack"],
      answer: 1
    },
    {
      question: "What is the average number of hours a cat sleeps per day?",
      answers: ["8 hours", "12-16 hours", "3-5 hours"],
      answer: 1
    },
    {
      question: "What famous internet cat was known for its permanent frown?",
      answers: ["Lil Bub", "Grumpy Cat", "Nyan Cat"],
      answer: 1
    },
    {
      question: "What is a common reason why cats bring their owners dead prey?",
      answers: ["They are angry at their owners", "They see their owner as part of their family and are 'teaching' them how to hunt", "They are trying to hide their food"],
      answer: 1
    },
    {
      question: "Why do cats have rough tongues?",
      answers: ["To help them taste food better", "To groom themselves and strip meat from bones", "To make purring louder"],
      answer: 1
    }
  ];
  
  
  
const fact = document.getElementById('fact')
const radioButtons = document.querySelectorAll('.radio')
const leaderboardScores = JSON.parse(localStorage.getItem('leaderboard')) || []
fetch('https://catfact.ninja/fact')
.then(req => req.json())
.then(res => {
    fact.textContent = res.fact
})

function getRandomQuestions(n){
  const history = new Set(); // Use a Set for faster lookups
  const newList = [];

  while (newList.length < n && history.size < quiz.length) {
    let q = quiz[Math.floor(Math.random() * quiz.length)];

    if (!history.has(q)) {
      history.add(q);
      newList.push(q);
    }
  }

  console.log(newList);
  return newList;
}

let randomQuestions = getRandomQuestions(10)

let currentQuestion = 0
let answers = Array(randomQuestions.length).fill(null)


let submitButton = document.getElementById('submit-btn')
let questionSpan = document.getElementById('question')
let questions = document.querySelector('.answers-container').querySelectorAll('button')
let forwardButton = document.getElementById('forward')
let backButton = document.getElementById('back')
let questionCounter = document.getElementById('current-question')
let selectedAnswer = null

function resetAnswerButtonColors(){
  questions.forEach(btn => {
    btn.style.background = '#9F5255'
  })
}

questions.forEach(btn => {
  btn.addEventListener('click', (e) => {
    selectedAnswer = parseInt(e.target.value)
    resetAnswerButtonColors()
    btn.style.background = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'
  })
})


function goBack(){
  if(answers[currentQuestion - 1] != null){
    currentQuestion--
    renderQuestion()
  }
}

function goForward(){
  if(answers[currentQuestion] != null){
    currentQuestion++
    renderQuestion()
  }
}

forwardButton.addEventListener('click', goForward)

backButton.addEventListener('click', goBack)




function getFormatedTime(s){
  let counter = 0
  let mins = 0
  for(let i = 1; i<=s; i++){
    counter++
    if(counter === 60){
      mins++
      counter = 0
    }
  }

  return {
    minutes: mins,
    seconds: counter < 10 ? '0' + counter : counter
  }

}

let timer;
let seconds = 0
function startTimer(){
    timer = setInterval(() => {
    
    seconds++
    const time = getFormatedTime(seconds)
    document.getElementById('timer').textContent = `time: ${time.minutes}:${time.seconds}`
  }, 1000)
  
}

function renderQuestionHTML(){
  document.querySelector('.quiz-content').innerHTML = `
                  <div>
                    <div class="question-container">
                    <span id="question">loading...</span>
                    </div>
                    <div class="answers-container">
                    <button value="0">loading...</button>
                    <button value="1">loading...</button>
                    <button value="2">loading...</button>
                    </div>
                    <div class="submit-container">
                    <button id="submit-btn">Submit</button>
                    </div>
                    <div class="nav-buttons">
                        <div class="nav-button" id="back"></div>
                        <div class="nav-button" id="forward"></div>
                    </div>
                </div>
  `
}

function renderQuestion(){
  const submitButton = document.getElementById('submit-btn')
  const questionSpan = document.getElementById('question')
  const questions = document.querySelector('.answers-container').querySelectorAll('button')
  const forwardButton = document.getElementById('forward')
  const backButton = document.getElementById('back')
  const questionCounter = document.getElementById('current-question')

  if(currentQuestion - 1 === randomQuestions.length - 2){
    submitButton.textContent = "Finish"
  }else{
    submitButton.textContent = "Submit"
  }

  submitButton.addEventListener('click', submitAnswer)

  forwardButton.addEventListener('click', goForward)

  backButton.addEventListener('click', goBack)

  if(answers[currentQuestion] == null){
    forwardButton.style.opacity = '0.5'
  }else{
    forwardButton.style.opacity = '1'
  }

  if(answers[currentQuestion  - 1] == null){
    backButton.style.opacity = '0.5'
  }else{
    backButton.style.opacity = '1'
  }

  questions.forEach(btn => {
    btn.addEventListener('click', (e) => {
      selectedAnswer = parseInt(e.target.value)
      questions.forEach(btn => {
        btn.style.background = '#9F5255'
      })
      btn.style.background = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'
    })
  })

  questionSpan.textContent = randomQuestions[currentQuestion].question
  questionCounter.textContent = `${currentQuestion + 1}/${randomQuestions.length}`
  for(let i = 0; i< randomQuestions[currentQuestion].answers.length; i++){
    questions[i].textContent = randomQuestions[currentQuestion].answers[i]
  }

}


renderQuestion()

function submitAnswer(){

  if(currentQuestion === 0){
    startTimer()
  }

  if(selectedAnswer === null){
    alert('select an answer')
    return
  }

  answers[currentQuestion] = {
    answer: selectedAnswer,
    questionId: currentQuestion
  }

  if(currentQuestion + 1 === randomQuestions.length){
    submitQuiz()
    clearInterval(timer)
    return
  }


  currentQuestion++
  selectedAnswer = null
  console.log(answers)
  document.querySelector('.answers-container').querySelectorAll('button').forEach(btn => {
    btn.style.background = '#9F5255'
  })

  renderQuestion()
}


function renderCompleteScreen(){
  const score = getScore()

  document.querySelector('.quiz-content').innerHTML = `
    <div class="result-container">
      <span id="span1">You scored:</span>
      <span id="score" style="color: ${score <= 5 ? 'red' : 'green'};">${score} / ${randomQuestions.length}</span>
      <button id='restart'>Take test again</button>
    </div>
  `

  document.getElementById('restart').addEventListener('click', () => {
    restartTest()
  })
}


function getScore(){
  let score = 0
    for(let i = 0; i<randomQuestions.length; i++){
      if(randomQuestions[i].answer === answers[i].answer){
        score++
      }
    }
  
    return score
}

function restartTest(){
  randomQuestions = getRandomQuestions(10)
  answers = Array(randomQuestions.length).fill(null)
  currentQuestion = 0
  seconds = 0
  renderQuestionHTML()
  renderQuestion()
  document.getElementById('timer').textContent = `time: 0:00`
}

function renderLeaderboard(){
  const container = document.getElementById('leaderboard-content')
  container.innerHTML = ''

  leaderboardScores.forEach((item, i) => {
    container.innerHTML += `
      <div class="card">
          <div class="card-left">
              ${i + 1}.
          </div>
          <div class="card-right">
              <span>score: ${item.score} / ${randomQuestions.length}</span>
              <span>time: ${item.time.minutes}:${item.time.seconds}</span>
          </div>
      </div>
    `
  })
}

if(leaderboardScores.length > 0){
  renderLeaderboard()
}

function getTotalScore() {
  const S_user = getScore();
  const T_user = seconds;

  if (leaderboardScores.length === 0) {
    return S_user;
  }

  let sum = 0;
  for (let i = 0; i < leaderboardScores.length; i++) {
    sum += leaderboardScores[i].timeInSeconds;
  }

  const T_avg = sum / leaderboardScores.length;
  let T_score = 1 - (T_user / T_avg);

  T_score = Math.max(0, Math.min(T_score, 1));

  const W_score = 0.85;
  const W_time = 0.15;

  const totalScore = (S_user * W_score) + (T_score * 100 * W_time);
  return totalScore;
}


//localStorage.setItem('leaderboard', null)

function submitQuiz(){
  clearInterval(timer)
  renderCompleteScreen()

  leaderboardScores.push({
    score: getScore(),
    time: getFormatedTime(seconds),
    timeInSeconds: seconds,
    totalScore: getTotalScore()
  })

  leaderboardScores.sort((a,b) => b.totalScore - a.totalScore)
  localStorage.setItem('leaderboard', JSON.stringify(leaderboardScores))
  renderLeaderboard()
  console.log(leaderboardScores)
}





submitButton.addEventListener('click', submitAnswer)





