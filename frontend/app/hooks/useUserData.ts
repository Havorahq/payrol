import { useState, useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { findUser } from "../api/helper-functions";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type UserData = {
  data: PostgrestSingleResponse<any> | null;
  error: string | null;
} | null;

type UseUserDataReturn = {
  userData: UserData;
  isLoading: boolean;
  error: string | null;
};

// Custom hook
export const useUserData = (): UseUserDataReturn => {
  const { user } = useDynamicContext();
  const [userData, setUserData] = useState<UserData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        setIsLoading(false);
        setError("User not logged in");
        return;
      }

      try {
        const result = await findUser(user.email);
        setUserData(result);
        setError(result?.error || null);
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchUserData();
  }, [user]);

  return { userData, isLoading, error };
};
