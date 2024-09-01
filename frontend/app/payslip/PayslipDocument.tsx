import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { capitalizeFirst, formatDate } from "@/plugins/utils";

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
    textAlign: "left",
    fontWeight: 700,
  },
  employeeInfo: {
    marginBottom: 10,
  },
  employeeName: {
    fontSize: 14,
    fontWeight: 700,
    paddingBottom: 5,
    marginBottom: 10,
    borderBottom: "1px solid #E0E0E0",
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
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
  marginVertical: {
    marginTop: 5,
    marginBottom: 5,
  },
});

interface ContractData {
  business_name: string;
  contract_address?: string;
  contract_type?: string;
  created_at?: string;
  end_date?: string;
  employee_id: string;
  employer_id?: string;
  id: string;
  job_description?: string;
  job_title?: string;
  amount?: string;
  payment?: string;
  payment_address?: string;
  payment_status?: string;
  status?: string;
  token_address?: string;
}

// const formatDate = (dateString: string): string => {
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "long",
//   };
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", options);
// };

interface PayslipDocumentProps {
  contractData: ContractData;
}

const PayslipDocument: React.FC<PayslipDocumentProps> = ({ contractData }) => {
  const {
    amount,
    business_name,
    contract_address,
    contract_type,
    created_at,
    end_date,
    employee_id,
    job_title,
    payment,
    payment_status,
    job_description,
  } = contractData;

  console.log(contractData);

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
          <Text style={[styles.employeeName, styles.marginVertical]}>
            ID: {employee_id}
          </Text>

          {payment_status && (
            <Text style={styles.details}>Payment Status: {payment_status}</Text>
          )}
          {contract_type && (
            <View style={styles.marginVertical}>
              <Text style={styles.details}>Contract Type: </Text>
              <Text style={styles.details}>
                {capitalizeFirst(contract_type)}
              </Text>
            </View>
          )}
          <View style={styles.marginVertical}>
            <Text style={styles.details}>Job Title:</Text>
            <Text style={styles.details}>{job_title}</Text>
          </View>
          {job_description && (
            <View style={styles.marginVertical}>
              <Text style={styles.details}>Job Description:</Text>
              <Text style={styles.details}>{job_description}</Text>
            </View>
          )}
          {created_at && (
            <View style={styles.marginVertical}>
              <Text style={styles.details}>Start Date:</Text>
              <Text style={styles.details}>{formatDate(created_at)}</Text>
            </View>
          )}
          {end_date && (
            <View style={styles.marginVertical}>
              <Text style={styles.details}>End Date:</Text>
              <Text style={styles.details}>{formatDate(end_date)}</Text>
            </View>
          )}
          {amount && (
            <View style={styles.marginVertical}>
              <Text style={styles.details}>Amount:</Text>
              <Text style={styles.details}>${amount}</Text>
            </View>
          )}
          {/* <Text style={styles.netPay}>
            <Text style={styles.rupeeSm}>₹</Text>
            {payment}
          </Text> */}
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
