/*jshint esversion: 6 */
const STORE = {
  "currentIndex": 0,
  "correctCounter": 0,
  "incorrectCounter": 0,
  "selectedAnswer": 1,
  "currentCorrectAnswer": 0,
  "questions": [{
      "questionNumber": "1",
      "question": "What is this computer component?",
      "questionImage": "./images/image5.jpeg",
      "answers": ["1. Hydraulic Metering Device (HMD)", "2. Megabyte Conversion Module", "3. Audio Processor Fan", "4. Power Supply Unit (PSU)"],
      "correctAnswer": 4
    },
    {
      "questionNumber": "2",
      "question": "What does this computer module do?",
      "questionImage": "./images/image1.jpeg",
      "answers": ["1. Processes input data and outputs it", "2. Keeps the computer from overheating", "3. Motion detection", "4. Makes Hiesbrigg’s algorithm possible"],
      "correctAnswer": 1
    },
    {
      "questionNumber": "3",
      "question": "What type of port is this?",
      "questionImage": "./images/image4.jpeg",
      "answers": ["1. ACB", "2. VGA", "3. USB", "4. RCA"],
      "correctAnswer": 3
    },
    {
      "questionNumber": "4",
      "question": "What does USB stand for?",
      "questionImage": false,
      "answers": ["1. Unilateral System Bootable", "2. Unlocked Serial Byte", "3. Unilateral Sync Booter", "4. Universal Serial Bus"],
      "correctAnswer": 4
    },
    {
      "questionNumber": "5",
      "question": "What is in this picture?",
      "questionImage": "./images/image3.jpeg",
      "answers": ["1. Motherboard", "2. Chipsets", "3. RAM", "4. HDD"],
      "correctAnswer": 3
    },
    {
      "questionNumber": "6",
      "question": "What does RAM stand for?",
      "questionImage": false,
      "answers": ["1. Random Access Memory", "2. Reckless Abandon Movement", "3. Richard Ableton Murphy", "4. Record Analysis Meter"],
      "correctAnswer": 1
    },
    {
      "questionNumber": "7",
      "question": "What does a hard drive do?",
      "questionImage": false,
      "answers": ["1. Keeps the computer from crashing", "2. Stores data", "3. Keeps the mainframe on track", "4. Drives the logic"],
      "correctAnswer": 2
    },
    {
      "questionNumber": "8",
      "question": "What type of port is this?",
      "questionImage": "./images/image6.jpeg",
      "answers": ["1. Ethernet port", "2. Internet port", "3. Athernet port", "4. Flux Capacitor port"],
      "correctAnswer": 1
    },
    {
      "questionNumber": "9",
      "question": "What does GPU stand for?",
      "questionImage": false,
      "answers": ["1. Graphing Programmatically Udrive", "2. Graphical Point of Unity", "3. Graphics Processing Unit", "4. GRUD Program User"],
      "correctAnswer": 3
    },
    {
      "questionNumber": "10",
      "question": "What does the pictured item do?",
      "questionImage": "./images/image2.jpeg",
      "answers": ["1. It’s an internal WiFi antenna", "2. It dispels heat from the CPU", "3. It connects to the internet", "4. It stores browser cookies"],
      "correctAnswer": 2
    },
  ]
};

function initialLoad() {
  $(".app").html(`
    <header role="banner">
              <h1 class="quiz-name">Welcome to the Computer Hardware Quiz!</h1>
          </header>
          <section role="region" class="start-page">
              <h2>Lets see how much you know about computers!</h2>
        <button id="start-quiz">Start Quiz</button>
          </section>
          `);
}

function startQuiz() {
  event.preventDefault();
  STORE.correctCounter = 0;
  STORE.incorrectCounter = 0;
  STORE.currentCorrectAnswer = 0;
  STORE.currentIndex = 0;
  STORE.selectedAnswer = 1;
  loadQuestion(0);
}

function loadQuestion(index) {
  STORE.selectedAnswer = 1;
  STORE.currentCorrectAnswer = STORE.questions[index].correctAnswer;
  $(".app").html(`
          <header role="banner">
              <h1 class="quiz-name">Computer Hardware Quiz</h1>
          </header>
        <h2>Question <span class="js-question-number">${STORE.questions[index].questionNumber}</span> of 10</h2>
              <form action="none">
          <fieldset>
                  <legend class="question">${STORE.questions[index].question}</legend>
                  ${STORE.questions[index].questionImage !== false ? `<section role="presentation" class="quiz-image"><img role="presentation" alt="Image of a mysterious computer part"src="${STORE.questions[index].questionImage}" /></section>` : ``}
                  <section role="status" class="js-feedback">
                  <h3 class="hidden">placeholder</h3>
                  </section>    
                  <ul class="answers" role="radiogroup">
                          ${generateAnswers(index)}
                      </ul>
                  </fieldset>
          <section role="region" class="js-button">
                  <button id="submit" type="submit">Check Answer</button>
          </section>
              </form>
        <h2>Correct: <span class="js-questions-correct">${STORE.correctCounter}</span></h2><h2>Incorrect: <span class="js-questions-incorrect">${STORE.incorrectCounter}</span> </h2>
          `);
}

function generateAnswers(index) {
  let ansArr = STORE.questions[index].answers.map((x, i) => `<section role="region" class="single-answer"><input type="radio" role="radio" name="answers" id="ans-${i + 1}" value="${i + 1}" required ${i === 0 ? 'checked' : ''}>
                        <label id="ans-${i + 1}-label" for="ans-${i + 1}">${STORE.questions[index].answers[i]}</label></section>`);
  return ansArr.join("");
}

function checkAnswer() {
  event.preventDefault();
  if (STORE.selectedAnswer === STORE.currentCorrectAnswer) {
    correctAnswerFeedback();
  } else if (STORE.selectedAnswer !== STORE.currentCorrectAnswer) {
    incorrectAnswerFeedback();
  }
}

function correctAnswerFeedback(){
STORE.correctCounter += 1;
    $('.js-questions-correct').text(STORE.correctCounter);
    $(`.js-feedback`).html("<h3 class='bold'>Great job! You are CORRECT!</h3>");
    $(`#ans-${STORE.currentCorrectAnswer}-label`).addClass("bold");
    $(".js-button").html('<button id="next-question" type="next">Next</button>');
}
function incorrectAnswerFeedback(){
STORE.incorrectCounter += 1;
    $('.js-questions-incorrect').text(STORE.incorrectCounter);
    $(`.js-feedback`).html(`<h3 class='bold'>Sorry! The correct answer is: ${$(`#ans-${STORE.currentCorrectAnswer}-label`).html()}</h3>`);
    $(`#ans-${STORE.currentCorrectAnswer}-label`).addClass("bold");
    $(`#ans-${STORE.selectedAnswer}-label`).addClass("strikethrough");
    $(".js-button").html('<button id="next-question" type="next">Next</button>');
}

function nextQuestion() {
  event.preventDefault();
  STORE.currentIndex += 1;
  if (STORE.currentIndex > 9) {
    finalReview();
  } else {
    loadQuestion(STORE.currentIndex);
  }
}

function finalReview() {
  $(".app").html(`
    <header role="banner">
              <h1 class="quiz-name">Computer Hardware Quiz</h1>
          </header>
          <section role="region" class="final-results">
              <h2>Let's see how you did.</h2>
        <h3>You got <span class="js-correct-questions">${STORE.correctCounter}</span> out of 10 correct.</h3>
        <h3 class="js-final-statement">${STORE.correctCounter === 10 ? "Congratulations! You are a computer genius!" : STORE.correctCounter > 7 ? "Thatsa Fantastic!" : "You need work before you will be a computer genius."}</h3>
        <h3 class="question-reset">Would you  like to try the quiz again?</h3>
        <button id="reset-quiz" type="reset">Reset Quiz</button>
          </section>
          `);
}

// handle clicks
$(event => {
  initialLoad();
  $(".app").on("click", "#start-quiz", startQuiz);
  $(".app").on("click", "#submit", checkAnswer);
  $(".app").on("click", "#next-question", nextQuestion);
  $(".app").on("click", "#reset-quiz", startQuiz);
  //answer Selections
  $(".app").on("click", "#ans-1", () => {
    STORE.selectedAnswer = 1;
  });
  $(".app").on("click", "#ans-2", () => {
    STORE.selectedAnswer = 2;
  });
  $(".app").on("click", "#ans-3", () => {
    STORE.selectedAnswer = 3;
  });
  $(".app").on("click", "#ans-4", () => {
    STORE.selectedAnswer = 4;
  });
});