import React, { Component } from "react";
import { View, Text } from "react-native";
import {createStackNavigator} from "react-navigation";
import Login from "./containers/Login/Login";

export default class AppRoutes extends Component {

    render() {
        return (
            <AppStackNavigator />
        );
    }
}

const AppStackNavigator = createStackNavigator({
    Login: Login
})

