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
    fontSize: 22,
    marginBottom: 5,
  },
  companyAddress: {
    fontSize: 12,
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
    fontSize: 18,
    textTransform: "uppercase",
  },
  details: {
    fontSize: 12,
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
    fontSize: 38,
    textAlign: "right",
    marginTop: 10,
  },
  netPayLabel: {
    fontSize: 12,
    textAlign: "right",
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

const PayslipDocument = ({ contractData }) => {
  console.log(contractData);
  return (
    <Document>
      {/* <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>{companyName}</Text>
            {companyAddress && (
              <Text style={styles.companyAddress}>{companyAddress}</Text>
            )}
          </View>
          {companyIconUrl && (
            <View>
              <img
                src={companyIconUrl}
                style={styles.companyIcon}
                alt="Company Icon"
              />
            </View>
          )}
        </View>
        <Text style={styles.heading}>
          Payslip for the month of {month}, {year}
        </Text>
        <View style={styles.employeeInfo}>
          <Text style={[styles.employeeName, styles.mb5]}>
            {employeeName}
            {employeeId && `, ${employeeId}`}
          </Text>
          <Text style={styles.details}>
            {employeePosition}
            {employeeJoiningDate &&
              ` | Date of Joining : ${employeeJoiningDate}`}
          </Text>
          {employeeUan && (
            <Text style={styles.details}>UAN Number: {employeeUan}</Text>
          )}
          {employeePfAccountNumber && (
            <Text style={styles.details}>
              PF A/C Number: {employeePfAccountNumber}
            </Text>
          )}
          {employeeAccountNumber && (
            <Text style={styles.details}>
              Bank A/C Number: {employeeAccountNumber}
            </Text>
          )}
          <Text style={[styles.netPayLabel, styles.mb5]}>Employee Net Pay</Text>
          <Text style={styles.netPay}>
            <Text style={styles.rupeeLg}>₹</Text>
            {netSalary}
          </Text>
          <Text style={styles.details}>
            {paidDays && `Paid Days : ${paidDays}`}{" "}
            {lopDays && ` | LOP Days : ${lopDays}`}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>EARNINGS</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>AMOUNT</Text>
            </View>
            <View style={styles.tableColHeader}></View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>DEDUCTIONS</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>AMOUNT</Text>
            </View>
          </View>
          {earningAndDeductions.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.earningName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <Text style={styles.rupeeSm}>₹</Text>
                  {row.earningAmount ? row.earningAmount.toFixed(2) : ""}
                </Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.deductionName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <Text style={styles.rupeeSm}>₹</Text>
                  {row.deductionAmount ? row.deductionAmount.toFixed(2) : ""}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Gross Earnings</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                <Text style={styles.rupeeSm}>₹</Text>
                {totalEarnings.toFixed(2)}
              </Text>
            </View>
            <View style={styles.tableCol}></View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total Deductions</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                <Text style={styles.rupeeSm}>₹</Text>
                {totalDeductions.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        {totalReimbursements > 0 && (
          <>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>REIMBURSEMENTS</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>AMOUNT</Text>
                </View>
              </View>
              {reimbursements.map((reimbursement, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{reimbursement.name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      <Text style={styles.rupeeSm}>₹</Text>
                      {reimbursement.amount
                        ? reimbursement.amount.toFixed(2)
                        : ""}
                    </Text>
                  </View>
                </View>
              ))}
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Total Reimbursement</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    <Text style={styles.rupeeSm}>₹</Text>
                    {totalReimbursements.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
        <View style={[styles.total, styles.mb5]}>
          <Text>Total Net Payable</Text>
          <Text>
            <Text style={styles.rupeeSm}>₹</Text>
            {netSalary} (Rupees {netSalary} only)
          </Text>
        </View>
      </Page> */}
    </Document>
  );
};

export default PayslipDocument;
