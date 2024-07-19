import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";

  const initialTokenSupply = 1000000000

  export async function deployToken (initialTokenSupply: number) {
    console.log('deploying the token contract')
    const [tokenSupplyAddress] = await hre.ethers.getSigners();
    const testToken = await hre.ethers.deployContract("XAToken", [initialTokenSupply])
    return {tokenSupplyAddress, testToken}
  }

  async function tokenDeploymentFixture () {
    return await deployToken(initialTokenSupply)
  }
  
  describe("Fixed Rate Agreement", function () {
    it ("should deploy the token contract successfully", async function () {
      const {tokenSupplyAddress, testToken} = await loadFixture(tokenDeploymentFixture)
      expect(await testToken.balanceOf(tokenSupplyAddress)).to.equal(initialTokenSupply)
    })
  });
  