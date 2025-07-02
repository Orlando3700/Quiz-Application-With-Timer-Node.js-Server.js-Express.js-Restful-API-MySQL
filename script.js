// Makes an HTTP GET request to your Node.js server at /quiz to retrieve quiz questions.
// Returns a JavaScript array of quiz question objects.
// It's async, so you can await the result before using the data.
async function fetchQuizData() {
  const res = await fetch('http://localhost:3000/quiz');
  const data = await res.json();
  return data;
}

// Ensures your JavaScript runs only after the HTML has fully loaded.
// The async keyword allows the use of await fetchQuizData() inside.
document.addEventListener('DOMContentLoaded', async () => {
	
  // quizData: Holds the array of quiz questions fetched from your backend.
  // currentQuestion: Index of the current question being shown.
  // score: Tracks how many answers the user got right.
  // timeLeft: The countdown timer value (in seconds).
  // timerInterval: Used to store the interval ID so you can clear it later.
  const quizData = await fetchQuizData();
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 30;
  let timerInterval;

  const timerElement = document.getElementById('time');
  const questionElement = document.querySelector('.question');
  const optionsElement = document.querySelector('.options');
  const resultElement = document.querySelector('.result');
  const scoreElement = document.getElementById('score');
  const restartBtn = document.querySelector('.restart-btn');

  // Shows the current question and its answer options.
  // If you've reached the last question, call endQuiz().
  // Otherwise, display the current question and dynamically create option buttons.
  // Clicking a button triggers checkAnswer().
  
  function loadQuestion() {
    if (currentQuestion >= quizData.length) {
      endQuiz();
      return;
    }
	
    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = currentQuiz.question;
    optionsElement.innerHTML = '';
    currentQuiz.options.forEach(option => {
      const button = document.createElement('button');
      button.classList.add('option');
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      optionsElement.appendChild(button);
    });
  }

  // Compares the selected answer with the correct answer.
  // Increments the score if correct.
  // Moves to the next question.
  function checkAnswer(selectedOption) {
    if (selectedOption === quizData[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;
    loadQuestion();
  }

  // Starts a timer that counts down every second.
  // When it hits zero, ends the quiz.
  // Timer runs once for the whole quiz.
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }
  
  startTimer();
  loadQuestion();
  
  // Stops the timer.
  // Hides the question and options.
  // Displays the final score and shows the restart button.
  function endQuiz() {
    clearInterval(timerInterval);
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
    resultElement.style.display = 'block';
    scoreElement.textContent = score;
    restartBtn.style.display = 'block';

	// Retrieves the player's name from local storage.
	// Creates a payload object to send to the backend.
	const playerName = localStorage.getItem('quizPlayerName') || "Anonymous";

	const payload = {
	  name: playerName,
	  score: score
	};

	// Sends the score and player name to your backend using a POST request to /result.
    fetch('http://localhost:3000/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Result saved:', data);
    })
    .catch(err => {
      console.error('Error saving result:', err);
    });
  }

  // Resets all quiz values.
  // Shows the question/answers again.
  // Hides the result section.
  restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    timerElement.textContent = timeLeft;

    questionElement.style.display = 'block';
    optionsElement.style.display = 'flex';
    resultElement.style.display = 'none';
    restartBtn.style.display = 'none';

	// Restart timer again
	startTimer();
    loadQuestion();
  });

  // This ensures the first question is shown right when the page loads.
  loadQuestion();
});


