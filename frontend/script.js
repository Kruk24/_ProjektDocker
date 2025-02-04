/*const form = document.getElementById('bookForm');
const list = document.getElementById('bookList');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const book = {
        title: form.title.value,
        author: form.author.value,
        year: form.year.value,
    };
    await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
    });
    fetchBooks();
});

async function fetchBooks() {
    const res = await fetch('http://localhost:5000/api/books');
    const books = await res.json();
    list.innerHTML = books.map((b) => `<li>${b.title} by ${b.author} (${b.year})</li>`).join('');
}

fetchBooks();*/

const form = document.getElementById('bookForm');
const list = document.getElementById('bookList');
const errorDiv = document.getElementById('error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const book = {
        title: form.title.value,
        author: form.author.value,
        year: form.year.value,
    };

    try {
        const res = await fetch('http://localhost:5000/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        });
        if (!res.ok) {
            throw new Error('Failed to add book.');
        }
        form.reset();
        fetchBooks();
    } catch (error) {
        showError(error.message);
    }
});

async function fetchBooks() {
    try {
        const res = await fetch('http://localhost:5000/api/books');
        if (!res.ok) {
            throw new Error('Failed to fetch books.');
        }
        const books = await res.json();
        renderBooks(books);
    } catch (error) {
        showError(error.message);
    }
}

function renderBooks(books) {
    list.innerHTML = books
        .map((b) => `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${b.title} autorstwa ${b.author} (${b.year})</span>
        <button class="btn btn-danger btn-sm" onclick="deleteBook('${b.id}')">Usu\u0144</button>
      </li>
    `)
        .join('');
}

async function deleteBook(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/books/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error('Failed to delete book.');
        }
        fetchBooks();
    } catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('d-none');
    setTimeout(() => {
        errorDiv.classList.add('d-none');
    }, 3000);
}

fetchBooks();

