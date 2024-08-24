// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./Agreement.sol";
import "./contract-deps/wormhole-sdk/src/WormholeRelayerSDK.sol";

contract FixedRateAgreement is Agreement, TokenSender, TokenReceiver {

    uint256 constant GAS_LIMIT = 250_000;

    enum PaymentStatus {
        Unpaid,
        Paid
    }

    uint256 fixedPayment;
    PaymentStatus public paymentStatus = PaymentStatus.Unpaid;

    event FixedPaymentMade(
        address indexed employeeAddress,
        address indexed employerAddress
    );

    constructor(
        string memory _employerId,
        string memory _employeeId,
        address _employerAddress,
        address _currency,
        uint256 _fixedPayment,
        address _wormholeRelayer,
        address _tokenBridge,
        address _wormhole
    )
        Agreement(
            _employerId,
            _employeeId,
            _employerAddress,
            _currency,
            "fixed rate"
        ) TokenBase(_wormholeRelayer, _tokenBridge, _wormhole)
    {
        fixedPayment = _fixedPayment;
    }

    function transferTokens(address _to, uint256 _amount) internal {
        // Load the USDT contract
        IERC20 token = IERC20(currency);

        // Transfer USDT to the given address
        require(token.transfer(_to, _amount), "Token transfer failed");
    }

    // TODO: send intra-chain payments
    function sendPayment() public onlyEmployer returns (bool) {
        require(
            agreementStatus == AgreementStatus.Active,
            "This contract is no longer active"
        );
        require(
            paymentStatus != PaymentStatus.Paid,
            "Payment has already been sent"
        );

        // send the money to the employees wallet address
        transferTokens(paymentAddress, fixedPayment);

        paymentStatus = PaymentStatus.Paid;
        agreementStatus = AgreementStatus.Closed;
        emit PaymentMade(address(this));
        emit FixedPaymentMade(paymentAddress, employerAddress);
        return true;
    }

    // TODO: cross-chain token transfer functions
    function sendCrossChainDeposit(
        uint16 targetChain,
        address targetHelloToken,
        address recipient,
        uint256 amount,
        address token
    ) public onlyEmployee {
        require(
            agreementStatus == AgreementStatus.Active,
            "This contract is no longer active"
        );
        require(
            paymentStatus != PaymentStatus.Paid,
            "Payment has already been sent"
        );
        // uint256 cost = quoteCrossChainDeposit(targetChain);
        // require(amount == cost,
        // "msg.value != quoteCrossChainDeposit(targetChain)");

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
        paymentStatus = PaymentStatus.Paid;
        agreementStatus = AgreementStatus.Closed;
        emit PaymentMade(address(this));
        emit FixedPaymentMade(paymentAddress, employerAddress);
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
