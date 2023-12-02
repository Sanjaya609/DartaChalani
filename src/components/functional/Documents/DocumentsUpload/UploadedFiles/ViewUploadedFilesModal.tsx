import DocImage from '@/assets/img/document.png'
import AuthFile from '@/components/AuthFile/AuthFile'
import { Grid, Icon } from '@/components/ui'
import Badge from '@/components/ui/Badge/Badge'
import Modal from '@/components/ui/Modal/Modal'
import ImageWithSrc from '@/components/ui/core/Image/ImageWithSrc'
import { handleViewOrDownload, isImageFile } from '@/utility/file'
import { getTruncatedFileNameByLength } from '@/utility/utility'
import { Eye, X } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FileData } from '../document-upload.interface'

const imgWidthWithLength = {
  1: 'sm:col-span-12',
  2: 'sm:col-span-6',
}

interface IViewUploadedFilesModalProps {
  filesData: FileData[]
  isOpen: boolean
  toggleFileViewModal: Function
  modalTitle?: string
  removeFileAction?: (file: FileData) => void
  controllerName?: string
}

const ViewUploadedFilesModal = (props: IViewUploadedFilesModalProps) => {
  const {
    isOpen,
    toggleFileViewModal,
    modalTitle,
    filesData,
    removeFileAction,
    controllerName,
  } = props
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const fileWithObjectSrc = useMemo(() => {
    return filesData.map((data) => ({
      ...data,
      fileSrc: data.file ? URL.createObjectURL(data.file!) : '',
      documentName: data.documentName || '',
    }))
  }, [filesData])

  const [currentDeleteId, setCurrentDeleteId] = useState<StringNumber>('')

  const toggleFileViewModalHandler = () => {
    toggleFileViewModal()
    setCurrentDeleteId('')
  }

  return (
    <Modal
      title={
        modalTitle
          ? t('document.modal.nameTitle', { name: modalTitle })
          : t('document.modal.title')
      }
      open={isOpen}
      toggleModal={toggleFileViewModalHandler}
      hideFooter
      contentClassName="pb-3"
    >
      <Grid sm={'sm:grid-cols-12'} gap="gap-4" className="w-full">
        {fileWithObjectSrc.map((fileData) => {
          const fileExt = fileData.file?.name.split('.').pop() || ''
          const uploadedDocumentFileExt =
            fileData.documentName.split('.').pop() || ''

          return (
            <Grid.Col
              key={fileData.uuid}
              className={`${
                imgWidthWithLength?.[
                  filesData.length as keyof typeof imgWidthWithLength
                ] || 'sm:col-span-4'
              } group relative h-[250px] cursor-pointer `}
            >
              <div className="relative h-full border border-slate-300 p-1 md:p-2">
                {fileData.fileSrc ? (
                  <>
                    <ImageWithSrc
                      spinnerProps={{
                        size: 'xl',
                        className: 'h-full flex items-center justify-center',
                      }}
                      showSpinner
                      alt="gallery"
                      className="block h-full w-full rounded-lg object-contain object-center"
                      src={isImageFile(fileExt) ? fileData.fileSrc : DocImage}
                    />

                    <div className="absolute left-1/2 top-1/2 z-10 h-full w-full  -translate-x-1/2 -translate-y-1/2 bg-gray-300/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="flex h-full flex-col items-center justify-center">
                        <div className="flex">
                          <div
                            className="group/icon rounded-sm border border-gray-80 bg-gray-64 p-2 text-gray-24 transition-all duration-300 hover:border-navy-40"
                            onClick={() => {
                              if (fileData?.file) {
                                handleViewOrDownload({
                                  action: 'view',
                                  fileProps: {
                                    file: fileData.file,
                                    fileType: fileExt,
                                  },
                                })
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
                              fileData?.file?.name || fileData?.documentName,
                              15
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : isImageFile(uploadedDocumentFileExt) ? (
                  <AuthFile.Image
                    key={fileData?.uuid}
                    controllerName={controllerName || ''}
                    fileData={fileData}
                    className="flex h-full items-center justify-center"
                  />
                ) : (
                  <AuthFile
                    key={fileData?.uuid}
                    controllerName={controllerName || ''}
                    fileData={fileData}
                    className="flex h-full items-center justify-center"
                  />
                )}

                {removeFileAction && (
                  <div className="group/delete  absolute right-0 top-0 z-10 rounded-sm p-2 text-gray-24 opacity-0 transition-opacity duration-500 hover:border-navy-40 group-hover:opacity-100">
                    <div className="relative">
                      <Icon
                        className="relative group-hover/delete:text-red-48"
                        icon={X}
                        size={20}
                        onClick={() => {
                          if (fileData?.uuid) {
                            if (fileData.uuid === currentDeleteId) {
                              setCurrentDeleteId('')
                            } else {
                              setCurrentDeleteId(fileData.uuid)
                            }
                          }
                        }}
                      />

                      <Badge
                        type="danger"
                        className={`absolute ${
                          fileData?.uuid === currentDeleteId
                            ? 'opacity-100'
                            : 'opacity-0'
                        }  ${
                          language === 'en' ? '-left-[9rem]' : '-left-[11rem]'
                        } group/badge top-0 w-fit transition-opacity duration-500`}
                      >
                        <span
                          onClick={() => {
                            if (fileData?.uuid === currentDeleteId) {
                              removeFileAction(fileData)
                            }
                          }}
                          className="group-hover/badge:text-red-96"
                        >
                          {t('document.confirmRemove')}
                        </span>
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </Grid.Col>
          )
        })}
      </Grid>
    </Modal>
  )
}

export default ViewUploadedFilesModal
