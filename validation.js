function validateValues(){
    const title = document.getElementById("title");
    const author = document.getElementById("autor");
    const pageNum = document.getElementById("pgNum");
    if(title.validity.valueMissing){
        title.setCustomValidity("Se espera agregue un titulo");
    }else{
        title.setCustomValidity("");
    }
    if(author.validity.valueMissing){
        author.setCustomValidity("Se espera agregue el autor del libro");
    }else{
        author.setCustomValidity("");
    }
    if(pageNum.validity.valueMissing){
        pageNum.setCustomValidity("Se espera agregue la cantidad de paginas del libro");
    }else{
        pageNum.setCustomValidity("");
    }

    title.addEventListener("input",()=>{
        if(title.validity.valueMissing){
            title.setCustomValidity("Se espera agregue un titulo");
        }else{
            title.setCustomValidity("");
        }
    })

    author.addEventListener("input",()=>{
        if(author.validity.valueMissing){
            author.setCustomValidity("Se espera agregue el autor del libro");
        }else{
            author.setCustomValidity("");
        }
    })

    pageNum.addEventListener("input",()=>{
        if(pageNum.validity.valueMissing){
            pageNum.setCustomValidity("Se espera agregue la cantidad de paginas del libro");
        }else{
            pageNum.setCustomValidity("");
        }
    })
}

export default validateValues ;