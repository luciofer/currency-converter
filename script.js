const convertBtn = document.querySelector("#convertBtn")
const fromOption = document.querySelector("#from-option")
const toOption = document.querySelector("#to-option")

const baseURL = "https://economia.awesomeapi.com.br/last/"

convertBtn.addEventListener('click', async event => {
    event.preventDefault()

    if (fromOption.value === toOption.value) {
        console.log(1)
        return 1
    }

    const currencyType = `${toOption.value}-${fromOption.value}`
    const url = `${baseURL}${currencyType}`

    console.log(url)

    try {
        const dollar = await getCurrency(url)
        const ammountToConvert = document.querySelector("#ammount-value").value
        const result = (ammountToConvert/dollar).toFixed(2)
        console.log(result)
    } catch(error) {
        console.error("Error", error)
    }

})


async function getCurrency(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        const dollarValue = data.USDBRL.bid
        return dollarValue
    } catch(error) {
        console.log(error)
    }
}


