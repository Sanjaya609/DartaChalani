import GridColDetailByLabelAndValue from '@/components/functional/GridColDetailByLabelAndValue/GridColDetailByLabelAndValue'
import SectionHeader from '@/components/functional/SectionHeader'
import { Grid } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { Text } from '@/components/ui/core/Text'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { privateRoutePath, useNavigate, useParams } from '@/router'
import { decodeParams } from '@/utility/route-params'
import { useTranslation } from 'react-i18next'
import { useGetStandingListDetailById } from '../AddStandingList/services/standing-list.query'
import DocumentsUpload from '@/components/functional/Documents/DocumentsUpload'

const StandingListDetailView = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const params = useParams()
  const registrationBookId = decodeParams<string>(params?.id)

  const { data: registrationBookDetails } =
    useGetStandingListDetailById(registrationBookId)

  const navigateToBookList = () => {
    navigate(privateRoutePath.standingList.base)
  }

  return (
    <>
      <SectionHeader
        title={t('standingList.title')}
        backAction={navigateToBookList}
      />
      <ContainerLayout className="scrollbars grow ">
        <Card className="h-full">
          <Grid sm={'sm:grid-cols-12'} gap="gap-6">
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.applicationDate || '-'}
              label={t('standingList.applicationDate')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.letter_no || '-'}
              label={t('standingList.letter_no')}
            />
            <Grid.Col sm={'sm:col-span-12'}>
              <hr className="mb-4" />
              <Text variant="h5" typeface="semibold">
                {t('standingList.firmDetails')}
              </Text>
            </Grid.Col>
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.personOrFirmName || '-'}
              label={t('standingList.personOrFirmName')}
            />
            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                registrationBookDetails?.serviceTypeNameEn || '-',
                registrationBookDetails?.serviceTypeNameNp || '-'
              )}
              label={t('standingList.serviceTypeId')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.firmRegistrationNumber || '-'}
              label={t('standingList.firmRegistrationNumber')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.contactPersonName || '-'}
              label={t('standingList.contactPersonName')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.contactNumber || '-'}
              label={t('standingList.contactNumber')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.firmRegistrationNumber || '-'}
              label={t('standingList.firmRegistrationNumber')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.panOrVatNumber || '-'}
              label={t('standingList.panOrVatNumber')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.panOrVatRegistrationDate || '-'}
              label={t('standingList.panOrVatRegistrationDate')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.taxClearanceDate || '-'}
              label={t('standingList.taxClearanceDate')}
            />
            <GridColDetailByLabelAndValue
              value={
                registrationBookDetails?.taxClearanceDateExtendedDate || '-'
              }
              label={t('standingList.taxClearanceDateExtendedDate')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.workingSectorDetails || '-'}
              label={t('standingList.workingSectorDetails')}
            />
            \
            <Grid.Col sm={'sm:col-span-12'}>
              <hr className="mb-4" />
              <Text variant="h5" typeface="semibold">
                {t('standingList.locationDetails')}
              </Text>
            </Grid.Col>
            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                registrationBookDetails?.locationDataResponse?.provinceNameEn ||
                  '-',
                registrationBookDetails?.locationDataResponse?.provinceNameNp ||
                  '-'
              )}
              label={t('standingList.provinceId')}
            />
            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                registrationBookDetails?.locationDataResponse?.districtNameEn ||
                  '-',
                registrationBookDetails?.locationDataResponse?.districtNameNp ||
                  '-'
              )}
              label={t('standingList.provinceId')}
            />
            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                registrationBookDetails?.locationDataResponse
                  ?.localBodyNameEn || '-',
                registrationBookDetails?.locationDataResponse
                  ?.localBodyNameNp || '-'
              )}
              label={t('standingList.provinceId')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.wardNumber || '-'}
              label={t('standingList.wardNumber')}
            />
            <GridColDetailByLabelAndValue
              value={registrationBookDetails?.address || '-'}
              label={t('standingList.address')}
            />
          </Grid>
          <DocumentsUpload moduleId={'68'} viewOnly canUploadMultipleFile />
        </Card>
      </ContainerLayout>
    </>
  )
}

export default StandingListDetailView
