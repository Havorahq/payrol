// hooks/useContractData.ts

import { useState, useEffect } from "react";

interface ContractData {
  id: string;
  status: string;
  contract_type: string;
  business_name: string;
  employee_id: string;
  payment: string;
  contract_address: string;
}

const mockContractData: ContractData[] = [
  {
    id: "1",
    status: "active",
    contract_type: "full-time",
    business_name: "Business One",
    employee_id: "employee@example.com",
    payment: "$1000",
    contract_address: "0x1234567890abcdef",
  },
  // Add more mock data as needed
];

const useContractData = () => {
  const [contractData, setContractData] = useState<ContractData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setContractData(mockContractData);
      setIsLoading(false);
    }, 1000); // Simulate a network request delay
  }, []);

  return { contractData, isLoading, error };
};

export default useContractData;
