export const SUBMIT_ZIPCODE = 'SUBMIT_ZIPCODE'

export function submitZipcode(zipCode) {
  return {
    type: SUBMIT_ZIPCODE,
    zipCode
  }
}
