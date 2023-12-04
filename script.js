const convertBtn = document.querySelector("#convertBtn")
const fromOption = document.querySelector("#from-option")
const toOption = document.querySelector("#to-option")
const baseURL = "https://economia.awesomeapi.com.br/last/"

convertBtn.addEventListener('click', async event => {
    event.preventDefault()

    if (fromOption.value === toOption.value) {
        return 1
    }

    const currencyType = `${toOption.value}-${fromOption.value}`
    const url = `${baseURL}${currencyType}`

    try {
        const conversionType = toOption.value+fromOption.value
        const currency = await getCurrency(url, conversionType)
        const ammountToConvert = document.querySelector("#ammount-value").value
        const result = (ammountToConvert/currency).toFixed(2)

        updateValues(result, ammountToConvert, fromOption.value, toOption.value)

    } catch(error) {
        console.error("Error", error)
    }

})

async function getCurrency(url, conversionType) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        const currencyValue = data[conversionType].bid

        console.log(data)
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
