// Book Class: Represents a Book
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const lItem = document.createElement('li');

    lItem.innerHTML = `
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.id}</p>
      <p><a href="#">Remove</a></p>
    `;

    list.appendChild(lItem);
  }

  static deleteBook(el) {
    if (el.textContent === 'Remove') {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.getElementById("book-form").reset();
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = document.querySelector('#ID').value;

  // Validate
  if (title === '' || author === '' || id === '') {
    alert('Please fill in all fields');
  } else {
    // Instantiate book
    const book = new Book(title, author, id);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    alert('Book Added');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from the store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  alert('Book Removed');
});