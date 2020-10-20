const time = document.querySelector('.time');
const date = document.querySelector('.date');
const week = document.querySelector('.week');
const month = document.querySelector('.month');
const day = document.querySelector('.day');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const changeBg = document.querySelector('.bg-btn');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const quoteBtn = document.querySelector('.quote-btn');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    time.innerHTML = `${hour}<span>:</span>${timePrettier(min)}<span>:</span>${timePrettier(sec)}`

    setTimeout(showTime, 1000);
}

function timePrettier(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function showDate() {
    let today = new Date();
    const weekDays = ['Sunday,','Monday,','Tuesday,','Wednesday,','Thursday,','Friday,','Saturday,'];
    const months = [' January ',' February ',' March ',' April ',' May ',' June ',' July ',' August ',' September ',' October ',' November ',' December '];

    week.textContent = `${weekDays[today.getDay()]}`;
    month.textContent = `${months[today.getMonth()]}`;
    day.textContent = `${today.getDate()}`
}


function setBgAndGreet() {
    let today = new Date(),
        hour = today.getHours();
    
    const images = {
        morning: ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg',
                '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'],
        day: ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg',
            '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'],
        evening: ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg',
            '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'],
        night: ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg',
            '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg']
    }

    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    switch(true) {
        case hour < 12 && hour >= 6:
            document.body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('../assets/images/morning/${images.morning[getRandom(0, 19)]}')`
            greeting.textContent = 'Good Morning, '
            break;
        case hour < 18 && hour >= 12:
            document.body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('../assets/images/day/${images.day[getRandom(0, 19)]}')`
            greeting.textContent = 'Good Afternoon, '
            break;
        case hour <= 23 && hour >= 18:
            document.body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('../assets/images/evening/${images.evening[getRandom(0, 19)]}')`
            greeting.textContent = 'Good Evening, '
            break;
        case hour < 6:
            document.body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('../assets/images/night/${images.night[getRandom(0, 19)]}')`
            greeting.textContent = 'Good Night, '
            break;
    }
}

function getName() {
    if(localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
        name.textContent = '[Enter Name]'
    }
    else {
        name.textContent = localStorage.getItem('name')
    }
}

function setName(e) {
    if(e.type === 'keypress') {
        if(e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    }
    else {
        localStorage.setItem('name', e.target.innerText);
    }
}

function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]'
    }
    else {
        focus.textContent = localStorage.getItem('focus')
    }
}

function setFocus(e) {
    if(e.type === 'keypress') {
        if(e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    }
    else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

async function getQuote() {  
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    const data = await res.json(); 
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=4d15b177ed7c9f6f371184b42c54b197&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
}

function getCity() {
    if(localStorage.getItem('city') === null) {
        city.textContent = '[Enter City]'
    }
    else {
        city.textContent = localStorage.getItem('city')
    }
}

function setCity(e) {
    if(e.type === 'keypress') {
        if(e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('city', e.target.innerText);
            getWeather()
            city.blur();
        }
    }
    else {
        localStorage.setItem('city', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

changeBg.addEventListener('click', setBgAndGreet);

document.addEventListener('DOMContentLoaded', getQuote);

quoteBtn.addEventListener('click', getQuote);

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

// Run
showTime();
setBgAndGreet();
getName();
getFocus();
showDate();
getCity()