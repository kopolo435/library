let myLibrary = [];
const booksContainer = document.querySelector(".booksContainer");

function Book(title, autor, pageNum, wasRead) {
  this.title = title;
  this.autor = autor;
  this.pageNum = pageNum;
  this.wasRead = wasRead;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.autor}, ${this.pageNum}, ${this.wasRead}`;
};

function AddBookToLibrary(book) {
  myLibrary.push(book);
}

function EditBookCardText(book, bookCard) {
  book.values.forEach((info) => {
    const text = document.createElement("p");
    text.textContent = info;
    bookCard.appendChild(text);
  });
  return bookCard;
}

function DisplayBooks(bookArray) {
  const books = bookArray;
  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    booksContainer.appendChild(bookCard);
  });
}

const bookOne = new Book("Grandioso", "Samir", 295, "not read yet");
AddBookToLibrary(bookOne);
DisplayBooks(myLibrary);
