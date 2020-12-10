const calculatorDisplay = document.querySelector('h1')
const inputBtn = document.querySelectorAll('button')
const clearBtn = document.querySelector('.clear')

let firstValue = 0
let operatorValue = ''
let awaitingNextValue = false

const sendNumbersValue = number => {
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number
        awaitingNextValue = false
    } else {
        calculatorDisplay.textContent === '0' ? calculatorDisplay.textContent = number : calculatorDisplay.textContent += number
    }
}

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber/secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber*secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber+secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber-secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}

const useOperator = operator => {
    const currentValue = Number(calculatorDisplay.textContent)
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator
        return
    }
    if (!firstValue) {
        firstValue = currentValue
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue)
        calculatorDisplay.textContent = calculation
        firstValue = calculation
    }
    operatorValue = operator
    awaitingNextValue = true
    // calculatorDisplay.textContent = '0'
} 

const addDecimal = () => {
    if (awaitingNextValue) {
        return
    }
    !calculatorDisplay.textContent.includes('.') ? calculatorDisplay.textContent = `${calculatorDisplay.textContent}.` : null
    firstValue = 0
    operatorValue = ''
}

inputBtn.forEach(button => {
    const isDecimal = button.classList.contains('decimal')
    const isAnOperator = button.classList.contains('operator')
    button.classList.length === 2 && !isDecimal && !isAnOperator ? button.addEventListener('click', () => sendNumbersValue(button.value)) : isDecimal ? button.addEventListener('click', addDecimal) : isAnOperator ? button.addEventListener('click', () => useOperator(button.value)) : null
})


const resetAll = () => {
    calculatorDisplay.textContent = '0'
}

clearBtn.addEventListener('click', resetAll)