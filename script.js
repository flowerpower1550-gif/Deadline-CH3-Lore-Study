let flashcards = [];
let sessionCards = [];
let currentCard = 0;
let showingAnswer = false;

const startButton = document.getElementById("start-button");
const app = document.getElementById("app");
const studyScreen = document.getElementById("study-screen");
const cardContent = document.getElementById("card-content");
const flipButton = document.getElementById("flip-button");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const progress = document.getElementById("progress");
const reshuffleButton = document.getElementById("reshuffle-button");

function shuffleCards(cards) {
    const shuffled = [...cards];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

fetch("data/lore.csv")
    .then(response => response.text())
    .then(data => {
        Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                flashcards = results.data;
                sessionCards = shuffleCards(flashcards);
            }
        });
    });

function showCard() {
    if (showingAnswer) {
        cardContent.textContent = sessionCards[currentCard].Back;
    } else {
        cardContent.textContent = sessionCards[currentCard].Front;
    }

    progress.textContent = (currentCard + 1) + " / " + sessionCards.length;

    previousButton.disabled = currentCard === 0;
    nextButton.disabled = currentCard === sessionCards.length - 1;
}

startButton.addEventListener("click", function () {
    app.style.display = "none";
    studyScreen.style.display = "block";

    showCard();
});

reshuffleButton.addEventListener("click", function () {
    sessionCards = shuffleCards(flashcards);
    currentCard = 0;
    showingAnswer = false;
    showCard();
});

flipButton.addEventListener("click", function () {
    showingAnswer = !showingAnswer;
    showCard();
});

nextButton.addEventListener("click", function () {
    if (currentCard < sessionCards.length - 1) {
        currentCard++;
        showingAnswer = false;
        showCard();
    }
});

previousButton.addEventListener("click", function () {
    if (currentCard > 0) {
        currentCard--;
        showingAnswer = false;
        showCard();
    }
});