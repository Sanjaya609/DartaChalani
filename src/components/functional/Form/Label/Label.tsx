import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { formLabelClassName } from '../form.classes'

interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
  label?: string | React.ReactNode
  id?: string
}

const Label = (props: ILabelProps) => {
  const { label, className, id, ...restProps } = props
  const computedLabelClass = getComputedClassNames(
    formLabelClassName,
    className
  )

  return !!label ? (
    <div className="mb-1">
      {typeof label === 'string' ? (
        <label {...restProps} className={computedLabelClass} htmlFor={id}>
          {label}
        </label>
      ) : (
        label
      )}
    </div>
  ) : (
    <></>
  )
}

export { Label }
