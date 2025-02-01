const jokeContainer = document.querySelector(".joke-card");
const setup = document.querySelector("#setup");
const delivery = document.querySelector("#delivery");
const btn = document.querySelector("#btn");

function showJokeContainer() {
    jokeContainer.classList.remove("hide");
    // Add animation class after removing hide
    setTimeout(() => {
        jokeContainer.classList.add("show");
    }, 10);
}

function hideJokeContainer() {
    jokeContainer.classList.remove("show");
    // Add hide class after animation completes
    setTimeout(() => {
        jokeContainer.classList.add("hide");
    }, 300);
}

function emptyJoke() {
    setup.innerText = '';
    delivery.innerText = '';
}

async function getJoke() {
    try {
        // Hide previous joke with animation
        if (!jokeContainer.classList.contains("hide")) {
            hideJokeContainer();
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
        const response = await fetch(url);
        const jokeData = await response.json();

        if (!jokeData.error) {
            emptyJoke();
            showJokeContainer();

            if (jokeData.type === "single") {
                setup.innerText = jokeData.joke;
            } else {
                setup.innerText = jokeData.setup;
                delivery.innerText = jokeData.delivery;
            }
        } else {
            throw new Error("Failed to fetch joke");
        }
    } catch (error) {
        console.error("Error fetching joke:", error);
        setup.innerText = "Oops! Failed to fetch joke. Please try again.";
        showJokeContainer();
    }
}

btn.addEventListener("click", getJoke);
