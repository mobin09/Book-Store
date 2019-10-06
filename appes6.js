class Book {

    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}




class UI {
    addBookToList(book) {

        const list = document.getElementById('book-list');
        // create a element

        const row = document.createElement('tr');
        // insert  cols

        row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href = "#" class = "text-danger">X</a></td>
      `;
        list.appendChild(row);
    }


    addBookAlerted(message, className) {


        const div = document.createElement('div');
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message));

        // get parent
        const cardBody = document.getElementById('body-of-card');
        const form = document.getElementById('book-form');
        cardBody.insertBefore(div, form);

        setTimeout(function () {
            document.querySelector('.bg-success').remove();
        }, 3000);

    }



    deleteBook(target) {


        if (target.className === 'text-danger') {
            target.parentElement.parentElement.remove();
            // this function going to bottom of page
            deleteAlert('Deleted Book', 'bg-success text-white');
        }
    }

    showAlert(message, className) {

        const div = document.createElement('div');
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message));

        // get parent
        const cardBody = document.getElementById('body-of-card');
        const form = document.getElementById('book-form');
        cardBody.insertBefore(div, form);

        setTimeout(function () {
            document.querySelector('.bg-danger').remove();
        }, 3000);

    }
    clearFields() {

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';

    }

}
// local storage class
class Store {

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }


    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;
            // add book to ui
            ui.addBookToList(book);
        }); 
    }


    static addBook(book) {
     
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function(book, index){
            const ui = new UI;
            if(book.isbn ===isbn){
                books.splice(index, 1)

            }
           
        }); 
        localStorage.setItem('books', JSON.stringify(books));
    }

}

// DOM load event

document.addEventListener('DOMContentLoaded', Store.displayBooks);






// add books

document.getElementById('book-form').addEventListener('submit', function (e) {
    // get form value
    const titleInput = document.getElementById('title').value;
    const authorInput = document.getElementById('author').value;
    const isbnInput = document.getElementById('isbn').value;






    // instantiate book
    const book = new Book(titleInput, authorInput, isbnInput);
    //instantiate UI
    const ui = new UI();

    // validation
    if (titleInput === '' || authorInput === '' || isbnInput === '') {
        ui.showAlert(' ERROR! Please Fill All The Fields ', 'bg-danger text-white');
    }

    else {
        ui.addBookToList(book);

        // add to ls
        Store.addBook(book);
        // show success     
        ui.addBookAlerted('Book Added', 'bg-success text-white');

    }
    //add a book to list
    ui.clearFields();
    e.preventDefault();
});


//addEventListener to delete books
document.getElementById('book-list').addEventListener('click', function (e) {

    const ui = new UI();
    ui.deleteBook(e.target);
   

    // remove from ls

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();
});





function deleteAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message));

    // get parent
    const cardBody = document.getElementById('body-of-card');
    const form = document.getElementById('book-form');
    cardBody.insertBefore(div, form);

    setTimeout(function () {
        document.querySelector('.bg-success').remove();
    }, 3000);
}
















