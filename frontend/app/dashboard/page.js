"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard.module.scss";
import Wrapper from "../components/wrapper/Wrapper";
import Button from "../components/common/button/Button";
import { FaPlus, FaSearch } from "react-icons/fa";
import { RiFileCheckLine } from "react-icons/ri";
import { LuArrowRight } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";
import { BiLeaf, BiDollarCircle } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { supabase } from "../../lib/supabaseClient";
import { useState, useEffect } from "react";
import useContractData from "../hooks/useContractData";
import useUserData from "../hooks/useUserData";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import Skeleton from "../components/common/skeleton/Skeleton";
import { capitalizeFirst, statusClass } from "@/plugins/utils";
import { FaRegEye } from "react-icons/fa";
import Preloader from "../components/common/preloader/Preloader";

export default function Home() {
  const { userData, isLoading: userLoading, error: userErroer } = useUserData();
  const { contractData, allContract, isLoading, error } = useContractData();
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState("")

  const filteredData = contractData?.filter(
    (contract, index) => activeFilter === "" || contract.status === activeFilter
  ) || null

  if (!userData) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Preloader height={80} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!contractData) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Preloader height={80} />
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

  const handleViewClick = (id) => {
    router.push(`/dashboard/${id}`);
  };

  const { user_type } = userData;
  return (
    <Wrapper>
      <div className={styles.dashboardHeader}>
        <p className="w-100">Total Contract: {contractData?.length}</p>
        <Link href="/create-contract">
          <div className={`${styles.addButton} x-axis gap-1`}>
            <FaPlus />
            <div className="w-100">Contract</div>
          </div>
        </Link>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className="x-axis gap-1">
              <p>Active Contract</p>
              <RiFileCheckLine />
            </div>
            <FaArrowRight />
          </div>
          <div className={styles.cardBody}>{activeContract}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className="x-axis gap-1">
              <p>Pending Contract</p>
              <BiLeaf />
            </div>
            <FaArrowRight />
          </div>
          <div className={styles.cardBody}>{pendingContract}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className="x-axis gap-1">
              <p> Payment</p>
              <BiDollarCircle />
            </div>
          </div>
          <div className={styles.cardBody}>{upcomingPayment}</div>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <p className={styles.tableTitle}>All Contracts</p>
          <div className="inputGroup">
            <FaSearch color="#797979" />
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="x-axis gap-2 my-2">
          <div
            className={activeFilter === "" ? "filter-active" : "btn-secondary"}
            onClick={() => setActiveFilter("")}
          >
            All
          </div>
          <div
            className={
              activeFilter === "active" ? "filter-active" : "btn-secondary"
            }
            onClick={() => setActiveFilter("active")}
          >
            Active
          </div>
          <div
            className={
              activeFilter === "pending" ? "filter-active" : "btn-secondary"
            }
            onClick={() => setActiveFilter("pending")}
          >
            Pending
          </div>
          <div
            className={
              activeFilter === "cancelled" ? "filter-active" : "btn-secondary"
            }
            onClick={() => setActiveFilter("cancelled")}
          >
            Cancelled
          </div>
        </div>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => {
                const {
                  id,
                  status,
                  contract_type,
                  business_name,
                  employee_id,
                  payment,
                  contract_address,
                } = item;

                return (
                  <tr
                    key={id}
                    onClick={() => {
                      handleViewClick(id);
                      localStorage.setItem(
                        "currentContract",
                        JSON.stringify({ contract_type, contract_address })
                      );
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{business_name}</td>
                    <td>{employee_id}</td>
                    <td>{payment}</td>
                    <td>{capitalizeFirst(contract_type)}</td>
                    <td style={{ padding: 0 }}>
                      <span className={`${statusClass(status)}`}>
                        {capitalizeFirst(status)}
                      </span>
                    </td>
                    <td>
                      <span className="x-axis cursor">
                        <FaRegEye className="mr-half" size={18} />
                        View
                      </span>
                      {/* <Button label="View" /> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredData?.length === 0 && <div className="center-vertical my-1 padded"><p className="greyText">No Result Found</p></div>}
        </div>
      </div>
    </Wrapper>
  );
}
