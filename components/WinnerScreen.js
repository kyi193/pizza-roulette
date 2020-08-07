import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Platform } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios';
import { Header } from 'react-native-elements'
import { generateUID } from '../utils/helpers'

const API_URL = 'https://whispering-badlands-07525.herokuapp.com/api/detailedPage'
const FULL_PIZZA = { uri: 'https://i.imgur.com/2Zxn2Cq.png' }
const HALF_PIZZA = { uri: 'https://i.imgur.com/tljEnPj.png' }

export class WinnerScreen extends Component {
  state = {
    restaurantName: this.props.restaurantName,
    id: this.props.id,
    url: null,
    phoneNumber: null,
    rating: null,
    location: null,
    price: null,
    loaded: false,
    pizzaRatingArr: null
  }

  componentDidMount = () => {
    const id = this.state.id
    axios.get(`${API_URL}/${id}`)
      .then(res => {
        const business = res.data.business
        const { url, phone, rating, location, price } = business
        const pizzaRatingArr = this.loadPizzaRating(rating)
        this.setState(() => ({
          url,
          phoneNumber: phone,
          rating,
          location,
          price,
          loaded: true,
          pizzaRatingArr
        }))
      })
      .catch(error => console.log(error))
  }

  loadPizzaRating = (rating) => {
    let pizzaRatingArr = []
    for (let i = 0; i < Math.floor(rating); i++) {
      pizzaRatingArr.push(FULL_PIZZA)
    }
    if (rating % 1 !== 0) {
      pizzaRatingArr.push(HALF_PIZZA)
    }
    return pizzaRatingArr
  }

  priceDescription = (price) => {
    return price.length === 3 ? 'Oh you fancy' :
      price.length === 2 ? 'A lil\' more upscale' : 'Cheap Eats'
  }

  dialCall = (phoneNumber) => {
    let phoneNumberString = '';

    if (Platform.OS === 'android') {
      phoneNumberString = 'tel:${' + `${phoneNumber}` + '}';
    }
    else {
      phoneNumberString = 'telprompt:${' + `${phoneNumber}` + '}';
    }

    Linking.openURL(phoneNumberString);
  };

  openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  }

  render() {
    const { restaurantName, url, phoneNumber, rating, price, pizzaRatingArr } = this.state
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
            <View style={styles.content}>
              <View style={styles.title}>
                <Text style={styles.restaurantName}>{restaurantName}</Text>
                <View style={styles.pizzaRatingContainer}>
                  {pizzaRatingArr.map(url => {
                    return (
                      <Image key={generateUID()} source={url} style={styles.pizzaRating} />
                    )
                  })}
                  <Text style={styles.pizzaRatingText}>({rating} Slices)</Text>
                </View>
              </View>
              <View style={styles.pizzaRatingContainer}>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.priceText}> - {this.priceDescription(price)}</Text>
              </View>
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>{this.state.location.address1}</Text>
                <Text style={styles.locationText}>{`${this.state.location.city}, ${this.state.location.state}`}</Text>
                <Text style={styles.locationText}>{this.state.location.postal_code}</Text>
              </View>
              <View style={styles.phoneNumberContainer}>
                <TouchableOpacity onPress={() => this.dialCall(phoneNumber)} activeOpacity={0.7} style={styles.callButton} >
                  <Text style={styles.phoneNumberText}>Call us now</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.phoneNumberContainer}>
                <TouchableOpacity onPress={() => this.openURL(url)} activeOpacity={0.7} style={styles.urlButton} >
                  <Text style={styles.phoneNumberText}>Visit our Yelp page</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  },
  restaurantName: {
    fontSize: 30,
    fontWeight: '900'
  },
  pizzaRatingContainer: {
    flexDirection: 'row'
  },
  pizzaRating: {
    height: 25,
    width: 25,
    marginHorizontal: 1.5
  },
  pizzaRatingText: {
    fontSize: 20,
    fontStyle: 'italic'
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green'
  },
  priceText: {
    paddingTop: 8,
    fontSize: 20,
    fontStyle: 'italic'
  },
  phoneNumberContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  callButton: {
    width: '55%',
    padding: 6,
    backgroundColor: '#FF6F00',
    borderRadius: 7,
    marginRight: 15,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10
  },
  urlButton: {
    width: '55%',
    padding: 6,
    backgroundColor: 'red',
    borderRadius: 7,
    marginRight: 15,
    height: 40,
    justifyContent: 'center',
  },
  phoneNumberText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  content: {
    padding: 8
  },
  locationText: {
    fontSize: 18
  },
  locationContainer: {
    marginTop: 10
  }
})

function mapStateToProps(state) {
  return {
    restaurantName: state.restaurant,
    id: state.id
  }
}

export default connect(mapStateToProps)(WinnerScreen)
