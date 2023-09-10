interface IGetErrorStatus {
  name: string
  error?: boolean
  touched?: { [key: string]: TAny | undefined }
  errors?: { [key: string]: TAny | undefined }
  status?: { [key: string]: TAny | undefined }
  isFieldArray?: IFieldArrayProps
}

export const getErrorStatus = (props: IGetErrorStatus) => {
  const { name, error, touched, errors, status, isFieldArray } = props
  if (
    isFieldArray &&
    errors &&
    touched &&
    isFieldArray?.keyName in errors &&
    isFieldArray?.keyName in touched &&
    isFieldArray?.index >= 0 &&
    touched?.[isFieldArray.keyName!][isFieldArray.index!]?.[isFieldArray?.name]
  ) {
    return !!errors[isFieldArray.keyName!][isFieldArray.index!]?.[
      isFieldArray?.name
    ]
  }

  if (touched?.[name] && (errors?.[name] || status?.[name])) {
    return !!errors?.[name] || !!status?.[name]
  }
  return error || false
}
