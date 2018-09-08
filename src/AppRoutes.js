import React, { Component } from "react";
import {createStackNavigator, createDrawerNavigator} from "react-navigation";
import {Provider} from 'react-redux';
import Store from "./store/store";

import WelcomeScreen from "./containers/WelcomeScreen";
import AppTabNavigator from "./containers/DashboardTabNavigator";

export default class AppRoutes extends Component {

    render() {
        return (
            <Provider store={Store}>
                <AppStackNavigator />
            </Provider>
        );
    }
}

const InnerStackNavigator = createStackNavigator({
    TabNavigator: AppTabNavigator
})

const AppDrawerNavigator = createDrawerNavigator({
    Dashboard: InnerStackNavigator
})

const AppStackNavigator = createStackNavigator({
    WelcomeScreen: WelcomeScreen,
    DrawerNavigator: {
        screen: AppDrawerNavigator,
        navigationOptions: {
            header: null
        }
    }
}, {
    navigationOptions: {
        gesturesEnabled: false
    }
})

