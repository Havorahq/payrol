import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { getContractById, getUserContract } from "../api/helper-functions";

export interface Contract {
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

const useContract = () => {
  const account = useAccount();
  const { address } = account;
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchContracts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (address) {
          const contractData: any = await getUserContract(address); // Fetch employee contracts

          if (contractData) {
            console.log("Contracts:", contractData);
            setContracts(contractData);
          } else {
            console.log("No contracts found");
            setContracts([]);
          }
        } else {
          router.push("/");
        }
      } catch (error: any) {
        console.error("Error fetching contracts:", error);
        setError(error.message || "An error occurred while fetching contracts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, [address, router]);

  return { contracts, isLoading, error };
};

export default useContract;
