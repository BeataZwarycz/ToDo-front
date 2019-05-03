const apiUrl = "https://to-do-coderscamp.herokuapp.com/api";
const row = document.querySelector(".row");

const logout = event => {
  localStorage.setItem("token", "");
  window.location.assign("login.html");
};

const showCategory = category => {
  const bootSt = document.createElement("div");
  bootSt.classList = "col-sm-6 col-md-4 col-xl-3";
  bootSt.id = category._id;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList = "btn delete-sticker close";
  const deleteIcon = document.createElement("i");
  deleteIcon.classList = "fa fa-times fa-fw";
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.onclick = () => deleteCategory(category._id);

  const editBtn = document.createElement("button");
  editBtn.classList = "btn edit-sticker";
  const editIcon = document.createElement("i");
  editIcon.classList = "fa fa-pencil fa-fw";
  editBtn.appendChild(editIcon);
  editBtn.onclick = () => editCategory(category);

  const categoryTitle = document.createElement("a");
  categoryTitle.classList.add("sticker-header");
  categoryTitle.setAttribute("href", `tasks.html?${category._id}`);
  categoryTitle.innerHTML = category.title;

  const categoryDescription = document.createElement("div");
  categoryDescription.classList.add("sticker-content");
  categoryDescription.innerHTML = category.description;

  const stickerIn = document.createElement("div");
  stickerIn.classList.add("sticker");
  stickerIn.appendChild(deleteBtn);
  stickerIn.appendChild(categoryTitle);
  stickerIn.appendChild(categoryDescription);
  stickerIn.appendChild(editBtn);

  row.appendChild(bootSt);
  bootSt.appendChild(stickerIn);
};

function getCategories() {
  const request = new XMLHttpRequest();
  request.open("GET", `${apiUrl}/categories`, true);
  request.setRequestHeader("x-auth-token", localStorage.getItem("token"));
  request.onload = function() {
    const data = JSON.parse(this.response);
    if (request.status == 200) {
      data.forEach(category => showCategory(category));
    } else {
      alert(data);
    }
  };
  request.send();
}

function createCategory() {
  const categoryTitle = prompt("New category title:", "");
  if (!categoryTitle) {
    alert("Category must have a name!");
    return;
  }
  const categoryDescription = prompt("New category description:", "");

  const request = new XMLHttpRequest();
  request.open("POST", `${apiUrl}/categories`, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("x-auth-token", localStorage.getItem("token"));
  request.onload = function() {
    const data = JSON.parse(this.response);
    if (request.status == 200) {
      showCategory(data);
    } else {
      alert(data);
    }
  };
  const categoryRequest = new CategoryRequest(
    categoryTitle,
    categoryDescription
  );
  request.send(JSON.stringify(categoryRequest));
}

function editCategory(category) {
  const newCategoryTitle = prompt("New category title:", category.title);
  if (!newCategoryTitle) {
    alert("Category must have a name!");
    return;
  }
  const newCategoryDescription = prompt(
    "New category description:",
    category.description
  );

  const request = new XMLHttpRequest();
  request.open("PUT", `${apiUrl}/categories/${category._id}`, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("x-auth-token", localStorage.getItem("token"));
  request.onload = function() {
    const data = JSON.parse(this.response);
    if (request.status == 200) {
      document
        .getElementById(category._id)
        .getElementsByClassName(
          "sticker-header"
        )[0].innerHTML = newCategoryTitle;
      document
        .getElementById(category._id)
        .getElementsByClassName(
          "sticker-content"
        )[0].innerHTML = newCategoryDescription;
    } else {
      alert(data);
    }
  };
  const categoryRequest = new CategoryRequest(
    newCategoryTitle,
    newCategoryDescription
  );
  request.send(JSON.stringify(categoryRequest));
}

function deleteCategory(categoryId) {
  if (!confirm("Are you sure you want to delete this category?")) return;

  const request = new XMLHttpRequest();
  request.open("DELETE", `${apiUrl}/categories/${categoryId}`, true);
  request.setRequestHeader("x-auth-token", localStorage.getItem("token"));
  request.onload = function() {
    const data = JSON.parse(this.response);
    if (request.status == 200) {
      row.removeChild(document.getElementById(categoryId));
    } else {
      alert(data);
    }
  };
  request.send();
}

getCategories();
