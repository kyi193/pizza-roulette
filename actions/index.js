export const SUBMIT_ZIPCODE = 'SUBMIT_ZIPCODE'
export const SUBMIT_RESTAURANT = 'SUBMIT_RESTAURANT'

export function submitZipcode(zipCode) {
  return {
    type: SUBMIT_ZIPCODE,
    zipCode
  }
}

export function submitRestaurant(restaurantName, restaurantID) {
  return {
    type: SUBMIT_RESTAURANT,
    restaurantName,
    restaurantID
  }
}
