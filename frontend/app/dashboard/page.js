"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard.module.scss";
import Wrapper from "../components/wrapper/Wrapper";
import Button from "../components/common/Button";
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

export default function Home() {
  const { userData, isLoading: userLoading, error: userErroer } = useUserData();
  const { contractData, allContract, isLoading, error } = useContractData();
  const router = useRouter();

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!contractData) {
    return <div>Loading...</div>;
  }

  const activeContract = contractData.filter(
    (contract) => contract.status === "active"
  ).length;

  const pendingContract = contractData.filter(
    (contract) => contract.status === "pending"
  ).length;

  const upcomingPayment = () => {
    return contractData.reduce((sum, ad) => sum + parseInt(ad.payment), 0);
  };

  console.log({ allContract });

  const handleClick = (id) => {
    router.push(`/dashboard/${id}`);
  };

  const { user_type } = userData;
  return (
    <Wrapper>
      <div className={styles.dashboardHeader}>
        <p className="w-100">Total Contract</p>
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
          <p className={styles.tableTitle}>All Contract</p>
          <div className="inputGroup">
            <FaSearch color="#797979" />
            <input type="text" placeholder="Search names" />
          </div>
        </div>

        <div className="x-axis gap-2 my-2">
          <div className="btn-secondary">Active</div>
          <div className="btn-secondary">Pending</div>
          <div className="btn-secondary">Cancelled</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          {/* <tbody>
            <tr>
              <td>1</td>
              <td>George Reynolds</td>
              <td>Georgereynolds@gmail.com</td>
              <td>$1000</td>
              <td>Fixed</td>
              <td className="tabActive" style={{ padding: 0 }}>
                Active
              </td>
              <td>View</td>
            </tr>
            <tr>
              <td>2</td>
              <td>George Reynolds</td>
              <td>Georgereynolds@gmail.com</td>
              <td>$1000</td>
              <td>Fixed</td>
              <td className="tabActive" style={{ padding: 0 }}>
                Active
              </td>
              <td>View</td>
            </tr>
          </tbody> */}
          <tbody>
            {contractData.map((item, index) => {
              const {
                id,
                status,
                contract_type,
                business_name,
                employee_id,
                payment,
              } = item;

              return (
                <tr key={id} onClick={() => handleClick(id)}>
                  <td>{index + 1}</td>
                  <td>{business_name}</td>
                  <td>{employee_id}</td>
                  <td>{payment}</td>
                  <td>{contract_type}</td>
                  <td style={{ padding: 0 }}>{status}</td>
                  <td>
                    <Button label="View" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}
