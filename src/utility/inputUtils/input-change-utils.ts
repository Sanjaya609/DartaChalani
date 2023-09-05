import { ChangeEvent } from 'react'

import { numberOnlyReg, floatNumberReg } from '../regex'

export const setTouchAndValidate = { shouldTouch: true, shouldValidate: true }

interface IInputChangeNumberOnly {
  event: ChangeEvent<TAny>
  handleChange?: (event: ChangeEvent<TAny>) => TAny
  afterChangeFunction?: (event: ChangeEvent<TAny>) => TAny
  setValue?: TAny
  length?: number
  regEx?: RegExp
  maxValue?: number
  minValue?: number
}

export const inputChangeNumberOnly = (props: IInputChangeNumberOnly) => {
  const { event, handleChange, afterChangeFunction, setValue, regEx } = props
  if ((regEx || numberOnlyReg).test(event?.target?.value)) {
    handleChange?.(event)
    setValue?.(event.target?.name || event.target?.id, event.target.value)
    afterChangeFunction?.(event)
  }
}

export const inputChangeNumberWithComparisonAndLength = (
  props: IInputChangeNumberOnly
) => {
  const {
    event,
    handleChange,
    afterChangeFunction,
    setValue,
    length,
    regEx = numberOnlyReg,
    minValue,
    maxValue,
  } = props
  if (regEx.test(event?.target?.value)) {
    if (
      event &&
      ((length && event.target.value.length > length) ||
        (maxValue && event.target.value > maxValue) ||
        (minValue && event.target.value < minValue))
    ) {
      event.preventDefault()
    } else {
      handleChange?.(event)
      setValue?.(event.target?.name || event.target?.id, event.target.value)
      afterChangeFunction?.(event)
    }
  }
}

export const inputChangeMobileNumberOnly = (props: IInputChangeNumberOnly) => {
  const {
    event,
    handleChange,
    afterChangeFunction,
    setValue,
    length = 10,
  } = props
  if (numberOnlyReg.test(event?.target?.value)) {
    if (event && event.target.value.length > length) {
      event.preventDefault()
    } else {
      handleChange?.(event)
      setValue?.(event.target?.name || event.target?.id, event.target.value)
      afterChangeFunction?.(event)
    }
  }
}

interface IInputChangeWithLimit extends IInputChangeNumberOnly {
  limit: number
}

export const inputChangeWithLimit = (props: IInputChangeWithLimit) => {
  const { event, handleChange, afterChangeFunction, setValue, limit } = props
  if (event && event?.target?.value?.length > limit) {
    event.preventDefault()
  } else {
    handleChange?.(event)
    setValue?.(event.target?.name || event.target?.id, event.target.value)
    afterChangeFunction?.(event)
  }
}

export const inputChangeFloatNumberOnly = (props: IInputChangeNumberOnly) => {
  const { event, handleChange, afterChangeFunction, setValue } = props
  if (floatNumberReg.test(event?.target?.value)) {
    handleChange?.(event)
    setValue?.(event.target?.name || event.target?.id, event.target.value)
    afterChangeFunction?.(event)
  }
}
