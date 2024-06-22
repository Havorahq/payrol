"use client";
import styles from "../dashboard/dashboard.module.scss";
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PayslipDocument from "./PayslipDocument";
import useContractData from "../hooks/useContractData";
import Wrapper from "@/app/components/wrapper/Wrapper";
import { FaPlus, FaSearch } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "../components/common/Button";
const Payslip = () => {
  const { contractData, isLoading, error } = useContractData();

  if (!contractData) {
    return (
      <div style={{ width: "100px", margin: "auto", display: "block" }}>
        <ClipLoader color="#52bf" size={100} />
      </div>
    );
  }

  console.log({ contractData });
  return (
    <Wrapper>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <p className={styles.tableTitle}>Payslips</p>
          <div className="inputGroup">
            <FaSearch color="#797979" />
            <input type="text" placeholder="Search contract" />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Type</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {contractData.map((item, index) => {
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
                  <td>{contract_type}</td>

                  <td>
                    <Button label="Generate Payslip" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div>
        {contractData && (
          <PDFDownloadLink
            document={<PayslipDocument contractData={contractData} />}
            fileName="payslip.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Payslip"
            }
          </PDFDownloadLink>
        )}
      </div> */}
    </Wrapper>
  );
};

export default Payslip;
