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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface FixedRateAgreementInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "agreementStatus"
      | "cancel"
      | "close"
      | "collectTokens"
      | "contractType"
      | "currency"
      | "employeeEnterContract"
      | "employeeId"
      | "employerAddress"
      | "employerId"
      | "paymentAddress"
      | "paymentStatus"
      | "sendPayment"
      | "suspend"
      | "withdrawFunds"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "FixedPaymentMade" | "PaymentMade"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "agreementStatus",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "cancel", values?: undefined): string;
  encodeFunctionData(functionFragment: "close", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "collectTokens",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "contractType",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "currency", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "employeeEnterContract",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "employeeId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "employerAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "employerId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "paymentAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "paymentStatus",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sendPayment",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "suspend", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "agreementStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cancel", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "close", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "collectTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "currency", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "employeeEnterContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "employeeId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "employerAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "employerId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "paymentAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "paymentStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendPayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "suspend", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;
}

export namespace FixedPaymentMadeEvent {
  export type InputTuple = [
    employeeAddress: AddressLike,
    employerAddress: AddressLike
  ];
  export type OutputTuple = [employeeAddress: string, employerAddress: string];
  export interface OutputObject {
    employeeAddress: string;
    employerAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PaymentMadeEvent {
  export type InputTuple = [agreementAddress: AddressLike];
  export type OutputTuple = [agreementAddress: string];
  export interface OutputObject {
    agreementAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface FixedRateAgreement extends BaseContract {
  connect(runner?: ContractRunner | null): FixedRateAgreement;
  waitForDeployment(): Promise<this>;

  interface: FixedRateAgreementInterface;

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

  agreementStatus: TypedContractMethod<[], [bigint], "view">;

  cancel: TypedContractMethod<[], [void], "nonpayable">;

  close: TypedContractMethod<[], [void], "nonpayable">;

  collectTokens: TypedContractMethod<
    [tokenAddress: AddressLike, requiredAmount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  contractType: TypedContractMethod<[], [string], "view">;

  currency: TypedContractMethod<[], [string], "view">;

  employeeEnterContract: TypedContractMethod<
    [_paymentAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  employeeId: TypedContractMethod<[], [string], "view">;

  employerAddress: TypedContractMethod<[], [string], "view">;

  employerId: TypedContractMethod<[], [string], "view">;

  paymentAddress: TypedContractMethod<[], [string], "view">;

  paymentStatus: TypedContractMethod<[], [bigint], "view">;

  sendPayment: TypedContractMethod<[], [boolean], "nonpayable">;

  suspend: TypedContractMethod<[], [void], "nonpayable">;

  withdrawFunds: TypedContractMethod<[], [void], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "agreementStatus"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "cancel"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "close"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "collectTokens"
  ): TypedContractMethod<
    [tokenAddress: AddressLike, requiredAmount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "contractType"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "currency"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "employeeEnterContract"
  ): TypedContractMethod<[_paymentAddress: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "employeeId"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "employerAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "employerId"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "paymentAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "paymentStatus"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "sendPayment"
  ): TypedContractMethod<[], [boolean], "nonpayable">;
  getFunction(
    nameOrSignature: "suspend"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawFunds"
  ): TypedContractMethod<[], [void], "view">;

  getEvent(
    key: "FixedPaymentMade"
  ): TypedContractEvent<
    FixedPaymentMadeEvent.InputTuple,
    FixedPaymentMadeEvent.OutputTuple,
    FixedPaymentMadeEvent.OutputObject
  >;
  getEvent(
    key: "PaymentMade"
  ): TypedContractEvent<
    PaymentMadeEvent.InputTuple,
    PaymentMadeEvent.OutputTuple,
    PaymentMadeEvent.OutputObject
  >;

  filters: {
    "FixedPaymentMade(address,address)": TypedContractEvent<
      FixedPaymentMadeEvent.InputTuple,
      FixedPaymentMadeEvent.OutputTuple,
      FixedPaymentMadeEvent.OutputObject
    >;
    FixedPaymentMade: TypedContractEvent<
      FixedPaymentMadeEvent.InputTuple,
      FixedPaymentMadeEvent.OutputTuple,
      FixedPaymentMadeEvent.OutputObject
    >;

    "PaymentMade(address)": TypedContractEvent<
      PaymentMadeEvent.InputTuple,
      PaymentMadeEvent.OutputTuple,
      PaymentMadeEvent.OutputObject
    >;
    PaymentMade: TypedContractEvent<
      PaymentMadeEvent.InputTuple,
      PaymentMadeEvent.OutputTuple,
      PaymentMadeEvent.OutputObject
    >;
  };
}
