/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  CCTPSender,
  CCTPSenderInterface,
} from "../../../../../../contracts/contract-deps/wormhole-sdk/src/CCTPBase.sol/CCTPSender";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    name: "chainIdToCCTPDomain",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chain",
        type: "uint16",
      },
      {
        internalType: "uint32",
        name: "cctpDomain",
        type: "uint32",
      },
    ],
    name: "setCCTPDomain",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "sourceChain",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "sourceAddress",
        type: "bytes32",
      },
    ],
    name: "setRegisteredSender",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wormhole",
    outputs: [
      {
        internalType: "contract IWormhole",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wormholeRelayer",
    outputs: [
      {
        internalType: "contract IWormholeRelayer",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class CCTPSender__factory {
  static readonly abi = _abi;
  static createInterface(): CCTPSenderInterface {
    return new Interface(_abi) as CCTPSenderInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): CCTPSender {
    return new Contract(address, _abi, runner) as unknown as CCTPSender;
  }
}
