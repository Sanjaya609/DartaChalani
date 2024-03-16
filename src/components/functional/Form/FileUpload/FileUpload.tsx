import { getErrorStatus } from '@/utility/inputUtils/input-error'
import { ChangeEvent, forwardRef, useRef, useState } from 'react'
import { FormWrapper } from '../FormWrapper/FormWrapper'
import { Spinner, UploadSimple } from 'phosphor-react'
import DocumentsUpload from '../../Documents/DocumentsUpload'
import { useDocumentUpload } from '@/service/generic/generic.query'
import { IFileState } from '../../Documents/DocumentsUpload/document-upload.interface'

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IBaseFormControlProps {
  type?: 'number' | 'email' | 'password' | 'text'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isNepali?: boolean
  canUploadMultipleFile?: boolean
  disabled?: boolean
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
    canUploadMultipleFile = false,
    disabled = false,
    ...rest
  } = props
  const hasErrorMessage = getErrorStatus({
    name: name || '',
    errors,
    touched,
    isFieldArray,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const [fileState, setFileState] = useState<IFileState>({
    files: {},
    isRequiredFileUploaded: false,
  })

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedUUID, setSelectedUUID] = useState<string[]>([])

  const [uploadProgressValue, setUploadProgressValue] = useState(0)

  const { mutateAsync: uploadDocument, isLoading: isUploading } =
    useDocumentUpload(setUploadProgressValue)

  const handleInputFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.[0]) {
      const {
        target: { files, id },
      } = event

      // const validateFileMsg = validateDocumentFile({
      //   file: files[0],
      //   allowedFileTypes: fileState.files[id].allowedFileTypes,
      //   maxFileSize: fileState.files[id].maxFileSize,
      // })

      //   if (validateFileMsg.length) {
      //     return toast({
      //       message: getTextByLanguage(validateFileMsg[0], validateFileMsg[1]),
      //       type: ToastType.error,
      //     })
      //   }

      await uploadDocument(
        { file: files[0] },
        {
          onSuccess: (res) => {
            let newFiles = [...selectedFiles, ...files]

            let newUUID = [...selectedUUID, res?.data.data.uuid ?? '']

            setSelectedFiles(newFiles)
            setSelectedUUID(newUUID)

            onChange &&
              onChange({
                ...event,
                target: {
                  ...event.target,
                  value: newUUID.toString(),
                },
              })
          },
        }
      )
      setUploadProgressValue(0)
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
      <div className="flex">
        <div className="w-30 flex-none">
          <button
            type="button"
            className="border border-slate-400 bg-slate-200 px-3 py-2 text-base"
            onClick={handleButtonClick}
          >
            Choose File
          </button>
        </div>
        <div className="w-70 flex-auto">
          <p className=" w-100 border border-slate-400 px-3 py-2.5 text-sm">
            {uploadProgressValue ? (
              <Spinner />
            ) : selectedFiles.length > 0 ? (
              selectedFiles.map((file, index) => (
                <span
                  className="mr-2 border border-primary-16 px-2"
                  key={index}
                >
                  {file.name}
                </span>
              ))
            ) : (
              'No file chosen'
            )}
          </p>
        </div>

        <input
          disabled={disabled}
          type="file"
          accept={'jpg,png'}
          className="form-control sr-only"
          ref={fileInputRef}
          onChange={handleInputFileChange}
        />
      </div>
    </FormWrapper>
  )
})

export { FileUpload }
