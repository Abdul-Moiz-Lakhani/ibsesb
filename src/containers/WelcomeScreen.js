import React, { Component } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import {userSignIn} from "./../store/actions/authActions";

import Logo from './Logo';
import Login from './Login';

class WelcomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.userSignIn(user);
            }
        })
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={require('./../assets/bg.png')}>
                <View style={styles.opacScreen}>
                    <Logo />
                    <Login />
                </View>
            </ImageBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userSignIn: (user) => {
            dispatch(userSignIn(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(WelcomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    opacScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
})