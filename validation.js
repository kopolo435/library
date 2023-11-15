function validateValues(){
    const title = document.getElementById("title");
    const author = document.getElementById("autor");
    const pageNum = document.getElementById("autor");
    let isValid = true;
    if(title.validity.valueMissing){
        title.setCustomValidity("Se espera agregue un titulo");
        isValid = false;
    }
    if(author.validity.valueMissing){
        author.setCustomValidity("Se espera agregue el autor del libro");
        isValid = false;
    }
    if(pageNum.validity.valueMissing){
        pageNum.setCustomValidity("Se espera agregue la cantidad de paginas del libro");
        isValid = false;
    }
    return isValid
}

export default validateValues ;