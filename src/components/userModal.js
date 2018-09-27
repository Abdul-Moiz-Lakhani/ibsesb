import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Picker } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import * as firebase from "firebase";
import Snackbar from 'react-native-snackbar';

class UsersModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            role: "",
            userID: "",
            hasNameFocus: false,
            hasRoleFocus: false
        };
    }
    
    componentWillReceiveProps(currentProps, prevProps) {

        if(currentProps !== prevProps) {
            this.setState({
                name: currentProps.userData.name,
                email: currentProps.userData.email,
                role: currentProps.userData.role,
                userID: currentProps.userData.id
            })
        }
    }

    handleOnPress = () => {

        let data = {
            name: this.state.name,
            role: this.state.role,
            email: this.state.email,
            imgUrl: 'none'
        }

        firebase.database().ref(`board1/users/${this.state.userID}/`).set(data)
        .then(() => {
            this.props.setModalStatus(!this.props.modalStatus)
            this.setState({
                name: '',
                role: '',
            })
        })
        .catch((err) => Snackbar.show({ title: err.message }))

    }

    handleOnFocus = (focus, field) => {

        if (field === 'name') {
            this.setState({ hasNameFocus: focus })
        }
    }

    render() {

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalStatus}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>

                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeading}>Edit User</Text>
                            <View style={styles.closeButton}>
                                <Icon name="md-close" size={24} color="#607d8b" onPress={() => this.props.setModalStatus(!this.props.modalStatus)} />
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

                            <View style={{ flexDirection: 'row', width: '80%', paddingTop: 10 }}>
                                <Text style={styles.role}>Choose Role</Text>
                                <Picker
                                    selectedValue={this.state.role}
                                    style={{ width: '60%', height: 50 }}
                                    onValueChange={(itemValue) => {
                                        this.setState({
                                            role: itemValue
                                        })
                                    }}
                                >
                                    <Picker.Item label="Admin" value="Admin" />
                                    <Picker.Item label="Member" value="Member" />

                                </Picker>
                            </View>

                            <TouchableOpacity style={styles.addUserButton} onPress={() => { this.handleOnPress() }}>
                                <Text style={styles.buttonText}>Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        )
    }
}

export default UsersModal;

const styles = StyleSheet.create({
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