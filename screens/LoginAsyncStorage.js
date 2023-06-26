import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [user, setUser] = useState({ firstName: '', lastName: '' });

  const handleSave = async () => {
    if (user.firstName.length > 0 && user.lastName.length > 0) {
      // Validar y guardar los datos
      try {
        await AsyncStorage.setItem('LoginDetails', JSON.stringify(user));
        navigation.navigate('Home');
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  const load = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('LoginDetails');
      if (jsonValue !== null) {
        navigation.navigate('Home');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <AntDesign name="twitter" size={80} color="white" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>{user.lastName}</Text>
        <TextInput
          placeholder="Votre Email"
          keyboardType="email-address"
          style={styles.input}
          onChangeText={text => setUser(prevUser => ({ ...prevUser, firstName: text }))}
        />
        <TextInput
          placeholder="Votre Prenom"
          style={styles.input}
          onChangeText={text => setUser(prevUser => ({ ...prevUser, lastName: text }))}
        />
        <TouchableOpacity style={styles.touchable} onPress={handleSave}>
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>Se connecter</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A91DA',
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
  touchable: {
    marginVertical: 9,
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
});

export default Login;
