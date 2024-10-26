const weaatherForm = document.querySelector('.weatherForm')
const cityInput = document.querySelector('.cityInput')
const card = document.querySelector('.card')
const apiKey = '9dea9781d299d2a1cd0f24eb4578c6ef'


    weaatherForm.addEventListener("submit", async event => {
        
        event.preventDefault()
        const city = cityInput.value
        
        if(city){

            try{
                const WeatheData = await getWeatherData(city)
                displayWeatherInfo(WeatheData)
            }

            catch(error){
                console.log(error)
                displayError(error)
            }
        }

        else{
            displayError("please enter a city");
        }
    }); 

    async function getWeatherData(city){


        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

        const response = await fetch(apiUrl)

        if(!response.ok){
            throw new Error(`City not found.`)
        }
        
        return await response.json()
        
    }

    function displayWeatherInfo(data){

        const {name: city,
            main: {temp, humidity},
            weather : [{description, id}]} = data

            card.textContent = "";
            card.style.display = "flex";

            const cityDisplay = document.createElement("h1")
            const tempDisplay = document.createElement("p")
            const humidityDisplay = document.createElement("p")
            const descDisplay = document.createElement("p")
            const weatherEmoji = document.createElement("p")


            cityDisplay.textContent = city;

            cityDisplay.classList.add("cityDisplay")

            card.appendChild(cityDisplay)

            tempDisplay.textContent = `${temp}°C`;
            tempDisplay.classList.add("tempDisplay")

            card.appendChild(tempDisplay)

            humidityDisplay.textContent = `Humidity: ${humidity}%`;

            humidityDisplay.classList.add("humidityDisplay")

            card.appendChild(humidityDisplay)

            descDisplay.textContent = description;

        descDisplay.classList.add("descDisplay")

            card.appendChild(descDisplay)

            weatherEmoji.textContent = getWeatherEmoji(id)
            weatherEmoji.classList.add("weatherEmoji")
            card.appendChild(weatherEmoji)
    }

function getWeatherEmoji(weatherId){
    if (weatherId >= 200 && weatherId < 300) {
        return '⛈️';
    } else if (weatherId >= 300 && weatherId < 500) {
        return '🌧️';
    } else if (weatherId >= 500 && weatherId < 600) {
        return '🌦️';
    } else if (weatherId >= 600 && weatherId < 700) {
        return '❄️';
    } else if (weatherId >= 700 && weatherId < 800) {
        return '🌫️';
    } else if (weatherId === 800) {
        return '☀️'; 
    } else if (weatherId > 800) {
        return '☁️'; 
    }
    return '';
}


function displayError(message){

    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay")

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}