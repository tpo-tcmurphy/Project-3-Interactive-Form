
// Added a focus state to the name field so when the page refreshes the cursor is in the name field
const nameField = document.querySelector('#name')
nameField.focus()

// created varibles to work with HTML elements
const jobRole = document.getElementById('title')
const otherRole = document.getElementById('other-job-role')

// Other role variable has to be hidden by default
otherRole.style.display = 'none'

// Made a conditional statement to only show the other job field when selected
function seeOtherJob () {
  if (jobRole.value === 'other') {
    otherRole.style.display = 'block'
  } else {
    otherRole.style.display = 'none'
  }
}
jobRole.addEventListener('change', seeOtherJob)

// Defined variables for the T-shirt section
const shirtDesign = document.querySelector('#design')
const shirtColor = document.querySelector('#color')
shirtColor.disabled = true

// Add eventlistener and function to change colors when a theme is selected
shirtDesign.addEventListener('change', (e) => {
  shirtColor.disabled = false

  if (e.target.value === 'heart js') {
    for (let i = 0; i < shirtColor.length; i++) {
      const theme = shirtColor[i].getAttribute('data-theme')

      if (theme === e.target.value) {
        shirtColor[i].style.display = 'block'
        shirtColor[i].selected = true
      } else {
        shirtColor[i].style.display = 'none'
      }
    }
  } else if (e.target.value === 'js puns') {
    for (let i = 0; i < shirtColor.length; i++) {
      const theme = shirtColor[i].getAttribute('data-theme')

      if (theme === e.target.value) {
        shirtColor[i].style.display = 'block'
        shirtColor[i].selected = true
      } else {
        shirtColor[i].style.display = 'none'
      }
    }
  }
})

// Defined variables for the activities section
let sumOfCost = 0
const registerForActivities = document.querySelector('#activities')
const totalCost = document.querySelector('#activities-cost')
const checkboxes = document.querySelectorAll('input[type=checkbox]')

// eventlistener and function  made to allow chosen activities to add price and only be selected when it doesn't conflict with a time
registerForActivities.addEventListener('change', (e) => {
  const clickedActivity = e.target
  const activityCost = +clickedActivity.getAttribute('data-cost')
  const activityTime = clickedActivity.getAttribute('data-day-and-time')

  for (let i = 0; i < checkboxes.length; i++) {
    const conflictingTime = checkboxes[i].getAttribute('data-day-and-time')

    if (clickedActivity !== checkboxes[i] && activityTime === conflictingTime) {
      checkboxes[i].disabled = true

      if (clickedActivity.checked) {
        checkboxes[i].disabled = true
        checkboxes[i].parentElement.classList.add('disabled')
      } else {
        checkboxes[i].disabled = false
        checkboxes[i].parentElement.classList.remove('disabled')
      }
    }
  }

  if (clickedActivity.checked) {
    sumOfCost += activityCost
  } else {
    sumOfCost -= activityCost
  }
  totalCost.innerHTML = `Total: $${sumOfCost}`
})

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('focus', (e) => {
    const parentFocused = e.target.parentNode
    parentFocused.classList.add('focus')
  })
})

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('blur', (e) => {
    const parentBlurred = e.target.parentNode
    parentBlurred.classList.remove('focus')
  })
})

// Defined variables for the payment section
const payType = document.querySelector('#payment')
const creditCard = document.querySelector('#credit-card')
const creditCardNumber = document.querySelector('#cc-num')
const zipCode = document.querySelector('#zip')
const cvv = document.querySelector('#cvv')
const payPal = document.querySelector('#paypal')
const bitCoin = document.querySelector('#bitcoin')
const emailAddress = document.querySelector('#email')

// Function and Event listener added to ensure that only the correct payment box shows when selected and hides other payment options
payType.children[1].selected = true
payPal.style.display = 'none'
bitCoin.style.display = 'none'

payType.addEventListener('change', (e) => {
  const paymentCapture = e.target.value

  if (paymentCapture === creditCard.id) {
    creditCard.style.display = 'block'
    payPal.style.display = 'none'
    bitCoin.style.display = 'none'
  } else if (paymentCapture === payPal.id) {
    payPal.style.display = 'block'
    creditCard.style.display = 'none'
    bitCoin.style.display = 'none'
  } else if (paymentCapture === bitCoin.id) {
    bitCoin.style.display = 'block'
    creditCard.style.display = 'none'
    payPal.style.display = 'none'
  }
})

// This section validates the form fields

// Define variables
const form = document.querySelector('form')

// Name Section
function validName () {
  const nameInput = nameField.value
  const regName = /^[A-Za-z]+ ?[A-Za-z]*?$/.test(nameInput)
  const nameAlert = document.querySelector('#name-hint')

  if (!regName) {
    nameAlert.parentElement.classList.remove('valid')
    nameAlert.parentElement.classList.add('not-valid')
    nameAlert.classList.remove('hint')
  } else if (regName) {
    nameAlert.classList.remove('not-valid')
    nameAlert.classList.add('valid')
    nameAlert.classList.add('hint')
  }
  return regName
}

// email section
function validEmail () {
  const emailInput = emailAddress.value
  const regEmail = /[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput)
  const emailAlert = document.querySelector('#email-hint')

  if (!regEmail) {
    emailAlert.parentElement.classList.remove('valid')
    emailAlert.parentElement.classList.add('not-valid')
    emailAlert.classList.remove('hint')
  } else if (regEmail) {
    emailAlert.classList.remove('not-valid')
    emailAlert.classList.add('valid')
    emailAlert.classList.add('hint')
  }
  return regEmail
}

// Activities Section
function validActivities () {
  let checkedNum = 0
  let activitiesValid
  const activitiesAlert = document.querySelector('#activities-hint')

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkedNum++
    }
  }
  if (checkedNum > 0) {
    activitiesValid = true
  } else {
    activitiesValid = false
  }
  if (!activitiesValid) {
    activitiesAlert.parentElement.classList.remove('valid')
    activitiesAlert.parentElement.classList.add('not-valid')
    activitiesAlert.classList.remove('hint')
  } else if (activitiesValid) {
    activitiesAlert.parentElement.classList.remove('not-valid')
    activitiesAlert.parentElement.classList.add('valid')
    activitiesAlert.classList.add('hint')
  }
  return activitiesValid
}

// Payment Section

// Validate CC number
function validCcNumber () {
  const creditNumInput = creditCardNumber.value
  const regCreditNum = /^\d{13}\d?\d?\d?$/.test(creditNumInput)
  const cardNumAlert = document.querySelector('#cc-hint')

  if (!regCreditNum) {
    cardNumAlert.parentNode.classList.remove('valid')
    cardNumAlert.parentNode.classList.add('not-valid')
    cardNumAlert.classList.remove('hint')
  } else if (regCreditNum) {
    cardNumAlert.parentNode.classList.remove('not-valid')
    cardNumAlert.parentNode.classList.add('valid')
    cardNumAlert.classList.add('hint')
  }
  return regCreditNum
}
// Validate Zipcode
function validZipCode () {
  const zipCodeInput = zipCode.value
  const regZipCode = /^\d{5}$/.test(zipCodeInput)
  const zipCodeAlert = document.querySelector('#zip-hint')

  if (!regZipCode) {
    zipCodeAlert.parentNode.classList.remove('valid')
    zipCodeAlert.parentNode.classList.add('not-valid')
    zipCodeAlert.classList.remove('hint')
  } else if (regZipCode) {
    zipCodeAlert.parentNode.classList.remove('not-valid')
    zipCodeAlert.parentNode.classList.add('valid')
    zipCodeAlert.classList.add('hint')
  }
  return regZipCode
}
// Validate CVV
function validCvv () {
  const cvvInput = cvv.value
  const regCVV = /^\d{3}$/.test(cvvInput)
  const cvvAlert = document.querySelector('#cvv-hint')

  if (!regCVV) {
    cvvAlert.parentNode.classList.remove('valid')
    cvvAlert.parentNode.classList.add('not-valid')
    cvvAlert.classList.remove('hint')
  } else if (regCVV) {
    cvvAlert.parentNode.classList.remove('not-valid')
    cvvAlert.parentNode.classList.add('valid')
    cvvAlert.classList.add('hint')
  }
  return regCVV
}
// event listener for form validation

form.addEventListener('submit', (e) => {
  const validChecker = []

  validChecker.push(validName())
  validChecker.push(validEmail())
  validChecker.push(validActivities())

  if (payType.value === 'credit-card') {
    validChecker.push(validCcNumber())
    validChecker.push(validZipCode())
    validChecker.push(validCvv())
  }
  if (validChecker.includes(false)) {
    e.preventDefault()
  }
})
