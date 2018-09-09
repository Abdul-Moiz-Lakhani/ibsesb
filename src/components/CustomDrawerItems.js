import React from "react";
import {Image, SafeAreaView, ScrollView, View, StyleSheet, Text} from 'react-native';
import {DrawerItems} from "react-navigation";
import {connect} from 'react-redux';

const CustomDrawerItems = (props) => {

    return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.userImageContainer}>
            <View style={styles.imageBorder}>
                <Image style={styles.image} source={{uri: props.userData.imgUrl}} />
            </View>
        </View>
        <Text style={styles.userName}>{props.userData.name}</Text>
        <Text style={styles.userRole}>{props.userData.role === 'admin' ? 'Admin' : ''}</Text>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
)}

const mapStateToProps = (state) => {
    return {
        userData: state.userAuth.user
    }
}

const styles = StyleSheet.create({
    userImageContainer: {
        backgroundColor: 'white', 
        height: 150, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 30
    },
    image: {
        height: 120, 
        width: 120, 
        borderRadius: 60,
        borderColor: 'white',
        borderWidth: 3,
    },
    imageBorder: {
        borderColor: 'lightgrey',
        borderWidth: 5,
        borderRadius: 100,
    },
    userName: {
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
    },
    userRole: {
        fontSize: 16,
        paddingBottom: 10,
        textAlign: 'center',
        color: '#4682b4',
        fontStyle: 'italic',
    }
})

export default connect(mapStateToProps, null)(CustomDrawerItems);