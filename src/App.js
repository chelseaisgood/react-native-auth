import React, { Component } from 'react';
import firebase from 'firebase';
import { View, StyleSheet } from 'react-native';
import { Button, Header, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

type Props = {};
export default class App extends Component<Props> {

  state = {
    loggedIn: null
  }

  componentWillMount() {
    const config = {
      // check your Firebase web app and add config to your app
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  onUserLogout = () => {
    firebase.auth().signOut();
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={this.onUserLogout} style={styles.logoutButtonStyle}>
                Log out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  logoutButtonStyle: {
    height: 30,
    flex: 1,
    width: null,
  }
});
