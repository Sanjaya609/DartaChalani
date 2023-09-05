export const validEmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ // for Mobile Numbers

export const numberOnlyReg = /^\d*$/
export const numberNotStartingWithZeroReg = /^(?:[1-9]\d*)*$/

/**
 * 0-9 float
 */
export const floatNumberReg = /^\d*(\.\d*)?$/
