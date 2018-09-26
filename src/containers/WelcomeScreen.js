import React, { Component } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from 'react-navigation';
import {userSignIn} from "./../store/actions/authActions";
import {getAppliances} from "./../store/actions/applianceRecord";
import {getUsers} from "./../store/actions/usersList";

import Logo from './Logo';
import Login from './Login';
import SignUp from "./SignUp";

import * as firebase from 'firebase';

class WelcomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.database().ref(`board1/users/${user.uid}/`).on('value', snap => {
                    
                    let obj = snap.val();
                    obj.id = user.uid;

                    this.props.userSignIn(obj);          
                    this.props.navigation.navigate('DrawerNavigator');
                })
            }
            else {
                this.props.navigation.navigate('WelcomeScreen');
            }
        })

        
        firebase.database().ref(`board1/appliances/`).on('value', data => {
            
            let appliancesRecord = [];

            for(key in data.val()){
                
                let obj = data.val()[key];
                obj.id = key;
                appliancesRecord.push(obj);
            }

            this.props.getAppliances(appliancesRecord);
        })

        firebase.database().ref(`board1/users/`).on('value', data => {

            let usersList = [];

            for(key in data.val()){
                
                let obj = data.val()[key];
                obj.id = key;
                usersList.push(obj);
            }

            this.props.getUsers(usersList);
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

{/* <View style={styles.authNavContainer}>
                        <AuthNavigator />
                    </View> */}

const AuthNavigator = createMaterialTopTabNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            tabBarLabel: 'Sign Up',
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            tabBarLabel: 'Log In',
        }
    },
}, {
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'grey',
        style: {
            backgroundColor: '#333333',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
        }
    },    
})

const mapDispatchToProps = (dispatch) => {
    return {
        userSignIn: (user) => {
            dispatch(userSignIn(user))
        },
        getAppliances: (data) => {
            dispatch(getAppliances(data))
        },
        getUsers: (data) => {
            dispatch(getUsers(data))
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
    authNavContainer: {
        flex: 1,
        marginHorizontal: 25,
    },
})