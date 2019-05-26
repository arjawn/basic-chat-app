/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebaseSDK from '../config/firebaseSDK';

export default class Login extends Component {
    static navigationOptions = {
        title: 'RN + Firebase Chat App'
    };

    state = {
        name: 'Arjun',
        email: 'test@live.com',
        password: '123456',
        avatar: ''
    };

    onPressLogin = async () => {
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            avatar: this.state.avatar
        };

        const response = firebaseSDK.login(
            user,
            this.loginSuccess,
            this.loginFailed
        );
    };

    loginSuccess = () => {
        console.log('login successful, navigate to chat.');
        this.props.navigation.navigate('Chat', {
            name: this.state.name,
            email: this.state.email,
            avatar: this.state.avatar
        });
    };

    loginFailed = () => {
        alert('Login failure. Please try again.');
    };

    onChangeTextEmail = email => this.setState({ email });
    onChangeTextPassword = password => this.setState({ password });

    render() {
        return (
            <View>
                <Text style={styles.title}>Email:</Text>
                <TextInput
                    style={styles.nameInput}
                    placeHolder='test3@gmail.com'
                    onChangeText={this.onChangeTextEmail}
                    value={this.state.email}
                />
                <Text style={styles.title}>Password:</Text>
                <TextInput
                    style={styles.nameInput}
                    onChangeText={this.onChangeTextPassword}
                    value={this.state.password}
                />
                <Button
                    title='Login'
                    style={styles.buttonText}
                    onPress={this.onPressLogin}
                />

                <Button
                    title='Signup'
                    style={styles.buttonText}
                    onPress={() => this.props.navigation.navigate('Signup')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        marginTop: 16,
        marginLeft: 16,
        fontSize: 24
    },
    nameInput: {
        height: 16 * 2,
        margin: 16,
        paddingHorizaontal: 16,
        borderColor: '#111111',
        borderWidth: 1,
        fontSize: 16
    },
    buttonText: {
        marginLeft: 16,
        fontSize: 42
    }
});
