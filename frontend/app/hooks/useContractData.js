import { useState, useEffect } from "react";
import { findContract } from "../api/user";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
// Assuming you have a function to fetch user data from the server

const useContractData = () => {
  const account = useAccount();
  const { address } = account;
  const [contractData, setContractData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (address) {
          const contractExist = await findContract(address, address);
          if (contractExist.data.status === 200) {
            setContractData(contractExist.data.data);
          } else {
            setContractData(null);
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

  console.log({ contractData });

  return { contractData, isLoading, error };
};

export default useContractData;