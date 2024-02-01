import SectionHeader from '@/components/functional/SectionHeader'
import { DataTable } from '@/components/functional/Table'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { IDropdownConfigResponse } from '@/core/private/MasterSetup/DropdownConfig/AddDropDownConfig/schema/dropdown-config.interface'
import { useGetDynamicFieldListByFormId } from '@/core/private/Recommendation/Fields/services/fields.query'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

interface ConvertedDataItem {
  [key: string]: any;
}
interface Field {
  labelNameEnglish: string;
  fieldId: number;
  value: any;
}

const DynamicFormModuleTable = ({
  currentModuleDetails,
}: Partial<IRoutePrivilege>) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()

  console.log(location, "filter location")

  const { data: dynamicFieldListData = [], isFetching: dynamicFieldListDataFetching } =
    useGetDynamicFieldListByFormId(location?.state?.id)

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => {
      if(dynamicFieldListData.length) {
        return dynamicFieldListData[0]?.values?.map((field: { labelNameEnglish: string, fieldId: number}) => ({
          id: field.fieldId,
          header: field.labelNameEnglish,
          accessorKey: (field.labelNameEnglish + field.fieldId).toLocaleLowerCase()
        }))
      } else {
        return [
          {
            header: "Dynamic Fields",
            accessorKey: ""
          } 
        ]
      }
    },
    [t, dynamicFieldListDataFetching, dynamicFieldListData[0]?.values]
  )

  const convertedData: ConvertedDataItem[] = dynamicFieldListData.map((item: {values: Field[]}) => {
    const convertedItem: ConvertedDataItem = {};
    item.values.forEach((field: Field) => {
        convertedItem[field.labelNameEnglish.toLocaleLowerCase() + field.fieldId] = field.value ?? "-";
    });
    return convertedItem;
  });

  return (
    <>
      <SectionHeader
        title={
          currentModuleDetails
            ? getTextByLanguage(
                currentModuleDetails.moduleNameEnglish,
                currentModuleDetails.moduleNameNepali
              )
            : t('masterSetup.dropdownConfig.title')
        }
      />
      <ContainerLayout stretch>
        <FlexLayout direction="column">
          <DataTable
            canSearch
            addHeaderProps={{
              handleAdd: () => {
                navigate(`${currentModuleDetails?.url}/add`, { state: { id: location?.state?.id!}})
              },
            }}
            columns={columns}
            data={convertedData || []}
          />
        </FlexLayout>
      </ContainerLayout>
    </>
  )
}

export default DynamicFormModuleTable
