let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function displayTime() {
    const hours = Math.floor(elapsedTime / (60 * 60 * 1000));
    const minutes = Math.floor((elapsedTime % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
    const milliseconds = elapsedTime % 1000;

    document.getElementById('displayHours').textContent = padTime(hours);
    document.getElementById('displayMinutes').textContent = padTime(minutes);
    document.getElementById('displaySeconds').textContent = padTime(seconds);
    document.getElementById('displayMilliseconds').textContent = padTime(milliseconds, 3);
}

function padTime(value, digits = 2) {
    return value.toString().padStart(digits, '0');
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            displayTime();
        }, 10);
        isRunning = true;
        document.getElementById('startBtn').textContent = 'Resume';
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('lapBtn').disabled = false;
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        document.getElementById('startBtn').textContent = 'Start';
    }
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById('startBtn').textContent = 'Resume';
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    displayTime();
    document.getElementById('startBtn').textContent = 'Start';
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('lapBtn').disabled = true;
    document.getElementById('lapsList').innerHTML = '';
}

function recordLapTime() {
    const lapsList = document.getElementById('lapsList');
    const lapTime = `${padTime(Math.floor(elapsedTime / (60 * 1000)))}:${padTime(Math.floor((elapsedTime % (60 * 1000)) / 1000))}.${padTime(elapsedTime % 1000, 3)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}
