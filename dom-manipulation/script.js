const quoteObj = [{"quoteText": 'life is good', "Category": 'life'}];
const showQuoteButton = document.getElementById('newQuote');
const createQuoteButton = document.getElementById('createQuote')

const quoteTxt = document.createElement('input');
const quoteCategory = document.createElement('input');
const addQuoteButton = document.createElement('button');

function showRandomQuote() {
    const quoteList = document.getElementById('quoteList');
    const randomIndex = Math.floor(Math.random() * quoteObj.length);
    const selected = quoteObj[randomIndex];

    const quote = document.createElement('li');
    quote.textContent = `${selected.quoteText} - ${selected.Category}`;
    quoteList.appendChild(quote);
}

showQuoteButton.addEventListener('click', showRandomQuote);

function createAddQuoteForm() {
    const addQuoteForm = document.getElementById('addQuoteForm');

    quoteTxt.id = 'quoteText';
    quoteCategory.id = 'category';
    addQuoteButton.id = 'addQuote';
    addQuoteButton.textContent = 'Add Quote'

    addQuoteForm.appendChild(quoteTxt);
    addQuoteForm.appendChild(quoteCategory);
    addQuoteForm.appendChild(addQuoteButton);

    quoteTxt.value = '';
    quoteCategory.value = '';
}

createQuoteButton.addEventListener('click', createAddQuoteForm);

addQuoteButton.addEventListener('click', function(e) {
    e.preventDefault();

    const newQuote = {
        quoteText: quoteTxt.value.trim(),
        Category: quoteCategory.value.trim(), 
    }
})