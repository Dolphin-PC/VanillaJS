const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

function handleSubmit(event) {
    event.preventDefault();

    checkRequired([username, email, password, confirmPassword]);
    checkLength(username, 3, 15);
    checkLength(password, 3, 15);
    checkEmail(email);
    checkConfirmPassword(password, confirmPassword);
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min}`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max}`);
    }
}
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, `${getFieldName(input)} is not Invalid`);
    }
}
function checkConfirmPassword(input, confirmInput) {
    if (input.value !== confirmInput.value) {
        showError(confirmInput, `${getFieldName(confirmInput)} is not Match`);
    } else {
        showSuccess(confirmInput);
    }
}
function checkRequired(inputArr) {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is Required`);
        } else {
            showSuccess(input);
        }
    });
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;
    formControl.className = 'form-control error';
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
form.addEventListener('submit', handleSubmit);
