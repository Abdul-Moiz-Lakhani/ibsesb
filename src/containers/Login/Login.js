import React, {Component} from "react";
import { View, StyleSheet } from "react-native";

export default class Login extends Component {
    
    static navigationOptions = {
        header: null
    }
    
    render() {
        return (
            <View style={styles.container}>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#808080"
    }
})