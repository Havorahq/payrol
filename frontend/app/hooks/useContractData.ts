import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useAccount } from "wagmi";
import { getContractById, getUserContract } from "../api/helper-functions";

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
  payment?: string;
  payment_address?: string;
  payment_status?: string;
  status: string;
  token_address?: string;
}

const dummyContracts = [
  {
    id: "1",
    status: "Pending",
    name: "John Paul",
    business_name: "Havora",
    employee_id: "R1234",
    created_at: "23-03-2024",
    updated_at: "23-03-2024",
    doc: "DOC.PDF",
    contract_type: "Fixed Rate",
  },
  {
    id: "1",
    status: "Pending",
    name: "John Paul",
    business_name: "Havora",
    employee_id: "R1234",
    created_at: "23-03-2024",
    updated_at: "23-03-2024",
    doc: "DOC.PDF",
    contract_type: "Fixed Rate",
  },
  {
    id: "1",
    status: "Pending",
    name: "John Paul",
    business_name: "Havora",
    employee_id: "R1234",
    created_at: "23-03-2024",
    updated_at: "23-03-2024",
    doc: "DOC.PDF",
    contract_type: "Fixed Rate",
  },
  {
    id: "1",
    status: "Pending",
    name: "John Paul",
    business_name: "Havora",
    employee_id: "R1234",
    created_at: "23-03-2024",
    updated_at: "23-03-2024",
    doc: "DOC.PDF",
    contract_type: "Fixed Rate",
  },
];

const useContract = () => {
  // const account = useAccount();
  // const { address } = account;
  const [contracts, setContracts] = useState<Contract[]>(dummyContracts || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchContracts = async () => {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       if (address) {
  //         const contractData: any = await getUserContract(address); // Fetch employee contracts

  //         if (contractData) {
  //           console.log("Contracts:", contractData);
  //           setContracts(contractData);
  //         } else {
  //           console.log("No contracts found");
  //           setContracts([]);
  //         }
  //       } else {
  //         router.push("/");
  //       }
  //     } catch (error: any) {
  //       console.error("Error fetching contracts:", error);
  //       setError(error.message || "An error occurred while fetching contracts");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchContracts();
  // }, [address, router]);

  return { contracts, isLoading, error };
};

export default useContract;
