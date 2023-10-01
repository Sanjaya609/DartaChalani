import { Flexbox, Icon } from '@/components/ui'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { Eye } from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import { convertEngToNepNumber } from '../../../Datepicker/datePickerUtils'
import { FileData, IFileStateFileValue } from '../document-upload.interface'

interface IUploadedFilesProps {
  filesData: FileData[]
  toggleFileView?: VoidFunction
}

const UploadedFiles = (props: IUploadedFilesProps) => {
  const { filesData, toggleFileView } = props
  const { t } = useTranslation()

  if (!filesData?.length) {
    return <>{t('document.noFilesUploaded')}</>
  }

  return (
    <Flexbox onClick={() => toggleFileView?.()} align="center">
      <span className="mr-2">
        {t('document.fileNumber', {
          number: getTextByLanguage(
            String(filesData.length),
            convertEngToNepNumber(filesData.length)
          ),
        })}
      </span>
      <Icon icon={Eye} size={20} className="cursor-pointer" />
    </Flexbox>
  )
}

export default UploadedFiles
