import { SUBMIT_ZIPCODE } from '../actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_ZIPCODE: {
      state['zipCode'] = action.zipCode
      return state
    }
    default:
      return state
  }
}

export default reducer
