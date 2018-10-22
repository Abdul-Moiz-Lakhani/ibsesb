/** @format */

import { AppRegistry } from 'react-native';
import AppRoutes from './src/AppRoutes';
import firebase from 'firebase';
import { name as appName } from './app.json';

//Initialize Firebase
var config = {
};
firebase.initializeApp(config);

AppRegistry.registerComponent(appName, () => AppRoutes);
