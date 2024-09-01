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
import {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Preloader from "../components/common/Preloader";
import { capitalizeFirst, statusClass } from "@/plugins/utils";
import Button from "../components/common/Button";
import InputFilter from "../components/common/InputFilter";
import { TiArrowRight } from "react-icons/ti";
import { useRouter } from "next/navigation";
import Modal from "../components/common/Modal";
import { BiMoneyWithdraw } from "react-icons/bi";
import { findUser } from "../api/helper-functions";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { UserData } from "../payslip/page";
import useContractData from "../hooks/useContractData";
import { chains } from "@/lib/network";
import { useBalance } from "wagmi";
import Swal from "sweetalert2";

interface Contract {
  id: number;
  status: string;
  contract_type: string;
  business_name: string;
  employee_id: string;
  payment: string;
  contract_address: string;
}

const mockContractData: Contract[] = [];

export default function Home() {
  // const [accountType, setAccountType] = useState<string>("");
  const { contracts: contractData, isLoading, error } = useContractData();

  const [search, setSearch] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const balance = useBalance({
    address: "0x4557B18E779944BFE9d78A672452331C186a9f48",
  });
  const { user } = useDynamicContext();
  const [userData, setUserData] = useState<UserData>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        const result = await findUser(user?.email);
        setUserData(result);
      }
    };

    fetchUserData();
  }, [user]);

  const accountType = userData?.data?.data?.userType;

  // if (!user) {
  //   return <div>Please log in to view your profile.</div>;
  // }

  if (!userData?.data) {
    return (
      <Wrapper>
        <div className="w-full h-full flex items-center justify-center mt-4">
          <Preloader height={80} />
        </div>
      </Wrapper>
    );
  }

  if (userData?.error) {
    return <div>Error: {userData.error}</div>;
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredData =
    contractData?.filter(
      (contract: { status: string }) =>
        activeFilter === "" || contract.status === activeFilter
    ) || null;

  const activeContract = contractData.filter(
    (contract: { status: string }) => contract.status === "Active"
  ).length;

  const pendingContract = contractData.filter(
    (contract: { status: string }) => contract.status === "Pending"
  ).length;

  const upcomingPayment = contractData.reduce(
    (sum: number, ad: { amount: string }) => sum + parseInt(ad.amount),
    0
  );
  console.log({ contractData });

  const handleViewClick = (id: number) => {
    console.log(`View contract with id: ${id}`);
  };

  if (!userData) {
    return (
      <div className="w-full h-full">
        <div className="flex justify-center items-center h-full">
          <Preloader height={80} />
        </div>
      </div>
    );
  }

  const comingSoon = () => {
    return Swal.fire({
      icon: "info",
      title: "Coming soon!",
      text: `This feature is currently not available.`,
    });
  };

  return (
    <>
      <Wrapper>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className="p-8 text-black">
            <p className="text-3xl text-black font-semibold font-sharp-grotesk">
              Withdrawal Funds
            </p>
            <div className="mt-8">
              <label htmlFor="chain" className="mb-4">
                Select Chain
              </label>
              <select
                name="chain"
                id="chain"
                className="w-full border border-gray-300 p-4 rounded-md mb-6"
              >
                <option value="">Select a chain</option>
                {chains.map((chain) => (
                  <option
                    key={chain.chainId}
                    value={chain.chainId}
                    data-image={chain.picture}
                  >
                    {chain.name}
                  </option>
                ))}
              </select>
              <div className="w-fit">
                <Button primary>Confirm Withdrawal</Button>
              </div>
            </div>
          </div>
        </Modal>
        <div>
          {accountType === "employee" ? (
            <div className="px-14">
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
                  <div className="text-2xl mt-2 font-semibold">
                    {activeContract}
                  </div>
                </div>
                <div className="p-8 bg-white rounded-lg text-gray-600 border shadow w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <p>Pending Contract</p>
                      <BiLeaf />
                    </div>
                    <FaArrowRight />
                  </div>
                  <div className="text-2xl mt-2 font-semibold">
                    {pendingContract}
                  </div>
                </div>
                <div className="p-8 bg-white rounded-lg text-gray-600 border shadow w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <p>Pending Payment</p>
                      <BiDollarCircle />
                    </div>
                  </div>
                  <div className="text-2xl mt-2 font-semibold flex items-center">
                    <p className="text-xl text-gray-400">$</p>
                    <p className="m-0">{upcomingPayment}</p>
                  </div>
                </div>
                <div className="p-8 bg-white rounded-lg text-gray-600 border shadow w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <p>Current Balance</p>
                      <BiDollarCircle />
                    </div>
                  </div>
                  <div className="text-2xl mt-2 font-semibold flex items-center">
                    <p className="text-xl text-gray-400">$</p>
                    <p className="m-0">{balance.data?.decimals || 0}</p>
                  </div>
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
                      activeFilter === "active"
                        ? "filter-active"
                        : "btn-secondary"
                    }`}
                    onClick={() => setActiveFilter("active")}
                  >
                    Active
                  </button>
                  <button
                    className={`w-fit ${
                      activeFilter === "pending"
                        ? "filter-active"
                        : "btn-secondary"
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
                        <th className="py-2">Employer</th>
                        <th className="py-2">Job Title</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Type</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData?.map(
                        (
                          item: {
                            id: any;
                            status: any;
                            contract_type: any;
                            employeeData: any;
                            employerData: any;
                            employee_id: any;
                            employer_id: any;
                            amount: any;
                            job_title: any;
                          },
                          index: number
                        ) => {
                          const {
                            id,
                            status,
                            employeeData,
                            employerData,
                            job_title,
                            employer_id,
                            contract_type,
                            amount,
                            employee_id,
                          } = item;

                          const employerName =
                            `${employerData?.firstName} ${employerData?.lastName}` ||
                            employer_id;
                          return (
                            <tr
                              key={id}
                              className=" hover:bg-gray-50 cursor-pointer text-[#3A3A49] font-medium text-base border border-1 p-3 px-2 my-4 rounded-lg"
                            >
                              <td className="py-2">{index + 1}</td>
                              <td className="py-2">{employerName}</td>
                              <td className="py-2">{job_title}</td>
                              <td className="py-2">${amount}</td>
                              <td className="py-2">
                                {capitalizeFirst(contract_type)}
                              </td>
                              <td className="py-2">
                                <span
                                  className={`status-badge ${statusClass(
                                    status
                                  )}`}
                                >
                                  {capitalizeFirst(
                                    status?.toLowerCase() === "active"
                                      ? "Completed"
                                      : status
                                  )}
                                </span>
                              </td>
                              <td className="py-2">
                                <Link
                                  className="flex items-center gap-1 cursor-pointer text-sm"
                                  // onClick={() => handleViewClick(id)}
                                  href={`/dashboard/${id}`}
                                >
                                  <FaRegEye />
                                  <span className="no-underline hover:no-underline">
                                    View
                                  </span>
                                </Link>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                  {filteredData?.length === 0 && (
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
            </div>
          ) : null}
          {accountType === "business" ? (
            <div className="">
              <div className="text-black relative bg-red font-bricolage h-full pt-20 flex flex-col items-center justify-center">
                <div className="">
                  <div className="flex lg:flex-row flex-col items-center gap-10">
                    <div className="border p-10 rounded-lg bg-white flex flex-col items-start justify-start gap-6 text-sm font-normal shadow w-[300px]">
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
                      <button
                        className="flex items-center gap-1 cursor-pointer rounded btn-secondary text-white font-bold w-fit"
                        onClick={() => router.push("/create-contract")}
                      >
                        <p>Create Contract</p>
                        <TiArrowRight />
                      </button>
                    </div>
                    <div className="border p-10 rounded-lg bg-white flex flex-col items-start justify-start gap-6 text-sm font-normal shadow w-[300px]">
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
                      <button
                        className="flex items-center gap-1 cursor-pointer rounded btn-secondary text-white font-bold w-fit"
                        onClick={comingSoon}
                      >
                        <p>Track Time</p>
                        <TiArrowRight />
                      </button>
                    </div>
                    <div className="border p-10 rounded-lg bg-white flex flex-col items-start justify-start gap-6 text-sm font-normal shadow w-[300px]">
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
                      <button
                        className="flex items-center gap-1 cursor-pointer rounded btn-secondary text-white font-bold w-fit"
                        onClick={() => router.push("/payslip")}
                      >
                        <p>Make Payment</p>
                        <TiArrowRight />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border p-10 rounded-xl flex flex-col items-start justify-start gap-6 text-sm font-normal shadow mt-10 lg:w-fit w-[300px]">
                    <p className="font-medium text-2xl">Xalari Support</p>
                    <p>Enjoy our 24/7 support by our dedicated team.</p>
                    <button
                      className="flex items-center gap-1 cursor-pointer rounded btn-secondary text-white font-bold w-fit"
                      onClick={comingSoon}
                    >
                      <p>Contact Us</p>
                      <TiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Wrapper>
    </>
  );
}
