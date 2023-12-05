const convertBtn = document.querySelector("#convertBtn")
const fromOption = document.querySelector("#from-option")
const toOption = document.querySelector("#to-option")
const inputValue = document.querySelector("#ammount-value")
const ammountValue = document.querySelector("#fromValueSpan")

const baseURL = "https://economia.awesomeapi.com.br/last/"


function changeCurrency(country, option) {
    const countryFlag = document.querySelector(`#${option}Image`)
    const countryCurrency = document.querySelector(`#${option}CurrencyName`)
    const currencySymbol = document.querySelector(`#${option}Symbol`)

    countryFlag.src = `assets/${country.flag}`
    countryCurrency.innerHTML = country.currency
    currencySymbol.innerHTML = country.symbol
}

fromOption.addEventListener('change', () => {
    const currencyFrom = fromOption.value
    let country;
    switch(currencyFrom){
        case 'USD':
            country = {
                flag: 'usa-flag.svg',
                currency: 'Dollar',
                symbol: '$'
            }
            break;
        case 'EUR':
            country = {
                flag: 'europe-flag.svg',
                currency: 'Euro',
                symbol: '€'
            }
            break;
        default:
            country = {
                flag: 'brazil-flag.svg',
                currency: 'Real',
                symbol: 'R$'
            }
    }

    changeCurrency(country, 'from')
    
})

toOption.addEventListener('change', () => {
    const currencyFrom = toOption.value
    let country;

    switch(currencyFrom){
        case 'BRL':
            country = {
                flag: 'brazil-flag.svg',
                currency: 'Real',
                symbol: 'R$'
            }
            break;
        case 'EUR':
            country = {
                flag: 'europe-flag.svg',
                currency: 'Euro',
                symbol: '€'
            }
            break;
        default:
            country = {
                flag: 'usa-flag.svg',
                currency: 'Dollar',
                symbol: '$'
            }
    }

    changeCurrency(country, 'to')
    
})

inputValue.addEventListener('input', () => {
    ammountValue.innerHTML= inputValue.value

})


convertBtn.addEventListener('click', async event => {
    event.preventDefault()

    const ammountToConvert = document.querySelector("#ammount-value").value

    if (fromOption.value === toOption.value) {
        updateValues(ammountToConvert, ammountToConvert, fromOption.value, toOption.value)
        return
    }
    const currencyType = `${toOption.value}-${fromOption.value}`
    const url = `${baseURL}${currencyType}`

    try {
        const conversionType = toOption.value+fromOption.value
        const currency = await getCurrency(url, conversionType)
        const result = (ammountToConvert/currency).toFixed(2)

        updateValues(result, ammountToConvert, fromOption.value, toOption.value)

    } catch(error) {
        console.error("Error", error)
    } finally {
        console.log("GG")
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

function updateValues(result, ammountToConvert, fromOption, toOption){
    const fromValue = document.querySelector("#fromValue")
    const toValue = document.querySelector("#toValue")

    fromValue.innerHTML = new Intl.NumberFormat('en-US', 
    { style: 'currency', currency: fromOption}).format(ammountToConvert)

    toValue.innerHTML = new Intl.NumberFormat('en-US', 
    { style: 'currency', currency: toOption}).format(result)
}
