/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:38 AM - 21/05/2025
 * User: kimin
 **/
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import LocalStorage from "@/utils/helper/LocalStorage.ts";
import { closeDialogLoading, showDialogLoading } from "@/redux/slice/dialog.slice.ts";

export const createBaseQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = LocalStorage.getValue("ACCESS_TOKEN");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
};

export const createBaseQueryWithDispatch = (baseUrl: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const bseQuery = createBaseQuery(baseUrl);
  return async (args, api, extraOptions) => {
    api.dispatch(showDialogLoading());
    const result = await bseQuery(args, api, extraOptions);
    api.dispatch(closeDialogLoading());
    return result;
  };
};
