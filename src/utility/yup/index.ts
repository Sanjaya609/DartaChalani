import { Primitive } from 'type-fest'
import * as Yup from 'yup'
export const mobileNumberRegx = /(^(9)([6,7,8])([0-9]{8})$)/
export const noSpacesRegEx = /^\S*$/

Yup.addMethod(
  Yup.array,
  'uniqueProperty',
  function (message, mapper = (a: { [key: string]: Primitive }) => a) {
    return this.test('uniqueProperty1', message, function (list: TAny) {
      console.log({
        list,
        mapper: new Set(list?.map(mapper)),
        unique: list?.length === new Set(list?.map(mapper))?.size,
      })

      return list?.length === new Set(list?.map(mapper))?.size
    })
  }
)

Yup.addMethod(
  Yup.string,
  'noSpacesInput',
  function (message = 'Remove spaces.') {
    return this.test('noSpacesInput', message, function (value) {
      const { path, createError } = this

      if (!value) {
        return true
      }

      if (!noSpacesRegEx.test(value)) {
        return createError({
          path,
          message: message,
        })
      }

      return true
    })
  }
)

Yup.addMethod(
  Yup.string,
  'isValidPhoneNumber',
  function isPhoneNumber(message = 'Please input valid phone number') {
    return this.test('isValidPhoneNumber', message, function (value) {
      const { path, createError } = this
      if (!value) {
        return true
      }
      if (!mobileNumberRegx.test(value)) {
        return createError({
          path,
          message: message,
        })
      }

      return true
    })
  }
)

Yup.addMethod(
  Yup.string,
  'isRequired',
  function isPhoneNumber({
    message = 'This is required',
    key,
  }: {
    message?: string
    key: Record<string, string>
  }) {
    return this.test('isRequired', message, function (value) {
      const { path, createError } = this
      if (!value) {
        return createError({
          path,
          message: message || key,
        })
      }
      return true
    })
  }
)
