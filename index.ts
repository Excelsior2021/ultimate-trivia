import "./styles.scss"

const categoriesEl = document.getElementById("categories")!
const form = document.getElementById("form") as HTMLFormElement
const startButton = document.getElementById("start-button") as HTMLButtonElement
const resultsEl = document.getElementById("results")!
const gameEl = document.getElementById("game")!
const resetEl = document.getElementById("game-reset")!
const messageEl = document.getElementById("message")!
const serverErrorMessage = "There was a server error, please try again later."

let correct = 0
let incorrect = 0
let questionCounter = 0
let questionAmount: number
let questionIndex = 0

type categoryObj = {
  id: number
  name: string
}

type resultsObj = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

const getCategories = async () => {
  try {
    const res = await fetch("https://opentdb.com/api_category.php")
    if (res.status === 200) {
      const { trivia_categories } = await res.json()

      const categories: categoryObj[] = trivia_categories

      categories.map((category, value) => {
        value += 9
        const optionEl = document.createElement("option")
        optionEl.value = value.toString()
        optionEl.innerText = category.name
        categoriesEl.appendChild(optionEl)
      })
    } else throw new Error()
  } catch (error) {
    clearGameScreen()
    noData(serverErrorMessage)
    console.log(error)
  }
}

form.addEventListener("submit", event => {
  event.preventDefault()

  gameEl.innerHTML = ""
  resultsEl.innerHTML = ""
  correct = 0
  incorrect = 0
  questionCounter = 0
  questionIndex = 0

  startButton.disabled = true
  getQuestions()
})

const clearGameScreen = () => {
  form.classList.add("form--hidden")
  gameEl.classList.remove("game--hidden")
  gameEl.classList.add("game--format")
  resultsEl.classList.add("results--hidden")
  resetEl.classList.remove("game__reset--hidden")
  messageEl.classList.add("message--hidden")
}

const getQuestions = async () => {
  const amount = form.questions_num.value
  questionAmount = parseInt(amount)
  const category = form.categories.value
  const difficulty = form.difficulty.value
  const type = form.question_type.value

  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    )

    if (res.status === 200) {
      const { results, response_code } = await res.json()
      const noDataMessage =
        "The amount of questions you have chosen may be to high or there are no questions for your chosen settings. Try reducing the number of questions in the settings or different options."
      clearGameScreen()
      if (response_code === 1) noData(noDataMessage)
      createQuestions(results)
    } else throw new Error()
  } catch (error) {
    clearGameScreen()
    noData(serverErrorMessage)
    console.log(error)
  }
}

const noData = (message: string) => {
  const messageEl = document.createElement("p")
  messageEl.classList.add("no-data__message")
  messageEl.innerText = message

  const button = document.createElement("button")
  button.innerText = "go back"
  button.classList.add("no-data__button")
  button.classList.add("game__navigate")
  button.addEventListener("click", restart)

  gameEl.appendChild(messageEl)
  gameEl.appendChild(button)
}

const createQuestions = (results: resultsObj[]) => {
  results.forEach((obj, i) => {
    i += 1
    const answers: HTMLInputElement[] = []
    const questionDiv = document.createElement("div")
    questionDiv.classList.add("game__questions")
    if (i !== 1) {
      questionDiv.classList.add("game__questions--hidden")
    }
    const questionTitle = document.createElement("h2")
    questionTitle.classList.add("game__title")
    questionTitle.innerText = `Question ${i}`
    const questionEl = document.createElement("p")
    questionEl.classList.add("game__question")
    const parsedQ = htmlEntities(obj.question)
    questionEl.innerText = parsedQ

    obj.incorrect_answers.forEach(ans => {
      const ansEl = document.createElement("input")
      ansEl.type = "button"
      ansEl.classList.add("game__answer")
      const parsed = htmlEntities(ans)
      ansEl.name = "false"
      ansEl.value = parsed
      ansEl.innerText = parsed
      ansEl.addEventListener("click", event => checkAnswer(event, answers))
      answers.push(ansEl)
    })

    const ansEl = document.createElement("input")
    ansEl.type = "button"
    ansEl.classList.add("game__answer")
    const parsedA = htmlEntities(obj.correct_answer)
    ansEl.name = "true"
    ansEl.value = parsedA
    ansEl.addEventListener("click", event => checkAnswer(event, answers))
    answers.push(ansEl)

    const shuffledAnswers = shuffleArray(answers)
    questionDiv.appendChild(questionTitle)
    questionDiv.appendChild(questionEl)
    shuffledAnswers.forEach(ans => questionDiv.appendChild(ans))

    const buttonsDiv = document.createElement("div")
    const buttonDiv = document.createElement("div")
    const buttonDivTwo = document.createElement("div")

    buttonsDiv.classList.add("game__navigate-container")

    if (i !== 1) {
      const prevButton = document.createElement("input")
      prevButton.classList.add("game__navigate")
      prevButton.classList.add("game__navigate--prev")
      prevButton.type = "button"
      prevButton.value = "prev"
      prevButton.addEventListener("click", prevQuestion)
      buttonDiv.appendChild(prevButton)

      i === questionAmount
        ? prevButton.classList.add("game__navigate--prev--format")
        : null
    }

    if (i !== questionAmount) {
      const nextButton = document.createElement("input")
      nextButton.classList.add("game__navigate")
      nextButton.classList.add("game__navigate--next")
      nextButton.type = "button"
      nextButton.value = "next"
      nextButton.addEventListener("click", nextQuestion)
      buttonDiv.appendChild(nextButton)
    }

    const viewResults = document.createElement("input")
    viewResults.classList.add("game__navigate")
    viewResults.classList.add("game__navigate--results")
    viewResults.type = "button"
    viewResults.value = "view results"
    viewResults.addEventListener("click", showResults)
    buttonDivTwo.appendChild(viewResults)

    buttonsDiv.appendChild(buttonDiv)
    buttonsDiv.appendChild(buttonDivTwo)

    questionDiv.appendChild(buttonsDiv)
    gameEl.appendChild(questionDiv)
  })
}

const htmlEntities = (str: string) => {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&pi;/g, "π")
    .replace(/&Delta;/g, "Δ")
    .replace(/&Deg;/g, "°")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&shy;/g, "-")
    .replace(/&eacute;/g, "é")
}

const shuffleArray = (array: HTMLInputElement[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const checkAnswer = (event: MouseEvent, answers: HTMLInputElement[]) => {
  questionCounter += 1

  const answer = event.target as HTMLInputElement

  if (answer.name === "true") {
    answer.classList.add("game__answer--correct")
    correct += 1
  } else {
    answer.classList.add("game__answer--incorrect")
    incorrect += 1
    for (const element of answers) {
      if (element.name === "true") {
        element.classList.add("game__answer--correct")
        break
      }
    }
  }
  answer.parentElement!.classList.add("game__questions--unclickable")

  if (questionCounter === questionAmount) {
    const resultsButton = document.getElementsByClassName(
      "game__navigate--results"
    )

    for (const button of resultsButton) {
      button.classList.add("game__navigate--results--show")
    }

    endGame()
  }
}

const nextQuestion = () => {
  const gameEl = document.getElementById("game")!
  gameEl.children[questionIndex].classList.add("game__questions--hidden")
  gameEl.children[questionIndex + 1].classList.remove("game__questions--hidden")
  questionIndex += 1
}

const prevQuestion = () => {
  const gameEl = document.getElementById("game")!
  gameEl.children[questionIndex].classList.add("game__questions--hidden")
  gameEl.children[questionIndex - 1].classList.remove("game__questions--hidden")
  questionIndex -= 1
}

const showResults = () => {
  gameEl.classList.add("game--hidden")
  resultsEl.classList.remove("results--hidden")
}

const endGame = () => {
  resetEl.classList.add("game__reset--hidden")

  const message = feedback()
  const resultStatement = document.createElement("p")
  resultStatement.classList.add("results__statement")
  resultStatement.innerText = `You got ${correct} out of ${questionAmount} questions right.`
  resultStatement.classList.add("results__statement--format")

  const resultsFeedback = document.createElement("p")
  resultsFeedback.classList.add("results__feedback")
  resultsFeedback.innerText = message

  const resultsButton = document.createElement("input")
  resultsButton.classList.add("results__button")
  resultsButton.classList.add("game__navigate")
  resultsButton.type = "button"
  resultsButton.value = "play again"
  resultsButton.addEventListener("click", restart)

  const reviewButton = document.createElement("input")
  reviewButton.classList.add("results__button")
  reviewButton.classList.add("game__navigate")
  reviewButton.type = "button"
  reviewButton.value = "review"
  reviewButton.addEventListener("click", reviewQuestions)

  resultsEl.appendChild(resultStatement)
  resultsEl.appendChild(resultsFeedback)
  resultsEl.appendChild(reviewButton)
  resultsEl.appendChild(resultsButton)
}

const feedback = () => {
  const performance = correct / questionAmount
  let message

  switch (true) {
    case performance >= 0.9:
      message = "Exceptional!"
      break
    case performance >= 0.7:
      message = "Very good! Well done."
      break
    case performance >= 0.5:
      message = "Not bad! See if you could do better."
      break
    case performance >= 0.2:
      message = "hmmm, a bit more studying wouldn't hurt."
      break
    default:
      message = "Don't bother playing again!"
  }
  return message
}

const restart = () => {
  resultsEl.innerHTML = ""
  gameEl.innerHTML = ""
  gameEl.classList.remove("game--format")
  form.classList.remove("form--hidden")
  messageEl.classList.remove("message--hidden")
  resetEl.classList.add("game__reset--hidden")
  startButton.disabled = false
}

resetEl.addEventListener("click", restart)

const reviewQuestions = () => {
  resultsEl.classList.add("results--hidden")
  gameEl.classList.remove("game--hidden")
}

getCategories()
