/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IReceiver,
  IReceiverInterface,
} from "../../../../../../../contracts/contract-deps/wormhole-sdk/src/interfaces/CCTPInterfaces/IReceiver";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "receiveMessage",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IReceiver__factory {
  static readonly abi = _abi;
  static createInterface(): IReceiverInterface {
    return new Interface(_abi) as IReceiverInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IReceiver {
    return new Contract(address, _abi, runner) as unknown as IReceiver;
  }
}
