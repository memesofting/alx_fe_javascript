const defaultQuotes = [{quoteText: 'life is good', Category: 'life'}];
const quotes = JSON.parse(localStorage.getItem('quotes')) || defaultQuotes;

const showQuoteButton = document.getElementById('showNewQuote');
const createQuoteButton = document.getElementById('createQuote')

const quoteTxt = document.createElement('input');
const quoteCategory = document.createElement('input');
const addQuoteButton = document.createElement('button');

const filter = document.getElementById('categoryFilter');

const exportButton = document.getElementById('exportQuotes');

function showRandomQuote() {
    const quoteList = document.getElementById('quoteList');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selected = quotes[randomIndex];

    const quote = document.createElement('li');
    quote.innerHTML = `${selected.quoteText} - ${selected.Category}`;
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

function addQuote(e) {
    e.preventDefault();
    const newQuote = {
        quoteText: quoteTxt.value.trim(),
        Category: quoteCategory.value.trim(), 
    }
    
    if (!newQuote.quoteText || !newQuote.Category) {
        alert('Quote and category cannot be empty');
        return
    }
    
    quotes.push(newQuote);
    
    // get existing quotes
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || defaultQuotes;
    storedQuotes.push(newQuote);

    const quotesJson = JSON.stringify(storedQuotes);
    localStorage.setItem('quotes', quotesJson);

    console.log(quotes);
    console.log(quotesJson);
    
    quoteTxt.value = '';
    quoteCategory.value = '';
}

addQuoteButton.addEventListener('click', addQuote);

function exportToJsonFile() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || defaultQuotes;

    const quotesJson = JSON.stringify(storedQuotes, null, 2);

    const quoteBlob = new Blob([quotesJson], {type: 'application/json'});
    const quoteFileUrl = URL.createObjectURL(quoteBlob);

    const a = document.createElement('a');
    a.href = quoteFileUrl;
    a.download = 'quotes.json';
    document.body.appendChild(a)
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(quoteFileUrl);
}

exportButton.addEventListener('click', exportToJsonFile);

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        const existingQuotes = JSON.parse(localStorage.getItem('quotes')) || defaultQuotes;
        const allQuotes = [...existingQuotes, ...importedQuotes];
        localStorage.setItem('quotes', JSON.stringify(allQuotes));

        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

function populateCategories() {
    const categories = [... new Set(quotes.map(quote => quote.Category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        filter.appendChild(option);
    });
    console.log(categories);
}

populateCategories();

function filterQuotes() {
    const displayQuotes = document.getElementById('quoteDisplay')
    const selectedCategory = filter.value;

    displayQuotes.innerHTML = '';

    
    const filteredQuotes = quotes.filter((quote) => {
        if (selectedCategory === 'all')
            {
                return true;
            } else {
                return quote.Category === selectedCategory;
            }
        })
        
        console.log('Filtered quotes', filteredQuotes);
        
        filteredQuotes.forEach(fquote => {
            const selectedQuotes = document.createElement('div');
            const quoteText = document.createElement('p');
            const quoteCategory = document.createElement('p');
            
            selectedQuotes.id = 'selectedQuote'
            quoteText.id = 'quoteText';
            quoteCategory.id = 'quoteCategory';

            quoteText.textContent = fquote.quoteText;
            quoteCategory.textContent = fquote.Category;

            selectedQuotes.appendChild(quoteText);
            selectedQuotes.appendChild(quoteCategory);
        
            displayQuotes.appendChild(selectedQuotes);
    })

};
