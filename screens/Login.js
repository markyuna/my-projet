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
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WaitScreen from './WaitScreen';
import { useDispatch } from 'react-redux';
import { actionSignup, actionLogin } from '../redux/actions/actionAuth';
import { LinearGradient } from 'expo-linear-gradient';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const load = async () => {
    const userDetailsStr = await AsyncStorage.getItem('userDetails');
    if (userDetailsStr !== null) {
      const userDetailsObj = JSON.parse(userDetailsStr);
      const { token, userId, dateTokenExpire } = userDetailsObj;
      const expireDate = new Date(dateTokenExpire);

      if (expireDate <= new Date() || !token || !userId) {
        setIsAuth(true);
        return;
      }

      navigation.navigate('Home');
      setIsAuth(true);
    } else {
      setIsAuth(true);
    }
  };

  useLayoutEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (error != null) {
      Alert.alert(
        'ERREUR', 
        error, 
        [{ text: 'OK' }]
      );
    }
  }, [error]);

  const handleSubmit = async () => {
    if (email.length > 0 && password.length > 0) {
      if (isSignup) {
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(actionSignup(email, password));
          navigation.navigate('ProfileInfos');
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }

      } else {
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(actionLogin(email, password));
          navigation.navigate('Home');
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    } else {
      Alert("Vueillez remplir tous les champs");
    }
  }

  if (isAuth) {
    return (
      <LinearGradient
        colors={['#1A91DA', '#Fff']}
        style={styles.container}
      >
        <View style={styles.logo}>
          {
            isLoading ?
              <ActivityIndicator 
                  size="large" 
                  color="white" 
              /> :
              <AntDesign name="twitter" size={80} color={"white"}/>
          }
        </View>
        <View style={styles.inputContainer}>

          <Text style={styles.text}>{isSignup ? "Inscription" : "Connexion" }</Text>
          
          <TextInput
            placeholder="Votre Email"
            keyboardType="email-address"
            style={styles.input}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            placeholder="Votre mot de passe"
            secureTextEntry
            style={styles.input}
            onChangeText={text => setPassword(text)}
          />

          <TouchableOpacity
            style={styles.touchable}
            onPress={handleSubmit}
          >
            <View style={styles.btnContainer}>     
              <Text style={styles.btnText}>Valider</Text>
            </View> 
          </TouchableOpacity>

          <Pressable
            onPress={() => setIsSignup( prevState => !prevState )}
          >
            <Text style={{ textAlign: 'center', marginTop: 9}}>
              {isSignup ? "Vers Connexion" : "Vers Inscription"}
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    )
  }

  return (<WaitScreen />)
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
});

export default Login;
