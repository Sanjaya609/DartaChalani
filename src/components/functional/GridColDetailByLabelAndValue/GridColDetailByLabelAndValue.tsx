import { Flexbox, Grid, Icon } from '@/components/ui'
import { GridColProps } from '@/components/ui/core/Grid/GridCols'
import { Text } from '@/components/ui/core/Text'
import ViewUploadedFilesModal from '../Documents/DocumentsUpload/UploadedFiles/ViewUploadedFilesModal'
import { useState } from 'react'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { apiDetails } from '@/service/api'
import { Eye } from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import { convertEngToNepNumber } from '../Datepicker/datePickerUtils'

interface ICompanyDetailsDisplayForm {
  value: any
  label: string
  fieldType?: string
}

const GridColDetailByLabelAndValue = (
  props: ICompanyDetailsDisplayForm & GridColProps
) => {
  const { value, label, fieldType, ...restProps } = props
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  const { downloadDynamicFieldFile } = apiDetails

  return (
    <>
      <Grid.Col
        sm={'sm:col-span-12'}
        md={'md:col-span-6'}
        lg={'lg:col-span-3'}
        {...restProps}
      >
        <Text
          variant="h6"
          color="text-gray-32"
          className="mb-2 leading-100"
          typeface="normal"
        >
          {label}
        </Text>
        {fieldType === 'File' ? (
          <>
            <Flexbox onClick={() => setIsOpen(true)} align="center">
              <span className="mr-2">
                {t('document.fileNumber', {
                  number: getTextByLanguage(
                    String(value?.length),
                    convertEngToNepNumber(value?.length)
                  ),
                })}
              </span>
              <Icon icon={Eye} size={20} className="cursor-pointer" />
            </Flexbox>
          </>
        ) : (
          <Text
            variant="subtitle2"
            typeface="semibold"
            className="mt-1 leading-100"
            color="text-gray-16"
          >
            {value}
          </Text>
        )}
      </Grid.Col>

      {fieldType === 'File' && (
        <ViewUploadedFilesModal
          isOpen={isOpen}
          filesData={value || []}
          toggleFileViewModal={() => setIsOpen(!isOpen)}
          modalTitle={label}
          controllerName={downloadDynamicFieldFile?.controllerName}
        />
      )}
    </>
  )
}

export default GridColDetailByLabelAndValue
