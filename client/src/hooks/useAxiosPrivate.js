/**
 * This is a custom hook that adds a bearer token to the headers of Axios requests for private routes.
 * @returns The `useAxiosPrivate` custom hook is returning the `axiosPrivate` instance with an added
 * request interceptor that sets the `Authorization` header with the user's token retrieved from local
 * storage.
 */
import { useEffect } from "react";
import { axiosPrivate } from "./useAxios";

const useAxiosPrivate = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      Promise.reject
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [token]);

  return axiosPrivate;
};

export default useAxiosPrivate;
