import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { BottomNavigation } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigationBar extends Component {

    constructor() {
        super();
    
        this.state = {
          active: "users"
        }
    }

    render() {
        return (
            <BottomNavigation active={this.state.active} hidden={false} >
            <BottomNavigation.Action
                key="users"
                icon="people"
                label="Users"
                onPress={() => this.setState({ active: 'users' })}
            />
            <BottomNavigation.Action
                key="appliances"
                icon={<Icon name="md-bulb" size={30} color="#4F8EF7" />}
                label="Appliances"
                onPress={() => this.setState({ active: 'appliances' })}
            />
        </BottomNavigation>
        )
    }
}

const styles = StyleSheet.create({
    
})