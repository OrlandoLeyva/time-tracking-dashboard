import {data} from './data.js'

const infoCardsContainer = document.getElementById('info-cards')
const dailyButton = document.getElementById('daily')
const weeklyButton = document.getElementById('weekly')
const monthlyButton = document.getElementById('monthly')

let currentSelected = localStorage.getItem('timeframe') || 'weekly'
let currentSelectedEl = document.getElementById(currentSelected)
currentSelectedEl.classList.add('selected')
console.log(currentSelectedEl);

dailyButton.addEventListener('click', (e)=>{
    localStorage.setItem('timeframe', 'daily'); 
    renderData()
    highlighSelected(e.target)
})
weeklyButton.addEventListener('click', (e)=>{
    localStorage.setItem('timeframe', 'weekly')
    renderData()
    highlighSelected(e.target)
})
monthlyButton.addEventListener('click', (e)=>{
    localStorage.setItem('timeframe', 'monthly') 
    renderData()
    highlighSelected(e.target)
})

function highlighSelected(newSelectedEl){
    currentSelectedEl.classList.remove('selected')
    newSelectedEl.classList.add('selected')
    currentSelectedEl = newSelectedEl
    currentSelected = newSelectedEl.getAttribute('id')
}

function parseSelfCare(string) {
    return string.split(' ').join('-').toLocaleLowerCase()
}

function renderData() {
    const timeframe = localStorage.getItem('timeframe') || 'weekly'
    function setDate() {
        if (timeframe == 'daily') return 'Day'
        if (timeframe == 'weekly') return 'Week'
        if (timeframe == 'monthly') return 'Month'
    }
    let html = ''
    for (const item of data) {
        const timeData = item.timeframes[timeframe]
        html += `
            <div class="card ${item.title == 'Self Care' ? parseSelfCare(item.title) : item.title.toLowerCase()}-card">
                <div class="card-header">
                <img src="./images/icon-${item.title == 'Self Care' ? parseSelfCare(item.title) : item.title.toLowerCase()}.svg" alt="${item.title} icon">
                </div>
                <div class="card-info">
                <div class="card-top">
                    <p class='capitalize'>${item.title}</p>
                    <img src="./images/icon-ellipsis.svg" alt="">
                </div>
                <div class="card-time">
                    <h2>${timeData.current}Hrs</h2>
                    <p>Last ${setDate()} - ${timeData.previous}hrs</p>
                </div>
                </div>
            </div>
        `
    }

    infoCardsContainer.innerHTML = html
}

renderData()