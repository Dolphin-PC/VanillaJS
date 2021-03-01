const balance = document.getElementById("balance")
const moneyPlus = document.getElementById("money-plus")
const moneyMinus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' || amount.value === ''){
        alert("Please add a text and amount")
    }else{
        const transaction = {
            id:generateID(),
            text:text.value,
            amount:+amount.value
        }
        transactions.push(transaction)

        addTransactionDOM(transaction)
        updateValues();
        updateLocalStorage();

        text.value=''
        amount.value=''
    }
}

// Generated random ID
function generateID(){
    return Math.floor(Math.random()*1000000)
}

// Add New Transaction to DOM list
function addTransactionDOM(transaction){
    // Get sign
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement('li')

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `

    list.appendChild(item)
}

// Remove transaction by ID
function removeTransaction(id){
    transactions = transactions.filter(each => each.id !== id)

    updateLocalStorage();
    init();
}

// Update the balance, income and expense
function updateValues(){
    const total = transactions.reduce((acc,item) => acc+item.amount,0).toFixed(2)
    const income = transactions.filter(item => item.amount > 0).reduce((acc,item)=> acc+item.amount,0).toFixed(2)
    const expense = transactions.filter(item => item.amount < 0).reduce((acc,item)=> acc+item.amount,0).toFixed(2)

    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`
    moneyMinus.innerText = `$${Math.abs(expense)}`
}

// Update local storage transactions
function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions))
}


// Init app
function init(){
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM)
    updateValues(); 
}

init();

form.addEventListener('submit',addTransaction)