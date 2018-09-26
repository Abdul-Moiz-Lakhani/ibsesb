import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Picker } from 'react-native'
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/Ionicons"
import UsersList from './../components/Users'
import {connect} from 'react-redux';

class UsersTab extends Component{

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Users",
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

    state = {
        modalVisible: false,
        name: '',
        role: '',
        email: '',
        pass: '',
        hasNameFocus: false,
        hasRoleFocus: false,
        hasEmailFocus: false,
        hasPassFocus: false
    };
    
    handleOnPress = () => {

        let data = {
            name: this.state.name,
            role: this.state.role,
            email: this.state.email,
            imgUrl: 'none'
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
        .then( user => {
            firebase.database().ref(`board1/users/${user.user.uid}/`).set(data).then(()=>{  
                this.setModalVisible(!this.state.modalVisible)
                this.setState({
                    name: '',
                    role: '',
                    email: '',
                    pass: ''
                })
            })
        }).catch((err)=>{
            console.log(err)
        })  

    }

    handleOnFocus = (focus, field) => {

        if (field === 'name') {
            this.setState({ hasNameFocus: focus })
        }
        else if (field === 'email') {
            this.setState({ hasEmailFocus: focus })
        }
        else if (field === 'pass') {
            this.setState({ hasPassFocus: focus })
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render(){
        return (
            <View style={styles.container}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>

                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalHeading}>Add User</Text>
                                    <View style={styles.closeButton}>
                                        <Icon name="md-close" size={24} color="#607d8b" onPress={()=>{this.setModalVisible(!this.state.modalVisible)}} />
                                    </View>
                                </View>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.textfield}
                                        onChangeText={(name) => this.setState({ name })}
                                        value={this.state.name}
                                        keyboardType='default'
                                        underlineColorAndroid={this.state.hasEmailFocus ? 'steelblue' : '#607d8b'}
                                        textContentType='text'
                                        placeholder='Enter Name'
                                        placeholderTextColor='grey'
                                        onFocus={() => this.handleOnFocus(true, 'name')}
                                        onBlur={() => this.handleOnFocus(false, 'name')}
                                    />
                                    
                                    <TextInput
                                        style={styles.textfield}
                                        onChangeText={(email) => this.setState({ email })}
                                        value={this.state.email}
                                        keyboardType='default'
                                        underlineColorAndroid={this.state.hasEmailFocus ? 'steelblue' : '#607d8b'}
                                        textContentType='emailAddress'
                                        placeholder='Choose Email'
                                        placeholderTextColor='grey'
                                        onFocus={() => this.handleOnFocus(true, 'email')}
                                        onBlur={() => this.handleOnFocus(false, 'email')}
                                    />
                                    <TextInput
                                        style={styles.textfield}
                                        onChangeText={(pass) => this.setState({ pass })}
                                        value={this.state.pass}
                                        keyboardType='default'
                                        underlineColorAndroid={this.state.hasPassFocus ? 'steelblue' : '#607d8b'}
                                        textContentType='password'
                                        secureTextEntry={true}
                                        placeholder='Choose Password'
                                        placeholderTextColor='grey'
                                        onFocus={() => this.handleOnFocus(true, 'pass')}
                                        onBlur={() => this.handleOnFocus(false, 'pass')}
                                    />

                                    <View style={{flexDirection: 'row', width: '80%', paddingTop: 10}}>
                                        <Text style={styles.role}>Choose Role</Text>
                                        <Picker
                                            selectedValue={this.state.role}
                                            style={{width: '60%', height: 50}}
                                            onValueChange={(itemValue, itemIndex)=>{
                                                this.setState({
                                                    role: itemValue
                                                })
                                            }}
                                        >
                                            <Picker.Item label="Admin" value="Admin" />
                                            <Picker.Item label="Member" value="Member" />

                                        </Picker>
                                    </View>

                                    <TouchableOpacity style={styles.addUserButton} onPress={()=>{this.handleOnPress()}}>
                                        <Text style={styles.buttonText}>Add User</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    
                    <UsersList />
                    
                    {
                        this.props.currentUser.role === 'Admin' ? (
                            <TouchableOpacity style={styles.button} onPress={()=>{this.setModalVisible(true);}}>
                                <Text style={styles.buttonText}>New User</Text>
                            </TouchableOpacity>
                        ) : null
                    }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userAuth.user
    }
}

export default connect(mapStateToProps, null)(UsersTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 22,
    },
    button: {
        backgroundColor: 'steelblue',
        width: 200,
        paddingVertical: 10,
        marginVertical: 20,
        borderRadius: 7,
        position: 'absolute',
        bottom: 15
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    modalContainer: {
        backgroundColor: "rgba(100, 100, 100, 0.5)", 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: "white", 
        width: '90%', 
        height: 410, 
        borderRadius: 15,
    },
    modalHeader: {
        flexDirection: 'row',
        backgroundColor: "lightgrey",
        height: 50, 
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    modalHeading: {
        width: '85%',
        color: '#607d8b',
        fontSize: 18,
        paddingTop: 12.5,
        paddingLeft: 20,
        fontWeight: 'bold'
    },
    closeButton: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        alignItems: 'center',
        paddingTop: 25
    },
    textfield: {
        height: 60,
        width: 300,
        color: '#607d8b',
    },
    addUserButton: {
        backgroundColor: 'steelblue',
        width: 150,
        paddingVertical: 10,
        marginVertical: 20,
        borderRadius: 7,
        position: 'absolute',
        top: 270
    },
    role: {
        color: 'steelblue',
        fontSize: 16,
        width: '40%',
        paddingTop: 10,
        alignItems: 'flex-start'
    }
})