
document.loginForm.addEventListener("submit", function (event) {

  var user = this.querySelector("input[id=username]").value;
  var pass = this.querySelector("input[id=password]").value;
  var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  if (user.trim() == "" || !user.match(regx)) {
    document.getElementById("username").focus();
    event.preventDefault();
  }
  else if (pass.trim() == "" || pass.length < 5) {
    document.getElementById("password").focus();
    event.preventDefault();
  }
});


function userValid() {
  var text = document.getElementById("username").value;
  var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (text == "") {
    document.getElementById("username").style.cssText = " border: 3px solid rgba(255, 0, 0,.6)";
    document.getElementById("userErr").innerHTML = "Field Required";
  }
  else if (!text.match(regx)) {
    document.getElementById("username").style.cssText = " border: 3px solid rgba(255, 0, 0,.6);";
    document.getElementById("userErr").innerHTML = "Email Invalid";
  }
  else {
    document.getElementById("username").removeAttribute("style");
    document.getElementById("userErr").innerHTML = "";
  }

}
function passValid() {
  var text = document.getElementById("password").value;

  if (text == "") {
    document.getElementById("password").style.cssText = " border: 3px solid rgba(255, 0, 0,.6); border-right:0";
    document.getElementById("passEyeBG").style.cssText = " border: 3px solid rgba(255, 0, 0,.6); border-left:0";
    document.getElementById("passErr").innerHTML = "Field Required";
  } else if (text.length < 5) {
    document.getElementById("password").style.cssText = " border: 3px solid rgba(255, 0, 0,.6); border-right:0";
    document.getElementById("passEyeBG").style.cssText = " border: 3px solid rgba(255, 0, 0,.6); border-left:0";
    document.getElementById("passErr").innerHTML = "Password is too short";
  } else {
    document.getElementById("password").removeAttribute("style");
    document.getElementById("passEyeBG").removeAttribute("style");
    document.getElementById("passErr").innerHTML = "";
  }
}

function showPass() {

  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  document.getElementById('password').setAttribute('type', type);
  document.getElementById('password').focus();
  if (type == 'text') {
    document.getElementById("passEye").className = "fa fa-eye-slash fa-lg passEye";
  } else {
    document.getElementById("passEye").className = "fa fa-eye fa-lg passEye";

  }
}

document.gform.addEventListener("submit", function (event) {

  var user = this.querySelector("input[id=name]").value;
  var email = this.querySelector("input[id=email]").value;
  var emailregx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  if (((user.trim() == "") || (email.trim() == "")) || ((sub.trim() == "") || (msg.trim() == ""))) {
    document.getElementById("username").focus();
    event.preventDefault();
  } else if ((!email.match(emailregx) || pass.length < 5)) {
    event.preventDefault();
  }
});


function nameValid() {
  var text = document.getElementById("name").value;
  var letters = /^[a-zA-Z\s]*$/;

  if (text == "") {
    document.getElementById("name").style.cssText = " border: 3px solid rgba(255, 0, 0,.6)";
    document.getElementById("nameErr").innerHTML = "Field Required";
  }
  else if (!text.match(letters)) {
    document.getElementById("name").style.cssText = " border: 3px solid rgba(255, 0, 0,.6)";
    document.getElementById("nameErr").innerHTML = "Numbers are not allowed"
  }
  else if (text.length <= 4) {
    document.getElementById("name").style.cssText = " border: 3px solid rgba(255, 0, 0,.6)";
    document.getElementById("nameErr").innerHTML = "Name is too short";
  }
  else {
    document.getElementById("name").removeAttribute("style");
    document.getElementById("nameErr").innerHTML = "";

  }
}
function emailValid() {
  var text = document.getElementById("email").value;
  var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (text == "") {
    document.getElementById("email").style.cssText = " border: 3px solid rgba(255, 0, 0,.6)";
    document.getElementById("emailErr").innerHTML = "Field Required";
  }
  else if (!text.match(regx)) {
    document.getElementById("email").style.cssText = " border: 3px solid rgba(255, 0, 0,.6)";
    document.getElementById("emailErr").innerHTML = "Email Invalid";
  }
  else {
    document.getElementById("email").removeAttribute("style");
    document.getElementById("emailErr").innerHTML = "";
  }
}

function subjectValid() {
  var text = document.getElementById("subject").value;

  if (text == "") {
    document.getElementById("subject").style.cssText = " border: 3px solid rgba(255, 0, 0,.6)";
    document.getElementById("subErr").innerHTML = "Field Required";
  }
  else if (text.length < 10) {
    document.getElementById("subject").style.cssText = " border: 3px solid rgba(255, 0, 0,.6)";
    document.getElementById("subErr").innerHTML = "Subject is too short";
  }
  else {
    document.getElementById("subject").removeAttribute("style");
    document.getElementById("subErr").innerHTML = "";
  }
}

function messageValid() {

  var text = document.getElementById("message").value;
  if (text == "") {
    document.getElementById("message").style.cssText = " border: 3px solid rgba(255, 0, 0,.6)";
    document.getElementById("msgErr").innerHTML = "Field Required";
  }
  else if (text.length < 20) {
    document.getElementById("message").style.cssText = " border: 3px solid rgba(255, 0, 0,.6)";
    document.getElementById("msgErr").innerHTML = "Message is too short";
  }
  else {
    document.getElementById("message").removeAttribute("style");
    document.getElementById("msgErr").innerHTML = "";


  }
}

