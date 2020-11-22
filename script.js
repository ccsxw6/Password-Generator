var generateBtn = document.querySelector("#generate");

var lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var special = ['@', '%', '+', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', "{", '}', "[", ']', '~', '-', '_', '.'];
var numeric = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


function generateOptions() {
  var length = parseInt(prompt('How many characters would you like your password to contain?'));

  if (isNaN(length) === true) {
    alert('Password length must be a number');
    return;
  }

  if (length < 8) {
    alert('Password length must be at least 8 characters');
    return;
  }

  if (length > 128) {
    alert('Password length must be fewer than 129 characters');
    return;
  }
  var includeSpecial = confirm('Click OK if you want to include special characters.');

  var includeNumeric = confirm('Click OK if you want to include numeric characters.');

  var includeLower = confirm('Click OK if you want to include lowercase characters.');

  var includeUpper = confirm('Click OK if you want to include uppercase characters.');

  if (!includeSpecial && !includeNumeric && !includeLower  && !includeUpper) {
    alert('Your password must have at least one special, numeric, lowercase, or uppercase character.');
    return;
  }

 
  var questionOptions = {
    length: length,
    includeSpecial: includeSpecial,
    includeNumeric: includeNumeric,
    includeLower: includeLower,
    includeUpper: includeUpper
  };
  return questionOptions; 
}

function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var randElement = arr[randIndex];

  return randElement;
} 


function generatePassword() {
  var options = generateOptions();
  var result = [];
  var possibleCharacters = [];
  var guaranteedCharacters = [];

  if (options.includeSpecial) {
    possibleCharacters = possibleCharacters.concat(special);
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

  for (var i = 0; i < options.length; i++) { 
    var possibleCharacter = getRandom(possibleCharacters); 
    result.push(possibleCharacter);
  }

  for (var i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

  return result.join('');
}

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

generateBtn.addEventListener('click', writePassword);