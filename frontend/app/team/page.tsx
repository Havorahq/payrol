"use client";

import React, { ChangeEvent, useState } from "react";

import useContractData from "../hooks/useContractData";

import Wrapper from "../components/wrapper/Wrapper";

import { Contract } from "../hooks/useContractData";

import Modal from "../components/common/Modal";

import Preloader from "../components/common/Preloader";
import { capitalizeFirst, statusClass } from "@/plugins/utils";
import InputFilter from "../components/common/InputFilter";
import Image from "next/image";
import { SelectPicker } from "rsuite";
import DatePicker from "react-datepicker";

import Swal from "sweetalert2";

const Team: React.FC = (): React.ReactElement => {
  const { contracts, isLoading, error } = useContractData();

  const [payslip, setPayslip] = useState<Contract | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [payment, setPayment] = useState<boolean>(false);
  const [QR, setQR] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  console.log({ contracts }, "with users");
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Preloader height={80} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {"An error Occured"}</div>;
  }

  const openModal = () => setIsOpen(true);
  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closeModal = () => setIsOpen(false);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const handleGenerateSlip = (id: string) => {
    openModal();
    const contractSlip = contracts.data.find(
      (contract: any) => id === contract.id
    );
    if (contractSlip) {
      setPayslip(contractSlip);
    }
  };

  const handlePayment = (id: string) => {
    openPaymentModal();
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this contract",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Contract deleted");
      }
    });
  };

  return (
    <Wrapper>
      <Modal isOpen={isPaymentModalOpen} onClose={closePaymentModal}>
        <div className="mt-16 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Image
                src="/icons/invoice.png"
                alt="Invoice icon"
                height={24}
                width={24}
              />
              <p className="text-brandgray font-bricolage">Invoice</p>
            </div>
            <p className="text-base text-[#3981F7]">July 1, 2024</p>
          </div>
          <div className="flex items-center justify-between my-2">
            <div className="flex items-center gap-1">
              <p className="text-[#0A112F] text-2xl font-medium font-bricolage">
                $2,670<span className="text-[#9096A2] text-base">.50</span>
              </p>
            </div>
            <span className="p-2 px-4 bg-[#FEEDDA] rounded-xl">
              <p className="text-sm text-[#FAA745]">PENDING</p>
            </span>
          </div>
        </div>
        {!QR ? (
          <div className="p-4 mx-2 rounded-xl border">
            <div className="flex items-center justify-between mb-4">
              <p className="text-brandgray font-bricolage">Contractor</p>
              <p className="text-brandgray font-bricolage">Preview Invoice</p>
            </div>
            <div className="w-full flex items-center justify-evenly">
              <Image
                src="/icons/Avatar.png"
                alt="Avatar"
                height={48}
                width={48}
              />
              <div>
                <p className="text-base text-[#0A112F] ">Angela Nagelsman</p>
                <p className="text-sm text-brandgray">Product Designer</p>
              </div>
              <div
                className={`${
                  payment ? "bg-[#4A851C]" : "bg-black"
                } w-fit p-2 px-3 rounded-lg cursor-pointer`}
                onClick={() => {
                  setPayment(!payment);
                  payment && setQR(true);
                }}
              >
                <p className="text-white text-sm">
                  {payment ? "Make Payment" : "Approve Payment"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 mx-2 rounded-xl border">
            <div className="flex items-center justify-between mb-4">
              <p className="text-brandgray font-bricolage">Scan to Pay</p>
              {/* <p className="text-brandgray font-bricolage">Preview Invoice</p> */}
            </div>
            <Image src="/icons/Qr.png" alt="qr code" width={390} height={390} />
          </div>
        )}
      </Modal>
      <div className="bg-white rounded-md shadow-lg border lg:p-8 p-2 mt-8 text-[#131414]">
        <div className="flex lg:flex-row flex-wrap items-center lg:gap-8 gap-2 mb-8">
          <SelectPicker
            data={[]}
            placeholder="Status"
            style={{ width: 117, zIndex: 4 }}
          />
          <div className="flex items-center mb-0 pb-0 gap-2">
            <DatePicker
              // value={state?.startDate || null}
              // onChange={onFromDateChange}
              placeholderText="Start Date"
              className="w-full border border-gray-300 rounded h-9"
            />
            <Image
              src="/icons/arrowRight.png"
              alt="arrowRight"
              width={17}
              height={6}
            />
            <DatePicker
              // value={state?.startDate || null}
              // onChange={onFromDateChange}
              placeholderText="End Date"
              className="w-full border border-gray-300 rounded h-9"
            />
          </div>
          <InputFilter
            name="search"
            placeholder="Search team"
            value={search}
            onChange={onChange}
          />
        </div>
        <div className="overflow-x-auto mt-3">
          <table className="min-w-full bg-white">
            <thead className="mb-20 py-8">
              <tr className="text-[#878790] mb-20 pb-16 text-xs">
                <th className="pr-3 py-1">S/N</th>
                <th className="pr-3 py-1">Name</th>
                <th className="pr-3 py-1">Job title</th>
                <th className="pr-3 py-1">Amount</th>
                <th className="pr-3 py-1">Type</th>
                <th className="pr-3 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {contracts?.map((item: any, index: number) => {
                const {
                  id,
                  contract_type,
                  name,

                  employerData,
                  employeeData,

                  employee_id,
                  employer_id,
                  amount,
                  job_description,
                  job_title,
                  created_at,
                  updated_at,
                  status,
                  doc,
                  payment_status,
                  start_date,
                  milestoneRates,
                  milestoneTitle,
                  end_date,
                } = item;

                const employeeName = employeeData?.firstname || employee_id;

                return (
                  <tr
                    key={id}
                    // onClick={() => {
                    //   localStorage.setItem(
                    //     "currentContract",
                    //     JSON.stringify({
                    //       contract_type,
                    //       contract_address: item.contract_address,
                    //     })
                    //   );
                    // }}
                    className="hover:bg-gray-50 cursor-pointer text-[#3A3A49] font-medium text-sm border border-1 border-gray-100 p-3 px-2 my-4 rounded-lg"
                    // style={{ marginBlock: "2em", paddingInline: "1em" }}
                  >
                    <td className="pr-1 py-3">{index + 1}</td>
                    <td className="pr-1 py-3">{employeeName}</td>
                    <td className="pr-1 py-3">{job_title}</td>
                    <td className="pr-1 py-3">{amount}</td>
                    <td className="pr-1 py-3">{contract_type}</td>
                    <td className="pr-1 py-3 capitalize">
                      <span className={`${statusClass(status)}`}>
                        {capitalizeFirst(status)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {contracts.length === 0 && (
            <div className="min-h-6">
              <div className="flex justify-center items-center my-2 p-4 h-full">
                <p className="text-gray-400 text-lg mt-4 font-bold">
                  No Result Found
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Team;
