import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { GestureSpinnerWheel } from '../components/GestureSpinnerWheel'
import React from 'react'
import renderer from 'react-test-renderer'

describe("GestureSpinnerWheel component", () => {
  it('renders correctly', async () => {
    jest.useFakeTimers()
    renderer.create(<GestureSpinnerWheel />);
  });

})
