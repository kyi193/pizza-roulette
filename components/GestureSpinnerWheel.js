import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WheelOfFortune from 'react-native-wheel-of-fortune'
import axios from 'axios';
import { connect } from 'react-redux';

const API_URL = 'https://whispering-badlands-07525.herokuapp.com/api/getPizzas'

export class GestureSpinnerWheel extends Component {
  state = {
    selectedRestaurant: null,
    selectIndex: null
  }

  componentDidMount = () => {
    axios.get(API_URL)
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
  }
  render() {
    const restaurants = ['Joe\'s', 'Rays', '2Bros', 'Dominos', '&Pizza', '$1Pizza']
    return (
      <View style={styles.container}>
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
        {this.state.selectedRestaurant
          && <View style={{ paddingBottom: 100 }}>
            <Text>{this.state.selectedRestaurant}</Text>
          </View>
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    zipCode: state.zipCode
  }
}

export default connect(mapStateToProps)(GestureSpinnerWheel)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
