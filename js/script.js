
// Added a focus state to the name field so when the page refreshes the cursor is in the name field
const nameInput = document.getElementById('name')
nameInput.focus()

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
