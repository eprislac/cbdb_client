// hooks/useAxiosAuth.ts
"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useMemo } from "react";
import { useRefreshToken } from "./useRefreshToken";
import axios, { AxiosError, AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
  status: number;
}

const useAxiosAuth = (baseURL: string): AxiosInstance => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();
  const router = useRouter();

  const axiosAuthClient = useMemo(() => {
    return axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [baseURL]);

  useEffect(() => {
    const requestIntercept = axiosAuthClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && session?.accessToken) {
          config.headers["Authorization"] = `Bearer ${session.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosAuthClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ErrorResponse>) => {
        const prevRequest = error.config!;

        // Handle token expiration
        if (error.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          try {
            const newAccessToken = await refreshToken(axiosAuthClient);
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosAuthClient(prevRequest);
          } catch (refreshError) {
            // Handle refresh token failure
            await signOut({ redirect: false });
            toast.error("Your session has expired. Please sign in again.");
            router.push("/auth/signin");
            return Promise.reject(refreshError);
          }
        }

        // Handle other common errors
        if (error.response?.status === 403) {
          toast.error("You do not have permission to perform this action");
        } else if (error.response?.status === 404) {
          toast.error("The requested resource was not found");
        } else if (error.response?.status >= 500) {
          toast.error("An unexpected error occurred. Please try again later");
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosAuthClient.interceptors.request.eject(requestIntercept);
      axiosAuthClient.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosAuthClient;
};

export default useAxiosAuth;
