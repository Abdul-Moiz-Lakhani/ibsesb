/** @format */

import { AppRegistry } from 'react-native';
import AppRoutes from './src/AppRoutes';
import firebase from 'firebase';
import { name as appName } from './app.json';

//Initialize Firebase
var config = {
    apiKey: "AIzaSyDUIONOy3lDirRL5fbh4GCkCIbFARzNEEU",
    authDomain: "ibsesb-fyp.firebaseapp.com",
    databaseURL: "https://ibsesb-fyp.firebaseio.com",
    projectId: "ibsesb-fyp",
    storageBucket: "ibsesb-fyp.appspot.com",
    messagingSenderId: "162176471568"
};
firebase.initializeApp(config);

// var serviceAccount = require('./src/credentials/serviceAccountKey.json');

// firebase.initializeApp({
//     credential: firebase.credential.cert(serviceAccount),
//     databaseURL: "https://ibsesb-fyp.firebaseio.com"
// })


















AppRegistry.registerComponent(appName, () => AppRoutes);
