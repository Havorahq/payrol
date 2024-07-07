// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BatchPayments {

    event Payment(address indexed from, address indexed to, uint256 amount);

    function batchPayment(address[] calldata recipients, uint256[] calldata amounts) external payable {
        require(recipients.length == amounts.length, "Recipients and amounts arrays must have the same length");
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        
        require(totalAmount <= msg.value, "Insufficient funds provided");

        for (uint256 i = 0; i < recipients.length; i++) {
            payable(recipients[i]).transfer(amounts[i]);
            emit Payment(msg.sender, recipients[i], amounts[i]);
        }
    }

    receive() external payable {}
}