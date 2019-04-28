var apiUrl = "https://to-do-coderscamp.herokuapp.com/api/";

const app = document.getElementById("root");

const container = document.createElement("div");
container.setAttribute("class", "container");

const sticker = document.createElement("div");
container.setAttribute("class", "sticker");

app.appendChild(container);
container.appendChild(sticker);

const token = localStorage.getItem("token");
console.log(token);
//LOAD ALL CATEGORIES
const requestLoadCategory = new XMLHttpRequest();
requestLoadCategory.open("GET", apiUrl + "categories", true);
requestLoadCategory.setRequestHeader("x-auth-token", token);
requestLoadCategory.onload = function() {
  var data = JSON.parse(this.response);
  if (requestLoadCategory.status >= 200 && requestLoadCategory.status < 400) {
    data.forEach(Categories => {
      const card = document.createElement("div");
      card.setAttribute("class", "sticker");
      Categories.title = Categories.title.substring(0, 300);
      p.textContent = `${Categories.title}...`;
      container.appendChild(card);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `it's not working!`;
    app.appendChild(errorMessage);
  }
};

requestLoadCategory.send();

//LOAD ALL TASKS FROM CATEGORY
var requestLoadCategoryTasks = new XMLHttpRequest();
requestLoadCategoryTasks.open("GET", apiUrl + "tasks/:categoryId", true);
requestLoadCategoryTasks.setRequestHeader("x-auth-token", token);
requestLoadCategoryTasks.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (
    requestLoadCategoryTasks.status >= 200 &&
    requestLoadCategoryTasks.status < 400
  ) {
    data.forEach(Tasks => {
      const card = document.createElement("div");
      card.setAttribute("class", "sticker-content");

      Tasks.title = Tasks.title.substring(0, 300);
      p.textContent = `${Tasks.title}...`;
      container.appendChild(card);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `it's not working!`;
    app.appendChild(errorMessage);
  }
};

requestLoadCategoryTasks.send();

//UPDATE TASK IN DATEBASE
var requestEditTask = new XMLHttpRequest();
requestEditTask.open(
  "GET",
  "https://to-do-coderscamp.herokuapp.com/api/tasks/:id",
  true
);
requestEditTask.onload = function() {
  var data = JSON.parse(this.response);
  if (requestEditTask.status >= 200 && requestEditTask.status < 400) {
    //nie mam pojęcia co tu wpisać
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `it's not working!`;
    app.appendChild(errorMessage);
  }
};

requestEditTask.send();
