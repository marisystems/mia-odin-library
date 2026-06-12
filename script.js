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
    if (title !== "") {
        myLibrary.push(book);
    }
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
    let bookGrid = document.querySelector(".bottom");
    // Clear all the previous entries
    bookGrid.innerHTML = "";

    library.forEach( (book)=> {

        // Build the book card html elements dynamically
        let cardWrapper = document.createElement("div");
        cardWrapper.classList.add("book-card-wrapper");        

        let card = document.createElement("div");
        card.classList.add ("book-card");
        card.dataset.id = book.id;

        let title = document.createElement("p");
        title.textContent = book.title;

        cardWrapper.appendChild(card);
        cardWrapper.appendChild(title);
        bookGrid.appendChild(cardWrapper);
    })
    
}

function displayBookInfo(datasetId) {
    let titleDisplay = document.querySelector("#title-display")
    let authorDisplay = document.querySelector("#author-display")
    let pagesDisplay = document.querySelector("#pages-display")
    let readDisplay = document.querySelector("#read-display")
    let coverDisplay = document.querySelector(".cover")

    // Using the id get the corresponding book
    myLibrary.forEach( (book) => {
    if (datasetId === book.id) {
        console.log("Aaaa")
    } else {
        console.log("Book not found")
        return
    }
});
    // Display on the fields the information about the book
}

addBookToLibrary("Wuthering Heights", "sus", 210, true);
addBookToLibrary("Fahrenheit 451", "sus", 210, true);
addBookToLibrary("Some cool book", "sus", 210, true);


displayBooks(myLibrary);

// Modal
let addBook = document.querySelector(".add-book");
let dialogElement = document.querySelector("dialog");
let closeModal = document.querySelector(".close-modal");


// Open the add book modal
addBook.addEventListener("click", () => { 
    dialogElement.showModal();
});
// Close the add book modal
closeModal.addEventListener("click", (e) => { 
    e.preventDefault();
    let form = document.querySelector("#add-book-form");
    if (!form.checkValidity()) {
        form.reportValidity();
        return
    }
    // Extract info and update
    getDatafromForm();
    displayBooks(myLibrary);

    // Clear the fields after getting the info and close modal
    form.reset();
    dialogElement.close();


    console.log(myLibrary)
})

let bookGrid = document.querySelector(".bottom");

bookGrid.addEventListener("click", (event)  => {
    if (event.target.className == "book-card") {
        let datasetId = event.target.dataset.id
        displayBookInfo(datasetId);
    }

    // displayBookInfo(even)
})

