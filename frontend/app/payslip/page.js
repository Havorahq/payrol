"use client";
import styles from "../dashboard/dashboard.module.scss";
import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";
import PayslipDocument from "./PayslipDocument";
import useContractData from "../hooks/useContractData";
import Wrapper from "@/app/components/wrapper/Wrapper";
import { FaPlus, FaSearch } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "../components/common/button/Button";
import Modal from "../components/common/modal/Modal";
import { capitalizeFirst } from "@/plugins/utils";
import Preloader from "../components/common/preloader/Preloader";
const Payslip = () => {
  const { contractData, isLoading, error } = useContractData();
  const [payslip, setPayslip] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  if (!contractData) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Preloader height={80} />
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
          <h2>{payslip?.business_name} Payslip 🧾</h2>
          <p className="text-medium greyText my-1">
            You have successfully generated your payslip{" "}
          </p>
          {payslip && (
            <PDFViewer width="100%" height="400">
              <PayslipDocument contractData={payslip} />
            </PDFViewer>
          )}
          <span className="x-axis gap-1">
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
            <Button
              label="Send to Email"
              secondary
              fit
              onClick={() => closeModal()}
              disabled
            />
          </span>
        </div>
      </Modal>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <p className={styles.tableTitle}>Payslips</p>
          <div className="inputGroup">
            <FaSearch color="#797979" />
            <input type="text" placeholder="Search" />
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
                    <td>{capitalizeFirst(contract_type)}</td>

                    <td>
                      <Button
                        label="Generate Payslip"
                        key={item.id}
                        onClick={() => handleGenerateSlip(item.id)}
                        fit
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
