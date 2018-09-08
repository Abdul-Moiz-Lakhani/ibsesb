import React, { Component } from 'react'
import { View } from 'react-native'
import * as firebase from "firebase";
import { createTabNavigator} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons"
import All from "./../components/All";
import Bulb from "./../components/Bulb";
import Fan from "./../components/Fan";
import Computer from "./../components/Computer";
import AC from "./../components/AC";

export default class AppTabNavigator extends Component{

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Dashboard",
            headerTintColor: 'grey',
            headerLeft: (
                <View style={{padding: 10, paddingLeft: 15}}>
                    <Icon name="md-menu" size={28} onPress={()=>{
                        navigation.openDrawer()
                    }} />
                </View>
            ),
            headerRight: (
                <View style={{padding: 10, paddingRight: 15}}>
                    <Icon name="md-log-out" size={28} onPress={()=>firebase.auth().signOut()} />
                </View>
            )
        }
    }

    render(){
        return (
            <DashboardTabNavigator />
        )
    }
}


const DashboardTabNavigator = createTabNavigator({
    All: {
        screen: All,
        navigationOptions: {
            tabBarLabel: 'All',
            tabBarIcon: ()=>(
                <Icon name="md-compass" size={24} />
            )
        }
    },
    Bulb: {
        screen: Bulb,
        navigationOptions: {
            tabBarLabel: 'Bulb',
            tabBarIcon: ()=>(
                <Icon name="md-compass" size={24} />
            )
        }
    },
    Fan: {
        screen: Fan,
        navigationOptions: {
            tabBarLabel: 'Fan',
            tabBarIcon: ()=>(
                <Icon name="md-compass" size={24} />
            )
        }
    },
    Computer: {
        screen: Computer,
        navigationOptions: {
            tabBarLabel: 'PC',
            tabBarIcon: ()=>(
                <Icon name="md-compass" size={24} />
            )
        }
    },
    AC: {
        screen: AC,
        navigationOptions: {
            tabBarLabel: 'AC',
            tabBarIcon: ()=>(
                <Icon name="md-compass" size={24} />
            )
        }
    }
})