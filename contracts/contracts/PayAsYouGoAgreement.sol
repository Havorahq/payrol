// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Agreement.sol";
import "./contract-deps/wormhole-sdk/src/WormholeRelayerSDK.sol";

contract PayAsYouGoAgreement is Agreement, TokenSender, TokenReceiver {

    uint256 public numberOfPaymentApprovals = 0; // the employer will increment this periodically to enable payment for this contract
    uint256 public numberOfWithdrawals = 0; // the number of approved payments collected by the employee: can never be higher than the number of payment approvals

    uint256 constant GAS_LIMIT = 250_000;


    enum PaymentStatus {
        Unpaid,
        Paid
    }

    struct Payment {
        uint256 amount;
        address payeeAddress;
        // date
    }

    event PayAsYouGoPaymentMade(
        address indexed employeeAddress,
        address indexed employerAddress
    );

    Payment[] public payments;

    uint256 monthlyPayment;
    // payment history

    constructor(
        string memory _employerId,
        string memory _employeeId,
        address _employerAddress,
        address _currency,
        uint256 _monthlyPayment,
        address _wormholeRelayer,
        address _tokenBridge,
        address _wormhole
    )
        Agreement(
            _employerId,
            _employeeId,
            _employerAddress,
            _currency,
            "pay as you go"
        ) TokenBase(_wormholeRelayer, _tokenBridge, _wormhole)
    {
        monthlyPayment = _monthlyPayment;
    }

    function transferTokens(address _to, uint256 _amount) internal {
        // Load the USDT contract
        IERC20 token = IERC20(currency);

        // Transfer USDT to the given address
        require(token.transfer(_to, _amount), "Token transfer failed");
    }

    function approveForPayment() public returns (bool) {
        require(
            agreementStatus == AgreementStatus.Active,
            "This contract is no longer active"
        );
        ++numberOfPaymentApprovals;
        return true;
    }

    //TODO: for intra-chain payments
    // sendPayment
    function sendPayment() public returns (bool) {
        require(
            agreementStatus == AgreementStatus.Active,
            "This contract is no longer active"
        );
        require (
            numberOfPaymentApprovals > numberOfWithdrawals,
            "this payment has not been approved"
        );
        // send monthly payment to the employee's wallet address
        transferTokens(paymentAddress, monthlyPayment);
        emit PaymentMade(address(this));
        emit PayAsYouGoPaymentMade(paymentAddress, employerAddress);
        ++ numberOfWithdrawals;
        // store payment details and add payment event
        return true;
    }

    function setMonthlyPayments(
        uint256 newMonthlyPayment
    ) public onlyEmployer {}

    //TODO: to enable cross-chain payments
    // cross-chain token transfer functions
    function sendCrossChainDeposit(
        uint16 targetChain,
        address targetHelloToken,
        address recipient,
        uint256 amount,
        address token
    ) public payable {
        require(
            agreementStatus == AgreementStatus.Active,
            "This contract is no longer active"
        );
        require (
            numberOfPaymentApprovals > numberOfWithdrawals,
            "this payment has not been approved"
        );

        uint256 cost = quoteCrossChainDeposit(targetChain);
        require(amount == cost,
        "msg.value != quoteCrossChainDeposit(targetChain)");

        // IERC20(token).transferFrom(msg.sender, address(this), amount);

        bytes memory payload = abi.encode(recipient);
        sendTokenWithPayloadToEvm(
        targetChain,
        targetHelloToken, // address (on targetChain) to send token and payload
        payload,
        0, // receiver value
        GAS_LIMIT,
        token, // address of IERC20 token contract
        amount
        );
        emit PaymentMade(address(this));
        emit PayAsYouGoPaymentMade(paymentAddress, employerAddress);
        ++ numberOfWithdrawals;
    }

    function quoteCrossChainDeposit(uint16 targetChain)
    public view returns (uint256 cost) {
        // Cost of delivering token and payload to targetChain
        uint256 deliveryCost;
        (deliveryCost,) =
        wormholeRelayer.quoteEVMDeliveryPrice(targetChain, 0, GAS_LIMIT);

        // Total cost: delivery cost +
        // cost of publishing the 'sending token' wormhole message
        cost = deliveryCost + wormhole.messageFee();
    }
    // end cross-chain token transfer functions
}
