var price = document.getElementById("price")
var payment = document.getElementsByClassName("payment")
var change = document.getElementById("change")
var yourChange = document.getElementById("yourChange")
var giveChange = document.getElementById("giveChange")
var arroundChange = document.getElementById("arroundChange")
var result = document.getElementsByClassName("result")
var currentStatus = document.getElementsByClassName("currentStatus")
var next = document.getElementById("next")
var client = document.getElementsByClassName("client")
var optionMode = document.getElementById("optionMode")
var optionChange = document.getElementsByClassName("optionChange")
var countSubmit = document.getElementById("countSubmit")
var nameOption = document.getElementById("nameOption")

var arround = false
var statusOptionMode = 0
var countRandom = 0

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

if (!localStorage.totalchange || localStorage.totalchange == "NaN") {
    localStorage.totalchange = 1;
}
if (!localStorage.totalcount || localStorage.totalcount == "NaN") {
    localStorage.totalcount = 1;
}
if (!localStorage.totalcount) {
    localStorage.optionMode = "give_change";
}

function localStorageGetStr() {
    let result = ""
    if (localStorage.optionMode == "give_change") {
        result = "Give change"
        nameOption.textContent = "Give change"
        client[statusOptionMode].textContent = localStorage.getItem('totalchange')
        document.getElementsByClassName("optionChange")[0].style.display = "none"
        statusOptionMode = 1
    } else {
        result = "Count change"
        nameOption.textContent = "Count change"
        client[statusOptionMode].textContent = localStorage.getItem('totalcount')
        document.getElementsByClassName("optionChange")[1].style.display = "none"
        statusOptionMode = 0
    }

    giveChange.style.backgroundColor = "black"
    giveChange.style.color = "white"
    giveChange.style.border = "none"

    return result
}

function pricePicker() {
    let extraPaidL = Math.floor(Math.random() * (10000 - 0) + 0) / 100
    let priceL = Math.floor(Math.random() * (10000 - 0) + 0) / 100
    let paymentL = (priceL + extraPaidL).toFixed(2)
    console.log("extra :", extraPaidL, " | price :", priceL, " | payment :", paymentL)
    return [priceL, paymentL]
}

function initialize() {
    optionMode.textContent = localStorageGetStr()
    giveChange.textContent = localStorageGetStr()

    let priceL = pricePicker()
    payment[statusOptionMode].textContent = priceL[1]
    price.textContent = priceL[0]

    let x = payment[statusOptionMode].textContent
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

    payment[0].textContent = ""
}

function checkChange() {
    let myFunction = function () {
        if (localStorageGetStr() == "Give change") {
            yourChange.textContent = countChange()

            let x = parseFloat(change.textContent)
            let y = parseFloat(yourChange.textContent)
            if (arround) {
                x = parseFloat(arroundChange.textContent)
            }

            result[statusOptionMode].textContent = (x - y).toFixed(2)

            if (x - y == 0) {
                currentStatus[statusOptionMode].textContent = "correct"
                currentStatus[statusOptionMode].style.color = "green"
            } else {
                currentStatus[statusOptionMode].textContent = "wrong"
                currentStatus[statusOptionMode].style.color = "red"
            }
        } else {
            let x = parseFloat(countSubmit.value)
            let y = parseFloat(countRandom)

            payment[0].textContent = countRandom
            result[statusOptionMode].textContent = (y - x).toFixed(2)

            if (x == y) {
                currentStatus[statusOptionMode].textContent = "correct"
                currentStatus[statusOptionMode].style.color = "green"
            } else {
                currentStatus[statusOptionMode].textContent = "wrong"
                currentStatus[statusOptionMode].style.color = "red"
            }
        }
    }
    giveChange.addEventListener('click', myFunction, true)
}

function randomPrice() {
    let result = 0
    let x = document.getElementsByClassName("rightPart")[0].getElementsByTagName("input")

    for (let i = 0; i < x.length; i++) {
        if (localStorageGetStr() != "Give change") {
            x[i].setAttribute("disabled", "true")
            x[i].value = Math.floor(Math.random() * 5)
        }
    }

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
    countRandom = result
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
        if (localStorageGetStr() == "Give change") {
            localStorage.totalchange = parseInt(localStorage.totalchange) + 1
        } else {
            localStorage.totalcount = parseInt(localStorage.totalcount) + 1
        }
        window.location.href = location
    }
    next.addEventListener('click', myFunction, false)
}

function optionModeFunc() {
    let myFunction = function () {

        if (localStorage.optionMode == "give_change") {
            localStorage.optionMode = "count_change"
            optionMode.textContent = "Count change"
            giveChange.textContent = "Count change"
        } else {
            localStorage.optionMode = "give_change"
            optionMode.textContent = "Give change"
            giveChange.textContent = "Give change"
        }
        window.location.href = location
    }

    optionMode.addEventListener('click', myFunction, false)
}

function main() {
    initialize()
    checkChange()
    countChange()
    nextChange()
    optionModeFunc()
    randomPrice()
}

main()