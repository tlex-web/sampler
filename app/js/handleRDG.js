const formRDG = document.querySelector('#rdg-form');

formRDG.addEventListener('submit', e => {
    e.preventDefault();

    const min = document.querySelector('#min').value;
    const max = document.querySelector('#max').value;
    const count = document.querySelector('#count').value;

    const result = '';

    const resultElement = document.querySelector('.prng-output');
    resultElement.innerHTML = result;
});
