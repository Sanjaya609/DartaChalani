import React, { useEffect, useRef, useState } from 'react'

import Browser from 'bowser'

import {
  initApiRequest,
  RequestBodyType,
  RequestMethod,
} from '@/lib/api-request'
import downloadFile from '@/utility/document/fileDownloader'
import { getTruncatedFileNameByLength } from '@/utility/utility'
import toast, { ToastType } from '../functional/ToastNotifier/ToastNotifier'
import { Box, Icon } from '../ui'
import { Spinner } from '../ui/Spinner'
import { FileData } from '../functional/Documents/DocumentsUpload/document-upload.interface'
import { Eye, File, FilePdf, Image } from 'phosphor-react'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'

const browser = Browser.getParser(window.navigator.userAgent)
const isChrome = browser.getBrowser().name === 'Chrome'
const isFirefox = browser.getBrowser().name === 'Firefox'
const isOpera = browser.getBrowser().name === 'Opera'
const URL = window.URL || window.webkitURL
const ifMobile = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ]

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem)
  })
}

const mobile = ifMobile()

interface FileConfig {
  /** Source of the file */
  filesource: string
  /** Opens in new tab or download in some mobile */
  openNewTab: Function
}
interface AuthFileBaseProps {
  /** Custom Element to render */
  customElement?: (fileConfig: FileConfig) => void

  className?: string
  style?: React.CSSProperties
  download?: boolean
  iconOnly?: boolean
  controllerName: string
  fileData: FileData
}

const iconClassName = 'h-full flex items-center justify-center'

export default function AuthFile(props: AuthFileBaseProps) {
  const {
    fileData,
    className,
    style,
    download,
    iconOnly,
    customElement,
    controllerName,
  } = props

  const link = useRef<HTMLAnchorElement | null>(null)
  const [loading, setloading] = useState(false)
  const [objectUrl, setobjectUrl] = useState('')

  const fullPathName = `${import.meta.env.VITE_API_ENDPOINT}${controllerName}`

  const getFile = async () => {
    setloading(true)
    let data
    try {
      data = await initApiRequest({
        apiDetails: {
          controllerName: fullPathName,
          requestMethod: RequestMethod.GET,
          requestBodyType: RequestBodyType.FILE,
        },
        params: { fileName: fileData.uuid },
      })
      setloading(false)
    } catch (errordata) {
      data = errordata
      setloading(false)
    }
    return data
  }

  const handleAction = async (
    e: React.MouseEvent<HTMLElement, MouseEvent> | null
  ) => {
    e && e.preventDefault()
    if (!loading) {
      if (link?.current?.href) return

      const blob: any = await getFile()

      if (!(blob.data instanceof Blob)) {
        toast({
          type: ToastType.error,
          message: `Failed to get the document ${fileData.documentName}`,
        })
        return
      }

      if (download) {
        downloadFile(blob.data, fileData.documentName, blob.data.type)
      } else {
        if (window.URL) {
          const href = URL.createObjectURL(blob.data)
          setobjectUrl((oldObject) => {
            URL.revokeObjectURL(oldObject)

            return href
          })

          if (mobile) {
            if (isChrome || isOpera || isFirefox) {
              window.open(href, '_target')
            } else {
              downloadFile(blob.data, fileData.documentName, blob.data.type)
            }
          } else {
            window.open(href, '_target')
          }
        } else {
          downloadFile(blob.data, fileData.documentName, blob.data.type)
        }
      }
    }
  }

  const fileExt = fileData.documentName
    ? fileData.documentName.split('.')[
        fileData.documentName.split('.').length - 1
      ]
    : ''

  useEffect(() => {
    link.current?.removeAttribute('href')
  }, [fileData.documentName])

  useEffect(() => {
    return () => URL.revokeObjectURL(objectUrl)
  }, [objectUrl])

  const computedClassName = getComputedClassNames(
    'h-full flex items-center justify-center relative',
    className
  )

  return (
    <Box className={computedClassName}>
      <>
        {['jpg', 'jpeg', 'png', 'bmp'].includes(fileExt.toLowerCase()) &&
          (iconOnly ? (
            <a
              role="button"
              href="#/"
              className={className}
              title={fileData.documentName}
              style={style}
              ref={link}
              onClick={handleAction}
            >
              {loading ? <Spinner size="sm" /> : <Image size={100} />}
            </a>
          ) : loading ? (
            <Spinner size="sm" />
          ) : (
            <Image size={100} />
          ))}
        {!['jpg', 'jpeg', 'png', 'bmp'].includes(fileExt.toLowerCase()) &&
          (iconOnly ? (
            <a
              role="button"
              href="#/"
              className={className}
              title={fileData.documentName}
              style={style}
              ref={link}
              onClick={handleAction}
            >
              {loading ? <Spinner size="sm" /> : <File size={100} />}
            </a>
          ) : loading ? (
            <Spinner size="sm" />
          ) : (
            <File size={100} />
          ))}

        {customElement &&
          customElement({
            filesource: objectUrl,
            openNewTab: handleAction,
          })}

        {!customElement && (
          <div className="absolute left-1/2 top-1/2 z-10 h-full w-full  -translate-x-1/2 -translate-y-1/2 bg-gray-300/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex">
                <div
                  className="group/icon rounded-sm border border-gray-80 bg-gray-64 p-2 text-gray-24 transition-all duration-300 hover:border-navy-40"
                  onClick={handleAction}
                >
                  <Icon
                    className="group-hover/icon:text-navy-40"
                    icon={Eye}
                    size={20}
                  />
                </div>
              </div>

              <div className="mt-2 text-center">
                <span className="bold ">
                  {getTruncatedFileNameByLength(
                    fileData?.documentName || '',
                    15
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </>
    </Box>
  )
}

interface AuthImageFileBaseProps {
  alt?: string
  className?: string
  style?: React.CSSProperties

  /** filename or file in API */
  filename: string
  /** docfor or subprocessname in API */
  docfor?: string
  /** Enable zoom */
  zoom?: boolean
}
interface AuthImageFileExternalProps extends AuthImageFileBaseProps {
  /** filetype in API */
  filetype: string

  externalImporter?: undefined
  id?: undefined
  applicationIDPresent?: undefined
  applicationId?: undefined
  path?: undefined
}
interface AuthImageFileExternalImporterProps extends AuthImageFileBaseProps {
  /** If External Service of Importer */
  externalImporter: boolean
  /** ID of the image (id in API) */
  id: string

  filetype?: undefined
  applicationIDPresent?: undefined
  applicationId?: undefined
  path?: undefined
}
interface AuthImageFileExternalWithApplicationIDProps
  extends AuthImageFileBaseProps {
  /** If External Service of Importer */
  applicationIDPresent: boolean
  /** Application ID */
  applicationId: string
  /** Path of the file */
  path: string

  filetype?: undefined
  externalImporter?: undefined
  id?: undefined
}

type AuthImageFileProps =
  | AuthImageFileExternalImporterProps
  | AuthImageFileExternalProps
  | AuthImageFileExternalWithApplicationIDProps

// AuthFile.Image = function AuthImageFile(props: AuthImageFileProps) {
//   const {
//     alt,
//     className,
//     style = {},
//     docfor = '',
//     filename,
//     filetype = '',
//     id = '',
//     applicationIDPresent,
//     applicationId = '',
//     path = '',
//     externalImporter,
//     zoom,
//   } = props

//   const [imgsrc, setimgsrc] = useState('')
//   const [imgFailed, setimgFailed] = useState(false)
//   const [loading, setloading] = useState(false)
//   const [objectUrl, setobjectUrl] = useState('')

//   const getControllerName = useCallback(() => {
//     if (externalImporter) {
//       return externalFileImporterPath
//         .replace('{subprocessname}', docfor)
//         .replace('{id}', id)
//         .replace('{file}', filename)
//     }
//     if (applicationIDPresent) {
//       return externalFilePath
//         .replace('{id}', applicationId)
//         .replace('{file}', path)
//     }

//     return externalFilePathByDocForAndType
//       .replace('{docfor}', docfor)
//       .replace('{filetype}', filetype)
//       .replace('{filename}', filename)
//   }, [
//     docfor,
//     filename,
//     filetype,
//     externalImporter,
//     id,
//     applicationIDPresent,
//     applicationId,
//     path,
//   ])

//   const getFile = useCallback(async () => {
//     let data: any
//     try {
//       data = await makeApiRequest(
//         { controllerName: getControllerName(), actionName: 'AUTHFILE' },
//         null,
//         'GET'
//       )
//       setloading(false)
//       setimgFailed(false)
//     } catch (errordata) {
//       data = errordata
//       setimgFailed(true)
//       setloading(false)
//     }

//     if (data.data instanceof Blob) {
//       const href = URL.createObjectURL(data.data)
//       setobjectUrl((oldObject) => {
//         URL.revokeObjectURL(oldObject)
//         return href
//       })
//       setimgsrc(href)
//     } else {
//       FailToast(`Failed to get the document ${filename}`)
//     }
//   }, [filename, getControllerName])

//   useEffect(() => {
//     getFile()
//   }, [getFile])

//   useEffect(() => {
//     return () => URL.revokeObjectURL(objectUrl)
//   }, [objectUrl])

//   return loading ? (
//     <Spinner size="sm" />
//   ) : zoom ? (
//     <ZoomAndPan>
//       <img
//         className={className}
//         style={{ ...style }}
//         src={imgsrc}
//         alt={alt || 'image'}
//       />
//     </ZoomAndPan>
//   ) : imgFailed ? (
//     <img
//       className={className}
//       style={{ ...style }}
//       src={Avatar}
//       alt={alt || 'image'}
//     />
//   ) : (
//     <img
//       className={className}
//       style={{ ...style }}
//       src={imgsrc}
//       alt={alt || 'image'}
//     />
//   )
// }

// interface AuthPDFFileProps {
//   path: string
//   id: string
//   subprocessname?: string
//   internal?: boolean
//   title?: string
//   filename?: string
//   alt?: string
//   className?: string
//   style?: React.CSSProperties
// }

// AuthFile.PDF = function AuthPDFFile({
//   path,
//   id,
//   subprocessname,
//   className,
//   style,
//   title,
// }: AuthPDFFileProps) {
//   const [pdfsrc, setpdfsrc] = useState('')
//   const [objectUrl, setobjectUrl] = useState('')

//   const getFile = useCallback(async () => {
//     let data: any
//     try {
//       data = await makeApiRequest(
//         {
//           controllerName: externalFilePath
//             .replace('{id}', id)
//             .replace('{file}', path),
//           actionName: 'AUTHFILE',
//         },
//         null,
//         'GET'
//       )
//     } catch (errordata) {
//       data = errordata
//     }

//     if (data.data instanceof Blob) {
//       const href = URL.createObjectURL(data.data)
//       setobjectUrl(href)
//       setpdfsrc(href)
//     } else {
//       FailToast(data.data?.message)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [path])

//   useEffect(() => {
//     getFile()
//   }, [getFile])

//   useEffect(() => {
//     setpdfsrc('')
//   }, [path])

//   useEffect(() => {
//     return () => URL.revokeObjectURL(objectUrl)
//   }, [objectUrl])

//   return (
//     <iframe
//       className={className}
//       style={{ ...style, width: '100%', height: '100%' }}
//       title={title}
//       src={pdfsrc + '#zoom=FitW'}
//     />
//   )
// }

// interface AuthLocalFileProps {
//   file: File
//   photo?: boolean
//   className?: string
//   style?: React.CSSProperties
//   iconOnly?: boolean
//   fullImage?: boolean
// }
// AuthFile.LocalFile = function AuthLocalFile({
//   file,
//   photo,
//   className,
//   style,
//   iconOnly,
//   fullImage,
// }: AuthLocalFileProps): ReactElement {
//   const [objectUrl, setobjectUrl] = useState('')

//   const link = useRef<HTMLAnchorElement | null>(null)
//   const handleAction = async (
//     e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
//   ) => {
//     e.preventDefault()

//     if (link.current) {
//       const href = URL.createObjectURL(file)
//       setobjectUrl(href)

//       window.open(href, '_target')
//     }
//   }

//   const fileExt = file.name
//     ? file.name.split('.')[file.name.split('.').length - 1]
//     : ''

//   useEffect(() => {
//     link.current?.removeAttribute('href')
//   }, [file])

//   useEffect(() => {
//     if (photo && file) {
//       const href = URL.createObjectURL(file)
//       setobjectUrl((prevObject) => {
//         URL.revokeObjectURL(prevObject)
//         return href
//       })
//     }
//   }, [photo, file])

//   useEffect(() => {
//     return () => URL.revokeObjectURL(objectUrl)
//   }, [objectUrl])

//   if (photo) {
//     return (
//       <div
//         className={fullImage ? '' : 'avatar-placeholder avatar-placeholder-xl'}
//       >
//         <img
//           className={className}
//           style={{ ...style }}
//           src={objectUrl}
//           alt={file?.name}
//         />
//       </div>
//     )
//   }

//   return (
//     <div className="align align-items-center">
//       {['jpg', 'jpeg', 'png', 'bmp'].includes(fileExt.toLowerCase()) &&
//         (iconOnly ? (
//           <a
//             href="#/"
//             role="button"
//             className={className}
//             title={file.name}
//             style={style}
//             ref={link}
//             onClick={handleAction}
//           >
//             <FaFileImage className="imgIcon mr-1" />
//           </a>
//         ) : (
//           <FaFileImage className="imgIcon mr-1" />
//         ))}
//       {['pdf', 'xps'].includes(fileExt.toLowerCase()) &&
//         (iconOnly ? (
//           <a
//             href="#/"
//             role="button"
//             className={className}
//             title={file.name}
//             style={style}
//             ref={link}
//             onClick={handleAction}
//           >
//             <FaFilePdf className="imgIcon mr-1" />
//           </a>
//         ) : (
//           <FaFilePdf className="imgIcon mr-1" />
//         ))}

//       {!iconOnly && (
//         <span className="des text-truncate text-info" title={file.name}>
//           <a
//             href="#/"
//             role="button"
//             className={className}
//             style={style}
//             ref={link}
//             onClick={handleAction}
//           >
//             {truncateFileName(file.name, 20)}
//           </a>
//         </span>
//       )}
//     </div>
//   )
// }

// const ZoomAndPan = ({ children }: { children: ReactElement }) => {
//   return (
//     <TransformWrapper wheel={{ wheelEnabled: false }}>
//       <TransformComponent>{children}</TransformComponent>
//     </TransformWrapper>
//   )
// }
