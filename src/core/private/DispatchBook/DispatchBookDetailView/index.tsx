import ViewUploadedFiles from '@/components/functional/Documents/DocumentsUpload/ViewUploadedFiles'
import GridColDetailByLabelAndValue from '@/components/functional/GridColDetailByLabelAndValue/GridColDetailByLabelAndValue'
import SectionHeader from '@/components/functional/SectionHeader'
import { Grid } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { Text } from '@/components/ui/core/Text'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { privateRoutePath, useNavigate, useParams } from '@/router'
import { apiDetails } from '@/service/api'
import { decodeParams } from '@/utility/route-params'
import { useTranslation } from 'react-i18next'
import { useGetDispatchBookDetailById } from '../AddDispatchBook/services/add-dispatch-book.query'

const DispatchBookDetailView = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const params = useParams()
  const dispatchBookId = decodeParams<string>(params?.id)

  const { data: dispatchBookDetails, isLoading } =
    useGetDispatchBookDetailById(dispatchBookId)

  const navigateToBookList = () => {
    navigate(privateRoutePath.dispatchBook.base)
  }

  return (
    <>
      <SectionHeader
        title={t('dispatchBook.title')}
        backAction={navigateToBookList}
      />
      <ContainerLayout className="scrollbars grow ">
        <Card className="h-full">
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.dispatchNumber || '-'}
              label={t('dispatchBook.dispatchNumber')}
            />
            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.dispatchDate || '-'}
              label={t('dispatchBook.dispatchDate')}
            />

            <Grid.Col sm={'sm:col-span-12'}>
              <hr className="mb-4" />
              <Text variant="h5" typeface="semibold">
                {t('dispatchBook.letterDetails')}
              </Text>
            </Grid.Col>

            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.letterNumber || '-'}
              label={t('dispatchBook.letterNumber')}
            />
            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.letterDate || '-'}
              label={t('dispatchBook.letterDate')}
            />
            <GridColDetailByLabelAndValue
              sm="sm:col-span-12"
              md="md:col-span-12"
              lg="lg:col-span-12"
              value={dispatchBookDetails?.subjectOfLetter || '-'}
              label={t('dispatchBook.subjectOfLetter')}
            />
            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.letterReceiverName || '-'}
              label={t('dispatchBook.letterReceiverName')}
            />
            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.letterReceiverEmail || '-'}
              label={t('dispatchBook.letterReceiverEmail')}
            />
            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.letterReceiverAddress || '-'}
              label={t('dispatchBook.letterReceiverAddress')}
            />

            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.letterCarrierName || '-'}
              label={t('dispatchBook.letterCarrierName')}
            />

            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.letterCarrierContact || '-'}
              label={t('dispatchBook.letterCarrierContact')}
            />

            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.letterToSection || '-'}
              label={t('dispatchBook.letterCarrierContact')}
            />

            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.physicalFileLocation || '-'}
              label={t('dispatchBook.physicalFileLocation')}
            />

            <GridColDetailByLabelAndValue
              md="md:col-span-6"
              lg="lg:col-span-6"
              value={dispatchBookDetails?.remarks || '-'}
              label={t('dispatchBook.remarks')}
            />

            <Grid.Col sm={'sm:col-span-12'}>
              <hr className="mb-4" />
              <Text variant="h5" typeface="semibold">
                {t('dispatchBook.locationDetails')}
              </Text>
            </Grid.Col>

            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                dispatchBookDetails?.locationDataResponse?.provinceNameEn ||
                  '-',
                dispatchBookDetails?.locationDataResponse?.provinceNameNp || '-'
              )}
              label={t('dispatchBook.provinceId')}
            />

            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                dispatchBookDetails?.locationDataResponse?.districtNameEn ||
                  '-',
                dispatchBookDetails?.locationDataResponse?.districtNameNp || '-'
              )}
              label={t('dispatchBook.districtId')}
            />

            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                dispatchBookDetails?.locationDataResponse?.localBodyNameEn ||
                  '-',
                dispatchBookDetails?.locationDataResponse?.localBodyNameNp ||
                  '-'
              )}
              label={t('dispatchBook.localBodyId')}
            />

            <GridColDetailByLabelAndValue
              value={dispatchBookDetails?.wardNumber || '-'}
              label={t('dispatchBook.wardNumber')}
            />
          </Grid>
          <ViewUploadedFiles
            loading={isLoading}
            documentList={dispatchBookDetails?.documentList || []}
            viewControllerName={
              apiDetails.downloadDocumentForDispatchBook.controllerName
            }
          />
        </Card>
      </ContainerLayout>
    </>
  )
}

export default DispatchBookDetailView
