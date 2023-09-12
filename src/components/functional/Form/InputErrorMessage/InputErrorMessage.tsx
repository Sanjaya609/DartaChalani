import { Icon } from '@/components/ui'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { Info } from 'phosphor-react'
import { ReactElement } from 'react'

interface Props {
  name: string
  touched: { [key: string]: TAny | undefined }
  errors: { [key: string]: TAny | undefined }
  index?: number
  keyName?: string
  status?: { [key: string]: TAny | undefined }
  className?: string
}

export function FormikValidationError(props: Props): ReactElement {
  const { name, touched, errors, status, className } = props

  const computedClassName = getComputedClassNames(
    'flex items-center text-sm mt-0.5 text-red-48',
    className
  )

  return touched[name] && (!!errors[name] || !!status?.[name]) ? (
    <span className={computedClassName}>
      <Icon icon={Info} size={16} className="mr-1" />
      {errors[name]
        ? (errors[name] as string)
        : status?.[name]
        ? (status[name] as string)
        : ''}
    </span>
  ) : (
    <></>
  )
}

export function FormikFieldArrayValidationError(props: Props): ReactElement {
  const { name, touched, errors, index, keyName, className } = props

  const computedClassName = getComputedClassNames(
    'flex items-center',
    className
  )
  if (
    errors &&
    touched &&
    `${keyName}` in errors &&
    `${keyName}` in touched &&
    errors[keyName!][index!] &&
    touched[keyName!][index!]
  ) {
    return typeof errors?.[keyName!]?.[index!]?.[name] === 'string' ? (
      <span className={computedClassName}>
        {errors[keyName!][index!][name] && (
          <Icon icon={Info} size={16} className="mr-1" />
        )}
        {errors[keyName!][index!][name] as string}
      </span>
    ) : (
      <></>
    )
  }

  return <></>
}
