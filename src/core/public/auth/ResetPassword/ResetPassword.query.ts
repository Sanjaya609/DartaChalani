import { useMutation } from "@tanstack/react-query";
import { RequestBodyType, RequestMethod } from "../../../../schemas/apiActionSchema";
import performApiAction from "../../../../utils/default-action";



export const resetPasswordAPI = {
  resetPassword: {
    queryKeyName: "RESET_PASSWORD",
    controllerName: "/api/user/reset-password",
    requestMethod: RequestMethod.POST,
    requestBodyType: RequestBodyType.NOAUTH
  },
};


export const UseResetPassword = () => {
  return useMutation(
    (requestData: { email: string }) => {
      return performApiAction(resetPasswordAPI.resetPassword, {
        requestData,
      });
    },
  );
};
