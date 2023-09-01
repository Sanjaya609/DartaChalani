import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RequestMethod } from "../../../../schemas/apiActionSchema";
import performApiAction, {
  CustomResponse,
} from "../../../../utils/default-action";
import { FiscalYearData, FiscalYearResponse } from "./schema";

const fiscalyearApi = {
  getAll: {
    queryKeyName: "GET_Fiscal_Year",
    controllerName: "/api/fiscal-year/all-list",
  },
  post: {
    queryKeyName: "POST_FISCAL_YEAR",
    controllerName: "/api/fiscal-year",
    requestMethod: RequestMethod.POST,
  },
  updateStatusOfIndicator: {
    queryKeyName: "UPDATE_FISCAL_YEAR_STATUS",
    controllerName: "/api/fiscal-year/change-status/{id}",
    requestMethod: RequestMethod.PUT,
  },
  get: {
    queryKeyName: "GET_ONE_FISCAL_YEAR",
    controllerName: "/api/fiscal-year/{id}",
  },
  getFiveFiscalYear: {
    queryKeyName: "GET_FIVE_FISCAL_YEAR",
    controllerName: "/api/fiscal-year/five-fiscal-year/list",
    requestMethod: RequestMethod.GET,
  },
  switchCurrentStatusOfFiscal: {
    queryKeyName: "SWITCH_FISCAL_YEAR_STATUS",
    controllerName: "/api/fiscal-year/switch-into-current-fiscal-year/{id}",
    requestMethod: RequestMethod.PUT,
  },
};

export const useFiscalYearData = () =>
  useQuery([fiscalyearApi.getAll.queryKeyName], () =>
    performApiAction<CustomResponse<FiscalYearResponse[]>>(fiscalyearApi.getAll)
  );

export const useFiscalYearPost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (requestData: FiscalYearData) => {
      return performApiAction(fiscalyearApi.post, { requestData });
    },
    {
      onSuccess(data) {
        if (data.data) {
          queryClient.invalidateQueries([fiscalyearApi.getAll.queryKeyName]);
        }
      },
    }
  );
};

export const UseUpdateFiscalYearStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) => {
      return performApiAction(fiscalyearApi.updateStatusOfIndicator, {
        pathVariables: { id },
      });
    },
    {
      onSuccess(data) {
        if (data.data) {
          queryClient.invalidateQueries([fiscalyearApi.getAll]);
        }
      },
    }
  );
};

export const useOneFiscalYearData = (id?: string | number) =>
  useQuery(
    [fiscalyearApi.get.queryKeyName, id],
    () =>
      performApiAction<CustomResponse<FiscalYearResponse>>(fiscalyearApi.get, {
        pathVariables: { id: Number(id) },
      }),
    {
      enabled: !!id,
    }
  );

export const UseGetFiveFiscalYear = (isOpen: boolean | null) =>
  useQuery(
    [fiscalyearApi.getFiveFiscalYear.queryKeyName, isOpen],
    () =>
      performApiAction<CustomResponse<FiscalYearResponse[]>>(
        fiscalyearApi.getFiveFiscalYear
      ),
    {
      select: (data) => {
        return data?.data;
      },
      enabled: !!isOpen,
    }
  );

export const UseSwitchCurrentFiscalYearStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) => {
      return performApiAction(fiscalyearApi.switchCurrentStatusOfFiscal, {
        pathVariables: { id },
      });
    },
    {
      onSuccess(data) {
        if (data.data) {
          queryClient.invalidateQueries([fiscalyearApi.getAll.queryKeyName]);
        }
      },
    }
  );
};
