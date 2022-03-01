console.log("Project 2");

class Book{
    constructor(bookName,author,type){
        this.bookName = bookName;
        this.author = author;
        this.type = type;
    }
}

class Display{
    addBookRecord(book){
        let booksGallery = localStorage.getItem("booksGallery");
        if(booksGallery == null){
            booksGallery = [];
        }
        else{
            booksGallery = JSON.parse(booksGallery);
        }
        booksGallery.push(book);
        localStorage.setItem("booksGallery",JSON.stringify(booksGallery)) ;
    }
    static showBookRecord(){
        let booksGallery = localStorage.getItem("booksGallery");
        console.log(booksGallery);
        if(booksGallery == null){
            booksGallery = [];
        }
        else{
            booksGallery = JSON.parse(booksGallery);
        }
        let bookRecords = "";
        booksGallery.forEach((element,index)=>{
            bookRecords+= `
             <tr>
                <td>${element.bookName}</td>
                <td>${element.author}</td>
                <td>${element.type}</td>
                <td><svg xmlns="http://www.w3.org/2000/svg" id="deleteIcon${index}" onclick="Display.deleteRecord(${index})" width="20" height="20" fill="red" class="bi bi-archive-fill" viewBox="0 0 16 16">
                <title>Delete Record</title>
                <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
              </svg></td>

            </tr>
        `;
        // <td><button class="btn btn-outline-danger float-right" id=deleteBtn${index}>Delete</button></td>

        })        
        let bookRecordContainer = document.getElementById("bookRecordContainer");
        bookRecordContainer.innerHTML = bookRecords;
    }
    static deleteRecord(index){
        let booksGallery = localStorage.getItem("booksGallery");
        if(booksGallery == null){
            booksGallery = [];
        }
        else{
            booksGallery = JSON.parse(booksGallery);
        }
        booksGallery.splice(index,1);
        localStorage.setItem("booksGallery",JSON.stringify(booksGallery)) ;
        Display.showBookRecord();

    }
}

Display.showBookRecord();

let bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit",addBook);

function addBook(e){
    // console.log("Book Submitted");
    let bookName = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let types = document.getElementsByClassName("type");
    let type;
    Array.from(types).forEach((element)=>{
        if(element.checked)
            type = element.value;
    })
    let book = new Book(bookName,author,type);
    // console.log(book);
    let display = new Display();
    display.addBookRecord(book);
    Display.showBookRecord();
    document.getElementById("bookName").value  = "";
    document.getElementById("author").value  = "";

    e.preventDefault();
}



