import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WheelOfFortune from 'react-native-wheel-of-fortune'
import axios from 'axios';
import { connect } from 'react-redux';
import { submitRestaurant } from '../actions'

const API_URL = 'https://whispering-badlands-07525.herokuapp.com/api/getRestaurants'

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
    let businessArr = businessList.map(business => [business.name.slice(0, 5), business.name])
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

  submitRestaurant = (restaurant) => {
    const { dispatch } = this.props
    dispatch(submitRestaurant(restaurant))
  }

  render() {
    const restaurants = this.state.businessList.map(business => business[0])
    return (
      this.state.loaded
        ? (
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
              getWinner={(value, index) => {
                const restaurant = this.state.businessList[index][1]
                this.submitRestaurant(restaurant)
                this.setState({
                  selectedRestaurant: value,
                  selectedIndex: index
                })
              }}
            />
            {this.state.selectedRestaurant
              && <View style={{ paddingBottom: 100 }}>
                <Text>{this.state.businessList[this.state.selectedIndex][1]}</Text>
              </View>
            }
          </View>
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
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
