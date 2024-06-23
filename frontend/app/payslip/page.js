"use client";
import styles from "../dashboard/dashboard.module.scss";
import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";
import PayslipDocument from "./PayslipDocument";
import useContractData from "../hooks/useContractData";
import Wrapper from "@/app/components/wrapper/Wrapper";
import { FaPlus, FaSearch } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "../components/common/Button";
import Modal from "../components/common/modal/Modal";
const Payslip = () => {
  const { contractData, isLoading, error } = useContractData();
  const [payslip, setPayslip] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  if (!contractData) {
    return (
      <div style={{ width: "100px", margin: "auto", display: "block" }}>
        <ClipLoader color="#52bf" size={100} />
      </div>
    );
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleGenerateSlip = (id) => {
    openModal();
    console.log(id, "id", contractData);
    const contractSlip = contractData.find((contractId) => id == contractId.id);
    setPayslip(contractSlip);
  };

  return (
    <Wrapper>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="padded">
          <h2>All done!🎉</h2>
          <p>You have Successfully generated your Payslip </p>
          {payslip && (
            <PDFViewer width="100%" height="400">
              <PayslipDocument contractData={payslip} />
            </PDFViewer>
          )}
          <PDFDownloadLink
            document={<PayslipDocument contractData={payslip} />}
            fileName="payslip.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <Button label="Download Payslip" />
              )
            }
          </PDFDownloadLink>
          <Button label="Send to Email" onClick={() => closeModal()} />
        </div>
      </Modal>
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
                    <Button
                      label="Generate Payslip"
                      key={item.id}
                      onClick={() => handleGenerateSlip(item.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Payslip;
