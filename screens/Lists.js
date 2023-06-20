import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Listes = () => {

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Listeses</Text>
    </View>
  )
};

export default Listes

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