import { AUTH_USER, LOGOUT_USER } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';


// Inscription
export const actionSignup = (email, password) => {

  return async (dispatch) => {
    // http request
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=YOUR_API_KEY', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    // response
    if (!response.ok) {
      // error message
      const responseError = await response.json();
      const errorMsg = responseError.error.message;

      let customMsg = "Oups, nous avons un problème lors de l'inscription";

      if (errorMsg === 'EMAIL_EXISTS') {
        customMsg = "Cette adresse email existe déjà";
      } else if (errorMsg === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        customMsg = "Trop de tentatives, veuillez réessayer plus tard";
      }

      throw new Error(customMsg);
    }

    const dataObj = await response.json();
    console.log(dataObj);
    // dispatch action
    dispatch(actionAuthUser(dataObj.localId, dataObj.idToken));

    // AsyncStorage
    const expiresInMiliSec = parseInt(dataObj.expiresIn) * 1000;
    const expireDate = new Date().getTime() + expiresInMiliSec;
    const dateTokenExpire = new Date(expireDate).toISOString();

    saveToAsyncStorage(dataObj.idToken, dataObj.localId, dateTokenExpire);
  };
};

// Connexion
export const actionLogin = (email, password) => {
  return async (dispatch) => {
    // http request
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPFzAMUz4f-xrGvW_Vf8ofWC7lLLWE2Y4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    // response
    if (!response.ok) {
      // error message
      const responseError = await response.json();
      const errorMsg = responseError.error.message;

      let customMsg = "Oups, nous avons un problème lors de la connexion";

      if (errorMsg === 'EMAIL_NOT_FOUND') {
        customMsg = "Adresse email introuvable";
      } else if (errorMsg === 'INVALID_PASSWORD') {
        customMsg = "Mot de passe incorrect";
      }

      throw new Error(customMsg);
    }

    const dataObj = await response.json();
    // dispatch action

    // AsyncStorage
    const expiresInMiliSec = parseInt(dataObj.expiresIn) * 1000;
    const expireDate = new Date().getTime() + expiresInMiliSec;
    const dateTokenExpire = new Date(expireDate).toISOString();

    saveToAsyncStorage(dataObj.idToken, dataObj.localId, dateTokenExpire);
  }
};


// Logout
export const actionLogout = () => {
  return {
    type: LOGOUT_USER 
  }
};

// Enregistrer la data dans AsyncStorage
const saveToAsyncStorage = async (token, userId, dataTokenExpire) => {
  await AsyncStorage.setItem('userDetails', JSON.stringify({
    token: token,
    userId: userId,
    dataTokenExpire: dataTokenExpire
  }));
};

// Auth action
const actionAuthUser = (userId, token) => {
  return {
    type: AUTH_USER,
    userId: userId,
    token: token
  };
};

export default saveToAsyncStorage;
