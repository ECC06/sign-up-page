const createPswdInput = document.querySelector("#create-pswd");
const options = document.querySelector("#create-pswd-options");
const checkbox = document.querySelector("#check");

//displays the password confirmation text when the user tries to set a password
createPswdInput.addEventListener("focus", function (e) {
    options.classList.remove("hidden");
});

//displays the password confirmation text when the user focuses out of setting a password
createPswdInput.addEventListener("blur", function (e) {
    // options.classList.add("hidden");
});

checkbox.addEventListener("change", function (e) {
    (this.checked) ? createPswdInput.type = "text" : createPswdInput.type = "password";
});

// visually indicates to the user if the criteria for setting a password is being met
createPswdInput.addEventListener("input", function (e) {
    const userInput = createPswdInput.value.trim();

    const confirmLengthElem = options.querySelector(".confirm-length"); 
    const lengthCondition = userInput.length >= 8;
    confirm(lengthCondition, confirmLengthElem);

    const confirmUppercaseElem = options.querySelector(".confirm-uppercase"); 
    const upperCaseRegex = /[A-Z]/; //tests for at least 1 uppercase value
    const upperCaseCondition = upperCaseRegex.test(userInput);
    confirm(upperCaseCondition, confirmUppercaseElem);

    const confirmSpecialCharElem = options.querySelector(".confirm-special-char"); 
    const specialCharRegex = /[^a-zA-Z0-9\s]/;
    const specialCharCondition = specialCharRegex.test(userInput);
    confirm(specialCharCondition, confirmSpecialCharElem);

    function confirm(condition, confirmElem) {
        if (condition) {
            confirmElem.classList.remove("red");
            confirmElem.classList.add("green");
        } else {
            confirmElem.classList.remove("green");
            confirmElem.classList.add("red");
        }
    }

});



