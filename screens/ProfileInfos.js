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


const ProfileInfos = () => {

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
      if (lastName.length > 0 && firstName.length > 0 && profileImage.length > 0) {
        setIsLoading(true);

        // Fire Base

      } else {
        alert('Veuillez remplir tous les champs');
      }
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
            onChangeText={text => setProfileImage(text)}
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