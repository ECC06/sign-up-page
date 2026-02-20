const form = document.querySelector("form");

const phoneInput = document.querySelector("#phone-number");

const check1 = document.querySelector("#check1");
const check2 = document.querySelector("#check2");

const createPasswordInput = document.querySelector("#create-pswd");
const createPasswordCriteria = document.querySelector(".create-pswd-criteria");

const confirmPasswordInput = document.querySelector("#confirm-pswd");
const confirmMatch = document.querySelector(".confirm-match");
const dontText = document.querySelector(".confirm-match span");

const confirmLengthElem = document.querySelector(".confirm-length");
const confirmUppercaseElem = document.querySelector(".confirm-uppercase");
const confirmSpecialCharElem = document.querySelector(".confirm-special-char");

const [closedEye1, closedEye2] = document.querySelectorAll(".eye-icon.closed");
const [openedEye1, openedEye2] = document.querySelectorAll(".eye-icon.opened");

let initialPswd = null;
let passwordSecure = false;
let passwordsIdentical = false;
let phoneNumberCorrect = false;

//displays the confirmation text when the user focuses on the input element
createPasswordInput.addEventListener("focus", (e) => {
    createPasswordCriteria.classList.remove("hidden");

    turnBordersRed();
});

confirmPasswordInput.addEventListener("focus", function (e) {
    if (!initialPswd) {
        this.readOnly = true;
    } else {
        this.readOnly = false;
        confirmMatch.classList.remove("hidden");
    }
});

//hides the confirmation text when the user focuses out of the input element
createPasswordInput.addEventListener("blur", function (e) {
    // createPasswordCriteria.classList.add("hidden");

    initialPswd = this.value.trim();
});

confirmPasswordInput.addEventListener("blur", (e) => {
    // confirmMatch.classList.add("hidden");
});

//toggles between hiding and showing the password icons
form.addEventListener("change", (e) => {
    if (e.target.id === "check1") {
        //hides and shows the icons
        closedEye1.classList.toggle("hidden");
        openedEye1.classList.toggle("hidden");

        // hides and shows the password text
        check1.checked
            ? (createPasswordInput.type = "text")
            : (createPasswordInput.type = "password");
    } else if (e.target.id === "check2") {
        //hides and shows the icons
        closedEye2.classList.toggle("hidden");
        openedEye2.classList.toggle("hidden");

        // hides and shows the password text
        check2.checked
            ? (confirmPasswordInput.type = "text")
            : (confirmPasswordInput.type = "password");
    }
});

// visually indicates to the user if the criteria for setting a password is being met
createPasswordInput.addEventListener("input", function (e) {
    const userInput = this.value.trim();

    const lengthCondition = userInput.length >= 8;
    confirm(lengthCondition, confirmLengthElem);

    const upperCaseRegex = /[A-Z]/; //tests for at least 1 uppercase value
    const upperCaseCondition = upperCaseRegex.test(userInput);
    confirm(upperCaseCondition, confirmUppercaseElem);

    const specialCharRegex = /[^a-zA-Z0-9\s]/;
    const specialCharCondition = specialCharRegex.test(userInput);
    confirm(specialCharCondition, confirmSpecialCharElem);

    const confirmFunctionReturnValues = [
        confirm(lengthCondition, confirmLengthElem),
        confirm(upperCaseCondition, confirmUppercaseElem),
        confirm(specialCharCondition, confirmSpecialCharElem),
    ];

    const allCriteriaMet = confirmFunctionReturnValues.every(
        (func) => func === true,
    ); //

    if (allCriteriaMet) {
        passwordSecure = true;
    }

    function confirm(condition, confirmElem) {
        if (condition) {
            confirmElem.classList.remove("red");
            confirmElem.classList.add("green");
            return true;
        } else {
            confirmElem.classList.remove("green");
            confirmElem.classList.add("red");
            return false;
        }
    }
});

//visually indicates to the user if their first password and the confirmed one are the same
confirmPasswordInput.addEventListener("input", function (e) {
    if (initialPswd.trim() === this.value.trim()) {
        confirmMatch.classList.remove("red");
        confirmMatch.classList.add("green");
        dontText.classList.add("hidden");

        passwordsIdentical = true;
    } else {
        confirmMatch.classList.add("red");
        confirmMatch.classList.remove("green");
        dontText.classList.remove("hidden");

        function turnBordersRed() {
            createPasswordInput.style.outline = "1.5px solid var(--error-red)";
            confirmPasswordInput.style.outline = "1.5px solid var(--error-red)";
        }

        turnBordersRed();
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkPhoneNumber();

    if (passwordsIdentical && passwordSecure && phoneNumberCorrect) {
        alert("Now, check your email for a link to the payment portal");
    } else {
        alert("Please, check that your password input meets the criteria");
    }

    function checkPhoneNumber() {
        const numberRegex =
            /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

        if (numberRegex.test(phoneInput.value)) {
            phoneNumberCorrect = true;
        }
    }
});
