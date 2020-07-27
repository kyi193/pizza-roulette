import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WheelOfFortune from 'react-native-wheel-of-fortune'
import axios from 'axios';

const API_URL = 'https://whispering-badlands-07525.herokuapp.com/api/getPizzas'

export default class GestureSpinnerWheel extends Component {
  componentDidMount = () => {
    axios.get(API_URL)
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
  }
  render() {
    const restaurants = ['Joe\'s', 'Rays', '2Bros', 'Dominos', '&Pizza', '$1Pizza']
    return (
      <View>
        <WheelOfFortune
          onRef={ref => (this.child = ref)}
          rewards={restaurants}
          knobSize={20}
          borderWidth={3}
          borderColor={"#FFF"}
          winner={Math.floor(Math.random() * restaurants.length)}
          innerRadius={10}
          textColor={"#FFFFFF"}
          backgroundColor={"#c0392b"}
          getWinner={(value, index) => this.setState({ selectedRestaurant: value, selectedIndex: index })}
        />
      </View>
    )
  }
}
