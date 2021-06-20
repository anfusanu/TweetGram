


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
function newNameValid() {
  var text = document.getElementById("signup-name").value;
  var regx = /^[a-zA-Z\s]*$/;
  if (text == "") {
    document.getElementById("signup-nameErr").innerHTML = "Field Required";
  }
  else if (!text.match(regx)) {
    document.getElementById("signup-nameErr").innerHTML = "Bad name";
  }else if (text.length <5){
    document.getElementById("signup-nameErr").innerHTML = "Name too short";

  }
  else {
    document.getElementById("signup-nameErr").innerHTML = "";
  }

}
function newUserValid() {
  var text = document.getElementById("signup-username").value;
  var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (text == "") {
    document.getElementById("signup-userErr").innerHTML = "Field Required";
  }
  else if (!text.match(regx)) {
    document.getElementById("signup-userErr").innerHTML = "Email Invalid";
  }
  else {
    document.getElementById("signup-userErr").innerHTML = "";
  }

}
function newPassValid() {
  var text = document.getElementById("signup-password").value;
  if (text == "") {
    document.getElementById("signup-passErr").innerHTML = "Field Required";
  } else if (text.length < 5) {
    document.getElementById("signup-passErr").innerHTML = "Password is too short";
  } else {
    document.getElementById("signup-passErr").innerHTML = "";
  }
}

function newPassConfirm() {
  var text = document.getElementById("signup-password2").value;
  var match = document.getElementById("signup-password").value;

  if (match == ""){
    document.getElementById("signup-password").focus();
  } else if (match.length < 5){
    document.getElementById("signup-password").focus();

  }
  if (text == "") {
    document.getElementById("signup-passErr2").innerHTML = "Field Required";
  } else if (text != match) {
    document.getElementById("signup-passErr2").innerHTML = "Not same";
  } else {
    document.getElementById("signup-passErr2").innerHTML = "";
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

