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
import { useGetRegistrationBookDetailById } from '../AddRegistrationBook/services/add-registration-book.query'

const RegistrationBookDetailView = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const params = useParams()
  const registrationBookId = decodeParams<string>(params?.id)

  const { data: registrationBookDetails } =
    useGetRegistrationBookDetailById(registrationBookId)

  const navigateToBookList = () => {
    navigate(privateRoutePath.registrationBook.base)
  }

  return (
    <>
      <SectionHeader
        title={t('registrationBook.title')}
        backAction={navigateToBookList}
      />
      <ContainerLayout className="scrollbars grow ">
        <Card>
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.registrationNumber || '-'}
              label={t('registrationBook.registrationNumber')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.applicationDate || '-'}
              label={t('registrationBook.applicationDate')}
            />

            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                registrationBookDetails?.locationDataResponse?.provinceNameEn ||
                  '-',
                registrationBookDetails?.locationDataResponse?.provinceNameNp ||
                  '-'
              )}
              label={t('registrationBook.provinceId')}
            />

            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                registrationBookDetails?.locationDataResponse?.districtNameEn ||
                  '-',
                registrationBookDetails?.locationDataResponse?.districtNameNp ||
                  '-'
              )}
              label={t('registrationBook.districtId')}
            />

            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                registrationBookDetails?.locationDataResponse
                  ?.localBodyNameEn || '-',
                registrationBookDetails?.locationDataResponse
                  ?.localBodyNameNp || '-'
              )}
              label={t('registrationBook.localBodyId')}
            />

            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.wardNumber || '-'}
              label={t('registrationBook.wardNumber')}
            />

            <Grid.Col sm={'sm:col-span-12'}>
              <hr className="mb-4" />
              <Text variant="h5" typeface="semibold">
                Letter Details
              </Text>
            </Grid.Col>

            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.letterDispatchDate || '-'}
              label={t('registrationBook.letterDispatchDate')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.letterDispatchNumber || '-'}
              label={t('registrationBook.letterDispatchNumber')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.letterLinks || '-'}
              label={t('registrationBook.letterLinks')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.letterSenderName || '-'}
              label={t('registrationBook.letterSenderName')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.letterToPerson || '-'}
              label={t('registrationBook.letterToPerson')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.physicalAddress || '-'}
              label={t('registrationBook.physicalAddress')}
            />
            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                registrationBookDetails?.sectorNameEnglish || '-',
                registrationBookDetails?.sectorNameNepali || '-'
              )}
              label={t('registrationBook.wardNumber')}
            />
            <GridColDetailByLabelAndValue
              sm="sm:col-span-12"
              md="md:col-span-12"
              lg="lg:col-span-12"
              value={registrationBookDetails?.subjectOfLetter || '-'}
              label={t('registrationBook.subjectOfLetter')}
            />
            <GridColDetailByLabelAndValue
              md="md:col-span-6"
              lg="lg:col-span-6"
              value={registrationBookDetails?.remarks || '-'}
              label={t('registrationBook.remarks')}
            />
          </Grid>
          <ViewUploadedFiles
            documentList={registrationBookDetails?.documentList || []}
            viewControllerName={
              apiDetails.downloadDocumentForRegistrationBook.controllerName
            }
          />
        </Card>
      </ContainerLayout>
    </>
  )
}

export default RegistrationBookDetailView
