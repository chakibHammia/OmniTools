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
