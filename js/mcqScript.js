document.addEventListener('DOMContentLoaded', (event) => {
    // Define the total duration of the test in seconds (e.g., 3 hours = 10800 seconds)
    let totalSeconds = 3 * 60 * 60; // 3 hours in seconds

    // Restore the timer if the page is refreshed
    if (localStorage.getItem('examTimeLeft')) {
        totalSeconds = parseInt(localStorage.getItem('examTimeLeft'));
    }

    // Start the countdown
    const timerElement = document.getElementById('timer');
    const countdownInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Display the timer in the format hh:mm:ss
        timerElement.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

        // Save the time left in localStorage
        localStorage.setItem('examTimeLeft', totalSeconds);

        // Check if time is up
        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            alert("Time's up! The exam will be submitted.");
            submitExam(); // Function to submit the exam automatically
        }

        totalSeconds--;
    }

    // Format time values to always show two digits
    function formatTime(value) {
        return value < 10 ? `0${value}` : value;
    }

    // Function to submit the exam when time is up
    function submitExam() {
        document.querySelector('.submit-btn').click();
    }

    // Event listener to clear the timer on form submission
    document.querySelector('.submit-btn').addEventListener('click', () => {
        localStorage.removeItem('examTimeLeft');
    });
});
