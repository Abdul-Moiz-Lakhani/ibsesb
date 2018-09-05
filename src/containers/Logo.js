import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

export default class Logo extends Component {
    render() {
        return (
            <View style={styles.imageContainer}>
                <Image style={styles.logo} source={require('./../assets/Logo.png')} />
                <Text style={styles.text}>SMART SWITCH BOARD APP</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 160,
    },
    text: {
        color: "white",
        textAlign: 'center', 
        fontSize: 21,
        marginTop: 20,
        fontFamily: 'RobotoBlack',
        letterSpacing: 1,
        fontWeight: 'bold',
    },
})