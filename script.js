var apiUrl = "https://to-do-coderscamp.herokuapp.com/api/";

const app = document.getElementById("root");
document.getElementsByClassName('btn edit-sticker').addEventListener('click', EditSticker);
 

const container = document.createElement("div"); 
container.setAttribute("class", "container");

//const sticker = document.createElement("div");
//container.setAttribute("class", "sticker");

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
      const headerCard = document.createElement("a");
      headerCard.setAttribute("class", "sticker-header");
      Categories.title = Categories.title.substring(0, 300);
      a.textContent = `${Categories.title}...`;
      container.appendChild(card);
      card.appendChild(headerCard);
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
  var data = JSON.parse(this.response);
  if (
    requestLoadCategoryTasks.status >= 200 &&
    requestLoadCategoryTasks.status < 400
  ) {
    data.forEach(Tasks  => {
      const cardTasks = document.createElement("div");
      cardTasks.setAttribute("class", "sticker-content");
      Tasks.title = Tasks.title.substring(0, 300);
      p.textContent = `${Tasks.title}...`;
      container.appendChild(cardTasks);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `it's not working!`;
    app.appendChild(errorMessage);
  }
};

requestLoadCategoryTasks.send();

//UPDATE TASK IN DATEBASE
var requestUpdateTask = new XMLHttpRequest();
requestUpdateTask.open("GET", apiUrl + "tasks/:id", true);
requestUpdateTask.setRequestHeader("x-auth-token", token);
requestUpdateTask.onload = function EditSticker () {
  var data = JSON.parse(this.response);
  if (requestEditTask.status >= 200 && requestEditTask.status < 400) {
    //nie mam pojęcia co tu wpisać

    requestEditTask.send();
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `it's not working!`;
    app.appendChild(errorMessage);
  }
};

