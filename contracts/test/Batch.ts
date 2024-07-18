const { expect } = require("chai");
import hre from "hardhat";

// to test:
// batch payments creation

interface AgreementContract {
    contractType: string,
    agreementAddress: string
}

const _agreementContracts: AgreementContract[] = [
    {
        contractType: "Pay as you go",
        agreementAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
    },
    {
        contractType: "Fixed payment",
        agreementAddress: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D"
    },
    {
        contractType: "Pay as you go",
        agreementAddress: "0x66f820a414680B5bcda5eECA5dea238543F42054"
    }
]

describe("Batch payments contract", function () {
    it("Deployment should have an array of contracts", async function () {
      const [owner] = await hre.ethers.getSigners();
      const batchPaymentsContract = await hre.ethers.deployContract("BatchPayments", [
        _agreementContracts
      ]);
      const agreements = await batchPaymentsContract.getContracts()
      console.log(agreements.length, 'the agreements fam')
      expect(agreements.length).to.equal(3);
    });
  });