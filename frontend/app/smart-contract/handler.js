import { defineChain } from "thirdweb";
import { getContract } from "thirdweb";
import { client } from "@/lib/client";
import factoryAbi from "./factoryAbi.json"
import { prepareContractCall, toWei, sendAndConfirmTransaction } from "thirdweb";
import { createWallet } from "thirdweb/wallets";

const liskId = 	4202;

export class ContractHandler{

    liskChain = defineChain(liskId);
    contractFactoryAddress = '0x750D8f20f22C38a51EC8Ae916A2dC8a95F192F1E';
    contractFactory = getContract({
        client,
        chain: this.liskChain,
        address: this.contractFactoryAddress,
        abi: factoryAbi
    });


    deployFixedRateContract =async (contractObj)=>{
        console.log( 'deploying fixed payment contract')
        const deploymentTx = prepareContractCall(
            {
                contract: this.contractFactory,
                method: "createNewFixedRateAgreement",
                params: [
                    "employerId",
                    "employeeId",
                    "0xA18F9BDEb5990fbfB6FE6CE43c97699602eA7747",
                    "0x2728DD8B45B788e26d12B13Db5A244e5403e7eda",
                    toWei(contractObj.monthlyRate)
                ]
            }
        )
        const wallet = createWallet("io.metamask");
        await wallet.connect({client});
        const receipt = await sendAndConfirmTransaction({
            deploymentTx,
            wallet,
        });

        console.log(receipt, 'the receipt')
    }

    deployPayAsYouContract =(contractObj)=>{
        console.log(contractObj, 'the pay as you go agreement')
    }

}