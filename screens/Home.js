
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const Home = ({navigation}) => {

    const handlePress = () => {
        navigation.navigate('Profil')
    }
    
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Pressable
        style={({pressed}) => ({ backgroundColor: pressed ? 'lightseagreen' : 'rebeccapurple', padding: 10, borderRadius: 5 })}
        onPress={handlePress}
      >
        <Text>Go to Portfolio</Text>
      </Pressable>
    </View>
  )
}

export default Home

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