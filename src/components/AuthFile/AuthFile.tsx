import React, { useCallback, useEffect, useRef, useState } from 'react'

import Browser from 'bowser'

import DocImage from '@/assets/img/document.png'
import {
  initApiRequest,
  RequestBodyType,
  RequestMethod,
} from '@/lib/api-request'
import downloadFile from '@/utility/document/fileDownloader'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { getTruncatedFileNameByLength } from '@/utility/utility'
import { Eye, File, Image } from 'phosphor-react'
import { FileData } from '../functional/Documents/DocumentsUpload/document-upload.interface'
import toast, { ToastType } from '../functional/ToastNotifier/ToastNotifier'
import { Box, Icon } from '../ui'
import ImageWithSrc from '../ui/core/Image/ImageWithSrc'
import { Spinner } from '../ui/Spinner'

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

AuthFile.Image = (props: AuthFileBaseProps) => {
  const {
    fileData,
    className,
    style,
    download,
    iconOnly,
    customElement,
    controllerName,
  } = props

  const [loading, setloading] = useState(false)
  const [objectUrl, setobjectUrl] = useState('')

  const fullPathName = `${import.meta.env.VITE_API_ENDPOINT}${controllerName}`

  const getFile = useCallback(async () => {
    setloading(true)
    let data: any
    try {
      data = await initApiRequest<Blob>({
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
    if (!(data?.data instanceof Blob)) {
      toast({
        type: ToastType.error,
        message: `Failed to get the document ${fileData.documentName}`,
      })
      return
    }

    const fileBlob = URL.createObjectURL(data.data)
    setobjectUrl(fileBlob)
  }, [fileData?.uuid])

  useEffect(() => {
    getFile()
  }, [])

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
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <ImageWithSrc
            alt="gallery"
            className="block h-full w-full rounded-lg object-contain object-center"
            src={objectUrl || DocImage}
          />
        )}

        {/* {customElement &&
          customElement({
            filesource: objectUrl,
            openNewTab: handleAction,
          })} */}

        {!customElement && (
          <div className="absolute left-1/2 top-1/2 z-10 h-full w-full  -translate-x-1/2 -translate-y-1/2 bg-gray-300/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex">
                <div
                  className="group/icon rounded-sm border border-gray-80 bg-gray-64 p-2 text-gray-24 transition-all duration-300 hover:border-navy-40"
                  onClick={() => {
                    if (objectUrl) {
                      window.open(objectUrl, '_target')
                    }
                  }}
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
// const ZoomAndPan = ({ children }: { children: ReactElement }) => {
//   return (
//     <TransformWrapper wheel={{ wheelEnabled: false }}>
//       <TransformComponent>{children}</TransformComponent>
//     </TransformWrapper>
//   )
// }
