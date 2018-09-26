import React from "react";
import {View} from 'react-native';
import {Card, ListItem} from 'react-native-elements'
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/Ionicons"
import * as firebase from 'firebase'

const UsersList = (props) => {

    handleRemoveChild = (id) => {
        firebase.auth().deleteUser(id)
        .then(()=>{
            firebase.database().ref(`board1/users/${id}`).remove();
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <Card containerStyle={{padding: 0, width: '85%'}} >
        {
            props.userData.map((u, i) => 
                u.id !== props.currentUser.id ? (
                    <ListItem
                        key={i}
                        title={u.name}
                        subtitle={u.role}
                        rightIcon={ 
                            <View style={{paddingRight: 10, flexDirection: 'row'}}>
                                <Icon name="md-create" size={24} onPress={()=>{
                                    console.log('hello')
                                }} />
                                <Icon name="md-trash" style={{paddingLeft: 12.5}} size={24} onPress={()=>{
                                    this.handleRemoveChild(u.id);
                                }} />
                            </View>
                        }
                    />
                ) : null
            )
        }
      </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userAuth.user,
        userData: state.usersList.usersList
    }
}

export default connect(mapStateToProps, null)(UsersList);