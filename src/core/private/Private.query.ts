import { useQuery } from "@tanstack/react-query";
import { RequestMethod } from "../../schemas/apiActionSchema";
import performApiAction, { CustomResponse } from "../../utils/default-action";
import { InitDataSchema } from "./Private.schema";

const initApi = {
  getInit: {
    controllerName: `/init`,
    queryKeyName: "INIT",
    requestMethod: RequestMethod.GET,
  },
};

export const useInitData = () =>
  useQuery(
    [initApi.getInit.queryKeyName],
    () => performApiAction<CustomResponse<InitDataSchema>>(initApi.getInit),
    {
      select: (data) => {
        return data?.data?.data;
      },
    }
  );
