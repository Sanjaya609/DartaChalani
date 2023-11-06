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
import ViewUploadedFiles from '@/components/functional/Documents/DocumentsUpload/ViewUploadedFiles'
import { apiDetails } from '@/service/api'

const StandingListDetailView = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const params = useParams()
  const registrationBookId = decodeParams<string>(params?.id)

  const { data: standingListDetails } =
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
              value={standingListDetails?.applicationDate || '-'}
              label={t('standingList.applicationDate')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.letter_no || '-'}
              label={t('standingList.letter_no')}
            />
            <Grid.Col sm={'sm:col-span-12'}>
              <hr className="mb-4" />
              <Text variant="h5" typeface="semibold">
                {t('standingList.firmDetails')}
              </Text>
            </Grid.Col>
            <GridColDetailByLabelAndValue
              value={standingListDetails?.personOrFirmName || '-'}
              label={t('standingList.personOrFirmName')}
            />
            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                standingListDetails?.serviceTypeNameEn || '-',
                standingListDetails?.serviceTypeNameNp || '-'
              )}
              label={t('standingList.serviceTypeId')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.firmRegistrationNumber || '-'}
              label={t('standingList.firmRegistrationNumber')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.contactPersonName || '-'}
              label={t('standingList.contactPersonName')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.contactNumber || '-'}
              label={t('standingList.contactNumber')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.firmRegistrationNumber || '-'}
              label={t('standingList.firmRegistrationNumber')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.panOrVatNumber || '-'}
              label={t('standingList.panOrVatNumber')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.panOrVatRegistrationDate || '-'}
              label={t('standingList.panOrVatRegistrationDate')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.taxClearanceDate || '-'}
              label={t('standingList.taxClearanceDate')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.taxClearanceDateExtendedDate || '-'}
              label={t('standingList.taxClearanceDateExtendedDate')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.workingSectorDetails || '-'}
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
                standingListDetails?.locationDataResponse?.provinceNameEn ||
                  '-',
                standingListDetails?.locationDataResponse?.provinceNameNp || '-'
              )}
              label={t('standingList.provinceId')}
            />
            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                standingListDetails?.locationDataResponse?.districtNameEn ||
                  '-',
                standingListDetails?.locationDataResponse?.districtNameNp || '-'
              )}
              label={t('standingList.provinceId')}
            />
            <GridColDetailByLabelAndValue
              value={getTextByLanguage(
                standingListDetails?.locationDataResponse?.localBodyNameEn ||
                  '-',
                standingListDetails?.locationDataResponse?.localBodyNameNp ||
                  '-'
              )}
              label={t('standingList.provinceId')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.wardNumber || '-'}
              label={t('standingList.wardNumber')}
            />
            <GridColDetailByLabelAndValue
              value={standingListDetails?.address || '-'}
              label={t('standingList.address')}
            />
          </Grid>
          <ViewUploadedFiles
            documentList={standingListDetails?.documentList || []}
            viewControllerName={
              apiDetails.downloadDocumentForStandingList.controllerName
            }
          />
        </Card>
      </ContainerLayout>
    </>
  )
}

export default StandingListDetailView
