import React, { Component } from "react";
import { View } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons"
import * as firebase from 'firebase'
import UserModal from "./userModal";
import Snackbar from 'react-native-snackbar';

class UsersList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            editUserData: {}
        };

        this.setModalVisible = this.setModalVisible.bind(this)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    handleRemoveChild = (id) => {
        firebase.database().ref(`board1/users/${id}`).remove()
            .then(() => Snackbar.show({ title: "User Removed" }))
            .catch((err) => Snackbar.show({ title: err.message }))
    }

    render() {

        return (

            <Card containerStyle={{ padding: 0, width: '85%' }} >
                {
                    this.props.userData.length === 1 ? (
                        <ListItem
                            title="Users Not Found"
                            rightIcon={<View></View>}
                        />
                    ) : (
                            this.props.userData.map((u, i) =>
                                u.id !== this.props.currentUser.id ? (
                                    <ListItem
                                        key={i}
                                        title={u.name}
                                        subtitle={u.role}
                                        rightIcon={this.props.currentUser.role === 'Admin' ? (
                                            <View style={{ paddingRight: 10, flexDirection: 'row' }}>
                                                <Icon name="md-create" size={24} onPress={() => {
                                                    this.setState({ editUserData: u });
                                                    this.setModalVisible(!this.state.modalVisible);
                                                }} />
                                                <Icon name="md-trash" style={{ paddingLeft: 12.5 }} size={24} onPress={() => {
                                                    this.handleRemoveChild(u.id);
                                                }} />
                                            </View>) : <View></View>
                                        }
                                    />
                                ) : null
                            )
                        )
                }

                <UserModal
                    modalStatus={this.state.modalVisible}
                    setModalStatus={this.setModalVisible}
                    userData={this.state.editUserData}
                />

            </Card>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userAuth.user,
        userData: state.usersList.usersList
    }
}

export default connect(mapStateToProps, null)(UsersList);