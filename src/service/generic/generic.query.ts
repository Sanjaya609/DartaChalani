import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { APIENUM } from '@/utility/enums/api.enum'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  IGenericEnumResWithKeyAndValue,
  IGenericEnumResWithKeyAndName,
} from './generic.interface'
import { Dispatch, SetStateAction } from 'react'

const { getDataByEnumType, uploadDocument } = apiDetails

export const useGetEnumDataWithName = <T = IGenericEnumResWithKeyAndName[]>(
  enumType: APIENUM,
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [enumType, getDataByEnumType.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IGenericEnumResWithKeyAndName[]>>({
        apiDetails: getDataByEnumType,
        pathVariables: { enumType },
      }),
    {
      select: (data) => {
        const enumData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: enumData,
                id: 'key',
                name: 'nameEnglish',
                nameNp: 'nameNepali',
              })
            : enumData
        ) as T
      },
      enabled:
        getDataWithPropsValue && 'enabled' in getDataWithPropsValue
          ? getDataWithPropsValue.enabled
          : true,
    }
  )
}

export const useGetEnumDataWithValue = <T = IGenericEnumResWithKeyAndValue[]>(
  enumType: APIENUM,
  getDataWithPropsValue?: IGetDataWithPropsVal
) => {
  return useQuery(
    [enumType, getDataByEnumType.controllerName],
    () =>
      initApiRequest<BackendSuccessResponse<IGenericEnumResWithKeyAndValue[]>>({
        apiDetails: getDataByEnumType,
        pathVariables: { enumType },
      }),
    {
      select: (data) => {
        const enumData = data?.data?.data?.length ? data.data.data : []
        return (
          getDataWithPropsValue?.mapDatatoStyleSelect
            ? mapDataToStyledSelect({
                arrayData: enumData,
                id: 'key',
                name: 'value',
                nameNp: 'value',
              })
            : enumData
        ) as T
      },
      enabled:
        getDataWithPropsValue && 'enabled' in getDataWithPropsValue
          ? getDataWithPropsValue.enabled
          : true,
    }
  )
}

export const useDocumentUpload = (
  setUploadProgressValue?: Dispatch<SetStateAction<number>>
) => {
  return useMutation((requestData: { file: Blob | MediaSource }) => {
    return initApiRequest<BackendSuccessResponse<{ uuid: string }>>({
      apiDetails: uploadDocument,
      requestData,
      onUploadProgress: (progressEvent) => {
        setUploadProgressValue?.(
          Math.round((progressEvent.loaded * 100) / (progressEvent?.total || 1))
        )
      },
    })
  })
}
