import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Sujets = () => {

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Sujets</Text>
    </View>
  )
};

export default Sujets

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
    },
    text: {
        fontSize: 30,
    },
})