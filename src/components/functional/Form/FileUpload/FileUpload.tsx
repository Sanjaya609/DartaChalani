import { getErrorStatus } from '@/utility/inputUtils/input-error'
import { ChangeEvent, forwardRef } from 'react'
import { FormWrapper } from '../FormWrapper/FormWrapper'
import { UploadSimple } from 'phosphor-react'

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IBaseFormControlProps {
  type?: 'number' | 'email' | 'password' | 'text'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isNepali?: boolean
}

const FileUpload = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const {
    id = props?.id || props?.name,
    name = props?.name || props?.id,
    label,
    type = 'text',
    leftIcon,
    rightIcon,
    errors,
    touched,
    isFieldArray,
    errorClassName,
    labelClassName,
    className,
    wrapperClassName,
    isNepali,
    onChange,
    isRequired,
    showError = true,
    ...rest
  } = props
  const hasErrorMessage = getErrorStatus({
    name: name || '',
    errors,
    touched,
    isFieldArray,
  })

  const handleInputFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.[0]) {
      const {
        target: { files, id },
      } = event

      //   const validateFileMsg = validateDocumentFile({
      //     file: files[0],
      //     allowedFileTypes: fileState.files[id].allowedFileTypes,
      //     maxFileSize: fileState.files[id].maxFileSize,
      //   })

      //   if (validateFileMsg.length) {
      //     return toast({
      //       message: getTextByLanguage(validateFileMsg[0], validateFileMsg[1]),
      //       type: ToastType.error,
      //     })
      //   }

      //   await uploadDocument(
      //     { file: files[0] },
      //     {
      //       onSuccess: (res) => {
      //         let updatedFileState = {} as IFileState
      //         if (!canUploadMultipleFile) {
      //           updatedFileState = {
      //             ...fileState,
      //             files: {
      //               ...fileState.files,
      //               [id]: {
      //                 ...fileState.files[id],
      //                 fileData: {
      //                   file: files[0],
      //                   uuid: res?.data.data.uuid || '',
      //                 },
      //               },
      //             },
      //           }
      //         } else {
      //           updatedFileState = {
      //             ...fileState,
      //             files: {
      //               ...fileState.files,
      //               [id]: {
      //                 ...fileState.files[id],
      //                 filesData: [
      //                   ...fileState.files[id].filesData,
      //                   { file: files[0], uuid: res?.data.data.uuid || '' },
      //                 ],
      //               },
      //             },
      //           }
      //         }

      //         setFileState(updatedFileState)
      //         validateFileChanges(updatedFileState.files)
      //       },
      //     }
      //   )
      //   setUploadProgressValue(0)
    }
  }

  return (
    <FormWrapper
      touched={touched}
      showError={hasErrorMessage && showError}
      errorClassName={errorClassName}
      errors={errors}
      isFieldArray={isFieldArray}
      name={name}
      labelClassName={labelClassName}
      id={id}
      label={label}
      className={wrapperClassName}
      isRequired={isRequired}
    >
      <li style={{ listStyle: 'none' }}>
        <span className="group relative ">
          <div className="mt-2 flex">
            <div className="basis-3/4 cursor-pointer">
              <UploadSimple weight="fill" size={22} />
            </div>
          </div>
          <label className="cursor-pointer"></label>
          <input
            accept={'jpg, jpeg, png, pdf'}
            onChange={handleInputFileChange}
            id={id}
            type="file"
            className="sr-only"
          />
        </span>
      </li>
    </FormWrapper>
  )
})

export { FileUpload }
