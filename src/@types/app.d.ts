interface BackendSuccessResponse<T> {
  data: T
  status: number
  message: string
  success: true
}

interface BackendErrorResponse<T> {
  error: T
  status: number
  message: string
  success: false
}

interface GenericObj<Value = string> {
  [key: string]: Value
}

type OneOf<Obj, Key extends keyof Obj> = {
  [key in Exclude<keyof Obj, Key>]: null
} & Pick<Obj, Key>

type ValPrimitive = string | number | boolean

type ValueOf<Obj> = (
  Obj extends object
    ? {
        [K in keyof Obj]: Obj[K] extends object ? ValueOf<Obj[K]> : Obj[K]
      }[keyof Obj]
    : ''
) extends infer Val
  ? Val
  : never

// eslint-disable-next-line
type SelectedPartial<T, K extends keyof any> = Omit<T, K> & Partial<Pick<T, K>>

interface IGetDataWithPropsVal {
  mapDatatoStyleSelect?: boolean
  enabled?: boolean
}

interface IResponseForEnum {
  key: string
  nameNepali: string
  nameEnglish: string
  code: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface OptionType<T = any>
  // eslint-disable-next-line
  extends GenericObj<any> {
  label: string
  value: T
  labelNp?: string
}

type StringNumber = string | number

type TAny = any

interface IFieldArrayProps {
  name: string
  index: number
  keyName: string
  levelFirstNested?: {
    parentKey: string
  }
}

interface IBaseFormControlProps {
  label?: string | React.ReactNode
  touched?: FormikTouched<TAny>
  errors?: FormikErrors<TAny>
  isFieldArray?: IFieldArrayProps
  errorClassName?: string
  labelClassName?: string
  id?: string
  labelClassName?: string
  label?: string
  name?: string
  wrapperClassName?: string
  isRequired?: boolean
}
