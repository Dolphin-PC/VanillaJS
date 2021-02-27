const currencyEl_one = document.getElementById("currency-one")
const amountEl_one = document.getElementById("amount-one")
const currencyEl_two = document.getElementById("currency-two")
const amountEl_two = document.getElementById("amount-two")

const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap')

const API_KEY = "5519fcd374a0bede9b88995b"

// Fetch exchange rates and update the DOM
function calculator (){
    const currency_one = currencyEl_one.value
    const currency_two = currencyEl_two.value

    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        const rate = data.conversion_rates[currency_two]

        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`

        amountEl_two.value = (amountEl_one.value * rate)
    })
}

currencyEl_one.addEventListener('change',calculator)
amountEl_one.addEventListener('input',calculator)
currencyEl_two.addEventListener('change',calculator)
amountEl_two.addEventListener('input',calculator)

swap.addEventListener('click',()=>{
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp
    calculator()
})

calculator()