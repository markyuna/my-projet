import { INFO_USER } from "../constants";

export const setUserInfos = (firstName, lastName, profilImage) => {
    return async (dispatch) => {
         // Fire Base BDD
         const firebaseResp = await fetch('https://react-native-a7b0f-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              // ID vua firebase
              firstName: firstName,
              lastName: lastName,
              profilImage: profilImage,
            })
        })
    }
};