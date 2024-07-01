import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  companyName: {
    fontSize: 30,
    marginBottom: 5,
  },
  companyAddress: {
    fontSize: 14,
  },
  heading: {
    fontSize: 22,
    marginBottom: 5,
    textAlign: "center",
  },
  employeeInfo: {
    marginBottom: 10,
  },
  employeeName: {
    fontSize: 14,
    fontWeight: 700,
  },
  details: {
    fontSize: 16,
  },
  netPayLabel: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 20,
  },
  netPay: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 2,
  },
  rupeeSm: {
    fontSize: 10,
  },
  mb5: {
    marginBottom: 5,
  },
});

interface ContractData {
  business_name: string;
  contract_address?: string;
  contract_type?: string;
  created_at?: string;
  employee_id: string;
  employer_id?: string;
  id: string;
  job_description?: string;
  job_title?: string;
  payment?: string;
  payment_address?: string;
  payment_status?: string;
  status?: string;
  token_address?: string;
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};


interface PayslipDocumentProps {
  contractData: ContractData;
}

const PayslipDocument: React.FC<PayslipDocumentProps> = ({ contractData }) => {
  const {
    business_name,
    contract_address,
    contract_type,
    created_at,
    employee_id,
    job_title,
    payment,
    payment_status,
    job_description,
  } = contractData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>{business_name}</Text>
            {contract_address && (
              <Text style={styles.companyAddress}>{contract_address}</Text>
            )}
          </View>
        </View>
        <Text style={styles.heading}>Payslip</Text>
        <View style={styles.employeeInfo}>
          <Text style={[styles.employeeName, styles.mb5]}>{employee_id}</Text>
          <Text style={styles.details}>
            {job_title}
            {created_at && ` | Date: ${formatDate(created_at)}`}
          </Text>
          {payment_status && (
            <Text style={styles.details}>Payment Status: {payment_status}</Text>
          )}
          {contract_type && (
            <Text style={styles.details}>Contract Type: {contract_type}</Text>
          )}
          {job_description && (
            <Text style={styles.details}>
              Job Description: {job_description}
            </Text>
          )}
          {payment && (
            <Text style={[styles.netPayLabel, styles.mb5]}>Payment:</Text>
          )}
          <Text style={styles.netPay}>
            <Text style={styles.rupeeSm}>₹</Text>
            {payment}
          </Text>
        </View>
        <View 
        // style={styles.table}
        >
          {/* Table can be added here if needed */}
        </View>
      </Page>
    </Document>
  );
};

export default PayslipDocument;
