show();
// book constructor
class Book {
    constructor(name, author, type) {
        this.BookName = name;
        this.AuthorName = author;
        this.BookType = type;
    }
}
//function for show list
function show(){
    let tablebody = document.querySelector(`.Tablebody`);
    let noteobj;
        let books = localStorage.getItem("Books");
        if (books == null) {
            noteobj = [];
        }
        else {
            noteobj = JSON.parse(books);
        }
        let html="";
        
        noteobj.forEach(function(element,index){
        html +=  `<tr class="booklist">
                <th scope="row">${index+1}</th>
                <td>${element.BookName}</td>
                <td>${element.AuthorName}</td>
                <td>${element.Type}</td>
                <td><input type="button" id="${index}" onclick="deleteBook(${index})" value="Delete" style="outline: none;width: 5rem;height: 31px;border-radius: 18px;border: none;background-image: linear-gradient(to right, #f26700, #e2e2a1);box-shadow: 0 0 9px;"></td>
                </tr>`;
              
    })
    tablebody.innerHTML=html;
}
//display constructor

class display {
   
    add(book) {
        let tablebody = document.querySelector(`.Tablebody`);
        tablebody.innerHTML="";
        let noteobj;
        let books = localStorage.getItem("Books");
        if (books == null) {
            noteobj = [];
        }
        else {
            noteobj = JSON.parse(books);
        }
        let obj = {
            BookName: book.BookName,
            AuthorName: book.AuthorName,
            Type:book.BookType
        }
        noteobj.push(obj);
        localStorage.setItem("Books", JSON.stringify(noteobj));
        let html="";
        
        noteobj.forEach(function(element,index){
            html += `<tr class="booklist">
                <th scope="row">${index+1}</th>
                <td>${element.BookName}</td>
                <td>${element.AuthorName}</td>
                <td>${element.Type}</td>
                <td><input type="button"  onclick="deleteBook(${index})" value="Delete" style="outline: none;width: 5rem;height: 31px;border-radius: 18px;border: none;background-image: linear-gradient(to right, #f26700, #e2e2a1);box-shadow: 0 0 9px;"></td>
                </tr>`;
                
        }); 
        
        tablebody.innerHTML = html;
    }
    validate(book) {
        if (book.BookName.length < 2 || book.AuthorName.length < 2) {
            return false;
        }
        else { return true; }
    }
    clear() {
        let libraryForm = document.getElementById(`libraryForm`);
        libraryForm.reset();
    }
    show(type, displayMessage) {
        let message = document.getElementById('message');
        message.innerHTML = `<div style="top:-11px;height:34px;margin-left:10px;" class="alert alert-${type}  alert-dismissible fade show" role="alert">
        <strong style="position:relative;bottom: 10px;">Message</strong> <span style="position:relative;bottom: 10px;">${displayMessage}</span>
        <button style="position: absolute;top:-4px;background-color: transparent;
        height: 0px;" type="button" class="btn-close" data-bs-dismiss="alert"  aria-label="Close"></button>
        </div>`;
        setTimeout(() => {
            message.innerHTML = "";
        }, 2000);
    }
}



let addbtn = document.querySelector(`.btn-primary`);
addbtn.addEventListener("click", libraryformsunbit)
function libraryformsunbit(e) {
    e.preventDefault();
    let Name = document.querySelector(`#inputEmail3`).value;
    let Author = document.querySelector(`#inputPassword3`).value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(Name, Author, type);
    console.log(book);
    let displayobj = new display();
    if (displayobj.validate(book)) {
        
        displayobj.add(book);
        displayobj.clear();
        displayobj.show('success', ` Congratulation!! Your Book sucessfully added in library.`);
    }
    else {
        displayobj.show('danger', `Book Name and  Author Name must have more than three word`);
    }
}
function deleteBook(index){
    let arr;
    let books = localStorage.getItem("Books");
    if (books == null) {
        arr = [];
    }
    else { arr = JSON.parse(books); }
    arr.splice(index, 1);
    localStorage.setItem("Books", JSON.stringify(arr));
    show();

}
//------------------>searching code
let search=document.querySelector(".search");
search.addEventListener("input",function(){
    let inputval=search.value;
    let span=document.querySelectorAll(".booklist");
    
    
    Array.from(span).forEach(function(element){
       
        let  booktxt=element.getElementsByTagName("td")[0].innerText;
        let  authortxt=element.getElementsByTagName("td")[1].innerText;
        let  typetxt=element.getElementsByTagName("td")[2].innerText;
       
        if(booktxt.includes(inputval)||authortxt.includes(inputval)||typetxt.includes(inputval)){
            element.style.display="revert";
        }
        else{element.style.display="none"}
    })

})