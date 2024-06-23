// components/PayslipDocument.js
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
  companyIcon: {
    width: 60,
    height: 60,
    marginRight: 5,
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
    textTransform: "",
  },
  details: {
    fontSize: 16,
  },
  table: {
    display: "table",
    width: "auto",
    margin: "10px 0",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#f3f3f3",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  netPay: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 2,
  },
  netPayLabel: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 20,
  },
  total: {
    fontSize: 12,
    marginTop: 10,
    textAlign: "right",
  },
  rupeeSm: {
    fontSize: 10,
  },
  mb5: {
    marginBottom: 5,
  },
});

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const PayslipDocument = ({ contractData }) => {
  console.log(contractData, "contractslip data");

  const {
    business_name,
    contract_address,
    contract_type,
    created_at,
    employee_id,
    employer_id,
    id,
    job_description,
    job_title,
    payment,
    payment_address,
    payment_status,
    status,
    token_address,
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
        <Text style={styles.heading}> </Text>
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
              Jon Description: {job_description}
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
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Details</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Value</Text>
            </View>
          </View>
          {/* {Object.entries(.map(([key, value], index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{key.replace(/_/g, " ")}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <Text style={styles.rupeeSm}></Text>
                  {value ? value.toString() : ""}
                </Text>
              </View>
            </View>
          ))} */}
        </View>
      </Page>
    </Document>
  );
};

export default PayslipDocument;
