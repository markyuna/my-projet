import React, {useState} from 'react'
import { TouchableOpacity, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { addUserGeo } from '../database/db';

const GeoLocation = ({ navigation }) => {

    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [isLocating, setIsLocating] = useState(null);


    const handleGeolocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        try {

            setIsLocating(true);

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);

            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
            setIsLocating(false);

        } catch (error) {
            setErrorMsg("Probléme de geolocalisation");
        }
    }

    const saveToSQLite = async (latitude, longitude) => {
        try {
            const dbInsertResult = await addUserGeo(latitude, longitude);
            console.log(dbInsertResult);
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    const handleSubmit = () => {
        if (latitude !== null && longitude !== null) {

            // Enregistrer en BDD
            saveToSQLite(latitude, longitude);

            // Redirection
            navigation.navigate('Home');

        } else {
            alert('Veuillez vous geolocaliser');
        }
    }

    let geoLocText = '';
    if (errorMsg) {
        geoLocText = errorMsg;
    } else if (latitude !== null && longitude !== null) {
        geoLocText = 'OK';
    }

  return (
    <View style={styles.container}>

    {
        isLocating && <ActivityIndicator size="large" color="#00ff00" />

    }

    <TouchableOpacity 
      style={styles.touchable}
      onPress={handleGeolocation}
    >
      <View style={styles.globeContainer}>
        <Text style={{color: 'white', marginBottom: 16, fontSize: 19}}>
            Cliquez pour vous geolocaliser
        </Text>
        <FontAwesome name="globe" size={120} color="white" />
      </View>
    </TouchableOpacity>

{
    geoLocText === 'OK' &&
    <TouchableOpacity 
      style={styles.touchable}
      onPress={handleSubmit}
    >
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}>
           Bravo, vous pouvez valider
        </Text>
        <FontAwesome name="globe" size={120} color="white" />
      </View>
    </TouchableOpacity>
}

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
    touchable: {
        marginBottom: 50,

    },
    globeContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    btnContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 9,
      },
      btnText: {
        fontSize: 19,
        textAlign: 'center',
        textTransform: 'uppercase',

      },
})

export default GeoLocation