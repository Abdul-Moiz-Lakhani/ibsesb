import React, { Component } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as firebase from 'firebase';
import Snackbar from 'react-native-snackbar';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      hasEmailFocus: false,
      hasPassFocus: false
    }
  }

  handleOnPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(()=>Snackbar.show({ title: "Sign In Successful", duration: Snackbar.LENGTH_LONG }))
    .catch(err => Snackbar.show({ title: err.message }))
    
    this.setState({
      email: '',
      password: ''
    })
  }

  handleOnFocus = (focus, field) => {

    if (field === 'email') {
      this.setState({ hasEmailFocus: focus })
    }
    else if (field === 'pass') {
      this.setState({ hasPassFocus: focus })
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textfield}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          keyboardType='default'
          underlineColorAndroid={this.state.hasEmailFocus ? 'steelblue' : 'white'}
          textContentType='emailAddress'
          placeholder='Enter Email'
          placeholderTextColor='grey'
          onFocus={() => this.handleOnFocus(true, 'email')}
          onBlur={() => this.handleOnFocus(false, 'email')}
        />
        <TextInput
          style={styles.textfield}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          keyboardType='default'
          underlineColorAndroid={this.state.hasPassFocus ? 'steelblue' : 'white'}
          textContentType='password'
          secureTextEntry={true}
          placeholder='Enter Password'
          placeholderTextColor='grey'
          onFocus={() => this.handleOnFocus(true, 'pass')}
          onBlur={() => this.handleOnFocus(false, 'pass')}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleOnPress}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  textfield: {
    height: 60,
    width: 300,
    color: 'white',
  },
  button: {
    backgroundColor: 'steelblue',
    width: 100,
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  }
})