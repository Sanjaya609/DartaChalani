import {
  RequestBodyType,
  RequestMethod,
  initApiRequest,
} from '@/lib/api-request'
import React from 'react'
import { FileData } from '../Documents/DocumentsUpload/document-upload.interface'

interface IAuthFileProps {
  controllerName: string
  fileData: FileData
}

const AuthFile = (props: IAuthFileProps) => {
  const { controllerName = `/api/registration-book/download-file`, fileData } =
    props
  const fullPathName = `${import.meta.env.VITE_API_ENDPOINT}/${controllerName}`

  const fetchImage = async () => {
    try {
      const imageData = await initApiRequest({
        apiDetails: {
          controllerName,
          requestMethod: RequestMethod.GET,
          requestBodyType: RequestBodyType.FILE,
          actionName: fullPathName,
        },
        params: { fileName: fileData.uuid },
      })

      console.log(imageData)
    } catch (err) {
      console.log(err)
    }
  }

  return <div>AuthFile</div>
}

export default AuthFile

AuthFile.Image = () => {}
