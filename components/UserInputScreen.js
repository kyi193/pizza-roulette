import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, TextInput, Keyboard, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { submitZipcode } from '../actions'

const backgroundImage = { uri: "https://i.imgur.com/Fr2tPr1.png" }

const ZipCodeSubmitButton = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={onPress}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export class UserInputScreen extends Component {
  state = {
    zipCode: null
  }

  onChangeZipcode = (zipCode) => {
    const zipCodeString = zipCode.toString()
    this.setState(() => ({
      zipCode: zipCodeString
    }))
  }

  submitZipcode = () => {
    const { dispatch } = this.props
    dispatch(submitZipcode(this.state.zipCode))
    this.setState(() => ({
      zipCode: null
    }))
    this.props.navigation.navigate('Gesture Spinner Wheel')
  }

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.logo}>
              <Text style={styles.logoText}>Pizza Roulette</Text>
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.inputField}
                keyboardType='numeric'
                onChangeText={text => this.onChangeZipcode(text)}
                value={this.state.zipCode}
                placeholder="Enter zip code here..."
              />
              <ZipCodeSubmitButton onPress={this.submitZipcode} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  inputField: {
    height: 50,
    width: 225,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 2,
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 100,
    backgroundColor: 'red',
    borderRadius: 60,
    marginLeft: 10,
  },
  submitButtonText: {
    color: 'yellow',
    fontWeight: 'bold'
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  logo: {
    marginTop: 80,
    marginBottom: 150,
    backgroundColor: 'white',
    height: 120,
    width: 300,
    borderRadius: 15,
    borderWidth: 15,
    borderColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'orange'
  },
  logoText: {
    fontSize: 40,
    fontFamily: 'Noteworthy-Bold',
    color: 'white'
  }
})

export default connect()(UserInputScreen)
