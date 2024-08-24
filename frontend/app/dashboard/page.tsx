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
import { TiArrowRight } from "react-icons/ti";
import { useRouter } from "next/navigation";
import Modal from "../components/common/Modal";
import { BiMoneyWithdraw } from "react-icons/bi";

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

  const [search, setSearch] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="p-8 text-black">
          <p className="text-3xl text-black font-semibold font-sharp-grotesk">
            Withdrawal Funds
          </p>
          <div className="mt-8">
            <label htmlFor="token" className="mb-4">
              Select Chain
            </label>
            <select
              name="token"
              id="token"
              className="w-full border border-gray-300 p-4 rounded-md"
            >
              <option value=""></option>
            </select>
            <div className="w-1/2">
              <Button primary>Confirm Withdrwal</Button>
            </div>
          </div>
        </div>
      </Modal>
      <Wrapper>
        {/* EMPLOYER UI */}
        <div className="text-black font-bricolage grid place-items-center h-full pt-20">
          <div className="flex items-center gap-10">
            <div className="card-gradient-border border border-gray-400 p-10 rounded-lg flex flex-col items-start justify-start gap-6 text-sm font-normal">
              <Image
                src="/icons/clipboard-text.png"
                alt="Brand icon"
                width={58}
                height={58}
                style={{ marginLeft: -13 }}
              />
              <p className="font-medium text-2xl">Xalari Contracts</p>
              <p>
                Create and manage contracts <br />
                contacts effortlessly.
              </p>
              <div
                className="flex items-center gap-1 cursor-pointer hover:bg-slate-50"
                onClick={() => router.push("/create-contract")}
              >
                <p>Create Contract</p>
                <TiArrowRight />
              </div>
            </div>
            <div className="border p-10 rounded-lg flex flex-col items-start justify-start gap-6 text-sm font-normal shadow">
              <Image
                src="/icons/video-time.png"
                alt="Brand icon"
                width={58}
                height={58}
                style={{ marginLeft: -5 }}
              />
              <p className="font-medium text-2xl">Xalari Time</p>
              <p>
                Manage Time effectively and <br />
                track work done.
              </p>
              <div className="flex items-center gap-1">
                <p>Track Time</p>
                <TiArrowRight />
              </div>
            </div>
            <div className="border p-10 rounded-lg flex flex-col items-start justify-start gap-6 text-sm font-normal shadow">
              <Image
                src="/icons/block.png"
                alt="Brand icon"
                width={48}
                height={48}
                style={{ marginLeft: 0 }}
              />
              <p className="font-medium text-2xl">Xalari Block</p>
              <p>
                Settle employee and Contractors <br />
                globally with crypto.
              </p>
              <div
                className="flex items-center gap-1 cursor-pointer hover:bg-slate-50"
                onClick={() => router.push("/payslip")}
              >
                <p>Make Payment</p>
                <TiArrowRight />
              </div>
            </div>
          </div>

          <div className="border p-10 rounded-xl flex flex-col items-start justify-start gap-6 text-sm font-normal shadow mt-10 w-[63%]">
            <p className="font-medium text-2xl">Xalari Support</p>
            <p>For assistance, Contact support@xalari.com</p>
            <div className="flex items-center gap-1">
              <p>Contact Us</p>
              <TiArrowRight />
            </div>
          </div>
        </div>

        {/* Analytics UI */}
        {/* <div className="flex gap-4 text-[#23272E] w-full">
          <div className="w-8/12">
            <div className="flex w-full gap-4">
              <div className="border rounded-lg w-1/2 h-1/4 p-8">
                <div className="mb-8">
                  <p className="font-semibold text-lg">Team in by country</p>
                  <p className="font-bold text-3xl">100</p>
                </div>
                <div>
                  <div className="flex items-center gap-4 my-4">
                    <Image src="/icons/us.png" alt="contry flag" height={34} width={34} />
                    <div className="w-full">
                      <p className="font-semibold text-sm text-[#4B465C]">30</p>
                      <p className="font-normal text-xs text-[#8B909A]">United states</p>
                    </div>
                    <Image src="/icons/line.png" alt="Progress bar" height={6} width={168} />
                  </div>

                  <div className="flex items-center gap-4 my-4">
                    <Image src="/icons/brazil.png" alt="contry flag" height={34} width={34} />
                    <div className="w-full">
                      <p className="font-semibold text-sm text-[#4B465C]">26</p>
                      <p className="font-normal text-xs text-[#8B909A]">Brazil</p>
                    </div>
                    <Image src="/icons/line.png" alt="Progress bar" height={6} width={168} />
                  </div>

                  <div className="flex items-center gap-4 my-4">
                    <Image src="/icons/india.png" alt="contry flag" height={34} width={34} />
                    <div className="w-full">
                      <p className="font-semibold text-sm text-[#4B465C]">22</p>
                      <p className="font-normal text-xs text-[#8B909A]">India</p>
                    </div>
                    <Image src="/icons/line.png" alt="Progress bar" height={6} width={168} />
                  </div>
                </div>
              </div>
              <div className="border rounded-lg w-1/2 h-1/4 p-8">
                <div className="flex items-center gap-2 text-[#A3A3A3]">
                  <div className="border p-2 rounded-md">Onboarded</div>
                  <div>Off-boarded</div>
                </div>
              </div>
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
              Invoice
            </div>
          </div>
        </div> */}

        {/* EMPLOYEE UI */}
        {/* <div className="px-14">
          <div className="flex items-center justify-between p-4 bg-white mb-4 rounded-md text-gray-600 mt-3">
            <p className="text-xl font-bold">
              Total Contract: {contractData?.length}
            </p>
            <div>
              <Button onClick={() => openModal()} primary>
                <BiMoneyWithdraw />
                Withdraw Balance
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="p-8 bg-white rounded-lg text-gray-600 border shadow w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <p>Active Contract</p>
                  <RiFileCheckLine />
                </div>
                <FaArrowRight />
              </div>
              <div className="text-2xl mt-2 font-semibold">{activeContract}</div>
            </div>
            <div className="p-8 bg-white rounded-lg text-gray-600 border shadow w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <p>Pending Contract</p>
                  <BiLeaf />
                </div>
                <FaArrowRight />
              </div>
              <div className="text-2xl mt-2 font-semibold">{pendingContract}</div>
            </div>
            <div className="p-8 bg-white rounded-lg text-gray-600 border shadow w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <p>Payment</p>
                  <BiDollarCircle />
                </div>
              </div>
              <div className="text-2xl mt-2 font-semibold">{upcomingPayment}</div>
            </div>
          </div>
          <div className="mt-8 p-8 pb-32 bg-white rounded-lg border h-full shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xl font-medium text-[#131414]">
                All Contracts
              </p>
              <InputFilter
                name="search"
                placeholder="Search"
                value={search}
                onChange={onChange}
              />
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
                  activeFilter === "cancelled"
                    ? "filter-active"
                    : "btn-secondary"
                }`}
                onClick={() => setActiveFilter("cancelled")}
              >
                Cancelled
              </button>
            </div>

            <div className="overflow-x-auto text-[#131414]">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="text-[#878790] mb-20 text-sm">
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
                      <tr
                        key={id}
                        className=" hover:bg-gray-50 cursor-pointer text-[#3A3A49] font-medium text-base border border-1 p-3 px-2 my-4 rounded-lg"
                      >
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2">{business_name}</td>
                        <td className="py-2">{employee_id}</td>
                        <td className="py-2">{payment}</td>
                        <td className="py-2">{contract_type}</td>
                        <td className="py-2">
                          <span
                            className={`status-badge ${statusClass(status)}`}
                          >
                            {capitalizeFirst(status)}
                          </span>
                        </td>
                        <td className="py-2">
                          <div
                            className="flex items-center gap-1 cursor-pointer text-sm"
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
          </div>
        </div> */}
      </Wrapper>
    </>
  );
}
