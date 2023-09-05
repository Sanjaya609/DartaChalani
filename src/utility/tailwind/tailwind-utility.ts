import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'

export const getComputedClassNames = <T extends string = string>(
  ...args: classNames.ArgumentArray
): T => {
  return twMerge(classNames(args)) as T
}
