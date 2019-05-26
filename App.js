/* eslint-disable no-unused-vars */
import { createStackNavigator } from 'react-navigation';
import Signup from './components/Signup';
import Login from './components/Login';
import Chat from './components/Chat';

export default createStackNavigator({
    Login: { screen: Login },
    Signup: { screen: Signup },
    Chat: { screen: Chat }
});
