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

// Add function to iterate over books in array and display
// them on the page
function displayBooks() {
}

addBookToLibrary("Amogus", "sus", 210, true)
addBookToLibrary("Amogus", "sus", 210, true)
addBookToLibrary("Amogus", "sus", 210, true)

console.log(myLibrary[0].info())
console.log(myLibrary[0].id);

let addBook = document.querySelector(".add-book");
let addModal = document.querySelector(".add-modal");
let closeModal = document.querySelector(".close-modal");


// Open the add book modal
addBook.addEventListener("click", () => {
    addModal.showModal();
});
// Close the add book modal
closeModal.addEventListener("click", () => {
    addModal.close()
})
