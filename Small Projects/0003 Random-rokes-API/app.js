const jokeContainer = document.querySelector(".joke");
let setup = document.querySelector("#setup");
let delivery = document.querySelector("#delivery");
const btn = document.querySelector("#btn");

function showJokeContainer() {
    jokeContainer.classList.remove("hide");
}

const emptyJoke = () => {
    setup.innerText = '';
    delivery.innerText = '';
}

const getJoke = async () => {

    let url = "https://v2.jokeapi.dev/joke/Any";

    let response = await fetch(url);
    let jokeData = await response.json();
    console.log(jokeData);
    showJokeContainer();
    emptyJoke();
    if (jokeData.type === "single") {
        setup.innerText = jokeData.joke;
        console.log(jokeData.joke);

    } else {
        setup.innerText = '~ ' + jokeData.setup;
        delivery.innerText = '~ ' + jokeData.delivery;
        console.log(jokeData.setup);
        console.log(jokeData.delivery);
    }



}

btn.addEventListener("click", getJoke);
