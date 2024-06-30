# Xalari V2 

Welcome to the Xalari V2! This README provides an overview of the features and functionalities we are incorporating into Xalari V2. 

## Key Notes:

* In line with our roadmap, we are now incorporating TypeScript and Tailwind into our framework. This will slow down the implementation of new features as we focus on bringing V2 up to the level of V1 before introducing additional functionalities.

## Incoming Features

### Employee and Contractor Management
- **Enhanced Contract Selection**: Choose the type of contract—employment or contract staff, full-time or hourly contractors.
- **Compliance Integration**: Built-in region-based compliance system.
- **Salary Benchmarking**: Facilitate competitive and fair salary suggestions.
- **Onboarding Efficiency**: Streamline the onboarding and offboarding process of employees.
- **Team Data Table**: Consolidate team documents and data, including country-specific costs like bonuses, pensions, taxes, and social security.
- Track contract types, status, start dates, and other relevant details.
- **Employee Information**: Manage comprehensive employee details and onboarding documents.

### General Analytics
- **Employee and Contractor Locations**: View regional distribution of your workforce.
- **User Status Tracker**: Monitor the status of users, including onboarding, ready to start, and off-boarding phases.
- **National Holidays**: Access a list of national holidays for each hiring region.
- **Compliance Monitor**: Ensure adherence to regional laws, receive alerts about changes, and recommended actions.

### Payroll Review
- **Payslip and Timesheet Review**: Review and approve payslip and timesheet submissions based on a predefined payment cycle.
- **Global Payments**: Enable bulk payments for global teams while ensuring compliance with payslip and tax processes.
- **Deliverables-Based Payments**: Support payments based on deliverables for contract types.

### Reports
- Generate general reports on total compensation, average pay, and unpaid time off.

### Integration Capabilities
- **Data Connectivity**: Initiate interoperability frameworks to enable future integration with accounting software or HRIS for seamless data connectivity.

<br>



## Other Technical Features

### Smart Contract Factory
- Xalari adopts a smart contract factory architecture, deploying a new smart contract for each employment agreement. These smart contracts manage key aspects of the agreement, including its status and payment transactions.
  
### Funding the Contract/Agreement
 - Employers transfer tokens (e.g., Ether, Usdt) to the Contract. The smart contract holds these funds in escrow. The contract enforces conditions for withdrawal, ensuring funds are released only upon job completion or at the end of the contract period depending on the contract type.

### Employee Withdrawal

- The employee initiates a withdrawal transaction from the contract. The smart contract verifies the completion conditions (job completion or time elapse) and transfers the funds from the contract’s balance to the employee’s wallet address.

### Batch Payments by Employers
 - The product architecture  supports batch payment transactions where the employer batch pays multiple open contracts expecting payment in a single transaction. This reduces transaction costs and improves efficiency. The smart contract processes these payments, updating each employee contract accordingly, and holding the funds until the withdrawal conditions are met.



