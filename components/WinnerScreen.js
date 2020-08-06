import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

export class WinnerScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the WinnerScreen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect()(WinnerScreen)
