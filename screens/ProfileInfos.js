import React, { useState, useEffect, useLayoutEffect } from 'react';
import { 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  Pressable, 
  TextInput, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import saveToAsyncStorage from '../redux/actions/actionAuth';


const ProfileInfos = ({navigation}) => {

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [profilImage, setProfilImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
      if (lastName.length > 0 && firstName.length > 0 && profilImage.length > 0) {
        setIsLoading(true);

       

      
        const userData = await firebaseResp.json();
        console.log(userData);    // objet name; ID

        saveToAsyncStorage(userData.name, firstName, lastName, profilImage);

        // vers home 
        navigation.replace('Home');

      } else {
        alert('Veuillez remplir tous les champs');
      }
    }

    const saveToAsyncStorage = async (userId, firstName, lastName, profilImage) => {
      await AsyncStorage.setItem('userProfilInfos', JSON.stringify({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        profilImage: profilImage,
      }))
    }

  return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>

          <Text style={styles.text}>Indiquez vos informations</Text>

          <TextInput
            placeholder="Votre Nom"
            style={styles.input}
            onChangeText={text => setLastName(text)}
          />
          <TextInput
            placeholder="Votre Prenom"
            style={styles.input}
            onChangeText={text => setFirstName(text)}
          />

          <TextInput
            placeholder="Photo de Profil"
            style={styles.input}
            onChangeText={text => setProfilImage(text)}
          />

          {
            isLoading ? 
            <ActivityIndicator size="large" color="white" /> :
          <TouchableOpacity
            style={styles.touchable}
            onPress={handleSubmit}
          >
            <View style={styles.btnContainer}>     
              <Text style={styles.btnText}>Valider</Text>
            </View> 
          </TouchableOpacity>
          }

        </View>
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A91DA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 50,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 50,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    fontSize: 20,
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  btnContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 9,
  },
  btnText: {
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
})


export default ProfileInfos