// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BatchPayments {
    struct Agreement {
        string contractType;
        address agreementAddress;
    }

    address public owner;
    Agreement[] public agreements;

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not allowed to carry out this action"
        );
        _;
    }

    constructor(Agreement[] memory _agreements){
        owner = msg.sender;
        for (uint i = 0; i < _agreements.length; i++) {
            agreements.push(_agreements[i]);
        }
    }

    function addAgreement (string memory _contractType, address _agreementAddress ) public onlyOwner {
        Agreement memory newAgreement = Agreement({contractType: _contractType, agreementAddress: _agreementAddress});
        agreements.push(newAgreement);
    }

    function performBatchPayments() public onlyOwner {
        // go through the smart contracts in the list and execute their payment methods
    }

    function getContracts () public view returns (Agreement[] memory) {
        return agreements;
    }

    function getContractAtIndex (uint _index) public view returns (Agreement memory){
        return agreements[_index];
    }

    // add agreement contracts to the agreement array
    // remove agreement contracts from the agreement array
    // make payments for each agreement contract

}