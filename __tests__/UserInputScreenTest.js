import { UserInputScreen } from '../components/UserInputScreen'
import React from 'react'
import renderer from 'react-test-renderer'

describe("UserInputScreen component", () => {
  test("renders", () => {
    const rendered = renderer.create(<UserInputScreen />).toJSON()
    expect(rendered).toBeTruthy()
  })

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
