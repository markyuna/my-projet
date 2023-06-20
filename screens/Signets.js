import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Signets = () => {

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Signetses</Text>
    </View>
  )
};

export default Signets

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