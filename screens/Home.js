
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Home = ({navigation}) => {

  const authUser = useSelector(state => state.users);


    const remove = async () => {
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
    fontSize: 30,
  },
})

    export default Home