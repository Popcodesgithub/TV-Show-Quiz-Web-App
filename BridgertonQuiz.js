const startButton = document.getElementById('startBtn')
const nextButton = document.getElementById('nextBtn')
const questionContainerElement = document.getElementById('questionContainer')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answerBtn')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')

    let name = prompt("Please enter your name", "John Smith");
    console.log(name)
    let alertMsg = alert("Well done! " + name);
}
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'On which book, is the first season of Bridgerton based?',
    answers: [
      { text: 'The Duke and I', correct: true },
      { text: 'The Viscount who loved me', correct: false },
      { text: 'An offer from a gentleman', correct: false },
      { text: 'Romancing Mister Bridgerton', correct: false },
    ]
  },
  {
    question: 'How many Bridgerton sibilings are there?',
    answers: [
      { text: '8', correct: true },
      { text: '6', correct: false },
      { text: '4', correct: false },
      { text: '5', correct: false }
    ]
  },
  {
    question: 'Who are the Bridgertons closest neighbours?',
    answers: [
      { text: 'The Windsors', correct: false },
      { text: 'The Featheringtons', correct: true },
      { text: 'The Cromwells', correct: false },
      { text: 'The Lancasters', correct: false }
    ]
  },
  {
    question: 'What is the name of the eldest Bridgerton sibling?',
    answers: [
        { text: 'Benedict', correct: false },
        { text: 'Daphney', correct: false },
        { text: 'Anthony', correct: true },
        { text: 'Eloise', correct: false }
    ]
  }
]