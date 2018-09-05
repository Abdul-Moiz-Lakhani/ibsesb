import React, { Component } from "react";
import {createStackNavigator} from "react-navigation";
import {Provider} from 'react-redux';
import Store from "./store/store";

import WelcomeScreen from "./containers/WelcomeScreen";

export default class AppRoutes extends Component {

    render() {
        return (
            <Provider store={Store}>
                <AppStackNavigator />
            </Provider>
        );
    }
}

const AppStackNavigator = createStackNavigator({
    WelcomeScreen: WelcomeScreen
})

