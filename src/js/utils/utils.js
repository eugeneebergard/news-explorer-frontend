import MainApi from '../api/MainApi';

const errorAuth = document.getElementById('error-auth');
const errorSignup = document.getElementById('error-signup');

const { options, errorApiMessages } = require('../constants/constants');

const mainApi = new MainApi(options, errorApiMessages, errorAuth, errorSignup);

export function checkAuth() {
  if(localStorage.jwtToken && localStorage.jwtToken !== '') return true;
  return false;
}

export function signup(user, statePopupSignup, formSignup, statePopupSuccess) {
  mainApi.signup(user)
    .then(() => {
        statePopupSignup.close();
        formSignup.reset();
        statePopupSuccess.open();
    })
    .catch((err) => {
      console.log(err)
    });
}

export function signin(user, statePopupAuth, formAuth){
  mainApi.signin(user)
    .then((res) => {
      localStorage.setItem('jwtToken', res.token);
      getUserData(statePopupAuth, formAuth);
    })
    .catch((err) => console.log(err));
}

export function signout() {
  localStorage.clear();
  location.reload();
}

function getUserData(statePopupAuth, formAuth) {
  mainApi.getUserData()
    .then((res) => {
      localStorage.setItem('username', res.name)
      statePopupAuth.close();
      formAuth.reset();
      location.reload();
    })
    .catch((err) => console.log(err));
}

