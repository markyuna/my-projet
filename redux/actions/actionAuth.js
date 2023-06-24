
import { AUTH_USER } from "../constants";


// Inscription 
export const actionSignup = (email, password) => {
    return async (dispatch) => {
        // http request
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAPFzAMUz4f-xrGvW_Vf8ofWC7lLLWE2Y4',
         {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        // reponse
        if(!response.ok) {
            // message d'erreur
            const responseError = await response.json();
            const errorMsg = responseError.error.message;

            let customMsg = "Oups, nous avons un probleme lors de l'inscription";

            if (errorMsg === 'EMAIL_EXISTS') {
                customMsg = "Cette addresse email existe deja";
            } else if (errorMsg === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                customMsg = "Trop de tentatives, veuillez reessayer plus tard";
            }

            throw new Error(customMsg);
        }

        const dataObj = await response.json();
        console.log(dataObj);
        // dispatch action
        dispatch(actionAuthUser(dataObj.localId, dataObj.idToken));
    }

}

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
        })

        // reponse
        if(!response.ok) {
            // message d'erreur
            const responseError = await response.json();
            const errorMsg = responseError.error.message;

            let customMsg = "Oups, nous avons un probleme lors de la connexion";

            if (errorMsg === 'EMAIL_NOT_FOUND') {
                customMsg = "Adresse email introuvable";
            } else if (errorMsg === 'INVALID_PASSWORD') {
                customMsg = "Mot de passe incorrect";
            }

            throw new Error(customMsg);
        }

        const dataObj = await response.json();
        // dispatch action
        dispatch(actionAuthUser(dataObj.localId, dataObj.idToken));
    }
}


// Auth action

const actionAuthUser = (userId, token) => {
    return {
        type: AUTH_USER,
        userId: userId,
        token: token
    }
}