/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IWormholeRelayerDelivery,
  IWormholeRelayerDeliveryInterface,
} from "../../../../../../../contracts/contract-deps/wormhole-sdk/src/interfaces/IWormholeRelayer.sol/IWormholeRelayerDelivery";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipientContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint16",
        name: "sourceChain",
        type: "uint16",
      },
      {
        indexed: true,
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "deliveryVaaHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IWormholeRelayerDelivery.DeliveryStatus",
        name: "status",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gasUsed",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum IWormholeRelayerDelivery.RefundStatus",
        name: "refundStatus",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "additionalStatusInfo",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "overridesInfo",
        type: "bytes",
      },
    ],
    name: "Delivery",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deliveryQuote",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paymentForExtraReceiverValue",
        type: "uint256",
      },
    ],
    name: "SendEvent",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "encodedVMs",
        type: "bytes[]",
      },
      {
        internalType: "bytes",
        name: "encodedDeliveryVAA",
        type: "bytes",
      },
      {
        internalType: "address payable",
        name: "relayerRefundAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "deliveryOverrides",
        type: "bytes",
      },
    ],
    name: "deliver",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "deliveryHash",
        type: "bytes32",
      },
    ],
    name: "deliveryAttempted",
    outputs: [
      {
        internalType: "bool",
        name: "attempted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "deliveryHash",
        type: "bytes32",
      },
    ],
    name: "deliveryFailureBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "deliveryHash",
        type: "bytes32",
      },
    ],
    name: "deliverySuccessBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
    ],
    name: "getRegisteredWormholeRelayerContract",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IWormholeRelayerDelivery__factory {
  static readonly abi = _abi;
  static createInterface(): IWormholeRelayerDeliveryInterface {
    return new Interface(_abi) as IWormholeRelayerDeliveryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IWormholeRelayerDelivery {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IWormholeRelayerDelivery;
  }
}
