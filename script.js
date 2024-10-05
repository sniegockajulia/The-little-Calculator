// Global variables to store the first number and the operator
let firstNumber = null;
let operator = null;

const showLoading = () => {
    document.querySelector('.spinner').classList.add('loading');
};

const hideLoading = () => {
    document.querySelector('.spinner').classList.remove('loading');
};

// Global variables for logging errors
let errorLog = [];

// Function to log errors with a timestamp
const logError = (errorMessage) => {
    const timestamp = new Date().toLocaleString(); // Get the current timestamp
    errorLog.push(`[${timestamp}] ${errorMessage}`); // Append the error message to the log array
};

// Updated showError function to log errors
const showError = (errorMessage) => {
    // Display the error message in the information field
    document.getElementById("info").textContent = errorMessage;
    
    // Log the error message
    logError(errorMessage);
};

// Function to download the log file
const downloadLog = () => {
    const logContent = errorLog.join('\n'); // Combine the logs into a single string, each on a new line
    const blob = new Blob([logContent], { type: 'text/plain' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'error_log.txt';
    link.click();
};

// Attach the download log function to the button
document.getElementById("download-log").addEventListener("click", downloadLog);

// Function to check if input is a CSV
const isCSV = (input) => input.includes(','); // Returns true if there is a comma in the input

const validate = (input) => {
    input = input.trim();

    // Empty input check
    if (input === "") {
        return { isValid: false, isEmpty: true, isCSV: false };
    }

    // Check for CSV
    const isCSVInput = isCSV(input);

    if (isCSVInput) {
        // Check for empty CSV (only commas or missing elements like 1,,2)
        if (input.split(',').some(val => val.trim() === "")) {
            return { isValid: false, isEmpty: false, isIncompleteCSV: true };
        }
    }

    // Check for valid number or complete CSV format
    const isValidNumber = /^-?\d+(\.\d+)?$/.test(input);
    const isValidCSV = /^(-?\d+(\.\d+)?)(,-?\d+(\.\d+)?)*$/.test(input);

    return { isValid: isValidNumber || isValidCSV, isEmpty: false, isCSV: isCSVInput }; 
};

// Function to handle invalid input
const handleInvalidInput = (validationResult) => {
    if (validationResult.isEmpty) {
        showError("Error: Input is empty. Please enter a number or a CSV list.");
        document.getElementById("number-input").value = "";
    } else if (validationResult.isIncompleteCSV) {
        showError("Error: Input CSV is incomplete. Please enter a valid CSV list.");
    } else {
        showError("Error: Invalid input. Please enter a number or a valid CSV list.");
        document.getElementById("number-input").value = "";
    }
};

// Function to square the number
const squareNumber = () => {
    const input = document.getElementById("number-input").value;
    const validationResult = validate(input); // Validate input
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        return;
    }

    if (isCSV(input)) {
        showError("Error: Cannot perform square operation on CSV input.");
        document.getElementById("number-input").value = "";
        return;
    }

    const result = parseFloat(input) ** 2;

    // Display result in the input field
    document.getElementById("number-input").value = result;

    // Call fill_info() to update the information field
    fill_info("Square", result);
};

// Function to calculate the square root
const squareRoot = () => {
    const input = document.getElementById("number-input").value;
    const validationResult = validate(input); // Validate input
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        return;
    }

    if (isCSV(input)) {
        showError("Error: Cannot perform square root operation on CSV input.");
        document.getElementById("number-input").value = "";
        return;
    }

    const number = parseFloat(input);
    if (number < 0) {
        showError("Error: Square root is not defined for negative numbers.");
        document.getElementById("number-input").value = ""; // Clear the input field
        return;
    }

    const result = Math.sqrt(number);

    // Display result in the input field
    document.getElementById("number-input").value = result;

    // Call fill_info() to update the information field
    fill_info("Square Root", result);
};

// Function to calculate the modulus
const mod = () => {
    const input = document.getElementById("number-input").value;
    const validationResult = validate(input); // Validate input
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        return;
    }

    if (isCSV(input)) {
        showError("Error: Cannot perform modulo operation on CSV input.");
        document.getElementById("number-input").value = "";
        return;
    }

    const result = Math.abs(parseFloat(input));

    // Display result in the input field
    document.getElementById("number-input").value = result;

    // Call fill_info() to update the information field
    fill_info("Modulo", result);
};

// Function to calculate the factorial
const fact = () => {
    const input = document.getElementById("number-input").value;
    const validationResult = validate(input); // Validate input
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        return;
    }

    if (isCSV(input)) {
        showError("Error: Cannot perform factorial operation on CSV input.");
        document.getElementById("number-input").value = "";
        return;
    }

    const number = parseInt(input);

    if (number < 0) {
        showError("Error: Factorial is not defined for negative numbers.");
        document.getElementById("number-input").value = ""; // Clear the input field
        return;
    }

    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }

    // Display result in the input field
    document.getElementById("number-input").value = result;

    // Call fill_info() to update the information field
    fill_info("Factorial", result);
};

// Function to calculate exponentiation
const exponentiate = () => {
    const baseInput = document.getElementById("number-input").value;
    const exponentInput = document.getElementById("exponent-input").value;

    // Check if base input is valid
    const validationResult = validate(baseInput); // Validate input
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        return;
    }

    // Check if base input is CSV
    if (isCSV(baseInput)) {
        showError("Error: Cannot perform exponentiation on CSV input.");
        document.getElementById("number-input").value = "";
        return;
    }

    // Parse base number
    const base = parseFloat(baseInput);

    // Check exponent input
    if (exponentInput.trim() === "") {
        // Use default exponent of 2 if input is empty
        const exponent = 2;

        // Calculate result
        const result = Math.pow(base, exponent);

        // Display result in the input field
        document.getElementById("number-input").value = result;

        // Call fill_info() to update the information field
        fill_info("Exponentiation", result);
        
        // Clear the exponent input field
        document.getElementById("exponent-input").value = "";
    } else {
        const exponent = parseFloat(exponentInput);
        
        // Validate exponent input
        if (isNaN(exponent)) {
            showError("Error: Invalid exponent input. Please enter a valid number.");
            document.getElementById("exponent-input").value = ""; // Clear exponent input field
            document.getElementById("exponent-input").focus();
            return;
        }

        // Calculate result
        const result = Math.pow(base, exponent);

        // Display result in the input field
        document.getElementById("number-input").value = result;

        // Call fill_info() to update the information field
        fill_info("Exponentiation", result);
        
        // Clear the exponent input field
        document.getElementById("exponent-input").value = "";
    }
};


// Function to handle binary operation results
const handleBinaryOperation = (op, secondNumber) => {
    let result;
    if (op === "addition") {
        result = firstNumber + secondNumber;
        fill_info("Addition", result);
    } else if (op === "multiplication") {
        result = firstNumber * secondNumber;
        fill_info("Multiplication", result);
    }

    // Display result in the input field
    document.getElementById("number-input").value = result;

    // Reset the operator and first number
    firstNumber = null;
    operator = null;
};

// Event listeners for the buttons
document.getElementById("addition").addEventListener("click", () => setOperator("addition"));
document.getElementById("multiplication").addEventListener("click", () => setOperator("multiplication"));

// Function to set the first number and operator for binary operations
const setOperator = (op) => {
    const input = document.getElementById("number-input").value;
    const validationResult = validate(input); // Validate input
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        return;
    }

    if (isCSV(input)) {
        showError(`Error: Cannot set ${op} operator on CSV input.`);
        return;
    }

    firstNumber = parseFloat(input);
    operator = op;
    document.getElementById("number-input").value = ""; // Clear input for next number
    document.getElementById("number-input").focus(); // Focus on the input field for new number
};

// Function to calculate the result of the binary operation
const eq = () => {
    const input = document.getElementById("number-input").value;
    const validationResult = validate(input); // Validate input
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        return;
    }

    if (isCSV(input)) {
        showError("Error: Cannot perform operation on CSV input.");
        document.getElementById("number-input").value = "";
        return;
    }

    // Check if operator and firstNumber are set
    if (firstNumber === null || operator === null) {
        // If not set, simply return the current number and provide an info message
        document.getElementById("number-input").value = input;
        fill_info("Current Number", parseFloat(input));
        return;
    }

    const secondNumber = parseFloat(input);
    handleBinaryOperation(operator, secondNumber);
};

// Function to calculate the sum of values from CSV input
const sum = () => {
    showLoading();
    const input = document.getElementById("number-input").value;
    const validationResult = validate(input);
    
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        hideLoading();
        return;
    }

    const values = input.split(',').map(Number); // Convert CSV to an array of numbers
    const result = values.reduce((acc, curr) => acc + curr, 0); // Sum all values

    // Display result in the input field
    document.getElementById("number-input").value = result;

    // Call fill_info() to update the information field
    fill_info("Sum", result); // Indicate that the list of values has been summed up
    hideLoading();
};

// Function to sort values from CSV input
const sortCSV = () => {
    showLoading();
    const input = document.getElementById("number-input").value;
    const validationResult = validate(input);
    
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        hideLoading();
        return;
    }

    const values = input.split(',').map(Number).sort((a, b) => a - b); // Sort values

    // Display sorted values in the input field
    document.getElementById("number-input").value = values.join(',');

    // Call fill_info() to update the information field
    fill_info("Sort", "List of values sorted.");
    hideLoading();
};

// Function to reverse values from CSV input
const reverseCSV = () => {
    showLoading();
    const input = document.getElementById("number-input").value;
    const validationResult = validate(input);
    
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        hideLoading();
        return;
    }

    const values = input.split(',').map(Number).reverse(); // Reverse values

    // Display reversed values in the input field
    document.getElementById("number-input").value = values.join(',');

    // Call fill_info() to update the information field
    fill_info("Reverse", "List of values reversed.");
    hideLoading();
};

// Function to show the pop-up window for removing a specific element
const showRemovePopup = () => {
    const popup = document.getElementById("remove-popup");
    popup.style.display = "block";
    document.getElementById("remove-index").focus();
};

// Function to hide the pop-up window
const hideRemovePopup = () => {
    const popup = document.getElementById("remove-popup");
    popup.style.display = "none";
    document.getElementById("remove-index").value = "";
};

// Function to remove a specific element by index
const removeSpecificElement = () => {
    showLoading();
    const input = document.getElementById("number-input").value;
    const validationResult = validate(input);
    
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        hideRemovePopup();
        hideLoading();
        return;
    }

    const values = input.split(',').map(Number); // Convert CSV to an array of numbers
    
    // Get the index from the pop-up input
    const index = parseInt(document.getElementById("remove-index").value) - 1; // Convert 1-based index to 0-based
    
    if (isNaN(index) || index < 0 || index >= values.length) {
        // Hide the pop-up window before showing the error message
        hideRemovePopup();

        // Define error message
        const errorMessage = `Invalid index. Please enter a number between 1 and ${values.length}.`;

        // Show error message in the information field
        fill_info("Error", errorMessage);

        // Log the error
        showError(errorMessage);  
        hideLoading();
        
        return;
    }

    // Remove the specific element
    values.splice(index, 1);

    // Update the input field with the new CSV list
    document.getElementById("number-input").value = values.join(',');

    // Update the information field with success message
    fill_info("Remove Specific Element", `Element at index ${index + 1} removed successfully.`);
    
    // Hide the pop-up window
    hideRemovePopup();
    hideLoading();
};

// Average function with validation
const average = () => {
    showLoading();
    const input = document.getElementById("number-input").value;
    const validationResult = validate(input);
    
    if (!validationResult.isValid) {
        handleInvalidInput(validationResult);
        hideLoading();
        return;
    }

    const values = input.split(',').map(Number); // Convert CSV to an array of numbers
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    const result = sum / values.length; // Calculate average

    // Display result in the input field
    document.getElementById("number-input").value = result;

    // Call fill_info() to update the information field
    fill_info("Average", result); // Indicate that the average has been calculated
    hideLoading();
};

// Function to update the information field based on the result
const fill_info = (operation, result) => {
    const info = document.getElementById("info");

    if (operation === "Input") {
        info.textContent = `Input: ${result}`;
        return;
    }

    if (operation === "Sum") {
        info.textContent = "List of values summed up.";
        return;
    }

    if (typeof result === "number") {
        let message = `Operation: ${operation}. `;
        if (result < 100) {
            message += "Result is less than 100.";
        } else if (result >= 100 && result <= 200) {
            message += "Result is between 100 and 200.";
        } else {
            message += "Result is greater than 200.";
        }
        info.textContent = message;
    } else {
        info.textContent = result; // For non-numeric results
    }
};


// Event listeners for the buttons
document.getElementById("square-btn").addEventListener("click", squareNumber);
document.getElementById("square-root").addEventListener("click", squareRoot);
document.getElementById("modulo").addEventListener("click", mod);
document.getElementById("factorial").addEventListener("click", fact);
document.getElementById("exponentiation").addEventListener("click", exponentiate);
document.getElementById("equal").addEventListener("click", eq);
document.getElementById("sum").addEventListener("click", sum);
document.getElementById("sort").addEventListener("click", sortCSV);
document.getElementById("reverse").addEventListener("click", reverseCSV);
document.getElementById("average").addEventListener("click", average);
document.getElementById("remove-element").addEventListener("click", showRemovePopup);
document.getElementById("confirm-remove").addEventListener("click", removeSpecificElement);
document.getElementById("cancel-remove").addEventListener("click", hideRemovePopup);

// Clear button functionality
document.getElementById('clear-input').addEventListener('click', function() {
    document.getElementById('number-input').value = ''; // Clear the input field
    document.getElementById('info').innerText = 'Information about the number'; // Reset info field
    document.getElementById('exponent-input').value = ''; 
});
