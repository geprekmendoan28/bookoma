function validation(data) {
  const { title, author, year } = data;
  if (!title) {
    document.querySelector("#title").classList.remove("input");
    document.querySelector("#title").classList.add("error");
    errorTitle.classList.remove("none");
    errorTitle.classList.add("error-p");
    return false;
  }
  if (!author) {
    document.querySelector("#author").classList.remove("input");
    document.querySelector("#author").classList.add("error");
    errorAuthor.classList.remove("none");
    errorAuthor.classList.add("error-p");
    return false;
  }
  if (!year) {
    document.querySelector("#year").classList.remove("input");
    document.querySelector("#year").classList.add("error");
    errorYear.classList.remove("none");
    errorYear.classList.add("error-p");
    return false;
  }
  return true;
}

function validationUpdate(data) {
  const { title, author, year } = data;
  if (!title) {
    document.querySelector("#title-update").classList.remove("input");
    document.querySelector("#title-update").classList.add("error");
    errorUpdateTitle.classList.remove("none");
    errorUpdateTitle.classList.add("error-p");
    return false;
  }
  if (!author) {
    document.querySelector("#author-update").classList.remove("input");
    document.querySelector("#author-update").classList.add("error");
    errorUpdateAuthor.classList.remove("none");
    errorUpdateAuthor.classList.add("error-p");
    return false;
  }
  if (!year) {
    document.querySelector("#year-update").classList.remove("input");
    document.querySelector("#year-update").classList.add("error");
    errorUpdateYear.classList.remove("none");
    errorUpdateYear.classList.add("error-p");
    return false;
  }
  return true;
}

function hideForm() {
  addingSection.classList.remove("visible");
  addingSection.classList.add("none");
  title.value = "";
  author.value = "";
  year.value = "";
  isCompleted.checked = false;
}
function hideSearch() {
  searchSection.classList.remove("visible");
  searchSection.classList.add("none");
  listSection.classList.remove("none");
  listSectionTwo.classList.remove("none");
  searchBook.value = "";
}
function showSearch() {
  searchSection.classList.remove("none");
  searchSection.classList.add("visible");
  listSection.classList.add("none");
  listSectionTwo.classList.add("none");
}
function showForm() {
  addingSection.classList.remove("none");
  addingSection.classList.add("visible");
}
function showLoading() {
  loading.classList.remove("none");
  loading.classList.add("visible");
  main.classList.add("none");
}
function hideLoading() {
  loading.classList.add("none");
  loading.classList.remove("visible");
  main.classList.remove("none");
}
function showUpdateForm() {
  updateSection.classList.remove("none");
  updateSection.classList.add("visible");
}

function hideUpdateForm() {
  updateSection.classList.remove("visible");
  updateSection.classList.add("none");
  idUpdate.value = null;
  titleUpdate.value = "";
  authorUpdate.value = "";
  yearUpdate.value = "";
  isCompletedUpdate.checked = false;
}

function showUpdate(id) {
  const index = getBook().findIndex((a) => a.id == id);
  let books = getBook();
  if (index > -1) {
    idUpdate.value = books[index].id;
    titleUpdate.value = books[index].title;
    authorUpdate.value = books[index].author;
    yearUpdate.value = books[index].year;
    isCompletedUpdate.checked = books[index].isCompleted;
    showUpdateForm();
  }
}

function onchageCreate() {
  document.querySelector("#title").classList.remove("error");
  document.querySelector("#title").classList.add("input");
  errorTitle.classList.remove("error-p");
  errorTitle.classList.add("none");
  document.querySelector("#author").classList.remove("error");
  document.querySelector("#author").classList.add("input");
  errorAuthor.classList.remove("error-p");
  errorAuthor.classList.add("none");
  document.querySelector("#year").classList.remove("error");
  document.querySelector("#year").classList.add("input");
  errorYear.classList.remove("error-p");
  errorYear.classList.add("none");
}

function onchageUpdate() {
  document.querySelector("#title-update").classList.remove("error");
  document.querySelector("#title-update").classList.add("input");
  errorUpdateTitle.classList.remove("error-p");
  errorUpdateTitle.classList.add("none");
  document.querySelector("#author-update").classList.remove("error");
  document.querySelector("#author-update").classList.add("input");
  errorUpdateAuthor.classList.remove("error-p");
  errorUpdateAuthor.classList.add("none");
  document.querySelector("#year-update").classList.remove("error");
  document.querySelector("#year-update").classList.add("input");
  errorUpdateYear.classList.remove("error-p");
  errorUpdateYear.classList.add("none");
}
