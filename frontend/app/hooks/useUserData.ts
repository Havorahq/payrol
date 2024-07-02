import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { getEmployeeById, getEmployerById } from "../api/helper-functions";

const useUserData = () => {
  const account = useAccount();
  const { address } = account;
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (address) {
          let userExist;
          userExist = await getEmployeeById(address); // Assuming this function fetches employee data
          if (!userExist.data) {
            userExist = await getEmployerById(address); // Assuming this function fetches employer data
          }

          if (userExist.data) {
            console.log("User Data:", userExist.data);
            setUserData(userExist.data);
          } else {
            console.log("User not found");
            setUserData(null);
          }
        } else {
          router.push("/");
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        setError(error.message || "An error occurred while fetching user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [address, router]);

  return { userData, isLoading, error };
};

export default useUserData;
