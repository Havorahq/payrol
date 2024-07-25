import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";
import { deployToken } from "./FixedRateAgreement";

  const initialTokenSupply = 1000000000
  async function tokenDeploymentFixture () {
    return await deployToken(initialTokenSupply)
  }
  
  describe("Agreement factory", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployAgreementFactory() {
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const agreementFactory = await await hre.ethers.deployContract("AgreementFactory");
  
      return { owner, otherAccount, agreementFactory };
    }

    describe("agreement creation", function(){
        it("should deploy a fixed rate agreement successfully", async function (){
            const {owner, otherAccount, agreementFactory} = await loadFixture(deployAgreementFactory);
            await agreementFactory.createNewFixedRateAgreement(
                'employer id',
                'employee id',
                owner.address,
                otherAccount.address,
                100000
            )
            expect(await agreementFactory.getNumberOfFixedRateAgreements()).to.above(0)
        })
    })

    describe("making payments from fixed rate contract", function () {
      it ("should make payments from a fixed rate agreement smart contract", async function () {
        const contractAmount = 100;
        const {owner, agreementFactory, otherAccount} = await loadFixture(deployAgreementFactory);
        const {tokenSupplyAccount, testToken} = await loadFixture(tokenDeploymentFixture);
        await agreementFactory.createNewFixedRateAgreement(
            'employer id',
            'employee id',
            owner.address,
            await testToken.getAddress(),
            contractAmount
        );
        const fixedRateAgreements = await agreementFactory.getFixedRateAgreements()
        const newAgreementContractAddress = fixedRateAgreements[fixedRateAgreements.length - 1];
        // send money to the agreement address
        await testToken.connect(tokenSupplyAccount).transfer(newAgreementContractAddress, contractAmount)
        const fixedRateContract = await hre.ethers.getContractAt("FixedRateAgreement", newAgreementContractAddress)
        // enter the agreement an employee
        await fixedRateContract.connect(otherAccount).employeeEnterContract(otherAccount.address)
        await fixedRateContract.connect(owner).sendPayment()
        expect(await testToken.balanceOf(otherAccount.address)).to.equal(contractAmount)
      })
      
    })
  });
  