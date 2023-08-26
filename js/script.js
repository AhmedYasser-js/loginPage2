const usernameInput = document.getElementById ('usernameInput');
const userEmailInput = document.getElementById ('userEmailInput');
const userPasswordInput = document.getElementById ('userPasswordInput');
const signupBtn = document.getElementById ('signupBtn');

let userData;
if (localStorage.getItem ('users') == null) {
  userData = [];
} else {
  userData = JSON.parse (localStorage.getItem ('users'));
}
function signUp () {
  userInputsValidation ();
  isExist ();

  if (userInputsValidation () && !isExist ()) {
    let user = {
      name: usernameInput.value,
      email: userEmailInput.value,
      password: userPasswordInput.value,
    };

    userData.push (user);
    localStorage.setItem ('users', JSON.stringify (userData));
    const confirmMsg = document.getElementById ('confirmMsg');
    confirmMsg.classList.replace ('d-none', 'd-block');
    const signin = document.getElementById ('signin');
    signin.classList.replace ('d-none', 'd-block');
  } else {
    const tryAgainMsg = document.getElementById ('tryAgainMsg');
    tryAgainMsg.classList.replace ('d-none', 'd-block');
  }
}

// user name Validation function
function usernameValidation () {
  const usernameAlert = document.getElementById ('usernameAlert');

  let regex = /^[A-Za-z]{3,10}(\s[A-Za-z]{3,10})?\s?$/;
  let isValid = regex.test (usernameInput.value) && usernameInput.value != '';

  if (isValid) {
    usernameInput.classList.add ('is-valid');
    usernameInput.classList.remove ('is-invalid');
    usernameAlert.classList.replace ('d-block', 'd-none');
  } else {
    usernameInput.classList.add ('is-invalid');
    usernameInput.classList.remove ('is-valid');
    usernameAlert.classList.replace ('d-none', 'd-block');
  }
  return isValid;
}

// user Password Validation function
function userPasswordValidation () {
  let regex = /^.{5,15}$/;
  const userPasswordAlert = document.getElementById ('userPasswordAlert');
  let isValid =
    regex.test (userPasswordInput.value) && userPasswordInput.value != '';

  if (isValid) {
    userPasswordInput.classList.add ('is-valid');
    userPasswordInput.classList.remove ('is-invalid');
    userPasswordAlert.classList.replace ('d-block', 'd-none');
  } else {
    userPasswordInput.classList.add ('is-invalid');
    userPasswordInput.classList.remove ('is-valid');
    userPasswordAlert.classList.replace ('d-none', 'd-block');
  }
  return isValid;
}

// user Email Validation function
function userEmailValidation () {
  const userEmailAlert = document.getElementById ('userEmailAlert');

  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isValid =
    regex.test (userEmailInput.value) == true && userEmailInput.value != '';
  if (isValid) {
    userEmailInput.classList.add ('is-valid');
    userEmailInput.classList.remove ('is-invalid');
    userEmailAlert.classList.replace ('d-block', 'd-none');
  } else {
    userEmailInput.classList.add ('is-invalid');
    userEmailInput.classList.remove ('is-valid');
    userEmailAlert.classList.replace ('d-none', 'd-block');
  }
  return isValid;
}

function isExist () {
  const accountExistMsg = document.getElementById ('accountExistMsg');
  const inputValue = input => input.value.toLowerCase ();

  for (const user of userData) {
    const isNameMatch = inputValue (usernameInput) === user.name.toLowerCase ();
    const isEmailMatch =
      inputValue (userEmailInput) === user.email.toLowerCase ();

    if (isNameMatch || isEmailMatch) {
      accountExistMsg.classList.replace ('d-none', 'd-block');
      [usernameInput, userEmailInput, userPasswordInput].forEach (input =>
        input.classList.remove ('is-valid')
      );
      return true;
    }
  }

  return false;
}

// function to Validation All user Inputs
function userInputsValidation () {
  const isUsernameValid = usernameValidation ();
  const isEmailValid = userEmailValidation ();
  const isPasswordValid = userPasswordValidation ();

  return isUsernameValid && isEmailValid && isPasswordValid;
}

// !========================!
// ^========================
// !========================!
var username = localStorage.getItem ('findUsername');

function login () {
  const loginEmail = document.getElementById ('loginEmail');
  const loginPassword = document.getElementById ('loginPassword');
  const loginBtn = document.getElementById ('loginBtn');
  const wrongMsg = document.getElementById ('wrongMsg');

  if (loginEmail.value == '' || loginPassword.value == '') {
    const fillMsg = document.getElementById ('fillMsg');
    fillMsg.classList.replace ('d-none', 'd-block');
    return false;
  }

  for (var i = 0; i < userData.length; i++) {
    if (
      userData[i].email.toLowerCase () == loginEmail.value.toLowerCase () &&
      userData[i].password.toLowerCase () == loginPassword.value.toLowerCase ()
    ) {
      localStorage.setItem ('findUsername', userData[i].name);
      loginBtn.setAttribute ('href', 'welcome.html');
    } else {
      wrongMsg.classList.replace ('d-none', 'd-block');
    }
  }
}

function displayWelcomeUser () {
  document.getElementById ('username').innerHTML = 'Welcome ' + username;
}

function logout () {
  localStorage.removeItem ('findUsername');
}
