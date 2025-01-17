let jokes = [];
let currentIndex = -1;

fetch('https://official-joke-api.appspot.com/jokes/random/250')
    .then(response => response.json())
    .then(data => {
        jokes = data;
        console.log('Jokes fetched:', jokes);
        if (jokes.length > 0) {
            currentIndex = 0;
            displayJoke();
        }
    })
    .catch(error => {
        console.error('Error fetching jokes:', error);
        document.getElementById('joke').textContent = "Failed to load jokes. Please try again later.";
    });

function resetIndex() {
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    if (currentIndex === jokes.length) {
        currentIndex = 0;
    }
}

// Next Joke
function showNextJoke() {
    if (jokes.length === 0) {
        document.getElementById('joke').textContent = "Loading jokes, please wait...";
        return;
    }
    resetIndex();
    currentIndex = (currentIndex + 1) % jokes.length;
    displayJoke();
}

// Previous joke
function showPreviousJoke() {
    if (jokes.length === 0) {
        document.getElementById('joke').textContent = "Loading jokes, please wait...";
        return;
    }
    resetIndex();
    currentIndex = (currentIndex - 1 + jokes.length) % jokes.length;
    displayJoke();
}

// Display the joke
function displayJoke() {
    const jokeElement = document.getElementById('joke');
    const randomJoke = jokes[currentIndex];
    jokeElement.textContent = randomJoke.setup ? `${randomJoke.setup} - ${randomJoke.punchline}` : randomJoke.joke;
}