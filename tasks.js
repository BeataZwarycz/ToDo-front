const apiUrl = "https://to-do-coderscamp.herokuapp.com/api";
const row = document.querySelector(".row");
const categoryId = window.location.href.split("?").pop();

const logout = event => {
  localStorage.setItem("token", "");
  window.location.assign("login.html");
};

const showTask = task => {
  const bootSt = document.createElement("div");
  bootSt.classList = "col-sm-6 col-md-4 col-xl-3";
  bootSt.id = task._id;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList = "btn delete-sticker close";
  const deleteIcon = document.createElement("i");
  deleteIcon.classList = "fa fa-times fa-fw";
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.onclick = () => deleteTask(task._id);

  const editBtn = document.createElement("button");
  editBtn.classList = "btn edit-sticker";
  const editIcon = document.createElement("i");
  editIcon.classList = "fa fa-pencil fa-fw";
  editBtn.appendChild(editIcon);
  editBtn.onclick = () => editTaskTitle(task);

  const taskTitle = document.createElement("div");
  taskTitle.classList.add(task.isFinished ? "task-finished" : "task");
  taskTitle.innerHTML = task.title;
  taskTitle.onclick = () => editTaskFinished(task);

  const stickerIn = document.createElement("div");
  stickerIn.classList.add("sticker");
  stickerIn.appendChild(deleteBtn);
  stickerIn.appendChild(taskTitle);
  stickerIn.appendChild(editBtn);

  row.appendChild(bootSt);
  bootSt.appendChild(stickerIn);
};

function getTasksByCategory() {
  const request = new XMLHttpRequest();
  request.open("GET", `${apiUrl}/tasks/${categoryId}`, true);
  request.setRequestHeader("x-auth-token", localStorage.getItem("token"));
  request.onload = function() {
    if (request.status == 200) {
      const data = JSON.parse(this.response);
      data.forEach(task => showTask(task));
    } else {
      alert(this.response);
    }
  };
  request.send();
}

function createTask() {
  const taskTitle = prompt("New task title:", "");
  if (!taskTitle) {
    alert("Task must have a name!");
    return;
  }

  const request = new XMLHttpRequest();
  request.open("POST", `${apiUrl}/tasks`, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("x-auth-token", localStorage.getItem("token"));
  request.onload = function() {
    if (request.status == 200) {
      const data = JSON.parse(this.response);
      showTask(data);
    } else {
      alert(this.response);
    }
  };
  const taskPostRequest = new TaskPostRequest(categoryId, taskTitle);
  request.send(JSON.stringify(taskPostRequest));
}

function editTaskFinished(task) {
  task.isFinished = !task.isFinished;
  const request = new XMLHttpRequest();
  request.open("PUT", `${apiUrl}/tasks/${task._id}`, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("x-auth-token", localStorage.getItem("token"));
  request.onload = function() {
    if (request.status == 200) {
      const data = JSON.parse(this.response);
      if (data.isFinished) {
        const taskElement = document
          .getElementById(task._id)
          .getElementsByClassName("task")[0];
        taskElement.classList.remove("task");
        taskElement.classList.add("task-finished");
      } else {
        const taskElement = document
          .getElementById(task._id)
          .getElementsByClassName("task-finished")[0];
        taskElement.classList.remove("task-finished");
        taskElement.classList.add("task");
      }
    } else {
      alert(this.response);
    }
  };
  const taskPutRequest = new TaskPutRequest(
    task.categoryId,
    task.title,
    task.isFinished
  );
  request.send(JSON.stringify(taskPutRequest));
}

function editTaskTitle(task) {
  const newTaskTitle = prompt("New task title:", task.title);
  if (!newTaskTitle) {
    alert("Task must have a name!");
    return;
  }

  const request = new XMLHttpRequest();
  request.open("PUT", `${apiUrl}/tasks/${task._id}`, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("x-auth-token", localStorage.getItem("token"));
  request.onload = function() {
    if (request.status == 200) {
      document
        .getElementById(task._id)
        .getElementsByClassName("task")[0].innerHTML = newTaskTitle;
    } else {
      alert(this.response);
    }
  };
  const taskPutRequest = new TaskPutRequest(
    task.categoryId,
    newTaskTitle,
    task.isFinished
  );
  request.send(JSON.stringify(taskPutRequest));
}

function deleteTask(taskId) {
  if (!confirm("Are you sure you want to delete this task?")) return;

  const request = new XMLHttpRequest();
  request.open("DELETE", `${apiUrl}/tasks/${taskId}`, true);
  request.setRequestHeader("x-auth-token", localStorage.getItem("token"));
  request.onload = function() {
    if (request.status == 200) {
      row.removeChild(document.getElementById(taskId));
    } else {
      alert(this.response);
    }
  };
  request.send();
}

getTasksByCategory();
