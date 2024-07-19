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

        // it("should deploy a pay as you go agreement successfully", async function (){
        //     const {owner, otherAccount, agreementFactory} = await loadFixture(deployAgreementFactory);
        //     await agreementFactory.createNewPayAsYouGoAgreement(
        //         'employer id',
        //         'employee id',
        //         owner.address,
        //         otherAccount.address,
        //         100000
        //     )
        //     expect(await agreementFactory.getNumberOfPayAsYouGoAgreements()).to.above(0)
        // })
    })

    describe("making payments from fixed rate contract", function () {
      it ("should make payments from a fixed rate agreement smart contract", async function () {
        const {owner, agreementFactory} = await loadFixture(deployAgreementFactory);
        const {tokenSupplyAddress, testToken} = await loadFixture(tokenDeploymentFixture)
        const agreementAddress = await agreementFactory.createNewFixedRateAgreement(
            'employer id',
            'employee id',
            owner.address,
            await testToken.getAddress(),
            100
        )
        console.log(agreementAddress, 'the supposed agreement address')
        // send money to the agreement address
        // testToken.transfer(agreementAddress)
      })
      
    })
  });
  