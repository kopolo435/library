import validateValues from "./validation.js";

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
    bookCollection.splice(bookIndex,1);

    bookCollection.forEach((book,index)=>{
      book.bookIndex = index;
    })
  }

  const updateReadStatus = (book) =>{
    bookCollection.splice(book.index,1,book);
  }

  return {addNewBook,deleteBook,updateReadStatus,bookCollection};
})();

const bookCardCreator = (()=>{
  
  const addTextBookCard = (book,bookCard)=>{
    const bookValues = Object.values(book);
    bookValues.forEach((info,index) => {
      if(!(Object.is(bookValues.length -1,index))){
        const text = document.createElement("p");
        text.textContent = info;
        bookCard.appendChild(text);
      }
    });
  }

  const createRemoveBtn = (index)=>{
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Book";
    removeBtn.setAttribute("data-index", index);
    removeBtn.addEventListener("click",()=>{
      bookController.deleteBook(index);
      displayController.displayBooks();
    });
    return removeBtn;
  }

  const CreateWasReadBtn = (index)=>{
    let wasReadBtn = document.createElement("button");
    wasReadBtn.textContent = "Change Read Status";
    wasReadBtn.setAttribute("data-index", index);
    wasReadBtn.addEventListener("click", () => {
      let book = bookController.bookCollection[index];
      book.readStatus = book.readStatus === "yes" ? "not yet" : "yes";
      bookController.updateReadStatus(book)
      displayController.displayBooks();
    });
    return wasReadBtn;
  }

  const createBookCard = (book)=>{
    const bookCard = document.createElement("div")
    let btnContainer = document.createElement("div");

    bookCard.classList.add("bookCard");
    btnContainer.classList.add("bookCardBtn");

    addTextBookCard(book, bookCard);

    bookCard.setAttribute("data-index", book.bookIndex);
    btnContainer.appendChild(createRemoveBtn(book.bookIndex));
    btnContainer.appendChild(CreateWasReadBtn(book.bookIndex))
    bookCard.appendChild(btnContainer);

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


function CreateBook(info) {
  return new Book(info[0], info[1], info[2], info[3]);
}

addBookBtn.addEventListener("click", () => {
  formContainer.classList.add("showFormContainer");
});

cancelBtn.addEventListener("click", () => {
  formContainer.classList.remove("showFormContainer");
});

bookForm.addEventListener("submit",event=>{
  let newBook = CreateBook(GetInputsValues());
  newBook.bookIndex = bookController.bookCollection.length;
  bookController.addNewBook(newBook);
  displayController.displayBooks();
  event.preventDefault();
})

const bookOne = new Book("Grandioso", "Samir", 295, "not read yet");
const bookwTwo = new Book("Inmenso", "Samir", 100, "yes");
const bookThree = new Book("Maravilloso Planeta", "Andres Perez", 300, "yes");
bookController.addNewBook(bookOne);
bookController.addNewBook(bookwTwo);
bookController.addNewBook(bookThree);
bookOne.bookIndex = 0;
bookwTwo.bookIndex = 1;
bookThree.bookIndex = 2;
displayController.displayBooks();
validateValues();
