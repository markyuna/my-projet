import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Settings = () => {

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Settings</Text>
    </View>
  )
};

export default Settings

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