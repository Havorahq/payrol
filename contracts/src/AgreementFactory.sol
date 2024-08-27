//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./PayAsYouGoAgreement.sol";
import "./FixedRateAgreement.sol";

contract AgreementFactory {
    FixedRateAgreement[] public fixedRateAgreements;
    PayAsYouGoAgreement[] public payAsYouGoAgreements;


    // think of a better way to store and retrieve the contracts that have been created
    event FixedRateAgreementDeployed(address indexed contractAddress);
    event PayAsYoGoAgreementDeployed(address indexed contractAddress);

    function createNewFixedRateAgreement(
        string memory _employerId,
        string memory _employeeId,
        address _employerAddress,
        address _currency,
        uint256 _fixedPayment,
        address _wormholeRelayer,
        address _tokenBridge,
        address _wormhole
    ) public returns (address) {
        FixedRateAgreement agreement = new FixedRateAgreement(
            _employerId,
            _employeeId,
            _employerAddress,
            _currency,
            _fixedPayment,
            _wormholeRelayer,
            _tokenBridge,
            _wormhole
        );
        fixedRateAgreements.push(agreement);

        emit FixedRateAgreementDeployed(address(agreement));
        return address(agreement);
    }

    function getNumberOfFixedRateAgreements() public view returns (uint256) {
        return fixedRateAgreements.length;
    }

    function createNewPayAsYouGoAgreement(
        string memory _employerId,
        string memory _employeeId,
        address _employerAddress,
        address _currency,
        uint256 _monthlyPayment,
        address _wormholeRelayer,
        address _tokenBridge,
        address _wormhole
    ) public {
        PayAsYouGoAgreement agreement = new PayAsYouGoAgreement(
            _employerId,
            _employeeId,
            _employerAddress,
            _currency,
            _monthlyPayment, // the wormhole integration stuff
            _wormholeRelayer,
            _tokenBridge,
            _wormhole
        );

        payAsYouGoAgreements.push(agreement);

        emit PayAsYoGoAgreementDeployed(address(agreement));
    }

    function getFixedRateAgreements () public view returns (FixedRateAgreement[] memory) {
        return fixedRateAgreements;
    }

    function getPayAsYouGoAgreements () public view returns (PayAsYouGoAgreement[] memory) {
        return payAsYouGoAgreements;
    }
}
