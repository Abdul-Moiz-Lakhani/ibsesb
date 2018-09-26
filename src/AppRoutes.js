import React, { Component } from "react";
import {createStackNavigator, createDrawerNavigator} from "react-navigation";
import {Provider} from 'react-redux';
import Store from "./store/store";

import WelcomeScreen from "./containers/WelcomeScreen";
import AppTabNavigator from "./containers/DashboardTabNavigator";
import CustomDrawerItems from "./components/CustomDrawerItems";
import UsersTab from "./containers/UsersTab";

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

const UsersStackNavigator = createStackNavigator({
    UsersTabNavigator: UsersTab
})

const AppDrawerNavigator = createDrawerNavigator({
    Dashboard: InnerStackNavigator,
    Users: UsersStackNavigator
}, {
    contentComponent: CustomDrawerItems
})

const AppStackNavigator = createStackNavigator({
    WelcomeScreen: WelcomeScreen,
    DrawerNavigator: {
        screen: AppDrawerNavigator,
        navigationOptions: {
            header: null,
        }
    }
}, {
    navigationOptions: {
        gesturesEnabled: false
    }
})

