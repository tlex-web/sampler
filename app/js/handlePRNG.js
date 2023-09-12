const PRNG = require('./PRNG');

const formPRNG = document.querySelector('#prng-form');

formPRNG.addEventListener('submit', e => {
    e.preventDefault();

    const prng = new PRNG();

    const min = document.querySelector('#min').value;
    const max = document.querySelector('#max').value;
    const count = document.querySelector('#count').value;

    const result = prng.generate(min, max, count);

    const resultElement = document.querySelector('.prng-output');
    resultElement.innerHTML = result;
});
