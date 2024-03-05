import ViewUploadedFiles from '@/components/functional/Documents/DocumentsUpload/ViewUploadedFiles'
import GridColDetailByLabelAndValue from '@/components/functional/GridColDetailByLabelAndValue/GridColDetailByLabelAndValue'
import SectionHeader from '@/components/functional/SectionHeader'
import { Grid } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { Text } from '@/components/ui/core/Text'
import { IAddFieldInitialValue } from '@/core/private/Recommendation/Fields/schema/field.interface'
import { IAddGroupResponse } from '@/core/private/Recommendation/Fields/schema/group.interface'
import { useGetFieldValueById } from '@/core/private/Recommendation/Fields/services/fields.query'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { privateRoutePath, useNavigate, useParams } from '@/router'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { apiDetails } from '@/service/api'
import { DYNAMICFORMFIELDTYPE } from '@/utility/enums/dynamic-form.enum'
import { decodeParams } from '@/utility/route-params'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const DynamicFormDetailView = ({
  currentModuleDetails,
}: Partial<IRoutePrivilege>) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const formValueId = decodeParams<number>(params?.id)

  const { data: fieldValueById, isFetching: fieldValueIdLoading } =
    useGetFieldValueById(currentModuleDetails?.id!, formValueId!)

  const navigateToDynamicFormTable = () => {
    navigate(currentModuleDetails?.url || '-1', {
      state: { id: location?.state?.id! },
    })
  }

  const getValueForField = (field: IAddFieldInitialValue) => {
    switch (field.fieldType.toUpperCase()) {
      case DYNAMICFORMFIELDTYPE.NEPALICALENDAR:
      case DYNAMICFORMFIELDTYPE.ENGLISHCALENDAR:
      case DYNAMICFORMFIELDTYPE.INPUT:
      case DYNAMICFORMFIELDTYPE.TEXTAREA:
      case DYNAMICFORMFIELDTYPE.NUMBER:
        return field.value ?? '-'

      case DYNAMICFORMFIELDTYPE.SWITCH:
        return field.value === true ? 'Yes' : 'No'

      case DYNAMICFORMFIELDTYPE.SELECT:
      case DYNAMICFORMFIELDTYPE.RADIO: {
        const options =
          field.dropDownResponse?.dropDownDetailResponseDtoList?.map(
            (option: {
              id: number
              descriptionEn: string
              descriptionNp: string
            }) => ({
              label: option.descriptionEn,
              labelNp: option.descriptionNp,
              value: option.id,
            })
          )

        const detailValue = options?.find(
          (option) => (option.value = field.value)
        )
        return getTextByLanguage(
          detailValue?.label ?? '',
          detailValue?.labelNp ?? ''
        )
      }

      case DYNAMICFORMFIELDTYPE.CHECKBOX: {
        return field?.value?.toString === 'true' ? 'Yes' : 'No'
      }

      default:
        return field.value
    }
  }

  return (
    <>
      <SectionHeader
        title={
          currentModuleDetails
            ? getTextByLanguage(
                currentModuleDetails.moduleNameEnglish,
                currentModuleDetails.moduleNameNepali
              )
            : 'Dynamic Form Value'
        }
        backAction={navigateToDynamicFormTable}
      />
      <ContainerLayout className="scrollbars grow ">
        <Card className="h-full">
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            {fieldValueById?.length > 0
              ? fieldValueById?.map((group: IAddGroupResponse) => (
                  <>
                    <Grid.Col sm={'sm:col-span-12'}>
                      <hr className="mb-4" />
                      <Text variant="h5" typeface="semibold">
                        {getTextByLanguage(group.nameEnglish, group.nameNepali)}
                      </Text>
                    </Grid.Col>

                    {group?.fieldResponseList &&
                    group?.fieldResponseList?.length > 0
                      ? group?.fieldResponseList?.map((field) => (
                          <GridColDetailByLabelAndValue
                            value={getValueForField(field)}
                            label={getTextByLanguage(
                              field?.labelNameEnglish,
                              field?.labelNameNepali
                            )}
                          />
                        ))
                      : ''}
                  </>
                ))
              : ''}
          </Grid>
        </Card>
      </ContainerLayout>
    </>
  )
}

export default DynamicFormDetailView
