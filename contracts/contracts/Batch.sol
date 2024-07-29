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
    bool public used = false;
    address public tokenAddress;
    mapping(address => string) paymentResults; // the results after making batch payments


    // batch payments object
    // this is an object that represents the results of calling the payment methods for each of the agreements in a given batch payment
    // operation 
    // the structure of the batch payments object 
    // {
    //   mapping (agreementContractAddress, result <success | error>) []
    // }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not allowed to carry out this action"
        );
        _;
    }

    constructor(Agreement[] memory _agreements, address _tokenAddress){
        owner = msg.sender;
        tokenAddress = _tokenAddress;
        for (uint i = 0; i < _agreements.length; i++) {
            agreements.push(_agreements[i]);
        }
    }

    function addAgreement (string memory _contractType, address _agreementAddress ) public onlyOwner {
        Agreement memory newAgreement = Agreement({contractType: _contractType, agreementAddress: _agreementAddress});
        agreements.push(newAgreement);
    }

    function performBatchPayments() public onlyOwner {
        require (!used, "the batch payments contract has already been used");
        used = true;

        // check that the balance for the agreement contract is greater than zero
        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(address(this)) > 0, "Not enough balance");


        // go through the smart contracts in the list and execute their payment methods
        // implement a new batch payments object
    }

    function getContracts () public view returns (Agreement[] memory) {
        return agreements;
    }

    function getContractAtIndex (uint _index) public view returns (Agreement memory){
        return agreements[_index];
    }

    function withdrawFunds () onlyOwner() {

    }

    // add agreement contracts to the agreement array
    // remove agreement contracts from the agreement array
    // make payments for each agreement contract

}