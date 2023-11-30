const convertBtn = document.querySelector("#convertBtn")

const baseURL = "https://economia.awesomeapi.com.br/last/"
const currencyType = "USD-BRL"

const url = `${baseURL}${currencyType}`

async function getCurrency() {
    try {

        const response = await fetch(url)
        const data = await response.json()

        console.log(data.USDBRL.bid)

    } catch(error) {
        console.log(error)
    }
}


