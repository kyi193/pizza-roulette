import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import WheelOfFortune from 'react-native-wheel-of-fortune'
import axios from 'axios';
import { connect } from 'react-redux';
import { submitRestaurant } from '../actions'
import { Header } from 'react-native-elements'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import pizzaKnob from '../assets/images/pizzaKnob.png'

const API_URL = 'https://whispering-badlands-07525.herokuapp.com/api/getRestaurants'
const backgroundImage = { uri: "https://i.imgur.com/Fr2tPr1.png" }

export class GestureSpinnerWheel extends Component {
  state = {
    selectedRestaurant: null,
    selectIndex: null,
    zipCode: this.props.zipCode,
    businessList: [],
    loaded: false
  }

  componentDidMount = () => {
    const zipCode = this.props.zipCode
    axios.get(`${API_URL}/${zipCode}`)
      .then(res => {
        const businessList = res.data.search.business
        const randomBusinessList = this.selectRandomBusinesses(businessList)
        this.setState(() => ({
          businessList: randomBusinessList,
          loaded: true
        }))
      })
      .catch(error => console.log(error))
  }

  selectRandomBusinesses = (businessList) => {
    let businessArr = businessList.map(business => [business.name.slice(0, 5), business.name, business.id])
    return this.shuffle(businessArr).splice(0, 8)
  }

  shuffle = (businessList) => {
    let currentIndex = businessList.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = businessList[currentIndex];
      businessList[currentIndex] = businessList[randomIndex];
      businessList[randomIndex] = temporaryValue;
    }

    return businessList;
  }

  submitRestaurant = (restaurantName, restaurantID) => {
    const { dispatch } = this.props
    dispatch(submitRestaurant(restaurantName, restaurantID))
  }

  goHome = () => {
    this.props.navigation.navigate("User Input Screen")
  }

  render() {
    const restaurants = this.state.businessList.map(business => business[0])
    return (
      this.state.loaded
        ? (
          <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <Header
              leftComponent={
                <TouchableOpacity onPress={() => this.goHome()}>
                  <MaterialIcons name="home" size={30} color="white" />
                </TouchableOpacity>
              }
              centerComponent={
                <View>
                  <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>Spin the Wheel!</Text>
                </View>
              }
              rightComponent={<FontAwesome5 name="pizza-slice" size={24} color="#FFDF00" />}
              containerStyle={
                {
                  backgroundColor: '#FF4900',
                  justifyContent: 'space-around',
                  borderBottomColor: 'white',
                }
              }
            />
            <View style={styles.container}>
              <WheelOfFortune
                onRef={ref => (this.child = ref)}
                rewards={restaurants}
                knobSize={28}
                borderWidth={.1}
                borderColor={"#FFF"}
                winner={Math.floor(Math.random() * restaurants.length)}
                innerRadius={10}
                textColor={"#FF0000"}
                backgroundColor={"#da9e52"}
                colors={['#ffdf00']}
                duration={5000}
                knoobSource={pizzaKnob}
                getWinner={(value, index) => {
                  const restaurantName = this.state.businessList[index][1]
                  const restaurantID = this.state.businessList[index][2]
                  this.submitRestaurant(restaurantName, restaurantID)
                  this.setState({
                    selectedRestaurant: value,
                    selectedIndex: index
                  })
                  this.props.navigation.navigate('Winner Screen')
                }}
              />
              {this.state.selectedRestaurant
                && <View style={{ paddingBottom: 100 }}>
                  <Text>{this.state.businessList[this.state.selectedIndex][1]}</Text>
                </View>
              }
            </View>
          </ImageBackground>
        )
        : (
          <View style={styles.loading}>
            <Text>Loading</Text>
            <Text>Mmm... Pizza.......</Text>
          </View>
        )
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
    flex: 1,
    paddingBottom: 80,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
})
