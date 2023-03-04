let myLibrary = [];
const booksContainer = document.querySelector(".booksContainer");
const addBookBtn = document.querySelector("#addBook");
const formContainer = document.querySelector(".formContainer");
const cancelBtn = document.querySelector("#cancelBtn");
const saveBookBtn = document.querySelector("#saveBookBtn");

const bookForm = document.querySelector("form");
const bookInputs = bookForm.querySelectorAll("input");

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
  Object.values(book).forEach((info) => {
    const text = document.createElement("p");
    text.textContent = info;
    bookCard.appendChild(text);
  });
  return bookCard;
}


function GetInputsValues() {
  let inputsValues = Array.from(bookInputs).map((input) => {
    if (
      input.getAttribute("type") === "text" ||
      input.getAttribute("type") === "number"
    ) {
      return input.value;
    }
    // Comprueba input type="radio"
    if (input.checked) {
      return input.value;
    }
  });
  // retorna un array sin el undefined
  return inputsValues.filter((item) => item);
}

function RemoveBook(index) {
  myLibrary.splice(index, 1);
}

function CreateRemoveBtn(){
  let removeBtn = document.createElement("button");
  removeBtn.textContent="Remove Book";
  removeBtn.setAttribute("data-index", myLibrary.length - 1);
  removeBtn.addEventListener("click", () =>{
    RemoveBook(removeBtn.getAttribute("data-index"));
    console.log(removeBtn);
    booksContainer.removeChild(removeBtn.parentNode);
  }) 
  return removeBtn;
}

function DisplayNewBook(book) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");
  bookCard = EditBookCardText(book, bookCard);
  bookCard.setAttribute("data-index", myLibrary.length - 1);
  let removeBtn = CreateRemoveBtn();
  bookCard.appendChild(removeBtn);
  booksContainer.appendChild(bookCard);
}


function DisplayBooks(bookArray) {
  const books = bookArray;
  books.forEach((book) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard = EditBookCardText(book, bookCard);
    booksContainer.appendChild(bookCard);
  });
}

function CreateBook(info) {
  return new Book(info[0], info[1], info[2], info[3]);
}

addBookBtn.addEventListener("click", () => {
  formContainer.classList.add("showFormContainer");
});

cancelBtn.addEventListener("click", () => {
  formContainer.classList.remove("showFormContainer");
});

saveBookBtn.addEventListener("click", (Event) => {
  Event.preventDefault();
  let newBook = CreateBook(GetInputsValues());
  AddBookToLibrary(newBook);
  DisplayNewBook(newBook);
});

const bookOne = new Book("Grandioso", "Samir", 295, "not read yet");
const bookwTwo = new Book("Inmenso", "Samir", 100, "yes");
const bookThree = new Book("Maravilloso Planeta", "Andres Perez", 300, "yes");
AddBookToLibrary(bookOne);
AddBookToLibrary(bookwTwo);
AddBookToLibrary(bookThree);
DisplayBooks(myLibrary);
