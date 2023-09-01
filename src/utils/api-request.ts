import Axios, {
  AxiosBasicCredentials,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  CancelTokenStatic,
  Method,
} from "axios";
import { APIDetailType, RequestBodyType } from "../schemas/apiActionSchema";
import { getToken } from "./tokenService";

/**
 * Primitive types
 */
type Primitive = string | boolean | number;
type RequestDataType = Primitive | object | any;

export interface RequestParam {
  [key: string]: Primitive | undefined;
}

interface TransformedRequestData {
  auth?: AxiosBasicCredentials;
  data: unknown;
}

const basicAuth: AxiosBasicCredentials = {
  username: "mtef-app-client",
  password: "Test@123",
};

const k = { key: "grant_type", value: "password" };
const getRequestHeaders = (apiDetails: APIDetailType) => {
  let headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getToken(),
  };

  switch (apiDetails.requestBodyType) {
    case "QUERY-STRING":
      headers = {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      };
      break;
    case "FORM-DATA":
      headers = {
        ...headers,
        "Content-Type": "multipart/form-data",
      };
      break;
    case "NO-AUTH":
      delete headers["Authorization"];
      break;
    default:
      headers = { ...headers };
  }
  return headers;
};
function getFormData(requestData: { [key: string]: RequestDataType }) {
  const formData = new FormData();
  for (const data in requestData) {
    if (requestData[data] instanceof Array) {
      requestData[data].forEach((dataEl: RequestDataType, index: number) => {
        if (dataEl instanceof Object && !(dataEl instanceof File)) {
          Object.keys(dataEl).forEach((elKey) =>
            formData.append(`${data}[${index}].${elKey}`, dataEl[elKey])
          );
        } else if (dataEl instanceof File) {
          // formData.append(data, dataEl);
          formData.append(`${data}[${index}]`, dataEl);
        } else if (typeof dataEl === "number" || typeof dataEl === "string") {
          formData.append(`${data}[${index}]`, dataEl.toString());
        }
      });
    } else if (
      requestData[data] instanceof Object &&
      !(requestData[data] instanceof File)
    ) {
      Object.entries(requestData[data]).forEach(
        ([key, value]: [string, RequestDataType]) =>
          formData.append(`${data}.${key}`, value)
      );
    } else {
      formData.append(data, requestData[data]);
    }
  }
  return formData;
}

function getQueryString(data: { [key: string]: string }) {
  return new URLSearchParams(data);
}

const manageErrorResponse = (error: AxiosError | any) => {
  const { message, config, code, request, response, isAxiosError } = error;
  console.log(code);

  const errorResponse = {
    message: message, // Something happened in setting up the request that triggered an Error
    data: null,
    status: response?.status || false,
    noconnection: false,
    config: config, // Request Params Configs
    isAxiosError: isAxiosError, //If Axios Error
  };
  if (response) {
    errorResponse.data = {
      ...response.data,
      status: response
        ? response?.status >= 200 && response?.status < 400
        : false,
    }; // The server responded with a status code and data
  } else if (request) {
    errorResponse.message = "Server could not be reached."; // No response was received
    errorResponse.noconnection = true;
  }

  return errorResponse;
};
const requestAccessToken = (error: AxiosError) => {
  const errorResponse = error.response;
  if (errorResponse && errorResponse.status === 401) {
    const originalRequest = error.config;
    // return SSOService.updateToken(async () => {
    //   const newRequest = {
    //     ...originalRequest
    //   };
    //   Axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();
    //   return Axios.request(newRequest)
    //     .then((res) => {
    //       return Promise.resolve(res);
    //     })
    //     .catch((err) => {
    localStorage.clear();
    window.location.href = "/";
    // return Promise.reject(manageErrorResponse('Error in re-request'));
    //     });
    // });
  } else {
    return Promise.reject(error);
  }
};

const transformRequestData = (
  apiDetails: APIDetailType,
  requestData: RequestDataType
) => {
  const transformedRequestData: TransformedRequestData = { data: requestData };

  switch (apiDetails.requestBodyType) {
    case "NO-AUTH":
      transformedRequestData.auth = basicAuth;
      transformedRequestData.data = getFormData(requestData);
      // if (transformedRequestData.data instanceof FormData)
      //   transformedRequestData.data.append(getGrantType.key, getGrantType.value);
      break;
    case "FORM-DATA":
      transformedRequestData.auth = basicAuth;

      transformedRequestData.data = getFormData(requestData);
      break;
    case "QUERY-STRING":
      transformedRequestData.data = getQueryString(requestData);
      break;
    default:
      transformedRequestData.data = requestData;
      break;
  }

  return transformedRequestData;
};

// Cancel a request using a cancel token.
const cancelToken: CancelTokenStatic = Axios.CancelToken;
const source: CancelTokenSource = cancelToken.source();

export default function initApiRequest<TData>(
  apiDetails: APIDetailType,
  requestData: RequestDataType,
  requestMethod: Method,
  params?: RequestParam,
  cancelSource?: CancelTokenSource
): Promise<AxiosResponse<TData>> {
  // API URL
  // const url = process.env.REACT_APP_API_ENDPOINT;
  const url = "http://156.67.220.45:8090/";
  const headers = getRequestHeaders(apiDetails);
  const transformedRequestData = transformRequestData(apiDetails, requestData);

  let axiosReqParams: AxiosRequestConfig = {
    // baseURL: apiDetails.controllerName,
    baseURL: url,
    url: apiDetails.controllerName,
    method: requestMethod,
    responseType: "json",
    timeout: 60 * 3 * 1000,
    cancelToken: cancelSource ? cancelSource.token : source.token,
    headers: headers,
    ...transformedRequestData,
  };

  if (params) {
    axiosReqParams = {
      ...axiosReqParams,
      params: params,
    };
  }

  if (apiDetails.requestBodyType === RequestBodyType.FILE) {
    axiosReqParams.responseType = "blob";
  }

  Axios.interceptors.response.use(
    function (response) {
      return Promise.resolve(response);
    },
    function (error: AxiosError) {
      return requestAccessToken(error);
    }
  );

  return Axios.request(axiosReqParams)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      const errorResponse = manageErrorResponse(error);
      throw errorResponse;
    });
}
