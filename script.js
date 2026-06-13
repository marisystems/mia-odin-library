const myLibrary = [];

// Make all query selectors accessible globally
// Form
let formTitle = document.querySelector("#title").value;
let formAuthor = document.querySelector("#author").value;
let formPages = document.querySelector("#pages").value;
let formRead = document.querySelector("#radio-yes").checked;
let formCover = document.querySelector("#cover-img").files;

// Info Display
let infoTitle = document.querySelector("#title-display");
let infoAuthor = document.querySelector("#author-display");
let infoPages = document.querySelector("#pages-display");
let infoRead = document.querySelector("#read-display");
let infoCover = document.querySelector(".cover");

// Grid Display
let bookGrid = document.querySelector(".bottom");

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
    addBookToLibrary(formTitle, formAuthor, formPages, formRead, formCover);
}

function displayBooks(library) {
    // Clear all the previous entries
    bookGrid.innerHTML = "";

    library.forEach( (book)=> {

        // Build the book card html elements dynamically
        let cardWrapper = document.createElement("div");
        cardWrapper.classList.add("book-card-wrapper");

        let card = document.createElement("div");
        card.classList.add ("book-card");
        card.dataset.id = book.id;
        card.style.backgroundImage = `url(${book.cover})`
        card.style.backgroundSize = "contain"
        

        let title = document.createElement("p");
        title.textContent = book.title;
        title.style.fontSize = "16px";

        cardWrapper.appendChild(card);
        cardWrapper.appendChild(title);
        bookGrid.appendChild(cardWrapper);
    })
    
}

function displayBookInfo(datasetId) {
    let titleDisplay = document.querySelector("#title-display");
    let authorDisplay = document.querySelector("#author-display");
    let pagesDisplay = document.querySelector("#pages-display");
    let readDisplay = document.querySelector("#read-display");
    let coverDisplay = document.querySelector(".cover");
    

    // Using the id get the corresponding book
    myLibrary.forEach( (book) => {
        if (datasetId === book.id) {
            titleDisplay.textContent = book.title;
            authorDisplay.textContent = book.author;
            pagesDisplay.textContent = book.pages;
            readDisplay.textContent = book.read;

            // DISCOVER WHY FILE PICKER FILES DONT WORK
            console.log(book.cover);
            coverDisplay.style.backgroundImage = `url(${book.cover})`;
            coverDisplay.style.backgroundSize = "contain"
        }
    });

}

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


// Get book info
bookGrid.addEventListener("click", (event)  => {
    if (event.target.className == "book-card") {
        let datasetId = event.target.dataset.id
        displayBookInfo(datasetId);
    }
})

// Add some default books
addBookToLibrary("Wuthering Heights", 
    "Emily Brontë", 416, false, './covers/wuthering.jpg');
addBookToLibrary("Fahrenheit 451", 
    "Ray Bradbury", 216, true, "./covers/fahrenheit451.jpg");
addBookToLibrary("O pequeno príncipe", 
    "Antonie de Saint-Exupéry", 96, true, "./covers/opequenoprincipe.jpg");
addBookToLibrary("Flowers to Algernon", 
    "Daniel Keyes", 218, false, "./covers/flowerstoalgernon.jpg");
addBookToLibrary("Casas estranhas", 
    "Uketsu", 176, false, "./covers/casasestranhas.jpg");

displayBooks(myLibrary);