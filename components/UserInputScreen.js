import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, TextInput, Keyboard, Dimensions } from 'react-native'

class UserInputScreen extends Component {
  state = {
    zipCode: null
  }

  onChangeZipcode = (zipCode) => {
    const zipCodeString = zipCode.toString()
    this.setState(() => ({
      zipCode: zipCodeString
    }))
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={styles.inputField}
            keyboardType='numeric'
            onChangeText={text => this.onChangeZipcode(text)}
            value={this.state.zipCode}
            placeholder="Enter zip code here..."
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  inputField: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  }
})

export default UserInputScreen
