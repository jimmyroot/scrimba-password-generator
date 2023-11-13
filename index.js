const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const charsUpp = characters.slice(characters.indexOf("A"), characters.indexOf('a'))
const charsLow = characters.slice(characters.indexOf("a"), characters.indexOf('0'))
const charsNum = characters.slice(characters.indexOf("0"), characters.indexOf('~'))
const charsSpec = characters.slice(characters.indexOf("~"), characters.length)

const checkUpp = document.getElementById("check-upp")
const checkNum = document.getElementById("check-num")
const checkSpec = document.getElementById("check-spec")
const inputLength = document.getElementById("input-length")

const password1El = document.getElementById("password-1-el")
const password2El = document.getElementById("password-2-el")

let pwLength = 15
let upper = true
let number = true
let special = true
let availableCharTypes = []
let pw1 = null
let pw2 = null

// Create a pool of available characters depending on the users selections.
// Lower case is the minimum 
function setAvailableTypes() {
    let newTypes = [charsLow]
    if (checkUpp.checked) newTypes.push(charsUpp)
    if (checkNum.checked) newTypes.push(charsNum)
    if (checkSpec.checked) newTypes.push(charsSpec)
    availableCharTypes = newTypes // Not sure this is the best way to do this? Am I copying the array or just the reference/pointer?
}

// Called on change of input-length element
function setPasswordLength() {
    // If user leaves the field empty and tabs out we can re-populate with current length
    if (inputLength.value === "") inputLength.value = pwLength;
    // Check validity (I think? At least google said so!) set length if valid, if invalid fix it
    (inputLength.checkValidity()) ? pwLength = inputLength.value : fixInputLength()
}

// Function to fix the input length if it exceeded max or min (e.g. if user typed it manually)
function fixInputLength() {
    let length = inputLength.value

    if (length > 20) {
        inputLength.value = 20
    } else if (length < 8) {
        inputLength.value = 8
    } else {
        // if all else fails set the default, we shouldn't ever get to this point but just in case...
        inputLength.value = 15
    }
    setPasswordLength()
}

// Generate a password based on the configured length and avaiable characters...we don't have to do
// much work here as we already built the arr of available types
function generatePassword() {
    var pw = ""

    for (let i = 0; i < pwLength; i++) {
        randCharType = availableCharTypes[Math.floor(Math.random() * availableCharTypes.length)]
        randChar = randCharType[Math.floor(Math.random() * randCharType.length)]
        pw += randChar
    }

    return pw
}

// Generate two passwords and display them
function getNewPasswords() {
    pw1 = generatePassword()
    pw2 = generatePassword()
    password1El.textContent = pw1
    password2El.textContent = pw2
}

// Copy the password to clipboard
function copyPassword(el) {
    let pwEl = document.getElementById(el.id)
    let text = pwEl.textContent
    navigator.clipboard.writeText(text)

    // Let the user know we copied successfully, wait 1.5 secs and revert to pw
    pwEl.textContent = "Copied to clipboard..."

    timer = setInterval(function() {
        pwEl.textContent = text
        clearInterval(timer)
    }, 1500)
}

setAvailableTypes()
