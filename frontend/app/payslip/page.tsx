"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PayslipDocument from "./PayslipDocument";
import useContractData from "../hooks/useContractData";
import Wrapper from "../components/wrapper/Wrapper";
import { FaSearch } from "react-icons/fa";
import { Contract } from "../hooks/useContractData";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Preloader from "../components/common/Preloader";
import { capitalizeFirst, statusClass } from "@/plugins/utils";
import InputFilter from "../components/common/InputFilter";
import Image from "next/image";
import { SelectPicker } from "rsuite";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../components/common/Datepicker";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { findUser } from "../api/helper-functions";

const Payslip: React.FC = () => {
  const { contracts, isLoading, error } = useContractData();
  const [payslip, setPayslip] = useState<Contract | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [payment, setPayment] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const { user } = useDynamicContext();

  const userEmail = user!.email as string;
  const userData = findUser(userEmail);

  const [search, setSearch] = useState<string>("");

  const router = useRouter();

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
    return <div>Error: {"An error Occured"}</div>;
  }

  const openModal = () => setIsOpen(true);
  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closeModal = () => setIsOpen(false);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const handleGenerateSlip = (id: string) => {
    openModal();
    const contractSlip = contracts.find((contract) => id === contract.id);
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
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="p-6 text-[#131414]">
          <h2 className="text-xl font-bold">
            {payslip?.business_name}
            Payslip 🧾
          </h2>
          <p className="text-sm text-gray-500 my-2">
            You have successfully generated your payslip
          </p>
          {payslip && (
            <PDFViewer width="100%" height="400">
              {/* <PayslipDocument contracts={payslip} /> */}
            </PDFViewer>
          )}
          <div className="flex gap-2 mt-4">
            <PDFDownloadLink
              document={<PayslipDocument contractData={payslip as Contract} />}
              fileName={`${payslip?.name}-payslip.pdf`}
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
      <Modal isOpen={isPaymentModalOpen} onClose={closePaymentModal}>
        {!complete ? (
          <div>
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
                    payment && setComplete(true);
                  }}
                >
                  <p className="text-white text-sm">
                    {payment ? "Make Payment" : "Approve Payment"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <p className="text-3xl text-black font-semibold font-sharp-grotesk">
              All done!🎉
            </p>
            <p className="text-sm text-[#8F9299] font-dm-sans">
              You’ve successfully approved payment
            </p>
            <Button primary onClick={() => router.push("/dashboard")}>
              Back to Home
            </Button>
          </div>
        )}
      </Modal>
      <div className="bg-white rounded-md shadow-lg border lg:p-8 p-2 mt-8 text-[#131414]">
        <div className="flex lg:flex-row flex-wrap items-center lg:gap-8 gap-2 mb-8">
          <SelectPicker
            data={[]}
            placeholder="Status"
            style={{ width: 117, zIndex: 0 }}
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
            placeholder="Search"
            value={search}
            onChange={onChange}
          />
        </div>
        <div className="overflow-x-auto mt-3">
          <table className="min-w-full bg-white rounded-md">
            <thead className="mb-20 py-8">
              <tr className="text-[#878790] mb-20 pb-16 text-xs">
                <th className="pr-3 py-1">S/N</th>
                <th className="pr-3 py-1">Status</th>
                <th className="pr-3 py-1">Name</th>
                <th className="pr-3 py-1">Start Date</th>
                <th className="pr-3 py-1">End Date</th>
                <th className="pr-3 py-1">Type</th>
                <th className="pr-3 py-1">Payslip</th>
                <th className="pr-3 py-1"></th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((item, index) => {
                const {
                  id,
                  contract_type,
                  name,
                  employee_id,
                  payment,
                  created_at,
                  updated_at,
                  status,
                  doc,
                } = item;

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
                    style={{ marginBlock: "2em", paddingInline: "1em" }}
                  >
                    <td className="pr-1 py-3">{index + 1}</td>
                    <td className="pr-1 py-3 capitalize">
                      <span className={`${statusClass(status)}`}>
                        {capitalizeFirst(status)}
                      </span>
                    </td>
                    <td className="pr-1 py-3">{name}</td>
                    <td className="pr-1 py-3">{created_at}</td>
                    <td className="pr-1 py-3">{updated_at}</td>
                    {/* <td className="pr-1 py-3">{doc}</td> */}
                    <td className="pr-1 py-3">{contract_type}</td>
                    <td className="pr-1 py-3">
                      <span onClick={() => handleGenerateSlip(item.id)}>
                        <p className="text-[#5EAA22] font-medium">
                          View Payslip
                        </p>
                      </span>
                    </td>
                    <td>
                      <div
                        className="bg-black w-fit p-2 px-3 rounded-md"
                        onClick={() => handlePayment(item.id)}
                      >
                        <p className="text-white text-xs">Approve Payment</p>
                      </div>
                    </td>
                    {/* <td>
                      <Image
                        src="/icons/edit.png"
                        alt="edit icon"
                        height={30}
                        width={30}
                      />
                    </td>
                    <td>
                      <Image
                        src="/icons/delete.png"
                        alt="delete icon"
                        height={30}
                        width={30}
                        onClick={handleDelete}
                      />
                    </td>
                    <td>
                      <Image
                        src="/icons/options.png"
                        alt="options icon"
                        height={3}
                        width={4}
                      />
                    </td> */}
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
