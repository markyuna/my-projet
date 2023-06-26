import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const WaitScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.container}>Patienter ...</Text>
        <ActivityIndicator 
            size="large" 
            color="white" />
    </View>
  )
}

export default WaitScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A91DA',
    },
    text: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 30,
    },
})