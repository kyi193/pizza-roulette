import { WinnerScreen } from '../components/WinnerScreen'
import React from 'react'
import renderer from 'react-test-renderer'

describe('WinnerScreen component', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<WinnerScreen />).toJSON()
    expect(rendered).toBeTruthy()
  });
})
