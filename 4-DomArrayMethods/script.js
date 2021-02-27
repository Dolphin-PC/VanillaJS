const main = document.getElementById("main")
const addUserBtn = document.getElementById("add_user")
const doubleBtn = document.getElementById("double")
const showMillionairesBtn = document.getElementById("show-millionaires")
const sortBtn = document.getElementById("sort")
const calculateBtn = document.getElementById("calculate-wealth")

let data = [];

// Fetch random user and add money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();

    console.log(data);

    const user = data.results[0]

    const newUser =  {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000)
    }

    addData(newUser)
}

// Add new obj to data array
function addData(obj){
    data.push(obj)

    updateDOM();
}

// Update DOM
// ES6 - Default parameter
function updateDOM(providedData = data){
    // Clear main div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>"

    providedData.forEach(data=>{
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${data.name}</strong> ${formatMoney(data.money)}`
        main.appendChild(element)
    })
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string/14428340#14428340
function formatMoney (number){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Multiply double each money
function doubleMoney(){
    data = data.map(item =>{
        return{
            ...item,
            money : item.money *2
        }
    })
    updateDOM()
} 

// Show Higher than millionaires
function showMillionaires(){
    data = data.filter(item=> item.money >= 1000000)

    updateDOM()
}

// Sort by richest
function sortByRichest(){
    data.sort((a,b) => b.money - a.money)

    updateDOM()
}

// calculate
function calculation () {
    const wealth = data.reduce((acc,cur) => acc+cur.money,0)

    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl)
}

// Event listeners
addUserBtn.addEventListener('click',getRandomUser)
doubleBtn.addEventListener('click',doubleMoney)
showMillionairesBtn.addEventListener('click',showMillionaires)
sortBtn.addEventListener('click',sortByRichest)
calculateBtn.addEventListener('click',calculation)


getRandomUser()
getRandomUser()
getRandomUser()