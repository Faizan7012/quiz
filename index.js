const questions = [
    {
      question: "What is the capital of Italy?",
      options: ["Madrid", "London", "Rome", "Berlin"],
      correctAnswer: "Rome",
    },
    {
      question: "How many days are there in a year?",
      options: ["365", "366", "364", "360"],
      correctAnswer: "365",
    },
    {
      question: "What color is a ripe banana?",
      options: ["Green", "Red", "Yellow", "Purple"],
      correctAnswer: "Yellow",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Jupiter",
    },
    {
      question: "What is 5 + 3?",
      options: ["4", "7", "8", "12"],
      correctAnswer: "8",
    },
  ];
    

  let timerContainer = document.getElementById("timer");
  let quizContainer = document.getElementById("quiz");
  let nextButton = document.getElementById("next");
  let progressContainer = document.getElementById("progress");
  let submitButton = document.getElementById("submit");
  let prevButton = document.getElementById("prev");
  let resultsContainer = document.getElementById("results");
  let restartButton = document.getElementById("restart");
  
  let currentQuestion = 0;
  let timeRemaining = 30;
  let score = 0;
  let timerInterval;
  
  function startTimer() {
    timerContainer.innerHTML = `
          <div class="timer-container">
              <div class="timer" id="timer-${currentQuestion}"></div>
              <div class="progress-container">
                  <div class="progress-bar" id="progress-bar-${currentQuestion}"></div>
              </div>
          </div>
      `;
  
    let timerElement = document.getElementById(`timer-${currentQuestion}`);
    let progressBarElement = document.getElementById(
      `progress-bar-${currentQuestion}`
    );
  
    timerInterval = setInterval(() => {
      timeRemaining--;
      timerElement.innerText = `${timeRemaining}s`;
      progressBarElement.style.width = `${(timeRemaining / 20) * 100}%`;
  
      if (timeRemaining === 0) {
        clearInterval(timerInterval);
        showNext();
      }
    }, 1000);
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    timeRemaining = 30;
    timerContainer.innerText = `Time remaining: ${timeRemaining} seconds`;
  }
  
  function updateProgress() {
    progressContainer.innerHTML = `            
              <div class="progressContainer">
                  <div class="progressBar" id="progress-bar-${currentQuestion}"></div>
              </div>
      `;
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressContainer.style.width = `${progress}%`;
  }
  
  function DisplayQuiz() {
    startTimer();
    updateProgress();
    const question = questions[currentQuestion];
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<h2>Q${currentQuestion + 1} : ${
      question.question
    }</h2>`;
  
    question.options.forEach((option) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="question${currentQuestion}" value="${option}"> ${option}<br>`;
      questionDiv.appendChild(label);
    });
  
    quizContainer.innerHTML = "";
    quizContainer.appendChild(questionDiv);
  
    nextButton.style.visibility = currentQuestion === questions.length - 1 ? 'hidden' : 'visible';
    prevButton.style.visibility = currentQuestion === 0 ? 'hidden' : 'visible';
  }
  
  function CalculateScore() {
    resetTimer();
    const answerContainers = quizContainer.querySelectorAll(".question");
    const selector = `input[name=question${currentQuestion}]:checked`;
    const userAnswer = (answerContainers[0].querySelector(selector) || {}).value;
  
    if (userAnswer === questions[currentQuestion].correctAnswer) {
      score++;
      displayResult();
    } else {
      displayResult();
    }
  }
  
  function displayResult() {
    quizContainer.style.display = "none";
    submitButton.style.display = "none";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    timerContainer.style.display = "none";
    resultsContainer.innerHTML = `Your score is ${score} out of ${questions.length}`;
    resultsContainer.style.display = "block";
    restartButton.style.display = "block";
  }
  
  submitButton.addEventListener("click", CalculateScore);
  nextButton.addEventListener("click", showNext);
  prevButton.addEventListener("click", showPrevious);
  restartButton.addEventListener("click", restartQuiz);
  
  function showNext() {
    resetTimer();
    const answerContainers = quizContainer.querySelectorAll(".question");
    const selector = `input[name=question${currentQuestion}]:checked`;
    const userAnswer = (answerContainers[0].querySelector(selector) || {}).value;
    if (userAnswer === questions[currentQuestion].correctAnswer) {
      score++;
    }
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      DisplayQuiz();
    } else {
      displayResult();
    }
    restartButton.style.display = "block";
  }
  
  function showPrevious() {
    resetTimer();
    if (currentQuestion > 0) {
      currentQuestion--;
      DisplayQuiz();
    }
  }
  
  function restartQuiz() {
    resetTimer();
    currentQuestion = 0;
    score = 0;
    DisplayQuiz();
    resultsContainer.style.display = "none";
    quizContainer.style.display = "block";
    submitButton.style.display = "block";
    nextButton.style.display = "block";
    prevButton.style.display = "block";
    restartButton.style.display = "none";
    timerContainer.style.display = "block";
  }
  
  DisplayQuiz();
  