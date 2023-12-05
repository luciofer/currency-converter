const convertBtn = document.querySelector("#convertBtn")
const fromOption = document.querySelector("#from-option")
const toOption = document.querySelector("#to-option")
const inputValue = document.querySelector("#ammount-value")
const ammountValue = document.querySelector("#fromValue")
const ammountTo = document.querySelector("#toValue")

const baseURL = "https://economia.awesomeapi.com.br/last/"

function changeCurrency(country, option, format = 0.0) {
    const countryFlag = document.querySelector(`#${option}Image`)
    const countryCurrency = document.querySelector(`#${option}CurrencyName`)
    const optionSelected = document.querySelector(`#${option}-option`)
    const optionValue = document.querySelector(`#${option}Value`)

    countryFlag.src = `assets/${country.flag}`
    countryCurrency.innerHTML = country.currency

    optionValue.innerHTML = new Intl.NumberFormat('en-US', 
    { style: 'currency', currency: optionSelected.value}).format(format)
}

fromOption.addEventListener('change', () => {
    const currencyFrom = fromOption.value
    let country;
    switch(currencyFrom){
        case 'USD':
            country = {
                flag: 'usa-flag.svg',
                currency: 'Dollar',
            }
            break;
        case 'EUR':
            country = {
                flag: 'europe-flag.svg',
                currency: 'Euro',
            }
            break;
        default:
            country = {
                flag: 'brazil-flag.svg',
                currency: 'Real',
            }
    }

    changeCurrency(country, 'from', inputValue.value)
    ammountTo.innerHTML = new Intl.NumberFormat('en-US', 
    { style: 'currency', currency: toOption.value}).format(0.0)
})

toOption.addEventListener('change', () => {
    const currencyFrom = toOption.value
    let country;

    switch(currencyFrom){
        case 'BRL':
            country = {
                flag: 'brazil-flag.svg',
                currency: 'Real',
            }
            break;
        case 'EUR':
            country = {
                flag: 'europe-flag.svg',
                currency: 'Euro',
            }
            break;
        default:
            country = {
                flag: 'usa-flag.svg',
                currency: 'Dollar',
            }
    }
    changeCurrency(country, 'to')
})

inputValue.addEventListener('input', () => {
    ammountValue.innerHTML = new Intl.NumberFormat('en-US', 
    { style: 'currency', currency: fromOption.value}).format(inputValue.value)
})


convertBtn.addEventListener('click', async event => {
    event.preventDefault()

    const ammountToConvert = document.querySelector("#ammount-value").value

    if (fromOption.value === toOption.value) {
        updateValues(ammountToConvert, toOption.value)
        return
    }
    const currencyType = `${toOption.value}-${fromOption.value}`
    const url = `${baseURL}${currencyType}`

    try {
        const conversionType = toOption.value+fromOption.value
        const currency = await getCurrency(url, conversionType)
        const result = (ammountToConvert/currency).toFixed(2)

        updateValues(result, toOption.value)

    } catch(error) {
        console.error("Error", error)
    }
})

async function getCurrency(url, conversionType) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        const currencyValue = data[conversionType].bid
        return currencyValue 
    } catch(error) {
        console.log(error)
    }
}

function updateValues(result, toOption){
    const toValue = document.querySelector("#toValue")
    toValue.innerHTML = new Intl.NumberFormat('en-US', 
    { style: 'currency', currency: toOption}).format(result)
}

