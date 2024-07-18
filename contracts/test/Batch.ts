const { expect } = require("chai");
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import hre from "hardhat";

// to test:
// batch payments creation

interface AgreementContract {
    contractType: string,
    agreementAddress: string
}

const _agreementContracts: AgreementContract[] = [
    {
        contractType: "pay as you go",
        agreementAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
    },
    {
        contractType: "fixed payment",
        agreementAddress: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D"
    },
    {
        contractType: "pay as you go",
        agreementAddress: "0x66f820a414680B5bcda5eECA5dea238543F42054"
    }
]

describe("Batch payments contract", function () {

    async function setupFixture() {
        const [owner] = await hre.ethers.getSigners();
        const batchPaymentsContract = await hre.ethers.deployContract("BatchPayments", [
            _agreementContracts
        ]);
        return {owner, batchPaymentsContract}
    }

    it("Deployment should have an array of contracts", async function () {
        const {batchPaymentsContract} = await loadFixture(setupFixture)
        const agreements = await batchPaymentsContract.getContracts()
        expect(agreements.length).to.equal(3);
    });

    it ("should add another agreement to the agreements array successfully", async function () {
        const { batchPaymentsContract} = await loadFixture(setupFixture)
        const initialLength = (await batchPaymentsContract.getContracts()).length
        await batchPaymentsContract.addAgreement("pay as you go", "0x66f820a414680B5bcda5eECA5dea238543F42054")
        const currentLenth = (await batchPaymentsContract.getContracts()).length
        expect(currentLenth - initialLength).to.equal(1);
    })

  });