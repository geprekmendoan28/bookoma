function createBook(book) {
  let newBooks = getBook();
  try {
    newBooks.push(book);
    localStorage.setItem(localStorageKey, JSON.stringify(newBooks));
    alert("Berhasil menambah buku!");
    renderBook(newBooks);
  } catch (err) {
    alert(err);
  }
}

function getBook() {
  return JSON.parse(localStorage.getItem(localStorageKey)) || [];
}

function renderBook(books = []) {
  showLoading();
  const inCompleted = document.querySelector("#inCompleted");
  const completed = document.querySelector("#completed");
  inCompleted.innerHTML = "";
  completed.innerHTML = "";

  const readedsBook = books.filter((b) => b.isCompleted === true);
  const unreadedsBook = books.filter((b) => b.isCompleted === false);

  books.forEach((book) => {
    if (book.isCompleted == false) {
      let el = `
		  <div class="item-list">
		  <div class="left">
			<div class="content">
			  <h5>${book.title}</h5>
			  <p>Ditulis oleh ${book.author}</p>
			  <p>Dikeluarkan tahun ${book.year}</p>
			</div>
			<div class="status-not">
			  <p>Belum Selesai</p>
			</div>
		  </div>
		  <div class="right">
			<i onclick="deleteBook(${book.id})" class="fa-solid fa-trash-can"></i>
			<i onclick="readedBook(${book.id})" class="fa-solid fa-eye"></i>
			<i onclick="showUpdate(${book.id})" class="fa-solid fa-pen-to-square"></i>
		  </div>
		</div>
				`;

      inCompleted.innerHTML += el;
    } else {
      let el = `
		  <div class="item-list">
		  <div class="left">
			<div class="content">
			  <h5>${book.title}</h5>
			  <p>Ditulis oleh ${book.author}</p>
			  <p>Dikeluarkan tahun ${book.year}</p>
			</div>
			<div class="status-yes">
			  <p>Sudah Selesai</p>
			</div>
		  </div>
		  <div class="right">
			<i onclick="deleteBook(${book.id})" class="fa-solid fa-trash-can"></i>
			<i onclick="unreadedBook(${book.id})" class="fa-solid fa-eye-slash"></i>
			<i  onclick="showUpdate(${book.id})" class="fa-solid fa-pen-to-square"></i>
		  </div>
		</div>
				`;

      completed.innerHTML += el;
    }
  });
  if (readedsBook?.length === 0) {
    completed.innerHTML = ` <div class="empty-state">
		<img src="assets/img/empty_books.svg" />
		<p>
		  Belum ada buku, ayo tambahkan buku dengan klik icon tambah +
		</p>
	  </div>`;
  }
  if (unreadedsBook?.length === 0) {
    inCompleted.innerHTML = ` <div class="empty-state">
		<img src="assets/img/empty_books.svg" />
		<p>
		  Belum ada buku, ayo tambahkan buku dengan klik icon tambah +
		</p>
	  </div>`;
  }
  hideLoading();
}

function deleteBook(id) {
  let cfm = confirm("Anda yakin akan menghapus data buku ini ?");

  if (cfm == true) {
    const books = getBook().filter((a) => a.id == id);
    const newBooks = getBook().filter((a) => a.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(newBooks));
    renderBook(getBook());
    alert(`Buku ${books[0].title} telah terhapus dari rak`);
  } else {
    return 0;
  }
}

function readedBook(id) {
  let cfm = confirm("Pindahkan buku ke rak yang Sudah Selesai Dibaca ?");

  if (cfm == true) {
    const index = getBook().findIndex((a) => a.id == id);
    let books = getBook();
    if (index > -1) {
      books[index] = {
        ...books[index],
        isCompleted: true,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(books));
      renderBook(getBook());
      hideSearch();
      alert(`Buku ${books[index].title} berhasil dipindahkan`);
    } else {
      alert("Terjadi Kesalahan");
    }
  } else {
    return 0;
  }
}

function unreadedBook(id) {
  let cfm = confirm("Pindahkan buku ke rak yang Belum Selesai Dibaca ?");

  if (cfm == true) {
    const index = getBook().findIndex((a) => a.id == id);
    let books = getBook();
    if (index > -1) {
      books[index] = {
        ...books[index],
        isCompleted: false,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(books));
      renderBook(getBook());
      hideSearch();
      alert(`Buku ${books[index].title} berhasil dipindahkan`);
    } else {
      alert("Terjadi Kesalahan");
    }
  } else {
    return 0;
  }
}

function updateBook(id, data) {
  let cfm = confirm("Apakah anda yakin merubah data buku ?");

  if (cfm == true) {
    const index = getBook().findIndex((a) => a.id == id);
    let books = getBook();
    if (index > -1) {
      books[index] = data;
      localStorage.setItem(localStorageKey, JSON.stringify(books));
      renderBook(getBook());
      alert(`Buku ${books[index].title} berhasil diupdate`);
    } else {
      alert("Terjadi Kesalahan");
    }
  } else {
    return 0;
  }
}

function searchingBooks() {
  showLoading();
  setTimeout(() => {
    const searchs = searchBook?.value;
    const titleSearch = document.querySelector("#title-search");

    if (searchs?.length) {
      showSearch();
      titleSearch.innerHTML = `Hasil pencarian ${searchs}:`;
      const filteredBooks = getBook()?.filter((b) =>
        b?.title?.toLowerCase()?.includes(searchs?.toLowerCase())
      );
      renderSearch(filteredBooks);
    } else {
      hideSearch();
    }
  }, 500);
  hideLoading();
}

function renderSearch(filteredBooks = []) {
  const searched = document.querySelector("#searched");
  searched.innerHTML = "";
  if (filteredBooks?.length === 0) {
    searched.innerHTML = ` <div class="empty-state">
			  <img src="assets/img/empty_books.svg" />
			  <p>
				Buku tidak ditemukan
			  </p>
			</div>`;
  } else {
    filteredBooks.forEach((book) => {
      if (book.isCompleted == false) {
        let el = `
					  <div class="item-list">
					  <div class="left">
						<div class="content">
						  <h5>${book.title}</h5>
						  <p>Ditulis oleh ${book.author}</p>
						  <p>Dikeluarkan tahun ${book.year}</p>
						</div>
						<div class="status-not">
						  <p>Belum Selesai</p>
						</div>
					  </div>
					  <div class="right">
						<i onclick="deleteBook(${book.id})" class="fa-solid fa-trash-can"></i>
						<i onclick="readedBook(${book.id})" class="fa-solid fa-eye"></i>
						<i onclick="showUpdate(${book.id})" class="fa-solid fa-pen-to-square"></i>
					  </div>
					</div>
							`;

        searched.innerHTML += el;
      } else {
        let el = `
					  <div class="item-list">
					  <div class="left">
						<div class="content">
						  <h5>${book.title}</h5>
						  <p>Ditulis oleh ${book.author}</p>
						  <p>Dikeluarkan tahun ${book.year}</p>
						</div>
						<div class="status-yes">
						  <p>Sudah Selesai</p>
						</div>
					  </div>
					  <div class="right">
						<i onclick="deleteBook(${book.id})" class="fa-solid fa-trash-can"></i>
						<i onclick="unreadedBook(${book.id})" class="fa-solid fa-eye-slash"></i>
						<i  onclick="showUpdate(${book.id})" class="fa-solid fa-pen-to-square"></i>
					  </div>
					</div>
							`;

        searched.innerHTML += el;
      }
    });
  }
}
