"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PayslipDocument from "./PayslipDocument";
import useContractData from "../hooks/useContractData";
import Wrapper from "../components/wrapper/Wrapper";
import { FaSearch } from "react-icons/fa";
import { Contract } from "../hooks/useContractData";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Preloader from "../components/common/Preloader";
import { capitalizeFirst, capitalizeFirstWord, formatDate, getInitials, statusClass } from "@/plugins/utils";
import InputFilter from "../components/common/InputFilter";
import Image from "next/image";
import { SelectPicker } from "rsuite";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../components/common/Datepicker";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { findUser } from "../api/helper-functions";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useUserData } from "../hooks/useUserData";

import { TOKEN_CONTRACT_ADDRESS } from "../../lib/contract/constants";
import TOKEN_ABI from "../../lib/contract/tokenabi.json";
import Agreement_ABI from "../../lib/contract/AgreementAbi.json";
import { useReadContract, useWriteContract } from "wagmi";
import { BigNumber } from "bignumber.js";
import { bscTestnet } from "viem/chains";
import agreementAbi from "@/lib/contract/AgreementAbi.json";
import { parseUnits } from 'viem'
import { readContract } from 'viem/actions';

export type UserData = {
  data: PostgrestSingleResponse<any> | null;
  error: string | null;
} | null;

const Payslip: React.FC = () => {
  const { contracts } = useContractData();
  const [payslip, setPayslip] = useState<Contract | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [payment, setPayment] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [contract, setContract] = useState<any>(null);
  const { primaryWallet } = useDynamicContext();

  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  const { userData, isLoading, error } = useUserData();

   const [allowance, setAllowance] = useState<any | null>(null);

 const getAllowance = async () => {
  try {
    const walletClient: any = await primaryWallet?.connector?.getWalletClient();
    // Use the readContract function from viem
    const result = await readContract(walletClient, {
      address: TOKEN_CONTRACT_ADDRESS,
      abi: TOKEN_ABI,
      functionName: "allowance",
      args: [primaryWallet?.address, '0xb1C68a7C1eE2c7D64aE9eA0edc775AdA61DBa9Ee'],
    });

    setAllowance(Number(result).toString());
    return result;
  } catch (error) {
    console.error("Error getting allowance:", error);
    return null;
  }
};

console.log(allowance, 'the allowance')

const grantApproval = async (spenderAddress: string, amount: string) => {
  try {
    const walletClient: any = await primaryWallet?.connector?.getWalletClient();
    const result = await walletClient.writeContract({
      address: TOKEN_CONTRACT_ADDRESS,
      abi: TOKEN_ABI,
      functionName: "approve",
      args: [spenderAddress, amount],
            chain: bscTestnet || walletClient.chain,
    });

    console.log("Approval granted:", result);
    return result;
  } catch (error) {
    console.error("Error granting approval:", error);
    throw error;
  }
};

  const collectTokens = async (amount: string) => {
    console.log(contracts?.hash)
    const walletClient: any = await primaryWallet?.connector?.getWalletClient();
      const amountInWei = parseUnits(amount.toString(), 18)
    // Use the walletClient to write data to the smart contract
    const { hash, loading, error } = await walletClient.writeContract({
      address: '0xc96288280764Ac7385797a5149901572Ae98a0A3',
      abi: agreementAbi,
      functionName: "collectTokens",
      args: [TOKEN_CONTRACT_ADDRESS, amount],
      chain: bscTestnet || walletClient.chain,
    });

    return hash;
  };

   useEffect(() => {
     getAllowance();
   }, [primaryWallet, contracts]);

   const needAllowance = allowance > 2

 

  if (!userData) {
    return (
      <Wrapper>
        <div className="w-full h-full flex items-center justify-center mt-4">
          <Preloader height={80} />
        </div>
      </Wrapper>
    );
  }

  if (error) {
    return <div>Error: {userData.error}</div>;
  }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center mt-4">
        <Preloader height={80} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full justify-center items-center font-bricolage font-bold text-2xl">
        Error: {"An error Occured"}
      </div>
    );
  }

  const openModal = () => setIsOpen(true);
  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closeModal = () => setIsOpen(false);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const handleGenerateSlip = (id: string) => {
    openModal();
    const contractSlip = contracts.find(
      (contract: { id: string }) => id === contract.id
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

  const handleApprovePayment = async () => {
    grantApproval('0xc96288280764Ac7385797a5149901572Ae98a0A3', "100000000000000000000");
    console.log("Approve Payment");
  };

  const handleMakePayment = async () => {
    collectTokens("10000000000000000");
    console.log("Make Payment");
  };

  console.log("Contracts: ", contracts, contract);

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
                <p className="text-base text-[#3981F7]">
                  {formatDate(contract?.created_at, "date")}
                </p>
              </div>
              <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-1">
                  <p className="text-[#0A112F] text-2xl font-medium font-bricolage">
                    ${contract?.amount}
                    {/* <span className="text-[#9096A2] text-base">.50</span> */}
                  </p>
                </div>
                <span
                  className={`${statusClass(
                    contract?.status
                  )} p-2 px-4 bg-[#FEEDDA] rounded-xl`}
                >
                  <p className="text-sm">{capitalizeFirst(contract?.status)}</p>
                </span>
              </div>
            </div>
            <div className="p-4 mx-2 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <p className="text-brandgray font-bricolage">Contractor</p>
                <p className="text-brandgray font-bricolage">Preview Invoice</p>
              </div>
              <div className="w-full flex items-center justify-evenly">
                {/* <Image
                  src="/icons/Avatar.png"
                  alt="Avatar"
                  height={48}
                  width={48}
                /> */}
                <div
                  className="bg-primary rounded-full p-2"
                  // style={{ borderRadius: "50%"}}
                >
                  <p className="text-white font-extrabold text-2xl font-bricolage">
                    {getInitials(
                      `${contract?.employeeData?.firstName} ${contract?.employeeData?.lastName}`
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-base text-[#0A112F] ">{`${capitalizeFirst(
                    contract?.employeeData?.firstName
                  )} ${capitalizeFirst(contract?.employeeData?.lastName)}`}</p>
                  <p className="text-sm text-brandgray">{`${contract?.job_title}`}</p>
                </div>
                <div
                  className={`${
                    payment ? "bg-[#4A851C]" : "bg-black"
                  } w-fit p-2 px-3 rounded-lg cursor-pointer`}
                  onClick={() => {
                    // needAllowance ? handleApprovePayment() : handleMakePayment()
                    handleMakePayment();
                    // handleApprovePayment()
                    // setPayment(!payment);
                    // payment && setComplete(true);
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
              Congratulations!🎉
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
                <th className="pr-3 py-1">Job Title</th>
                <th className="pr-3 py-1">Start Date</th>
                <th className="pr-3 py-1">End Date</th>
                <th className="pr-3 py-1">Type</th>
                <th className="pr-3 py-1">Payslip</th>
                <th className="pr-3 py-1"></th>
              </tr>
            </thead>
            <tbody>
              {contracts.map(
                (
                  item: {
                    employeeData: any;
                    id: any;
                    contract_type?: any;
                    name?: any;
                    employee_id?: any;
                    job_title?: any;
                    payment?: any;
                    created_at?: any;
                    end_date?: any;
                    status?: any;
                    doc?: any;
                  },
                  index: number
                ) => {
                  const {
                    id,
                    contract_type,
                    job_title,
                    employee_id,
                    payment,
                    created_at,
                    end_date,
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
                      <td className="pr-1 py-3">{`${item?.employeeData?.firstName} ${item?.employeeData?.lastName}`}</td>
                      <td className="pr-1 py-3">
                        {capitalizeFirstWord(job_title)}
                      </td>
                      <td className="pr-1 py-3">{formatDate(created_at)}</td>
                      <td className="pr-1 py-3">{formatDate(end_date)}</td>
                      {/* <td className="pr-1 py-3">{doc}</td> */}
                      <td className="pr-1 py-3">
                        {capitalizeFirst(contract_type)}
                      </td>
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
                          onClick={() => {
                            handlePayment(item.id);
                            setContract(item);
                          }}
                        >
                          <p className="text-white text-xs">Approve Payment</p>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
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

export default Payslip;
