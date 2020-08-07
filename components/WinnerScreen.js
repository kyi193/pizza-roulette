import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios';
import { Header } from 'react-native-elements'

const API_URL = 'https://whispering-badlands-07525.herokuapp.com/api/detailedPage'

export class WinnerScreen extends Component {
  state = {
    restaurantName: this.props.restaurantName,
    id: this.props.id,
    url: null,
    phoneNumber: null,
    rating: null,
    location: null,
    price: null,
    loaded: false
  }

  componentDidMount = () => {
    const id = this.state.id
    axios.get(`${API_URL}/${id}`)
      .then(res => {
        const business = res.data.business
        const { url, phone, rating, location, price } = business
        this.setState(() => ({
          url,
          phoneNumber: phone,
          rating,
          location,
          price,
          loaded: true
        }))
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      this.state.loaded
        ? (
          <View style={styles.container}>
            <Header
              containerStyle={
                {
                  backgroundColor: '#FF4900',
                  justifyContent: 'space-around',
                  borderBottomColor: 'white',
                  borderBottomWidth: '3',
                }
              }
            />
            <Text>This is the WinnerScreen</Text>
          </View>
        )
        : (
          <View style={styles.container}>
            <Text>Still choosing your restaurant....</Text>
          </View>
        )
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})

function mapStateToProps(state) {
  return {
    restaurantName: state.restaurant,
    id: state.id
  }
}

export default connect(mapStateToProps)(WinnerScreen)
