import React, { useState} from 'react';
import { 
  ActivityIndicator, 
  Button, 
  TouchableOpacity,
  TextInput, 
  StyleSheet, 
  Text, 
  View, 
  Image
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserInfos } from '../redux/actions/actionUserInfos';
import * as ImagePicker from 'expo-image-picker';

const ProfilInfos = ({navigation}) => {

    const dispatch = useDispatch();

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [profilImage, setProfilImage] = useState('https://res.cloudinary.com/dxrttyi2g/image/upload/v1687744563/square-format_-transparent-background-designify_1_djosja.png');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
      if (lastName.length > 0 && firstName.length > 0 && profilImage.length > 0) {
        setIsLoading(true);

        dispatch(setUserInfos(firstName, lastName, profilImage));

        // vers home 
        navigation.replace('GeoLocation');

      } else {
        alert('Veuillez remplir tous les champs');
      }
    }


    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // entre 0 1
      });

      console.log(result);

      if (!result.canceled) {
        setProfilImage(result)
      } else {
        alert('You did not select any image.');
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

          <View style={styles.photoContainer}>
            <View style={styles.wrapper}>
              <Image
                style={styles.photo}
                source={{uri: profilImage}}
              />
            </View>
            <Button 
              title="Selectionner une photo" 
              color="yellow" 
              onPress={ pickImage }
            />
          </View>

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
})


export default ProfilInfos