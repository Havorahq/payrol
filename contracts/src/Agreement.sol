// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IERC20 {
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner, 
        address spender
    ) external returns (uint256);

    function balanceOf(
        address owner
    ) external returns (uint256);

    function transferFrom(
        address owner, 
        address to,
        uint256 amount
    ) external returns (uint256);
}

contract Agreement {
    enum AgreementStatus {
        Pending,
        Active,
        Suspended,
        Cancelled, // a contract that has been cancelled cannot be reactivated
        Closed
    }

    string public employerId;
    string public employeeId;
    address public employerAddress;
    address public paymentAddress; // the wallet address used by the employer to accept payments
    address public currency; // the stable coin used for payment
    AgreementStatus public agreementStatus;
    string public contractType;

    event PaymentMade(address indexed agreementAddress);

    // constructor
    constructor(
        string memory _employerId,
        string memory _employeeId,
        address _employerAddress,
        address _currency,
        string memory _contractType
    ) {
        employerId = _employerId;
        employeeId = _employeeId;
        employerAddress = _employerAddress;
        currency = _currency;
        agreementStatus = AgreementStatus.Pending;
        contractType = _contractType;
    }

    modifier onlyEmployer() {
        require(
            msg.sender == employerAddress,
            "You are not allowed to carry out this action"
        );
        _;
    }

    modifier onlyEmployee() {
        require(
            msg.sender == paymentAddress,
            "You are not alowed to carry out this action"
        );
        _;
    }

    function cancel() public onlyEmployer {
        require(
            agreementStatus != AgreementStatus.Cancelled,
            "This contract has already been cancelled"
        );
        agreementStatus = AgreementStatus.Cancelled;
        return;
    }

    function suspend() public onlyEmployer {
        require(
            agreementStatus != AgreementStatus.Cancelled,
            "This contract has already been cancelled"
        );
        require(
            agreementStatus != AgreementStatus.Closed,
            "This contract has already been closed"
        );
        agreementStatus = AgreementStatus.Suspended;
        return;
    }

    function close() public onlyEmployer {
        require(
            agreementStatus != AgreementStatus.Cancelled,
            "This contract has already been cancelled"
        );

        agreementStatus = AgreementStatus.Closed;
        return;
    }


    function employeeEnterContract() public {
        require(
            agreementStatus == AgreementStatus.Pending,
            "This contract is no longer pending"
        );

        paymentAddress = msg.sender;
        agreementStatus = AgreementStatus.Active;
        return;
    }

    function withdrawFunds() public view onlyEmployer {
    }

    function collectTokens(
        address tokenAddress,
        uint256 requiredAmount
    ) public returns (bool) {
        IERC20 token = IERC20(tokenAddress);
        require(
            token.allowance(msg.sender, address(this)) >= requiredAmount,
            "Insufficient token allowance"
        );

        require(token.balanceOf(msg.sender) >= requiredAmount, "Insufficient balance");
        token.transferFrom(msg.sender, address(this), requiredAmount);

        return true;
    }
}
