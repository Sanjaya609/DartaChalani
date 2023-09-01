import { useQuery } from "@tanstack/react-query";
import performApiAction, { CustomResponse } from "../../../utils/default-action";
import { DashboardResponse } from "./dashboard.schema";

export const DashboardAPI = {
    getDashboardDetail: {
        queryKeyName: "GET_DASHBOARD_DETAIL",
        controllerName: "/api/dashboard/{subSectorId}"
    }
}


export const useGetDashboardDetail = (subSectorId: string) =>
    useQuery([DashboardAPI.getDashboardDetail.queryKeyName, subSectorId], () =>
        performApiAction<CustomResponse<DashboardResponse>>(DashboardAPI.getDashboardDetail, {
            pathVariables: { subSectorId: subSectorId }
        }),
        {
            select: (data: any) => {
                return data?.data?.data
            },
            enabled: !!subSectorId
        }
    );