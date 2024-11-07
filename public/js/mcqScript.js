// Initialize 2D array for questions (total of 90 questions in this example)
let questions = Array(9).fill().map(() => Array(10).fill('Not Visited'));

let currentQuestion = 0; // Track the current question number
const questionGrid = document.querySelector('.question-grid');

// Render the question grid based on the 2D array
function renderGrid() 
{
    questionGrid.innerHTML = '';  // Clear current grid
    questions.forEach((row, rowIndex) => {
        row.forEach((status, colIndex) => {
            let questionDiv = document.createElement('div');
            questionDiv.textContent = rowIndex * 10 + colIndex + 1;
            questionDiv.className = getClassForStatus(status);
            questionDiv.onclick = () => handleQuestionClick(rowIndex, colIndex);
            questionGrid.appendChild(questionDiv);
        });
    });
}

// Get the CSS class based on the status
function getClassForStatus(status) {
    switch (status) {
        case 'Not Visited': return 'not-visited';
        case 'Not Answered': return 'not-answered';
        case 'Answered': return 'answered';
        case 'Marked Review': return 'marked-review';
        case 'Answered & Marked Review': return 'answered-marked-review';
        default: return 'not-visited';
    }
}

// Handle click on question box
function handleQuestionClick(row, col) 
{
    console.log("handle question ")
    currentQuestion = row * 10 + col;
    document.querySelector('#question-number').textContent = `Question ${currentQuestion + 1}`;
    // Update question text (for now, just a placeholder)
    document.querySelector('#question-text').textContent = `This is the text for question ${currentQuestion + 1}.`;

    
}

// Button Actions
function saveNext() 
{
    updateQuestionStatus('Answered');
    if (currentQuestion < 89) {
        nextQuestion();
    }
}

function saveMarkReview() {
    updateQuestionStatus('Answered & Marked Review');
}

function clearResponse() {
    updateQuestionStatus('Not Answered');
}

function markReviewNext() {
    updateQuestionStatus('Marked Review');
    if (currentQuestion < 89) {
        nextQuestion();
    }
}

function updateQuestionStatus(status) {
    let row = Math.floor(currentQuestion / 10);
    let col = currentQuestion % 10;
    questions[row][col] = status; // Update the status of the current question
    renderGrid(); // Update the grid after changing status
}


// Timer function
function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);
}

window.onload = function () {
    let timeInHours = 3; // 3 hours for test
    let display = document.querySelector('#timer');
    startTimer(timeInHours * 60 * 60, display); // convert hours to seconds

    // Initialize grid on page load
    renderGrid();
}
