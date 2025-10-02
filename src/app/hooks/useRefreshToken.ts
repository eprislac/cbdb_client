// hooks/useRefreshToken.ts
"use client";

import { useSession } from "next-auth/react";
import { AxiosInstance } from "axios";
import { AuthTokens } from "@/types/auth";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async (axiosClient: AxiosInstance): Promise<string> => {
    try {
      const response = await axiosClient.post<AuthTokens>("/auth/refresh", {
        refreshToken: session?.refreshToken,
      });

      const updatedSession = {
        ...session,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };

      await update(updatedSession);
      return response.data.accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw new Error("Failed to refresh token");
    }
  };

  return refreshToken;
};
