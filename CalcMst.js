class Calculator {
  constructor(topDisplayTextElement, bottomDisplayTextElement) {
    this.topDisplayTextElement = topDisplayTextElement
    this.bottomDisplayTextElement = bottomDisplayTextElement
    this.clear()
    // console.log('Linked to:', this.topDisplayTextElement, this.bottomDisplayTextElement)
  }
  clear() {
    this.topDisplay = ''
    this.bottomDisplay = ''
    this.operation = undefined
  }
  delete() {
    this.bottomDisplay = this.bottomDisplay.toString().slice(0, -1)
  }
  appendNumber(number) {
    if (number === '.' && this.bottomDisplay.includes('.')) return
    this.bottomDisplay = this.bottomDisplay.toString() + number.toString()
  }

  chooseOperation(operation) { 
   if (this.bottomDisplay === "" && this.topDisplay === "") return
     if (this.bottomDisplay === "" && this.topDisplay !== "") {
    this.operation = operation
    return
  }
   if (this.topDisplay !== "") {
    this.compute()
  }
  this.operation = operation
  this.topDisplay = this.bottomDisplay
  this.bottomDisplay = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.topDisplay)
    const current = parseFloat(this.bottomDisplay)
    if (isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case '+': 
          computation = prev + current 
        break;
      case '-': 
          computation = prev - current
        break;
      case '*': 
          computation = prev * current 
        break;
      case '÷': 
          computation = current === 0 ? 'Error': prev / current 
        break;
      default: 
        return
    }
    this.bottomDisplay = computation
    this.operation = undefined
    this.topDisplay = ""
  }

  getDisplayNumber(number) {
    if (number === 'Error') return 'Error'
    const stringNumber = number.toString()
    const [integerPart, decimalPart] = stringNumber.split('.')
    const integerDigits = parseFloat(integerPart)
    if (number === '' || number == null) return ''
    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0})
    }

    if (decimalPart != null) {
      return `${integerDisplay}.${decimalPart}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.bottomDisplayTextElement.innerText =
      this.getDisplayNumber(this.bottomDisplay)
  if (this.operation != null) {
    this.topDisplayTextElement.innerText =  
    `${this.getDisplayNumber(this.topDisplay)} ${this.operation}`
  } else {
    this.topDisplayTextElement.innerText = ''
  }
 }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const topDisplayTextElement = document.querySelector('[data-top-display]')
const bottomDisplayTextElement  = document.querySelector('[data-bottom-display]')

const calculator = new Calculator(topDisplayTextElement, bottomDisplayTextElement)

numberButtons.forEach(button => {
  button.addEventListener ('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener ('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
  calculator.delete()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
  calculator.clear()
  calculator.updateDisplay()
})