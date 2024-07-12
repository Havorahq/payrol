// pages/dashboard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Wrapper from "../components/wrapper/Wrapper";
import { FaPlus, FaSearch } from "react-icons/fa";
import { RiFileCheckLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { BiLeaf, BiDollarCircle } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { ChangeEvent, SetStateAction, useState } from "react";
import Preloader from "../components/common/Preloader";
import { capitalizeFirst, statusClass } from "@/plugins/utils";
import Button from "../components/common/Button";
import InputFilter from "../components/common/InputFilter";

interface Contract {
  id: number;
  status: string;
  contract_type: string;
  business_name: string;
  employee_id: string;
  payment: string;
  contract_address: string;
}

const mockUserData = {
  user_type: "admin",
};

const mockContractData: Contract[] = [
  {
    id: 1,
    status: "active",
    contract_type: "type1",
    business_name: "Business 1",
    employee_id: "Employee 1",
    payment: "1000",
    contract_address: "Address 1",
  },
  // Add more mock data here
];

export default function Home() {
  const userData = mockUserData; // Mock user data
  const contractData = mockContractData; // Mock contract data
  
  const [search, setSearch] = useState<string>("")
  const [activeFilter, setActiveFilter] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredData =
    contractData?.filter(
      (contract) => activeFilter === "" || contract.status === activeFilter
    ) || null;

  if (!userData) {
    return (
      <div className="w-full h-full">
        <div className="flex justify-center items-center h-full">
          <Preloader height={80} />
        </div>
      </div>
    );
  }

  const activeContract = contractData.filter(
    (contract) => contract.status === "active"
  ).length;

  const pendingContract = contractData.filter(
    (contract) => contract.status === "pending"
  ).length;

  const upcomingPayment = contractData.reduce(
    (sum, ad) => sum + parseInt(ad.payment),
    0
  );

  const handleViewClick = (id: number) => {
    console.log(`View contract with id: ${id}`);
  };

  const { user_type } = userData;
  return (
    <Wrapper>
      {/* New UI */}
      <div className="flex gap-4 text-[#23272E] w-full">
        <div className="w-8/12">
          <div className="flex w-full gap-4">
            <div className="border rounded-lg w-1/2 h-1/4 p-8">Country</div>
            <div className="border rounded-lg w-1/2 h-1/4 p-8">Employee</div>
          </div>
          <div className="mt-2 border rounded-lg p-8">
            Table
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          <div className="border rounded-lg p-8">
            summary
          </div>
           <div className="border rounded-lg p-8">
            previous payroll
          </div>
           <div className="border rounded-lg p-8">
            invoice
          </div>
        </div>
      </div>

      {/* Old UI */}
      {/* <div className="flex items-center justify-between p-4 bg-white mb-4 rounded-md text-gray-600 mt-3">
        <p className="text-lg font-medium">
          Total Contract: {contractData?.length}
        </p>
        <Link href="/create-contract">
          <Button onClick={() => console.log("Create contract")} primary>
            <FaPlus />
            <span>Contract</span>
          </Button>
        </Link>
      </div> */}

      {/* <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-md text-gray-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <p>Active Contract</p>
              <RiFileCheckLine />
            </div>
            <FaArrowRight />
          </div>
          <div className="text-xl font-semibold">{activeContract}</div>
        </div>
        <div className="p-4 bg-white rounded-md text-gray-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <p>Pending Contract</p>
              <BiLeaf />
            </div>
            <FaArrowRight />
          </div>
          <div className="text-xl font-semibold">{pendingContract}</div>
        </div>
        <div className="p-4 bg-white rounded-md text-gray-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <p>Payment</p>
              <BiDollarCircle />
            </div>
          </div>
          <div className="text-xl font-semibold">{upcomingPayment}</div>
        </div>
      </div> */}

      {/* <div className="mt-4 p-4 pb-16 bg-white rounded-md">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-medium text-[#131414]">All Contracts</p>
          <InputFilter name="search" placeholder="Search" value={search} onChange={onChange} />
        </div>

        <div className="flex gap-2 mb-4">
          <button
            className={`w-fit ${
              activeFilter === "" ? "filter-active" : "btn-secondary"
            }`}
            onClick={() => setActiveFilter("")}
          >
            All
          </button>
          <button
            className={`w-fit ${
              activeFilter === "active" ? "filter-active" : "btn-secondary"
            }`}
            onClick={() => setActiveFilter("active")}
          >
            Active
          </button>
          <button
            className={`w-fit ${
              activeFilter === "pending" ? "filter-active" : "btn-secondary"
            }`}
            onClick={() => setActiveFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`w-fit ${
              activeFilter === "cancelled" ? "filter-active" : "btn-secondary"
            }`}
            onClick={() => setActiveFilter("cancelled")}
          >
            Cancelled
          </button>
        </div>

        <div className="overflow-x-auto text-[#131414]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">S/N</th>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Type</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((item, index) => {
                const {
                  id,
                  status,
                  contract_type,
                  business_name,
                  employee_id,
                  payment,
                } = item;

                return (
                  <tr key={id} className="px-1 hover:bg-gray-50 cursor-pointer">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{business_name}</td>
                    <td className="py-2">{employee_id}</td>
                    <td className="py-2">{payment}</td>
                    <td className="py-2">{contract_type}</td>
                    <td className="py-2">
                      <span className={`status-badge ${statusClass(status)}`}>
                        {capitalizeFirst(status)}
                      </span>
                    </td>
                    <td className="py-2">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => handleViewClick(id)}
                      >
                        <FaRegEye />
                        <span>View</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredData?.length === 0 && (
            <div className="min-h-6">
              <div className="flex justify-center items-center my-2 p-4 h-full">
                <p className="text-gray-500 mt-2">No Result Found</p>
              </div>
            </div>
          )}
        </div>
      </div> */}
    </Wrapper>
  );
}
