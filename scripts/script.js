const categoriesEl = document.getElementById("categories");
const form = document.getElementsByClassName("form");
const questionsEl = document.getElementsByClassName("game");
const resultsEl = document.getElementsByClassName("results");
const gameEl = document.getElementsByClassName("game");
const resetEl = document.getElementById("game-reset");
const messageEl = document.getElementById("message");

let correct = 0;
let incorrect = 0;
let questionCounter = 0;
let questionAmount;
let questionIndex = 0;

const getCategories = () => {
  axios
    .get("https://opentdb.com/api_category.php")
    .then((res) => res.data.trivia_categories)
    .then((categories) =>
      categories.map((category, value) => {
        value += 9;
        const optionEl = document.createElement("option");
        optionEl.value = value;
        optionEl.innerText = category.name;
        categoriesEl.appendChild(optionEl);
      })
    );
};

form[0].addEventListener("submit", (event) => {
  event.preventDefault();

  questionsEl[0].innerHTML = "";
  resultsEl[0].innerHTML = "";
  correct = 0;
  incorrect = 0;
  questionCounter = 0;
  questionIndex = 0;

  const amount = event.target.questions_num.value;
  questionAmount = parseInt(amount);
  const category = event.target.categories.value;
  const difficulty = event.target.difficulty.value;
  const type = event.target.question_type.value;

  axios
    .get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    )
    .then((res) => {
      form[0].classList.add("form--hidden");
      gameEl[0].classList.remove("game--hidden");
      gameEl[0].classList.add("game--format");
      resetEl.classList.remove("game__reset--hidden");
      messageEl.classList.add("message--hidden");
      return res.data.results;
    })
    .then((results) => {
      results.forEach((obj, i) => {
        i += 1;
        const answers = [];
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("game__questions");
        if (i !== 1) {
          questionDiv.classList.add("game__questions--hidden");
        }
        const questionTitle = document.createElement("h2");
        questionTitle.classList.add("game__title");
        questionTitle.innerText = `Question ${i}`;
        const questionEl = document.createElement("p");
        questionEl.classList.add("game__question");
        const parsedQ = htmlEntities(obj.question);
        questionEl.innerText = parsedQ;

        obj.incorrect_answers.forEach((ans) => {
          const ansEl = document.createElement("input");
          ansEl.type = "button";
          ansEl.classList.add("game__answer");
          const parsed = htmlEntities(ans);
          ansEl.name = false;
          ansEl.value = parsed;
          ansEl.innerText = parsed;
          ansEl.addEventListener("click", checkAnswer);
          answers.push(ansEl);
        });

        const ansEl = document.createElement("input");
        ansEl.type = "button";
        ansEl.classList.add("game__answer");
        const parsedA = htmlEntities(obj.correct_answer);
        ansEl.name = true;
        ansEl.value = parsedA;
        ansEl.addEventListener("click", checkAnswer);
        answers.push(ansEl);

        const shuffledAnswers = shuffleArray(answers);
        questionDiv.appendChild(questionTitle);
        questionDiv.appendChild(questionEl);
        shuffledAnswers.forEach((ans) => questionDiv.appendChild(ans));

        const buttonsDiv = document.createElement("div");
        const buttonDiv = document.createElement("div");
        const buttonDivTwo = document.createElement("div");

        buttonsDiv.classList.add("game__navigate-container");

        if (i !== 1) {
          const prevButton = document.createElement("input");
          prevButton.classList.add("game__navigate");
          prevButton.classList.add("game__navigate--prev");
          prevButton.type = "button";
          prevButton.value = "prev";
          prevButton.addEventListener("click", prevQuestion);
          buttonDiv.appendChild(prevButton);
        }

        if (i !== questionAmount) {
          const nextButton = document.createElement("input");
          nextButton.classList.add("game__navigate");
          nextButton.classList.add("game__navigate--next");
          nextButton.type = "button";
          nextButton.value = "next";
          nextButton.addEventListener("click", nextQuestion);
          buttonDiv.appendChild(nextButton);
        }

        const viewResults = document.createElement("input");
        viewResults.classList.add("game__navigate");
        viewResults.classList.add("game__navigate--results");
        viewResults.type = "button";
        viewResults.value = "view results";
        viewResults.addEventListener("click", showResults);
        buttonDivTwo.appendChild(viewResults);

        buttonsDiv.appendChild(buttonDiv);
        buttonsDiv.appendChild(buttonDivTwo);

        questionDiv.appendChild(buttonsDiv);
        questionsEl[0].appendChild(questionDiv);
      });
    });
});

const htmlEntities = (str) => {
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
    .replace(/&rdquo;/g, "”");
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const checkAnswer = (event) => {
  questionCounter += 1;
  if (event.target.name === "true") {
    event.target.classList.add("game__answer--correct");
    correct += 1;
  } else {
    event.target.classList.add("game__answer--incorrect");
    incorrect += 1;
    for (let element of event.target.parentNode.children) {
      if (element.name === "true") {
        element.classList.add("game__answer--correct");
      }
    }
  }

  event.target.parentElement.classList.add("game__questions--unclickable");

  if (questionCounter === questionAmount) {
    const resultsButton = document.getElementsByClassName(
      "game__navigate--results"
    );

    for (button of resultsButton) {
      button.classList.add("game__navigate--results--show");
    }

    endGame();
  }
};

const nextQuestion = () => {
  const gameEl = document.getElementsByClassName("game");
  gameEl[0].children[questionIndex].classList.add("game__questions--hidden");
  gameEl[0].children[questionIndex + 1].classList.remove(
    "game__questions--hidden"
  );
  questionIndex += 1;
};

const prevQuestion = () => {
  const gameEl = document.getElementsByClassName("game");
  gameEl[0].children[questionIndex].classList.add("game__questions--hidden");
  gameEl[0].children[questionIndex - 1].classList.remove(
    "game__questions--hidden"
  );
  questionIndex -= 1;
};

const showResults = () => {
  gameEl[0].classList.add("game--hidden");
  resultsEl[0].classList.remove("results--hidden");
};

const endGame = () => {
  resultsEl[0].classList.add("results--format");
  resetEl.classList.add("game__reset--hidden");

  const message = feedback();
  const resultStatement = document.createElement("p");
  resultStatement.classList.add("results__statement");
  resultStatement.innerText = `You got ${correct} out of ${questionAmount} questions right.`;
  resultStatement.classList.add("results__statement--format");

  const resultsFeedback = document.createElement("p");
  resultsFeedback.classList.add("results__feedback");
  resultsFeedback.innerText = message;

  const resultsButton = document.createElement("input");
  resultsButton.classList.add("results__button");
  resultsButton.classList.add("game__navigate");
  resultsButton.type = "button";
  resultsButton.value = "play again";
  resultsButton.addEventListener("click", restart);

  const reviewButton = document.createElement("input");
  reviewButton.classList.add("results__button");
  reviewButton.classList.add("game__navigate");
  reviewButton.type = "button";
  reviewButton.value = "review";
  reviewButton.addEventListener("click", reviewQuestions);

  resultsEl[0].appendChild(resultStatement);
  resultsEl[0].appendChild(resultsFeedback);
  resultsEl[0].appendChild(reviewButton);
  resultsEl[0].appendChild(resultsButton);
};

const feedback = () => {
  const performance = correct / questionAmount;
  let message;

  switch (true) {
    case performance >= 0.9:
      message = "Exceptional!";
      console.log("test");
      break;
    case performance >= 0.7:
      message = "Very good! Well done.";
      break;
    case performance >= 0.5:
      message = "Not bad! See if you could do better.";
      break;
    case performance >= 0.2:
      message = "hmmm, a bit more studying wouldn't hurt.";
      break;
    default:
      message = "Don't bother playing again!";
  }
  return message;
};

const restart = () => {
  resultsEl[0].innerHTML = "";
  gameEl[0].innerHTML = "";
  gameEl[0].classList.remove("game--format");
  form[0].classList.remove("form--hidden");
  resultsEl[0].classList.remove("results--format");
};

const newQuiz = () => {
  gameEl[0].classList.add("game--hidden");
  form[0].classList.remove("form--hidden");
  resetEl.classList.add("game__reset--hidden");
};

resetEl.addEventListener("click", newQuiz);

const reviewQuestions = () => {
  resultsEl[0].classList.add("results--hidden");
  gameEl[0].classList.remove("game--hidden");
};

getCategories();
