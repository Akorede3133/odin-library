const closeBtn = document.querySelector('.fa-close');
const barsBtn = document.querySelector('.fa-bars');
const nav = document.querySelector('header .nav');
const addBtn = document.querySelector('.nav .add');
const form = document.querySelector('form');
const formBtn = document.querySelector('form button');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const overLay = document.querySelector('.overlay');
const main = document.querySelector('main');
const formCloseBtn = document.querySelector('form .fa-close');
const checkbox = document.querySelector('form .checkbox input');
let myLibrary = [];

/****---FUNCTIONS---****/
function Book(title, author, pages, id) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.id = id;
}
function addBookToLibrary() {
    // do stuff here
    let count = myLibrary.length + 1;
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let book = new Book(title, author, pages, count);
    myLibrary = [...myLibrary, book];
} 
function createElement(detail) {
    let checked = checkbox.checked ? 'checked' : '';
    let elem = `<section class="book" data-id=${detail.id}>
        <i class="fa-solid fa-close"></i>
        <p class="title">${detail.title}</p>
        <ul class="info">
            <li class="author"><span>Author</span>: ${detail.author}</li>
            <li class="pages"><span>Pages</span>: ${detail.pages}</li>
        </ul>
        <article class="read-container">
            <fieldset>
                <legend>Read?</legend>
                <label for="yes">Yes</label>
                <input type="radio" name="read" id="yes" ${checked}>
                <label for="no">No</label>
                <input type="radio" name="read" id="no">
            </fieldset>
        </article>
    </section>`;
    return elem;
}
function updateDOM(lib) {
    main.innerHTML ='';
    lib.forEach(item => {
    let elem = createElement(item);
    main.insertAdjacentHTML('beforeend', elem);
    const closeBtn = main.querySelectorAll('.fa-close');
    closeBtn.forEach(btn => {
        btn.addEventListener('click', (e)=> {
            let parentId = e.currentTarget.parentElement.dataset.id;
            console.log(parentId);
            myLibrary = myLibrary.filter(item=> {
                if(item.id != parentId) {
                    return item;
                }
            })
            updateDOM(myLibrary);
        })
    })
    })
}
function closeForm() {
    form.classList.add('hide-form');
    nav.classList.add('hide-nav');
    overLay.classList.add('hide-overlay');
    titleInput.value = '';
    pagesInput.value = '';
    authorInput.value = '';
    checkbox.checked = false;
}
/*****---EVENT LISTENERS---*****/
formBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    if (!titleInput.value || !authorInput.value || !pagesInput.value) {
        return;
    }
    addBookToLibrary();
    updateDOM(myLibrary);
    closeForm();
})
closeBtn.addEventListener('click', ()=> {
    nav.classList.toggle('hide-nav');
})
barsBtn.addEventListener('click', ()=> {
    nav.classList.remove('hide-nav');
})
addBtn.addEventListener('click', ()=> {
    titleInput.focus();
    form.classList.remove('hide-form');
    nav.classList.add('hide-nav');
    overLay.classList.remove('hide-overlay');
})
formCloseBtn.addEventListener('click', closeForm);

















