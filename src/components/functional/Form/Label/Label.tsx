import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { formLabelClassName } from '../form.classes'

interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
  label?: string | React.ReactNode
  id?: string
  isRequired?: boolean
}

const Label = (props: ILabelProps) => {
  const { label, className, id, isRequired, ...restProps } = props
  const computedLabelClass = getComputedClassNames(
    formLabelClassName,
    className
  )

  return (
    <>
      {label ? (
        typeof label === 'string' ? (
          <label {...restProps} className={computedLabelClass} htmlFor={id}>
            {label}
            {!!isRequired && (
              <span className="ml-1 font-semibold text-red-40">*</span>
            )}
          </label>
        ) : (
          label
        )
      ) : (
        <></>
      )}
    </>
  )
}

export { Label }
