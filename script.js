//Selecting the button id and setting it to a letiable
let generateBtn = document.querySelector("#generate");

//Setting the criteria options
let lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let special = ['@', '%', '+', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', "{", '}', "[", ']', '~', '-', '_', '.'];
let numeric = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//Setting a function with prompts and confirms to ask user
function generateOptions() {
  let length = parseInt(prompt('How many characters would you like your password to contain?'));

  // if length is not a number 
  if (isNaN(length)) {
    alert('Password length must be a number');
    generateOptions();
    return;
  }

  if (length < 8) {
    alert('Password length must be at least 8 characters');
    generateOptions();
    return;
  }

  if (length > 128) {
    alert('Password length must be fewer than 129 characters');
    generateOptions();
    return;
  }
  
  let includeSpecial = confirm('Click OK if you want to include special characters.');

  let includeNumeric = confirm('Click OK if you want to include numeric characters.');

  let includeLower = confirm('Click OK if you want to include lowercase characters.');

  let includeUpper = confirm('Click OK if you want to include uppercase characters.');

  if (!includeSpecial && !includeNumeric && !includeLower  && !includeUpper) {
    alert('Your password must have at least one special, numeric, lowercase, or uppercase character.');
    return;
  }

  // questionOptions object will contain the user's responses
  // key is equal to user's response
  let questionOptions = {
    length: length,
    includeSpecial: includeSpecial,
    includeNumeric: includeNumeric,
    includeLower: includeLower,
    includeUpper: includeUpper
  };

  return questionOptions; 
}

// Helper function to get random characters later
function getRandom(arr) {
  let randIndex = Math.floor(Math.random() * arr.length);
  let randElement = arr[randIndex];
  return randElement;
} 

//Function to generate the password
function passwordCreate() {
  // calling generateOptions() here
  // options is going to be an object 
  let options = generateOptions();
  let result = [];
  // possibleCharacters will contain any possible character
  let possibleCharacters = [];
  // guaranteedCharacters will get 1 of each character the user picks depending on the length they chose 
  let guaranteedCharacters = [];

  //if the returned options object includes special characters
  if (options.includeSpecial) {
    // concatenating all the special characters to possibleCharacters
    possibleCharacters = possibleCharacters.concat(special);
    // pushing a random number from special characters between 0 and the length of the array of special characters
    guaranteedCharacters.push(getRandom(special));
  } 

  if (options.includeNumeric) {
    possibleCharacters = possibleCharacters.concat(numeric);
    guaranteedCharacters.push(getRandom(numeric));
  }

  if (options.includeLower) {
    possibleCharacters = possibleCharacters.concat(lower); 
    guaranteedCharacters.push(getRandom(lower));
  }

  if (options.includeUpper) {
    possibleCharacters = possibleCharacters.concat(upper);
    guaranteedCharacters.push(getRandom(upper));
  }

  // looping through options object which contains the users answers
  for (let i = 0; i < options.length; i++) { 
    // getting a random character from possibleCharacters
    let possibleCharacter = getRandom(possibleCharacters); 
    // pushing that random character to result array
    result.push(possibleCharacter);
  }

  // looping through guaranteed characters and adding them to result
  for (let i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

  return result.join('');
}

//writing password into the card body
function writePassword() {
  // calling passwordCreate()
  let password = passwordCreate();
  let printPassword = document.querySelector("#password");

  // adding what's returned from the passwordCreate function to #password
  printPassword.value = password;
}

// when generateBtn is clicked, call writePassword()
generateBtn.addEventListener('click', writePassword);