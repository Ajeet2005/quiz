const questions = [
    {
        question: "Which is the largest animal in the world?", 
        answers: [
            {text: "Shark", correct: false},
            {text: "Cat", correct: false},
            {text: "Elephant", correct: false},
            {text: "Blue Whale", correct: true}, // Correct syntax for the answer
        ]
    },
    {
        question: "Which is the smallest planet in our solar system?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Mars", correct: false},
            {text: "Mercury", correct: true},  // Correct answer
            {text: "Venus", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            {text: "O2", correct: false},
            {text: "CO2", correct: false},
            {text: "H2O", correct: true},  // Correct answer
            {text: "HO", correct: false},
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            {text: "Charles Dickens", correct: false},
            {text: "Jane Austen", correct: false},
            {text: "William Shakespeare", correct: true},  // Correct answer
            {text: "Mark Twain", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });

    nextButton.style.display = "block";
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct"); // Corrected 'classlist' to 'classList'
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => { // Corrected 'foreach' to 'forEach'

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Bravo!! You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) { // Corrected 'question.length' to 'questions.length'
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); // Corrected 'startQuiz(;)' to 'startQuiz()'
    }
});

startQuiz();
