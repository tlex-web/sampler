const contents = document.querySelectorAll('.section');
const listItems = document.querySelectorAll('nav ul li');

listItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        hideAllContents();
        hideAllItems();

        // activate list item
        item.classList.add('active');

        // display content
        contents[index].classList.add('show');
        contents[index].classList.remove('hide');
    });
});

function hideAllContents() {
    contents.forEach(content => {
        content.classList.remove('show');
        content.classList.add('hide');
    });
}

function hideAllItems() {
    listItems.forEach(item => {
        item.classList.remove('active');
    });
}
