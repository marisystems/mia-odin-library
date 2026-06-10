const myLibrary = [];

function Book(title, author, pages, read, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.cover = cover;
    if (read) {
        this.read = "read";
    } else {
        this.read = "not read yet";
    }
    this.info = function() {
        return `${this.title} by ${this.author}. ${this.pages} pages, ${this.read}.`;
    }
};

function addBookToLibrary(title, author, pages, read, cover) {
    let book = new Book(title, author, pages, read, cover);
    myLibrary.push(book);
}

function getDatafromForm() {
    // Kind of dumb way to do it, but I was getting tripped up
    // with the nodelist from querySelectorAll
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let cover = document.querySelector("#cover-img").value;
    let read = document.querySelector("#radio-yes").checked;

    addBookToLibrary(title, author, pages, read, cover);
}

// Add function to iterate over books in array and display
// them on the page
function displayBooks(library) {

    library.forEach( (book)=> {

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
    getDatafromForm();
    console.log(myLibrary)
})

