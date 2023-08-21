const PRNG = require('./PRNG');

const form = document.querySelector('.prng-form');

form.addEventListener('submit', e => {
    e.preventDefault();

    const prng = new PRNG();

    const min = document.querySelector('#min').value;
    const max = document.querySelector('#max').value;
    const count = document.querySelector('#count').value;

    const result = prng.generate(min, max, count);

    const resultElement = document.querySelector('.prng-output');
    resultElement.innerHTML = result;
});
