import { useState, useEffect } from "react";
import { findUser } from "../api/user";
import { useAccount, useDisconnect } from "wagmi";
// Assuming you have a function to fetch user data from the server

const useUserData = () => {
  const account = useAccount();
  const { address } = account;
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (address) {
          const userExist = await findUser(address);
          if (userExist.data.status === 200) {
            console.log({ userExist });
            setUserData(userExist.data.data);
          } else {
            setUserData(null);
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [address]);

  return { userData, isLoading, error };
};

export default useUserData;
