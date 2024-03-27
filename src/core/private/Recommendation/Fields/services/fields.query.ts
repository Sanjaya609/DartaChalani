import { initApiRequest } from '@/lib/api-request'
import { apiDetails } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IAddFieldInitialValue,
  IAddFieldResponse,
  IUpdateFieldOrder,
} from '../schema/field.interface'
import { IAddFieldValueInitialValue } from '../schema/filed-value.interface'
import { IValidationsFormSchema } from '../schema/validations.interface'

const {
  createField,
  updateField,
  getAllFieldByRecommendationId,
  getAllField,
  getFieldDetailById,
  deleteFieldById,
  getAllGroupByRecommendationId,
  updateFieldOrder,
  dynamicFieldList,

  createFieldValue, updateFieldValue, getFieldValueById, deleteFieldValueById,

  createFieldValidation, updateFieldValidation, getFieldValidationById, 
  deleteFieldValidationById, findAllValidationByFieldId,
  validationTypeEnum
} = apiDetails

const useCreateField = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (requestData: IAddFieldInitialValue) => {
      return initApiRequest({
        apiDetails: requestData.id ? updateField : createField,
        requestData,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
      },
    }
  )
}

const useUpdateField = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (requestData: IAddFieldInitialValue) => {
        return initApiRequest({
          apiDetails: updateField,
          requestData,
        })
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
        },
      }
    )
  }

const useGetAllFieldByRecommendationId = (id: string | number | null) => {
  return useQuery(
    [getAllFieldByRecommendationId.controllerName, id],
    () =>
      initApiRequest<BackendSuccessResponse<IAddFieldResponse[]>>({
        apiDetails: getAllFieldByRecommendationId,
        pathVariables: {
            id
        }
      }),
    {
      select: (data) => {
        
        return data?.data.data
      },
      enabled: !!id,
      staleTime: 0
    }
  )
}

const useGetAllField = <T = IAddFieldResponse[]>() => {
    return useQuery(
      [getAllField.controllerName],
      () =>
        initApiRequest<BackendSuccessResponse<IAddFieldResponse[]>>({
          apiDetails: getAllField,
        }),
      {
        select: (data) => {
          const recommendationData = data?.data?.data?.length
            ? data.data.data
            : []
          return recommendationData as T
        },
      }
    )
  }

  const useGetFieldDetailById = (id: string | number | null) => {
    return useQuery(
      [getFieldDetailById.controllerName, id],
      () =>
        initApiRequest<BackendSuccessResponse<IAddFieldResponse>>({
          apiDetails: getFieldDetailById,
          pathVariables: { id }
        }),
        {
          select: (data) => {
            return data?.data?.data
          },
          enabled: !!id,
          staleTime: 0
        }
    )
  }

  const useDeleteFieldById = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (id: number | string) => {
        return initApiRequest({
          apiDetails: deleteFieldById,
          pathVariables: { id }
        })
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
        },
      }
      )
  }

  const useUpdateFieldOrder = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (requestData: IUpdateFieldOrder[]) => {
        return initApiRequest({
          apiDetails: updateFieldOrder,
          requestData,
        })
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
        },
      }
    )
  }

  // const useGetDynamicFieldListByFormId = (id: string | number | null) => {
  //   return useQuery(
  //     [dynamicFieldList.controllerName, id],
  //     () =>
  //       initApiRequest<BackendSuccessResponse<any>>({
  //         apiDetails: dynamicFieldList,
  //         pathVariables: { id }
  //       }),
  //       {
  //         select: (data) => {
  //           return data?.data?.data
  //         },
  //         enabled: !!id,
  //         staleTime: 0
  //       }
  //   )
  // }

  interface IfieldValueListProps {
    "id": number,
    "pqCurrentPage": number,
    "pqRpp": number
  }
  const useGetDynamicFieldListByFormId = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (requestData: IfieldValueListProps) => {
        return initApiRequest({
          apiDetails: dynamicFieldList,
          requestData,
        })
      },
      // {
      //   onSuccess: () => {
      //     queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
      //   },
      // }
    )
  }

  const useCreateFieldValue = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (requestData: IAddFieldValueInitialValue) => {
        return initApiRequest({
          apiDetails: createFieldValue,
          requestData,
        })
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([dynamicFieldList.controllerName])
        },
      }
    )
  }
  
  const useUpdateFieldValue = () => {
      const queryClient = useQueryClient()
      return useMutation(
        (requestData: IAddFieldValueInitialValue) => {
          return initApiRequest({
            apiDetails: updateFieldValue,
            requestData,
          })
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([dynamicFieldList.controllerName])
          },
        }
      )
    }

    const useGetFieldValueById = (id: string | number | null, fieldValueId: number) => {
      return useQuery(
        [getFieldValueById.controllerName, id],
        () =>
          initApiRequest<BackendSuccessResponse<any>>({
            apiDetails: getFieldValueById,
            pathVariables: { id },
            params: { formValueId: fieldValueId}
          }),
          {
            select: (data) => {
              return data?.data?.data
            },
            enabled: !!id,
            staleTime: 0
          }
      )
    }

    const useDeleteFieldValueById = () => {
      const queryClient = useQueryClient()
      return useMutation(
        (id: number | string) => {
          return initApiRequest({
            apiDetails: deleteFieldValueById,
            pathVariables: { id }
          })
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([dynamicFieldList.controllerName])
          },
        }
        )
    }

    // -------- Field Validations --------
    const useCreateFieldValidation = () => {
      const queryClient = useQueryClient()
      return useMutation(
        (requestData: IValidationsFormSchema) => {
          return initApiRequest({
            apiDetails: createFieldValidation,
            requestData,
          })
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([findAllValidationByFieldId.controllerName])
          },
        }
      )
    }

    const useUpdateFieldValidation = () => {
      const queryClient = useQueryClient()
      return useMutation(
        (requestData: IValidationsFormSchema) => {
          return initApiRequest({
            apiDetails: updateFieldValidation,
            requestData,
          })
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([getAllGroupByRecommendationId.controllerName])
          },
        }
      )
    }

    const useGetAllValidationByFieldId = (id: string | number | null) => {
      return useQuery(
        [findAllValidationByFieldId.controllerName, id],
        () =>
          initApiRequest<BackendSuccessResponse<IValidationsFormSchema[]>>({
            apiDetails: findAllValidationByFieldId,
            pathVariables: {
                id
            }
          }),
        {
          select: (data) => {
            return data?.data.data
          },
          enabled: !!id,
          staleTime: 0
        }
      )
    }

    const useDeleteFieldValidationById = () => {
      const queryClient = useQueryClient()
      return useMutation(
        (id: number | string) => {
          return initApiRequest({
            apiDetails: deleteFieldValidationById,
            pathVariables: { id }
          })
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([findAllValidationByFieldId.controllerName])
          },
        }
        )
    }

    const useGetValidationTypeByEnumKey = (enumKey: string) => {
      return useQuery(
        [validationTypeEnum.controllerName, enumKey],
        () =>
          initApiRequest<BackendSuccessResponse<any>>({
            apiDetails: validationTypeEnum,
            pathVariables: { enumKey }
          }),
          {
            select: (data) => {
              return data?.data?.data
            },
            enabled: !!enumKey,
            staleTime: 0
          }
      )
    }

export {
  useCreateField,
  useUpdateField,
  useGetAllFieldByRecommendationId,
  useGetAllField,
  useGetFieldDetailById,
  useDeleteFieldById,
  useUpdateFieldOrder,
  useGetDynamicFieldListByFormId,

  useCreateFieldValue, useUpdateFieldValue, useGetFieldValueById, useDeleteFieldValueById,
  useCreateFieldValidation, useUpdateFieldValidation, useGetAllValidationByFieldId, useDeleteFieldValidationById,
  useGetValidationTypeByEnumKey
}
