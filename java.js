@media (max-width: 768px) {
    .calculator {
        width: 90%; /* Adjust width for mobile */
        padding: 10px; /* Reduce padding */
    }

    h1 {
        font-size: 28px; /* Reduce font size for the title */
    }

    h2 {
        font-size: 12px; /* Reduce font size for section headings */
    }

    input[type="text"],
    #exponent-input {
        width: 100%; /* Make input fields full width */
        font-size: 14px; /* Reduce font size */
    }

    button {
        width: 100%; /* Make buttons full width */
        height: 50px; /* Adjust button height */
        font-size: 14px; /* Reduce font size */
    }

    .button-section {
        flex-direction: column; /* Stack buttons vertically */
        align-items: stretch; /* Stretch buttons to full width */
    }

    .button-container1,
    .button-container3,
    .csv-button-container {
        flex-direction: column; /* Stack buttons vertically */
        width: 100%; /* Make containers full width */
    }

    .button-container1 button,
    .button-container3 button {
        width: 100%; /* Make buttons full width */
        height: 50px; /* Adjust button height */
        margin-bottom: 10px; /* Add margin between buttons */
    }

    #remove-popup {
        width: 80%; /* Make popup narrower */
        padding: 15px; /* Adjust padding */
    }
}
