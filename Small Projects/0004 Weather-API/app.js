const api = "ce9c9800ef814874a02163602242212";



let weather = document.querySelector('#weather');
let jokeContainer = document.querySelector('.joke');
let btn = document.querySelector('#btn');
function showJokeContainer() {
    jokeContainer.classList.remove("hide");
}

const emptyJoke = () => {
    weather.innerText = '';
}

const getWeather = async () => {
    if (city.value == "") {
        alert("please enter a city");
    } else {
        let city = document.querySelector('#city').value;
        console.log(city);
        let url = `https://api.weatherapi.com/v1/current.json?key=${api}&q=${city}`;

        try {
            let response = await fetch(url);
            let weatherData = await response.json();
            showJokeContainer();
            emptyJoke();
            weather.innerText = weatherData.current.condition.text;
        } catch (error) {
            alert("Enter a valid city !!")
            jokeContainer.classList.add("hide");
            console.log("BAKA !!! : ", error);
        }
    }
}


btn.addEventListener('click', getWeather);