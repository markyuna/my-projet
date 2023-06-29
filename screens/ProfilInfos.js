import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ActivityIndicator,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { setUserInfos } from '../redux/actions/actionUserInfos';

const ProfilInfos = ({ navigation }) => {
  const dispatch = useDispatch();

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [profilImage, setProfilImage] = useState('https://res.cloudinary.com/dxrttyi2g/image/upload/v1687744563/square-format_-transparent-background-designify_1_djosja.png');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!lastName || !firstName || !profilImage) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    dispatch(setUserInfos(firstName, lastName, profilImage));
    navigation.replace('GeoLocation');
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
      canceled: false,
    });

    console.log(result);

    if (!result.canceled) {
      setProfilImage(result.assets[0].uri);
    } else {
      alert('Vous devez selectionner une image');
    }
    
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Indiquez vos informations</Text>

          <TextInput 
              placeholder='Votre Nom'
              style={styles.input}
              onChangeText={ text => setLastName(text) }
          />

          <TextInput 
              placeholder='Votre Prénom'
              style={styles.input}
              onChangeText={ text => setFirstName(text) }
          />


          <View style={styles.photoContainer}>
            <View style={styles.wrapper}>
              <Image style={styles.photo} source={{ uri: profilImage }} />
            </View>
            <Button
              title="Selectionner une photo"
              color="yellow"
              onPress={pickImageAsync}
            />
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <TouchableOpacity style={styles.touchable} onPress={handleSubmit}>
              <View style={styles.btnContainer}>
                <Text style={styles.btnText}>Valider</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A91DA',
  },
  inputContainer: {
    paddingHorizontal: 50,
    paddingVertical: 50,
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
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
  photoContainer: {
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 9,
    borderColor: 'white',
    borderWidth: 1,
  },
  photo: {
    width: '100%',
    height: '100%',
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
});

export default ProfilInfos;
