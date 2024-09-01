import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserData } from "./useUserData";
import { getUserByEmail, getContracts } from "../api/helper-functions";

export interface OldContract {
  business_name: string;
  contract_address?: string;
  contract_type?: string;
  created_at?: string;
  employee_id: string;
  employer_id?: string;
  id: string;
  job_description?: string;
  job_title?: string;
  payment?: string;
  payment_address?: string;
  payment_status?: string;
  status?: string;
  token_address?: string;
}

export interface Contract {
  name?: string;
  business_name: string;
  contract_address?: string;
  contract_type?: string;
  created_at?: string;
  updated_at?: string;
  doc?: string;
  type?: string;
  employee_id: string;
  employer_id?: string;
  id: string;
  job_description?: string;
  job_title?: string;
  amount?: string;
  payment_address?: string;
  payment_status?: string;
  status: string;
  token_address?: string;
  start_date: any;
  milestoneRates: string;
  milestoneTitle: string;
  end_date: any;
  employeeData: any;
}

const useContractData = () => {
  const { userData } = useUserData();
  const [contracts, setContracts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (userData) {
          const userType = userData?.data?.data?.userType;
          const userEmail = userData.data?.data?.email;

          const contractData: any = await getContracts(userType, userEmail);

          const updatedContractData = await Promise.all(
            contractData.contracts.data.map(async (contract: any) => {
              const employerData = await getUserByEmail(contract.employer_id);
              const employeeData = await getUserByEmail(contract.employee_id);

              return {
                ...contract,
                employerData: employerData.data,
                employeeData: employeeData.data,
              };
            })
          );

          setContracts(updatedContractData);
        } else {
          console.log("No contracts found");
          setContracts([]);
        }
      } catch (error: any) {
        console.error("Error fetching contracts:", error);
        setError(error.message || "An error occurred while fetching contracts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, [userData]);

  return { contracts, isLoading, error };
};

export default useContractData;
