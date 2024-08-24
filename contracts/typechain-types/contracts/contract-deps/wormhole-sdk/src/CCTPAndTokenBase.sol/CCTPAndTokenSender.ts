/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../../../common";

export interface CCTPAndTokenSenderInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "chainIdToCCTPDomain"
      | "setCCTPDomain"
      | "setRegisteredSender"
      | "tokenBridge"
      | "wormhole"
      | "wormholeRelayer"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "chainIdToCCTPDomain",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setCCTPDomain",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setRegisteredSender",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenBridge",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "wormhole", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "wormholeRelayer",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "chainIdToCCTPDomain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCCTPDomain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRegisteredSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenBridge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wormhole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "wormholeRelayer",
    data: BytesLike
  ): Result;
}

export interface CCTPAndTokenSender extends BaseContract {
  connect(runner?: ContractRunner | null): CCTPAndTokenSender;
  waitForDeployment(): Promise<this>;

  interface: CCTPAndTokenSenderInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  chainIdToCCTPDomain: TypedContractMethod<
    [arg0: BigNumberish],
    [bigint],
    "view"
  >;

  setCCTPDomain: TypedContractMethod<
    [chain: BigNumberish, cctpDomain: BigNumberish],
    [void],
    "nonpayable"
  >;

  setRegisteredSender: TypedContractMethod<
    [sourceChain: BigNumberish, sourceAddress: BytesLike],
    [void],
    "nonpayable"
  >;

  tokenBridge: TypedContractMethod<[], [string], "view">;

  wormhole: TypedContractMethod<[], [string], "view">;

  wormholeRelayer: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "chainIdToCCTPDomain"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "setCCTPDomain"
  ): TypedContractMethod<
    [chain: BigNumberish, cctpDomain: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setRegisteredSender"
  ): TypedContractMethod<
    [sourceChain: BigNumberish, sourceAddress: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "tokenBridge"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "wormhole"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "wormholeRelayer"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}