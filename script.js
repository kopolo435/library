let myLibrary = [];
const booksContainer = document.querySelector(".booksContainer");
const addBookBtn = document.querySelector("#addBook");
const formContainer = document.querySelector(".formContainer");
const cancelBtn = document.querySelector("#cancelBtn");
const saveBookBtn = document.querySelector("#saveBookBtn");

const bookForm = document.querySelector("form");
const bookInputs = bookForm.querySelectorAll("input");

class Book{
  constructor (title,author,numberOfPages,readStatus){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readStatus = readStatus;
  }

  info(){
    return `${this.title} by ${this.autor}, ${this.pageNum}, ${this.wasRead}`;
  }

  set bookIndex(index){
    this.index = index;
  }

  get bookIndex(){
    return this.index;
  }
}

const bookController = (()=>{
  const bookCollection = [];

  const addNewBook = (newBook)=>{
    bookCollection.push(newBook)
  }
  
  const deleteBook = (bookIndex)=>{
    bookCollection.slice(bookIndex,1);
  }

  const updateReadStatus = (book) =>{
    bookCollection.splice(book.index,1,book);
  }

  return {addNewBook,deleteBook,updateReadStatus,bookCollection};
})();

const bookCardCreator = (()=>{
  
  const addTextBookCard = (book,bookCard)=>{
    Object.values(book).forEach((info) => {
      const text = document.createElement("p");
      text.textContent = info;
      bookCard.appendChild(text);
    });
  }

  const createBookCard = (book)=>{
    const bookCard = document.createElement("div")
    let btnContainer = document.createElement("div");

    bookCard.classList.add("bookCard");
    btnContainer.classList.add("bookCardBtn");

    addTextBookCard(book, bookCard);

    bookCard.setAttribute("data-index", book.bookIndex);
    //btnContainer.appendChild(CreateRemoveBtn(book.bookIndex));
    //btnContainer.appendChild(CreateWasReadBtn(book.bookIndex))
    //bookCard.appendChild(btnContainer);

    return bookCard;
  }

  return{createBookCard};
})();

const displayController = (()=>{
    const bookContainer = document.getElementById("booksContainer");

    const displayBooks = ()=>{
      let bookCardsArray = [];
      const bookArray = bookController.bookCollection;
      bookArray.forEach((book)=>{
        bookCardsArray.push(bookCardCreator.createBookCard(book));
      });
      bookContainer.replaceChildren(...bookCardsArray); // Reemplaza los elementos actuales por los nuevos
    }

    return {displayBooks};

})();

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



function CreateRemoveBtn(index = myLibrary.length - 1) {
  let removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove Book";
  removeBtn.setAttribute("data-index", index);
  removeBtn.addEventListener("click", () => {
    RemoveBook(removeBtn.getAttribute("data-index"));
    booksContainer.removeChild(removeBtn.parentNode);
  });
  return removeBtn;
}

function CreateWasReadBtn(index = myLibrary.length - 1) {
  let wasReadBtn = document.createElement("button");
  wasReadBtn.textContent = "Change Read Status";
  wasReadBtn.setAttribute("data-index", index);
  wasReadBtn.addEventListener("click", () => {
    let editedBookCard = ChangeReadStatus(
      wasReadBtn.getAttribute("data-index")
    );
    wasReadBtn.parentNode.parentNode.insertAdjacentElement("afterend", editedBookCard);
    booksContainer.removeChild(wasReadBtn.parentNode.parentNode);
  });
  return wasReadBtn;
}

function ChangeReadStatus(index) {
  let book = myLibrary[index];
  book.wasRead = book.wasRead === "Yes" ? "Not yet" : "Yes";
  let editedBookCard = CreateBoodCard(book, index);
  editedBookCard.setAttribute("data-index", index);
  return editedBookCard;
}

function CreateBoodCard(book, index = myLibrary.length - 1) {
  let bookCard = document.createElement("div");
  let btnContainer = document.createElement("div");
  bookCard.classList.add("bookCard");
  btnContainer.classList.add("bookCardBtn");
  bookCard = EditBookCardText(book, bookCard);
  bookCard.setAttribute("data-index", index);
  btnContainer.appendChild(CreateRemoveBtn(index));
  btnContainer.appendChild(CreateWasReadBtn(index))
  bookCard.appendChild(btnContainer);
  return bookCard;
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
/*   AddBookToLibrary(newBook);
  DisplayNewBook(newBook); */
  bookController.addNewBook(newBook);
  displayController.displayBooks();

});

const bookOne = new Book("Grandioso", "Samir", 295, "not read yet");
const bookwTwo = new Book("Inmenso", "Samir", 100, "yes");
const bookThree = new Book("Maravilloso Planeta", "Andres Perez", 300, "yes");
bookController.addNewBook(bookOne);
bookController.addNewBook(bookwTwo);
bookController.addNewBook(bookThree);
displayController.displayBooks();
