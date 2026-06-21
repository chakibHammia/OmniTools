let randomChoicePickeBtn = document.getElementById('randomChoicePickerBtn');
let scrollTop = document.getElementById('scrollTop');
let chooseBtn = document.getElementById('chooseBtn');
let chosen = document.getElementById('chosen');
let randomChoicePickerInput = document.getElementById('randomChoicePickerInput');
let temps = document.querySelectorAll('.temps');
let tempetatureConverterBtn = document.getElementById('tempetatureConverterBtn');
let binaryToDecimalBtn = document.getElementById('binaryToDecimalBtn');
let decimal = document.getElementById('decimal');
let binary = document.getElementById('binary');
let theme2 = document.getElementById('theme2');
let cityName = document.getElementById('cityName');
let weatherResult = document.getElementById('weatherResult');
let get = document.getElementById('get');
let weatherAppBtn = document.getElementById('weatherAppBtn');

//scroll buttons//-----------------------------------------------------------------------------------------------------------
window.onscroll = () => {
    console.log(scrollY)
    if (scrollY >= 300){
        scrollTop.style.display = 'block';
    }else{
        scrollTop.style.display = 'none';
    }
}

scrollTop.onclick = () => {
    scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

randomChoicePickerBtn.onclick = () => {
    scrollTo({
        top: 478,
        behavior: 'smooth'
    });
}   

tempetatureConverterBtn.onclick = () => {
    scrollTo({
        top: 981,
        behavior: 'smooth'
    });
}

binaryToDecimalBtn.onclick = () => {
    scrollTo({
        top: 1447,
        behavior: 'smooth'
    });
}

weatherAppBtn.onclick = () => {
    scrollTo({
        top: 1789,
        behavior: 'smooth'
    });
}



//random choice picker//-----------------------------------------------------------------------------------------------------------
chooseBtn.onclick = () => {
    let choices = randomChoicePickerInput.value;
    let index = Math.floor(Math.random() * choices.split(',').length);
    if(choices === '') {
        chosen.innerHTML =  '-';
    }else{
        chosen.innerHTML =  choices.split(',')[index];
    }
}

//temps converter//----------------------------------------------------------------------------------------------------------------
temps[0].oninput = () => {
        temps[1].value = ((Number(temps[0].value) * 9/5) + 32).toFixed(3);
        temps[2].value = (Number(temps[0].value) + 273.15).toFixed(3);
}

temps[1].oninput = () => {
        temps[0].value = ((Number(temps[1].value) - 32) * 5/9).toFixed(3);
        temps[2].value = (Number(temps[0].value) + 273.15).toFixed(3);
}

temps[2].oninput = () => {
        temps[0].value = (Number(temps[2].value) - 273.15).toFixed(3);
        temps[1].value = ((Number(temps[0].value) * 9/5) + 32).toFixed(3);
}      

//temps converter//----------------------------------------------------------------------------------------------------------------
decimal.oninput = () => {
    let dec = decimal.value;
    let bin = '';
    while(Number(dec) != 0) {
        bin = bin +  Number(dec) % 2;
        dec = Math.floor(Number(dec) / 2);
        console.log(dec);
        console.log(bin);
    }
    binary.value = bin.split('').reverse().join('');
}

//Binary to decimal//----------------------------------------------------------------------------------------------------------------

binary.oninput = () => {
    let num = 111;
    for(let z = 0; z < binary.value.length; z++) {
        if((Number(binary.value[z]) === 0) || (Number(binary.value[z]) === 1)) {
            decimal.value = 0;
            let arr = binary.value.toString().split('');
            let j = arr.length - 1;
        for(let i = 0; i < arr.length; i++) {
            decimal.value = Number(decimal.value) + ((arr[i]) * Math.pow(2, j));
            j--;
        }
        }else{
            decimal.value = '-';
        }
    }
}

//weather app//----------------------------------------------------------------------------------------------------------------


async function getWeather(city) {

//get lon and lat-------------------------------------------------------------------------------------------------------------------
    try {

        let fetchCards = await fetch(`https://geocode.maps.co/search?q=${city}&api_key=6a328304d9c25129858954wfe56613a`);
        let cards = await fetchCards.json();

        if(cards.length === false) {
            throw new Error("City Not Found");
        }

        let cityCards = {
            lon: cards[0].lon,
            lat: cards[0].lat,
        }
    
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityCards.lat}&longitude=${cityCards.lon}&current=temperature_2m`);
        let weather = await response.json();
        return Math.ceil(weather.current.temperature_2m);
    }catch(err) {
        console.log(err);
        return null;
    }

}

get.onclick = async function() {
    console.log(await getWeather(cityName.value))
    weatherResult.innerHTML = `${await getWeather(cityName.value)}°`
}


