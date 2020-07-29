import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import axios from 'axios';

const API_URL = 'https://whispering-badlands-07525.herokuapp.com/api/getPizzas'

export default class GestureSpinnerWheel extends Component {
  componentDidMount = () => {
    axios.get(API_URL)
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
  }
  render() {
    return (
      <View>
        <Text>Hi</Text>
      </View>
    )
  }
}
