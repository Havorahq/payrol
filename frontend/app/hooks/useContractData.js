import { useState, useEffect } from "react";
import { findAllEmployeeContract, findAllEmployerContract, findContract } from "../api/user";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import useUserData from "../hooks/useUserData";
// Assuming you have a function to fetch user data from the server

const useContractData = () => {
  const account = useAccount();
  const { address } = account;
  const [contractData, setContractData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const {userData, isLoading: userLoading, error:userErroer} = useUserData()

  const fetchEmployerContract = async ()=>{
    setIsLoading(true);
    setError(null);

    try {
      const contractExist = await findAllEmployerContract(userData.business_email);
      console.log(userData.business_email, 'business email')
      if (contractExist.data.status === 200) {
        console.log(contractExist, 'the contract exists')
        setContractData(contractExist.data.data);
      } else {
        console.log('contract does not exist')
        setContractData(null);
      }
    } catch (error) {
      console.error(error, 'contract loading error')
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchEmployeeContract = async ()=>{
    setIsLoading(true);
    setError(null);
    try {
      const contractExist = await findAllEmployeeContract(userData.email);
      if (contractExist.data.status === 200) {
        console.log(contractExist, 'the contract exists')
        setContractData(contractExist.data.data);
      } else {
        console.log('contract does not exist')
        setContractData(null);
      }
    } catch (error) {
      console.error(error, 'contract loading error')
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

    if (!userLoading && userData){
      if (userData.user_type === 'business'){
        fetchEmployerContract()
      } else{
        fetchEmployeeContract()
      }
    } else{
      console.log('user is still loading....')
    }
  }, [address, userLoading]);

  console.log({ contractData });

  return { contractData, isLoading, error };
};

export default useContractData;
