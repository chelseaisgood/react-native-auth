import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
    };

    onLogin() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            () => {
                this.onLoginSuccess();
            }
        )
        .catch(
            () => {
                this.onLoginFail();
            }
        );
    }

    onLoginFail = () => {
        this.setState({
            error: 'Login failed.',
            loading: false,
        });
    }

    onLoginSuccess = () => {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false,
        });
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="email"
                        placeholder="user@gmail.com"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="password"
                        placeholder="password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.state.loading
                        ?
                        <Spinner />
                        :
                        <Button onPress={this.onLogin.bind(this)}>
                            Log in
                        </Button>
                    }
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
};
