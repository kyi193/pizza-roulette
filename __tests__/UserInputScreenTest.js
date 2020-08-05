import { UserInputScreen } from '../components/UserInputScreen'
import React from 'react'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store';
import { submitZipcode, SUBMIT_ZIPCODE } from '../actions'

describe("UserInputScreen component", () => {
  test("renders", () => {
    const rendered = renderer.create(<UserInputScreen />).toJSON()
    expect(rendered).toBeTruthy()
  })

  describe("onChangeZipCode", () => {
    test("this.state.zipCode should be correctly set to 10001", () => {
      const instanceOf = renderer.create(<UserInputScreen />).getInstance()
      instanceOf.onChangeZipcode(10001)
      expect(instanceOf.state.zipCode).toEqual('10001')
    })

    test("this.state.zipCode should be correctly set to 99999", () => {
      const instanceOf = renderer.create(<UserInputScreen />).getInstance()
      instanceOf.onChangeZipcode(99999)
      expect(instanceOf.state.zipCode).toEqual('99999')
    })

    test("this.state.zipCode should be be a string", () => {
      const instanceOf = renderer.create(<UserInputScreen />).getInstance()
      instanceOf.onChangeZipcode(12345)
      expect(typeof instanceOf.state.zipCode).toEqual('string')
    })
  })

  describe("isValidZipcode", () => {
    test("this.state.zipCode should be null with zipcode length less than 5", () => {
      const instanceOf = renderer.create(<UserInputScreen />).getInstance()
      instanceOf.isValidZipcode(1)
      expect(instanceOf.state.zipCode).toEqual(null)
    })

    test("this.state.zipCode should be null with zipcode length greater than 5", () => {
      const instanceOf = renderer.create(<UserInputScreen />).getInstance()
      instanceOf.isValidZipcode(123456)
      expect(instanceOf.state.zipCode).toEqual(null)
    })

    test("this.state.zipCode should be null if zipcode is negative", () => {
      const instanceOf = renderer.create(<UserInputScreen />).getInstance()
      instanceOf.isValidZipcode(-10001)
      expect(instanceOf.state.zipCode).toEqual(null)
    })

    test("this.state.zipCode should be null if zipcode contains a letter", () => {
      const instanceOf = renderer.create(<UserInputScreen />).getInstance()
      instanceOf.isValidZipcode('-10O01')
      expect(instanceOf.state.zipCode).toEqual(null)
    })

    test("this.state.zipCode should be null if zipcode contains special characters", () => {
      const instanceOf = renderer.create(<UserInputScreen />).getInstance()
      instanceOf.isValidZipcode('!314@')
      expect(instanceOf.state.zipCode).toEqual(null)
    })
  })

  describe("submitZipcode", () => {
    describe("Valid zipcode", () => {
      it("should dispatch submitZipcode", () => {
        const instanceOf = renderer.create(<UserInputScreen />).getInstance()
        instanceOf.isValidZipcode('12345')
        const zipCode = instanceOf.state.zipCode

        const expectedAction = {
          type: SUBMIT_ZIPCODE,
          zipCode
        }
        expect(submitZipcode(zipCode)).toEqual(expectedAction)
      })
      it('should navigate to GestureSpinnerWheel', () => {

      })
    })
    describe('Invalid zipcode', () => {

    })
  })
})
