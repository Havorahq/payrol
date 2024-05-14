import { useState, useEffect } from "react";
import {
  findAllEmployeeContract,
  findAllEmployerContract,
  findContract,
  fetchAllContract,
  findContractById,
} from "../api/user";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import useUserData from "../hooks/useUserData";
// Assuming you have a function to fetch user data from the server

const useContractData = (id) => {
  const account = useAccount();
  const { address } = account;
  const [contractData, setContractData] = useState(null);
  const [allContract, setAllContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { userData, isLoading: userLoading, error: userErroer } = useUserData();
  const [specificContract, setSpecificContract] = useState(null)

  const fetchEmployerContract = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const contractExist = await findAllEmployerContract(
        userData.business_email
      );
      if (contractExist.data.status === 200) {
        setContractData(contractExist.data.data);
      } else {
        setContractData(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployeeContract = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const contractExist = await findAllEmployeeContract(userData.email);
      if (contractExist.data.status === 200) {
        setContractData(contractExist.data.data);
      } else {
        setContractData(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllContracts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const contractExist = await fetchAllContract();
      if (contractExist.data.status === 200) {
        setAllContract(contractExist.data.data);
      } else {
        setContractData(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSpecificContract = async (id)=>{
    setIsLoading(true);
    setError(null);
    try {
      const contractExist = await findContractById(id);
      if (contractExist.data.status === 200) {
        setSpecificContract(contractExist.data.data);
      } else {
        setSpecificContract(null);
      }
    } catch (error) {
      console.error(error, "contract loading error");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
    };

    if (!userLoading && userData) {
      if (userData.user_type === "business") {
        fetchEmployerContract();
      } else {
        fetchEmployeeContract();
      }
    }

    if (!id){
      fetchAllContract()
    }

    if (id){
      console.log(id, 'id from hook')
      fetchSpecificContract(id)
    }
  }, [address, userLoading, userData]);

  return { contractData, allContract, isLoading, error, specificContract };
};

export default useContractData;
