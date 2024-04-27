const inTypesSelect = document.querySelector('#in-types');
const outTypesSelect = document.querySelector('#out-types');
const inputs = document.querySelectorAll('input[type="text"]');
const inValueInput = document.querySelector('#in-value')
const outValueInput = document.querySelector('#out-value')
const resultP = document.querySelector('.result');

const celsiusToFahrenheit = (celsius) => {
    return ((celsius * 9/5) + 32).toFixed(2);
};

const fahrenheitToCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5/9).toFixed(2);
};

const checkIndex = (a, b) => {
    if(a.selectedIndex === 0) {
        b.selectedIndex = 1;
    } else {
        b.selectedIndex = 0;
    };
};

const cleanInputs = () => {
    inputs.forEach((input) => {
        input.value = '';
    });
};

const justNumbersAndDots = (value) => {
    if(value.target.value !== '/^\d+(\.\d+)?$/') {
        value.preventDefault();
    }
}

const condition = (e) => {
    return e.key >= '0' && e.key <= '9' || e.key === '.' || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft' || e.key === 'ArrowRight';
}

inTypesSelect.addEventListener('input', (e) => {
    cleanInputs();
    checkIndex(inTypesSelect, outTypesSelect);
});

outTypesSelect.addEventListener('input', (e) => {
    cleanInputs();
    checkIndex(outTypesSelect, inTypesSelect);
});

inValueInput.addEventListener('click', () => {
    cleanInputs();
});

outValueInput.addEventListener('click', () => {
    cleanInputs();
});

inValueInput.addEventListener('keydown', (e) => {
    if(!condition(e)) e.preventDefault();
});

outValueInput.addEventListener('keydown', (e) => {
    if(!condition(e)) e.preventDefault();
});

inValueInput.addEventListener('keyup', (e) => {
    justNumbersAndDots(e);
    if(inTypesSelect.value === 'celsius') {
        outValueInput.value = celsiusToFahrenheit(e.target.value);
    } else {
        outValueInput.value = fahrenheitToCelsius(e.target.value);
    }
    if(e.target.value === '') cleanInputs();
});

outValueInput.addEventListener('keyup', (e) => {
    justNumbersAndDots(e);
    if(inTypesSelect.value === 'fahrenheit') {
        inValueInput.value = celsiusToFahrenheit(e.target.value);
    } else {
        inValueInput.value = fahrenheitToCelsius(e.target.value);
    }
    if(outValueInput.value === '') cleanInputs();
});