var apiUrl = "https://to-do-coderscamp.herokuapp.com/api/";

function register() {
  const request = new XMLHttpRequest();
  request.open("POST", apiUrl + "users", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    if (request.status == 200) {
    } else {
    }
  };
  const login = document.getElementById("username-register").value;
  const pass = document.getElementById("password-register").value;
  const mail = document.getElementById("email-register").value;
  var registerRequest = new RegisterRequest(login, pass, mail);
  request.send(JSON.stringify(registerRequest));
}

function login() {
  const request = new XMLHttpRequest();
  request.open("POST", apiUrl + "auth", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    var data = this.response;
    if (request.status == 200) {
      const token = data;
      console.log(token);
      localStorage.setItem("token", data);
      window.location.assign("main.html");
      //save token to local storage
    } else {
    }
  };

  const login = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  var loginRequest = new LoginRequest(login, pass);
  request.send(JSON.stringify(loginRequest));
}
