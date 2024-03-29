
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Home = ({navigation}) => {

  const userInfos = useSelector(state => state.infos);
  console.log(userInfos);


    const remove = async() => {
      try {
        await AsyncStorage.clear();
        navigation.navigate('Login');
      } catch (error) {
        alert(error)
      }
    }
    
  return (
    <View style={styles.container}>
      
      <Pressable
        style={({pressed}) => ({ backgroundColor: pressed ? 'lightseagreen' : 'rebeccapurple', padding: 10, borderRadius: 5 })}
        onPress={remove}
      >
        <Text style={styles.btn}>Effacer</Text>
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  text: {
    fontSize: 40,
  },
  btn: {
    padding: 12,
    color: "white"
  },
})

    export default Home