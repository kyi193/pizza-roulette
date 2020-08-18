import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native'
import WheelOfFortune from 'react-native-wheel-of-fortune'
import axios from 'axios';
import { connect } from 'react-redux';
import { submitRestaurant } from '../actions'
import { Header } from 'react-native-elements'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import pizzaKnob from '../assets/images/pizzaKnob.png'
import pizzaLoader from '../assets/images/pizzaLoader.gif'

const API_URL = 'https://whispering-badlands-07525.herokuapp.com/api/getRestaurants'
const backgroundImage = { uri: "https://i.imgur.com/Fr2tPr1.png" }

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.backButton}
    >
      <Text style={styles.backText}>Go Back</Text>
    </TouchableOpacity>
  )
}

export class GestureSpinnerWheel extends Component {
  state = {
    selectedRestaurant: null,
    selectIndex: null,
    zipCode: this.props.zipCode,
    businessList: [],
    loaded: false,
    show: false
  }

  componentDidMount = () => {
    const zipCode = this.props.zipCode
    this.fetchBusinessData(zipCode)
  }

  fetchBusinessData = (zipCode, attempts = 1) => {
    return axios.get(`${API_URL}/${zipCode}`)
      .then(res => {
        const businessList = res.data.search.business
        this.checkIfBusinessListIsEmpty(businessList)
        const randomBusinessList = this.selectRandomBusinesses(businessList)
        this.setState(() => ({
          businessList: randomBusinessList,
          loaded: true
        }))
      })
      .catch(error => {
        setTimeout(() => this.fetchBusinessData(zipCode, attempts + 1), 1000)
      });
  }


  enableMessage() {
    this.setState({ show: true });
  }

  checkIfBusinessListIsEmpty = (businessList) => {
    if (businessList.length === 0) {
      Alert.alert(
        "Please enter another zipcode",
        "There were no restaurants found",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      );
      this.props.navigation.navigate('User Input Screen')
    }
    return
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
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={require('../assets/images/homeButton.png')}
                  />
                </TouchableOpacity>
              }
              centerComponent={
                <View>
                  <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>Spin the Wheel!</Text>
                </View>
              }
              rightComponent={<Image
                style={{ height: 50, width: 50 }}
                source={require('../assets/images/pizzaIcon.png')}
              />}
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
            <Text style={styles.loadingTextLarge}>Loading</Text>
            <Text style={styles.loadingTextMedium}>Mmm... Pizza.......</Text>
            <Image source={pizzaLoader} style={styles.pizzaLoader} />
            {this.state.show && <View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}>Taking too long?</Text>
                <BackButton onPress={this.goHome} />
              </View>
            </View>}
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
    alignItems: 'center',
    backgroundColor: 'white'
  },
  backgroundImage: {
    width: '100%',
    height: '100%'

  },
  pizzaLoader: {
    height: 150,
    width: 150
  },
  loadingTextLarge: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Noteworthy-Bold',
  },
  loadingTextMedium: {
    fontSize: 25,
    fontStyle: 'italic'
  },
  backButton: {
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'red',
    marginTop: 10
  },
  backText: {
    textAlign: 'center',
    color: 'yellow',
    fontWeight: 'bold'
  }
})
