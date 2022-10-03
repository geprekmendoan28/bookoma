window.addEventListener("load", function () {
  if (localStorage.getItem(localStorageKey) !== "") {
    const booksData = getBook();
    renderBook(booksData);
  }
});

btnAdd.addEventListener("click", function () {
  if (btnAdd.value == "") {
    showForm();
  }
});
btnCancel.addEventListener("click", function () {
  if (btnCancel.value == "") {
    hideForm();
    onchageCreate();
  }
});
cancelUpdate.addEventListener("click", function () {
  if (cancelUpdate.value == "") {
    hideUpdateForm();
    onchageUpdate();
  }
});

overlayed.addEventListener("click", function () {
  if (overlayed.value == "") {
    hideForm();
  }
});

btnSave.addEventListener("click", function () {
  if (btnSave.value == "") {
    const data = {
      id: +new Date(),
      title: title.value.trim(),
      author: author.value.trim(),
      year: year.value,
      isCompleted: isCompleted.checked ?? false,
    };
    if (validation(data)) {
      createBook(data);
      hideForm();
    }
  }
});

saveUpdate.addEventListener("click", function () {
  if (saveUpdate.value == "") {
    const data = {
      id: idUpdate.value,
      title: titleUpdate.value.trim(),
      author: authorUpdate.value.trim(),
      year: yearUpdate.value,
      isCompleted: isCompletedUpdate.checked ?? false,
    };
    if (validationUpdate(data)) {
      updateBook(idUpdate.value, data);
      hideUpdateForm();
    }
  }
});
