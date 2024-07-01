"use client";

import React, { ChangeEvent, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PayslipDocument from "./PayslipDocument";
import useContractData from "../hooks/useContractData";
import Wrapper from "../components/wrapper/Wrapper";
import { FaSearch } from "react-icons/fa";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Preloader from "../components/common/Preloader";
import { capitalizeFirst } from "@/plugins/utils";
import InputFilter from "../components/common/InputFilter";

interface ContractData {
  id: string;
  status: string;
  contract_type: string;
  business_name: string;
  employee_id: string;
  payment: string;
  contract_address: string;
  created_at?: string;
  employer_id?: string;
  job_description?: string;
  job_title?: string;
  payment_address?: string;
  payment_status?: string;
  token_address?: string;
}

const Payslip: React.FC = () => {
  const { contractData, isLoading, error } = useContractData();
  const [payslip, setPayslip] = useState<ContractData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Preloader height={80} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleGenerateSlip = (id: string) => {
    openModal();
    const contractSlip = contractData.find((contract) => id === contract.id);
    if (contractSlip) {
      setPayslip(contractSlip);
    }
  };

  return (
    <Wrapper>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="p-6 text-[#131414]">
          <h2 className="text-xl font-bold">
            {payslip?.business_name} Payslip 🧾
          </h2>
          <p className="text-sm text-gray-500 my-2">
            You have successfully generated your payslip
          </p>
          {payslip && (
            <PDFViewer width="100%" height="400">
              <PayslipDocument contractData={payslip} />
            </PDFViewer>
          )}
          <div className="flex gap-2 mt-4">
            <PDFDownloadLink
              document={
                <PayslipDocument contractData={payslip as ContractData} />
              }
              fileName={`${payslip?.business_name}-payslip.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <Button
                    label="Download Payslip"
                    onClick={() => console.log("Slip")}
                    primary
                  />
                )
              }
            </PDFDownloadLink>
            <Button
              label="Send to Email"
              onClick={closeModal}
              secondary
              style="w-fit"
              disabled
            />
          </div>
        </div>
      </Modal>
      <div className="bg-white rounded-md shadow-md p-4 mt-3 text-[#131414]">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-medium">Payslips</p>
          <InputFilter
            name="search"
            placeholder="Search"
            value={search}
            onChange={onChange}
          />

          {/* <div className="flex items-center border rounded-md px-2 py-1">
            <FaSearch color="#797979" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 outline-none"
            />
          </div> */}
        </div>
        <div className="overflow-x-auto mt-3">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-1">S/N</th>
                <th className="px-4 py-1">Name</th>
                <th className="px-4 py-1">Email</th>
                <th className="px-4 py-1">Amount</th>
                <th className="px-4 py-1">Type</th>
                <th className="px-4 py-1"></th>
              </tr>
            </thead>
            <tbody>
              {contractData.map((item, index) => {
                const {
                  id,
                  contract_type,
                  business_name,
                  employee_id,
                  payment,
                } = item;

                return (
                  <tr
                    key={id}
                    onClick={() => {
                      localStorage.setItem(
                        "currentContract",
                        JSON.stringify({
                          contract_type,
                          contract_address: item.contract_address,
                        })
                      );
                    }}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-1">{index + 1}</td>
                    <td className="px-4 py-1">{business_name}</td>
                    <td className="px-4 py-1">{employee_id}</td>
                    <td className="px-4 py-1">{payment}</td>
                    <td className="px-4 py-1 capitalize">
                      {capitalizeFirst(contract_type)}
                    </td>
                    <td className="px-4 py-1">
                      <Button
                        label="Generate Payslip"
                        key={item.id}
                        onClick={() => handleGenerateSlip(item.id)}
                        style="w-fit"
                        primary
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

export default Payslip;
