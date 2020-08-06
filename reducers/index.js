import { SUBMIT_ZIPCODE, SUBMIT_RESTAURANT } from '../actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_ZIPCODE: {
      state['zipCode'] = action.zipCode
      return state
    }
    case SUBMIT_RESTAURANT: {
      state['restaurant'] = action.restaurantName
      state['id'] = action.restaurantID
      return state
    }
    default:
      return state
  }
}

export default reducer
