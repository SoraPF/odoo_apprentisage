/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {registerComponent} from 'expo';
import App from './pages_tsx/LoginScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
registerComponent(appName, () => App);
