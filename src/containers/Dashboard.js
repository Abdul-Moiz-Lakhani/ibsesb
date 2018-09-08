import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {DrawerActions} from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons"

class Dashboard extends Component {

    static navigationOptions = {
        header: "none"
    }

    render() {
        return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>Hello</Text>
                    <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>World!</Text>
                </View>
        );
    }
}

export default Dashboard;