const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    if (read) {
        this.read = "read";
    } else {
        this.read = "not read yet";
    }
    this.info = function() {
        return `${this.title} by ${this.author}. ${this.pages} pages, ${this.read}.`;
    }
};

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function getDatafromForm() {
    //Get node list
    let formNodes = document.querySelectorAll("#add-book-form input");
    console.log(formNodes);
    // Reduce it into an object
}

// Add function to iterate over books in array and display
// them on the page
function displayBooks(library) {

    library.forEach( (book)=> {
        console.log(book)

        // Build the book card html elements dynamically
        let cardWrapper = document.createElement("div")
        cardWrapper.classList.add ("book-card-wrapper");

        let card = document.createElement("div")
        card.classList.add ("book-card")

        let title = document.createElement("p")
        title.textContent = book.title;

        cardWrapper.appendChild(card);
        cardWrapper.appendChild(title)
        bookGrid.appendChild(cardWrapper)
    })
    
}

addBookToLibrary("Wuthering Heights", "sus", 210, true)
addBookToLibrary("Fahrenheit 451", "sus", 210, true)
addBookToLibrary("Some cool book", "sus", 210, true)

let bookGrid = document.querySelector(".bottom")


displayBooks(myLibrary)
getDatafromForm()

// Modal
let addBook = document.querySelector(".add-book");
let addModal = document.querySelector(".add-modal");
let closeModal = document.querySelector(".close-modal");


// Open the add book modal
addBook.addEventListener("click", () => { 
    addModal.showModal();
});
// Close the add book modal
closeModal.addEventListener("click", (e) => {
    addModal.close();
})

