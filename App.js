import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserInputScreen from './components/UserInputScreen'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'

export default function App() {
  return (
    <Provider store={createStore(reducer, composeWithDevTools(middleware))}>
      <View style={styles.container}>
        <UserInputScreen />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
