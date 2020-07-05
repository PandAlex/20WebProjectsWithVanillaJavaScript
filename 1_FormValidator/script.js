/* Get DOM Elements */
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

/** 
 * Show input error message
 * @param {HTMLInputElement} input
 * @param {string} message
 */
const showError = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

/** 
 * Show input success message
 * @param {HTMLInputElement} input
 */
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

/**
 * Check email
 * @param {HTMLInputElement} input
 */
const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

/**
 * Check required fields
 * @param {Array<HTMLInputElement>} inputElements
 */
const checkRequired = (inputElements) => {
    inputElements.forEach( input => {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

/**
 * Check field's input length
 * @param {HTMLInputElement} input
 * @param {Number} min
 * @param {Number} max
 */
const checkLength = (input, min, max) => {
    const inputLength = input.value.trim().length;
    if(inputLength < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters.`)
    } else if(inputLength > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

/**
 * Check passwords match
 * @param {HTMLInputElement} passwordInput
 * @param {HTMLInputElement} passwordConfirmInput
 */
const checkPasswordsMatch = (passwordInput, passwordConfirmInput) => {
    if(passwordInput.value !== passwordConfirmInput.value) {
        showError(passwordConfirmInput, 'Passwords do not match!');
    } else {
        showSuccess(passwordConfirmInput);
    }
}


/**
 * Get field name from field's id
 * @param {HTMLInputElement} input
 */
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function a(x) {
    console.log(arguments);
    console.log('a: ' + this.x);
}


function b(x) {
    console.log('b: ' + x);
}

const applyAll = (fns) => {
    fns.forEach(fn => {
        fn();
    }) 
}

/* Event Listeners */
form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);

    applyAll([a.bind({x: 1}), b.bind(2)])

})