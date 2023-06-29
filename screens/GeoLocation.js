import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { addUserGeo } from '../database/db';

const GeoLocation = ({ navigation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      setIsLocating(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Géolocalisation refusée!');
        setIsLocating(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setIsLocating(false);
    } catch (error) {
      setErrorMsg('Problème de géolocalisation');
      setIsLocating(false);
    }
  };

  const saveToSQLite = async (latitude, longitude) => {
    try {
      const dbInsertResult = await addUserGeo(latitude, longitude);
      console.log(dbInsertResult);
      // ... Código adicional de manipulación de resultados de la base de datos
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (latitude !== null && longitude !== null) {
      saveToSQLite(latitude, longitude);
      navigation.replace('Home');
    } else {
      alert('Veuillez indiquer votre géolocalisation');
    }
  };

  const geoLocText = errorMsg
    ? errorMsg
    : latitude !== null && longitude !== null
    ? 'OK'
    : '';

  return (
    <View style={styles.container}>
      {isLocating && <ActivityIndicator size="large" color="white" />}

      <TouchableOpacity style={styles.touchable} onPress={getLocation}>
        <View style={styles.globeContainer}>
          <Text style={{ color: 'white', marginBottom: 16, fontSize: 19 }}>
            Cliquez pour vous géolocaliser
          </Text>
          <Entypo name="globe" size={120} color="white" />
        </View>
      </TouchableOpacity>

      {geoLocText === 'OK' && (
        <TouchableOpacity style={styles.touchable} onPress={handleSubmit}>
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>Bravo, vous pouvez valider</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A91DA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    marginVertical: 9,
  },
  globeContainer: {
    alignItems: 'center',
  },
  btnContainer: {
    backgroundColor: 'turquoise',
    borderRadius: 7,
    padding: 9,
  },
  btnText: {
    fontSize: 17,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default GeoLocation;
