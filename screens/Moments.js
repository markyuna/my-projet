import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Moments = () => {

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Momentses</Text>
    </View>
  )
};

export default Moments

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