var calculator =  function () {
	var buttons = document.querySelectorAll('div.button');
	var resultField = document.querySelector('.result');
	var btnValue;
	var result = 0;
	var currentNumber = "0";
	var previousSymbol = "";
	var currentSymbol;
	var previousValue = "";
	var previousValueIsSymbol = false;
	var isFirstNumber = true;
	var isCurrentNumber = true;
	var isFirstValue = true;
	var resultIsShown = false;
	var numberOfCharacters = 1;

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', calculate, false);
	}
	
	function calculate() {
		btnValue = this.innerHTML;
		if (this.id === "reset") {
			clear();
			return;
		} 
		if (this.id === "change") {
			changeSign();
		}
		if (this.id === "back") {
			backspace();
		}
		if ( !isNaN(btnValue) || btnValue === "." ) {
			currentNumber = currentNumber.toString();
			if ( currentNumber.indexOf("0") == 0 && 
				 btnValue == 0 && 
				 currentNumber.length < 2) {
					return;
			}
			if ( resultField.classList.contains("big-number") ) {
				resultField.classList.remove("big-number");
			}
			if ( numberOfCharacters >= 13 && this.id !== "change" ) {
				return;
			}
			if (! isCurrentNumber ) {
				resultField.innerHTML = "";
			}
			isCurrentNumber = true;
			previousValueIsSymbol = false;

			if ( btnValue !== "." ) {
				if (isFirstNumber) {
					resultField.innerHTML = "";
				}
				currentNumber += btnValue;
				previousValue = btnValue;
				if (isCurrentNumber) {
					resultField.innerHTML +=  btnValue;
				}
				
				isFirstNumber = false;
			}
			else {
				addDot();
			}	
			isFirstValue = false;
			numberOfCharacters = resultField.innerHTML.length;
		}
		else if ( !previousValueIsSymbol && this.id !== "change" && this.id !== "back") {
	     	numberOfCharacters = 0;
			isCurrentNumber = false;
			resultIsShown = false;
			if ( currentNumber === "" ) {
				currentNumber = result;
			}
			if ( currentNumber === "0." || currentNumber === ".") {
				currentNumber = 0;
				numberOfCharacters = 1;
			}
			isFirstValue = true;
			previousValueIsSymbol = true;
			currentSymbol = btnValue;

			switch(previousSymbol) {
				case "+": 
					action(sum);
					break;
				case "-":
					action(sub);
					break;
				case "x": 
					action(multiply);
					break;
				case "/":
				 	action(divide);
					break;
				default:
					result = parseFloat(currentNumber);
					resultField.innerHTML = result;
					currentNumber = "";
					previousSymbol = currentSymbol;
					numberOfCharacters = 1;
					break;		
			}

			if ( this.id === "calculate" ) {
				previousValueIsSymbol = false;
				resultIsShown = true;
			}
		}		
	}

	function action(operator) {
		result = parseFloat(result);
		currentNumber = parseFloat(currentNumber);
		operator();
		result = parseFloat(result.toFixed(10));
		resultField.innerHTML = result;
		if (resultField.innerHTML.length >= 13) {
			resultField.classList.add("big-number");
		}
		currentNumber = "";
		previousSymbol = currentSymbol;
		numberOfCharacters = 1;
	}

	var sum = function() {
		result += currentNumber;
	}

	var sub = function() {
		result -= currentNumber;
	}

	var multiply = function() {
		result *= currentNumber;
	}

	var divide = function() {
		if ( currentNumber !== 0 ) {
				result /= currentNumber;
		}
		else {
			alert("Division by zero is impossible!");
			clear();
		}
		
	}

	function addDot() {
		if (isFirstValue) {
			resultField.innerHTML = "0.";
			currentNumber += "0.";
		}
		else {
			if ( currentNumber.indexOf(".") === -1 ) {
				resultField.innerHTML += ".";
				currentNumber += ".";
			}
		}
		isFirstNumber = false;	
	}

	function clear() {
		result = 0;
		currentNumber = "0";
		resultField.innerHTML = 0;
	    previousValueIsSymbol = false;
		isFirstNumber = true;
		isCurrentNumber = true;
		isFirstValue = true;
		numberOfCharacters = 1;
		resultIsShown = false;
		previousSymbol = "";
		previousValue = "";
		previousValueIsSymbol = false;
		if ( resultField.classList.contains("big-number") ) {
			resultField.classList.remove("big-number");
		}
	}

	function changeSign() {
		if ( !resultIsShown ) {
			currentNumber *= -1;
			resultField.innerHTML = currentNumber;
		}
	}

	function backspace() {
		if (currentNumber !== "") {
			var lengthOfResult = resultField.innerHTML.length;
			if (resultField.innerHTML.indexOf("-") !== -1) {
				lengthOfResult -= 1;
			}
			if (lengthOfResult >= 2) {
				if ( resultIsShown ) {
					result = String(result);
					result = result.slice(0, -1);
					result = parseFloat(result);
					resultField.innerHTML = result;
				}
				else {
					currentNumber = String(currentNumber);
					currentNumber = currentNumber.slice(0, -1);
					currentNumber = parseFloat(currentNumber);
					resultField.innerHTML = currentNumber;
				}
				numberOfCharacters--;
			}
		}
	}

} ();