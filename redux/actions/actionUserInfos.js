// import { INFO_USER } from "../constants";
// import AsyncStorage from '@react-native-async-storage/async-storage';


// export const setUserInfos = (firstName, lastName, profilImage) => {
//   return async (dispatch) => {
//         // Fire Base BDD
//         const firebaseResp = await fetch('https://react-native-a7b0f-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             // ID vua firebase
//             firstName: firstName,
//             lastName: lastName,
//             profilImage: profilImage,
//           })
//       })

//       if (!firebaseResp.ok) {
//           throw new Error('Une erreur est survenue');
//       }

//       const userData = await firebaseResp.json();
//       // console.log(userData);    // objet name; ID

//       dispatch(actionUserInfos(userData.name, firstName, lastName, profilImage));

//       //AsyncStorage 

//       saveToAsyncStorage(userData.name, firstName, lastName, profilImage);

//     }
//   };
    
//   const saveToAsyncStorage = async (userId, firstName, lastName, profilImage) => {
//     await AsyncStorage.setItem('userProfilInfos', JSON.stringify({
//       userId: userId,
//       firstName: firstName,
//       lastName: lastName,
//       profilImage: profilImage,
//     }))
//   }
    
//   const actionUserInfos = (userId, firstName, lastName, profilImage ) => {
//     return {
//       type: INFO_USER,
//       infos: {
//         userId: userId,
//         firstName: firstName,
//         lastName: lastName,
//         profilImage: profilImage,
//       }
//     }
//   }


import { INFO_USER } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';


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

      if (!firebaseResp.ok) {
          throw new Error('Une erreur est survenue');
      }

      const userData = await firebaseResp.json();
      // console.log(userData);    // objet name; ID

      dispatch(actionUserInfos(userData.name, firstName, lastName, profilImage));

      //AsyncStorage 

      saveToAsyncStorage(userData.name, firstName, lastName, profilImage);

    }
  };
    
  const saveToAsyncStorage = async (userId, firstName, lastName, profilImage) => {
    await AsyncStorage.setItem('userProfilInfos', JSON.stringify({
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      profilImage: profilImage,
    }))
  }
    
  const actionUserInfos = (userId, firstName, lastName, profilImage ) => {
    return {
      type: INFO_USER,
      infos: {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        profilImage: profilImage,
      }
    }
  }

