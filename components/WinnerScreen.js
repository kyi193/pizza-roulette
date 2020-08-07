import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios';
import { Header } from 'react-native-elements'
import { generateUID } from '../utils/helpers'
import { Entypo, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

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
    photo: null,
    reviews: null,
    loaded: false,
    pizzaRatingArr: null
  }

  componentDidMount = () => {
    const id = this.state.id
    axios.get(`${API_URL}/${id}`)
      .then(res => {
        const business = res.data.business
        const { url, phone, rating, location, price, photos, reviews } = business
        const pizzaRatingArr = this.loadPizzaRating(rating)
        this.setState(() => ({
          url,
          phoneNumber: phone,
          rating,
          location,
          price,
          photo: photos[0],
          reviews,
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
    const { restaurantName, url, phoneNumber, rating, price, pizzaRatingArr, photo, reviews } = this.state
    return (
      this.state.loaded
        ? (
          <View style={styles.container}>
            <Header
              centerComponent={
                <View>
                  <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>Pizza Roulette</Text>
                </View>
              }
              rightComponent={<FontAwesome5 name="pizza-slice" size={24} color="#FFDF00" />}
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
              <View style={styles.topSection}>
                <View style={{ width: '55%' }}>
                  <View style={styles.title}>
                    <Text style={styles.restaurantName}>{restaurantName}</Text>
                    <View style={styles.pizzaRatingContainer}>
                      {pizzaRatingArr.map(url => {
                        return (
                          <Image key={generateUID()} source={url} style={styles.pizzaRating} />
                        )
                      })}
                      <Text style={styles.pizzaRatingText}></Text>
                    </View>
                  </View>
                  <View style={styles.pizzaRatingContainer}>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.priceText}> - {this.priceDescription(price)}</Text>
                  </View>
                </View>
                <Image key={generateUID()} source={{ uri: photo }} style={styles.restaurantPhoto} />
              </View>
              <View style={styles.locationButtonSection}>
                <View style={styles.locationContainer}>
                  <Text style={styles.locationText}>{this.state.location.address1}</Text>
                  <Text style={styles.locationText}>{`${this.state.location.city}, ${this.state.location.state}`}</Text>
                  <Text style={styles.locationText}>{this.state.location.postal_code}</Text>
                </View>
                <View>
                  <View style={styles.phoneNumberContainer}>
                    <MaterialCommunityIcons name="cellphone" size={35} color="black" style={styles.phoneIcon} />
                    <TouchableOpacity onPress={() => this.dialCall(phoneNumber)} activeOpacity={0.7} style={styles.callButton} >
                      <Text style={styles.phoneNumberText}>Call us now</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.phoneNumberContainer}>
                    <Entypo name="yelp" size={35} color="red" style={styles.yelpIcon} />
                    <TouchableOpacity onPress={() => this.openURL(url)} activeOpacity={0.7} style={styles.urlButton} >
                      <Text style={styles.phoneNumberText}>Yelp page</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.reviewContainer}>
                <Text style={styles.reviewTitle}>Customer Reviews:</Text>
                <ScrollView style={styles.scrollViewContainer}>
                  {reviews.map(review => {
                    return (
                      <View key={generateUID()} style={{ marginBottom: 10 }}>
                        <Text style={styles.reviewUserName}>{review.user.name}</Text>
                        <Text style={styles.reviewText}>{review.text}</Text>
                      </View>
                    )
                  })}
                </ScrollView>
              </View>
            </View>
          </View >
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
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  restaurantName: {
    fontSize: 30,
    fontWeight: '900',
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
  restaurantPhoto: {
    height: 125,
    width: 125,
    borderRadius: 100,
    borderWidth: 3
  },
  phoneNumberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  callButton: {
    width: 120,
    padding: 6,
    backgroundColor: '#FF6F00',
    borderRadius: 7,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
  },
  urlButton: {
    width: 120,
    padding: 6,
    backgroundColor: 'red',
    borderRadius: 7,
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
  },
  urlText: {
    fontSize: 12
  },
  locationButtonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderTopWidth: 5,
    paddingTop: 12
  },
  phoneIcon: {
    marginBottom: 10,
    marginRight: 10
  },
  yelpIcon: {
    marginRight: 10
  },
  reviewContainer: {
    marginTop: 10,
    borderTopWidth: 5,
    paddingTop: 15
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scrollViewContainer: {
    marginTop: 10,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    height: '45%'
  },
  reviewUserName: {
    fontWeight: 'bold',
    fontSize: 24
  },
  reviewText: {
    fontStyle: 'italic',
    fontSize: 20
  }
})

function mapStateToProps(state) {
  return {
    restaurantName: state.restaurant,
    id: state.id
  }
}

export default connect(mapStateToProps)(WinnerScreen)
