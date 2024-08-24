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
  AddressLike,
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
} from "../../../../../../common";

export interface ITokenMessengerInterface extends Interface {
  getFunction(nameOrSignature: "depositForBurnWithCaller"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "depositForBurnWithCaller",
    values: [BigNumberish, BigNumberish, BytesLike, AddressLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "depositForBurnWithCaller",
    data: BytesLike
  ): Result;
}

export interface ITokenMessenger extends BaseContract {
  connect(runner?: ContractRunner | null): ITokenMessenger;
  waitForDeployment(): Promise<this>;

  interface: ITokenMessengerInterface;

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

  depositForBurnWithCaller: TypedContractMethod<
    [
      amount: BigNumberish,
      destinationDomain: BigNumberish,
      mintRecipient: BytesLike,
      burnToken: AddressLike,
      destinationCaller: BytesLike
    ],
    [bigint],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "depositForBurnWithCaller"
  ): TypedContractMethod<
    [
      amount: BigNumberish,
      destinationDomain: BigNumberish,
      mintRecipient: BytesLike,
      burnToken: AddressLike,
      destinationCaller: BytesLike
    ],
    [bigint],
    "nonpayable"
  >;

  filters: {};
}