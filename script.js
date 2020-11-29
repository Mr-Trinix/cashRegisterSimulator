var price = document.getElementById("price")
var payment = document.getElementById("payment")
var change = document.getElementById("change")
var yourChange = document.getElementById("yourChange")
var giveChange = document.getElementById("giveChange")
var arroundChange = document.getElementById("arroundChange")
var result = document.getElementById("result")
var currentStatus = document.getElementById("currentStatus")
var next = document.getElementById("next")
var client = document.getElementById("client")
var arround = false

var listChange = [
    ["5cents", 0.05],
    ["10cents", 0.10],
    ["20cents", 0.20],
    ["50cents", 0.50],
    ["1euro", 1],
    ["2euros", 2],
    ["5euros", 5],
    ["10euros", 10],
    ["20euros", 20],
    ["50euros", 50],
]

if (!localStorage.totalchange) {
    localStorage.totalchange = 1;
}

function pricePicker() {
    let extraPaidL = Math.floor(Math.random() * (10000 - 0) + 0) / 100
    let priceL = Math.floor(Math.random() * (10000 - 0) + 0) / 100
    let paymentL = (priceL + extraPaidL).toFixed(2)
    console.log("extra :", extraPaidL, " | price :", priceL, " | payment :", paymentL)
    return [priceL, paymentL]
}

function initialize() {
    let priceL = pricePicker()
    payment.textContent = priceL[1]
    price.textContent = priceL[0]
    client.textContent = localStorage.getItem('totalchange')

    let x = payment.textContent
    let y = price.textContent
    let z = arroundChange

    change.textContent = (x - y).toFixed(2)

    if (change.textContent.includes(".") && (change.textContent[change.textContent.length - 1] != 0) && (change.textContent[change.textContent.length - 1] != 5)) {
        arround = true
        change.style.textDecoration = "line-through"

        let LastNumberL = change.textContent.indexOf('.')
        let intL = change.textContent.slice(0, LastNumberL)
        let decimalL = change.textContent.slice(LastNumberL + 1)
        decimalL = Math.ceil(decimalL / 5) * 5
        arroundChange.textContent = intL + "." + decimalL
    }

    console.log(change)
}

function checkChange() {
    let myFunction = function () {
        yourChange.textContent = countChange()

        let x = parseFloat(change.textContent)
        let y = parseFloat(yourChange.textContent)
        if (arround) {
            x = parseFloat(arroundChange.textContent)
        }

        result.textContent = (x - y).toFixed(2)
        console.log(x - y)

        if (x - y == 0) {
            console.log('correct')
            currentStatus.textContent = "correct"
            currentStatus.style.color = "green"
        } else {
            console.log('wrong')
            currentStatus.textContent = "wrong"
            currentStatus.style.color = "red"
        }
    }
    giveChange.addEventListener('click', myFunction, false)
}

function countChange() {
    let result = 0
    let x = document.getElementsByTagName("input")

    for (let i = 0; i < x.length; i++) {
        if (x[i].value > 0) {
            console.log(x[i].value, ' ', x[i].name)
            for (let j = 0; j < listChange.length; j++) {
                if (listChange[j][0] == x[i].name) {
                    result += x[i].value * listChange[j][1]
                }
            }
        }
    }

    return result
}

function nextChange() {
    let myFunction = function () {
        localStorage.totalchange = parseInt(localStorage.totalchange) + 1
        window.location.href = location
    }
    next.addEventListener('click', myFunction, false)
}

function main() {
    initialize()
    checkChange()
    countChange()
    nextChange()
}

main()