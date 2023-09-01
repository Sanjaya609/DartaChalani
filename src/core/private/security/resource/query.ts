import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RequestMethod } from "../../../../schemas/apiActionSchema";
import performApiAction, { CustomResponse } from "../../../../utils/default-action";
import { ResoursePayload, ResourseSchema } from "./schema";

const resourceApi = {
    getAll: {
        queryKeyName: 'GET_RESOURCE',
        controllerName: '/api/resource/list'
    },
    getAllActive: {
        queryKeyName: 'GET_RESOURCE_ACTVE',
        controllerName: '/api/resource/list/true'
    },
    post: {
        queryKeyName: 'POST_RESOURCE',
        controllerName: '/api/resource',
        requestMethod: RequestMethod.POST,
    },
    activeStatus: {
        queryKeyName: 'POST_RESOURCE_STATUS',
        controllerName: '/api/resource/{id}',
        requestMethod: RequestMethod.PUT,
    }
}
export const useResourceData = () =>
    useQuery(
        [resourceApi.getAll],
        () =>
            performApiAction<CustomResponse<ResourseSchema[]>>(resourceApi.getAll),
    );

export const useActiveResourceData = () =>
    useQuery(
        [resourceApi.getAllActive],
        () =>
            performApiAction<CustomResponse<ResourseSchema[]>>(resourceApi.getAllActive),
    );

export const useResourcePost = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (requestData: ResoursePayload) => {
            return performApiAction(resourceApi.post, { requestData });
        }, {
        onSuccess(data) {
            if (data.data) {
                queryClient.invalidateQueries([resourceApi.getAll])
            }
        },
    }
    );
};

export const UseResourceStatus = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (id: number) => {
            return performApiAction(
                resourceApi.activeStatus,
                { pathVariables: { id } }
            );
        },
        {
            onSuccess(data) {
                if (data.data) {
                    queryClient.invalidateQueries([
                        resourceApi.getAll
                    ]);
                }
            },
        }
    );
};
