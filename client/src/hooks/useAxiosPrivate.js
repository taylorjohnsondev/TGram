/**
 * This is a custom hook that adds a bearer token to the headers of Axios requests for private routes.
 * @returns The `useAxiosPrivate` custom hook is returning the `axiosPrivate` instance with an added
 * request interceptor that sets the `Authorization` header with the user's token retrieved from local
 * storage.
 */
import { useEffect } from "react";
import { axiosPrivate } from "./useAxios";

const useAxiosPrivate = () => {
  let token;
  const user = JSON.parse(localStorage.getItem("user"));
  const googleUserToken = JSON.parse(localStorage.getItem("token"));

  if (googleUserToken) {
    token = googleUserToken;
  } else {
    token = user?.token;
  }

  useEffect(() => {
    if (!token || !googleUserToken) {
      console.error("no token found in local storage!");
      return;
    }

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
