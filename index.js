const form = document.querySelector("form");

const createPasswordCriteria = document.querySelector("#create-pswd-criteria");

const check1 = document.querySelector("#check1");
const check2 = document.querySelector("#check2");


const createPasswordInput = document.querySelector("#create-pswd");
const confirmPasswordInput = document.querySelector("#confirm-pswd");

const confirmLengthElem = document.querySelector(".confirm-length"); 
const confirmUppercaseElem = document.querySelector(".confirm-uppercase"); 
const confirmSpecialCharElem = document.querySelector(".confirm-special-char"); 

const confirmMatch = document.querySelector(".confirm-match"); 
const dontText = document.querySelector(".confirm-match span"); 

const lockedIcons = document.querySelectorAll(".locked-icon"); 
const unlockedIcons = document.querySelectorAll(".unlocked-icon"); 

let initialPswd = null;

//displays the confirmation text when the user focuses on the input element
createPasswordInput.addEventListener("focus", function (e) {
    createPasswordCriteria.classList.remove("hidden");
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
    createPasswordCriteria.classList.add("hidden");

    initialPswd = this.value.trim();

});

confirmPasswordInput.addEventListener("blur", function (e) {

    confirmMatch.classList.add("hidden");

});

//toggles between hiding and showing the password text 
form.addEventListener("change", function (e) {
    e.preventDefault();

    if (e.target.id === "check1") {
        //hides and shows the icons
        lockedIcons[0].classList.toggle("hidden");
        unlockedIcons[0].classList.toggle("hidden");

        // hides and shows the password text
        (check1.checked) ? createPasswordInput.type = "text" : createPasswordInput.type = "password";
    } else if (e.target.id === "check2") {
        //hides and shows the icons
        lockedIcons[1].classList.toggle("hidden");
        unlockedIcons[1].classList.toggle("hidden");

        // hides and shows the password text
        (check2.checked) ? confirmPasswordInput.type = "text" : confirmPasswordInput.type = "password";
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

//visually indicates to the user if their first password and the confirmed one are the same
confirmPasswordInput.addEventListener("input", function (e) {
    if (initialPswd.trim() === this.value.trim()) {
        confirmMatch.classList.remove("red");
        confirmMatch.classList.add("green");
        dontText.classList.add("hidden");
    } else {
        confirmMatch.classList.add("red");
        confirmMatch.classList.remove("green");
        dontText.classList.remove("hidden");
    }
});


