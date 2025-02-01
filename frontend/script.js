const form = document.getElementById('bookForm');
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

fetchBooks();
