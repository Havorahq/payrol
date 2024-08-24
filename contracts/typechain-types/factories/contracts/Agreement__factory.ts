/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Agreement, AgreementInterface } from "../../contracts/Agreement";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_employerId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_employeeId",
        type: "string",
      },
      {
        internalType: "address",
        name: "_employerAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_currency",
        type: "address",
      },
      {
        internalType: "string",
        name: "_contractType",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agreementAddress",
        type: "address",
      },
    ],
    name: "PaymentMade",
    type: "event",
  },
  {
    inputs: [],
    name: "agreementStatus",
    outputs: [
      {
        internalType: "enum Agreement.AgreementStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "close",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "requiredAmount",
        type: "uint256",
      },
    ],
    name: "collectTokens",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractType",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currency",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_paymentAddress",
        type: "address",
      },
    ],
    name: "employeeEnterContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "employeeId",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "employerAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "employerId",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paymentAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "suspend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000d2738038062000d27833981016040819052620000349162000188565b6000620000428682620002d0565b506001620000518582620002d0565b50600280546001600160a01b0319166001600160a01b0385811691909117909155600480546001600160a81b0319169184169190911790556005620000978282620002d0565b5050505050506200039c565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620000cb57600080fd5b81516001600160401b0380821115620000e857620000e8620000a3565b604051601f8301601f19908116603f01168101908282118183101715620001135762000113620000a3565b81604052838152602092508660208588010111156200013157600080fd5b600091505b8382101562000155578582018301518183018401529082019062000136565b6000602085830101528094505050505092915050565b80516001600160a01b03811681146200018357600080fd5b919050565b600080600080600060a08688031215620001a157600080fd5b85516001600160401b0380821115620001b957600080fd5b620001c789838a01620000b9565b96506020880151915080821115620001de57600080fd5b620001ec89838a01620000b9565b9550620001fc604089016200016b565b94506200020c606089016200016b565b935060808801519150808211156200022357600080fd5b506200023288828901620000b9565b9150509295509295909350565b600181811c908216806200025457607f821691505b6020821081036200027557634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002cb576000816000526020600020601f850160051c81016020861015620002a65750805b601f850160051c820191505b81811015620002c757828155600101620002b2565b5050505b505050565b81516001600160401b03811115620002ec57620002ec620000a3565b6200030481620002fd84546200023f565b846200027b565b602080601f8311600181146200033c5760008415620003235750858301515b600019600386901b1c1916600185901b178555620002c7565b600085815260208120601f198616915b828110156200036d578886015182559484019460019091019084016200034c565b50858210156200038c5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61097b80620003ac6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806384ab30a51161008c578063e5a6b10f11610066578063e5a6b10f1461019d578063e6400bbe146101b0578063ea8a1af0146101b8578063ef838f88146101c057600080fd5b806384ab30a51461016d57806398b9f00414610182578063cb2ef6f71461019557600080fd5b80630d0175a9146100d457806310ccb04c1461010457806324600fc3146101255780633fb4fe6f1461012f57806343d726d614610152578063633423be1461015a575b600080fd5b6002546100e7906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b60045461011890600160a01b900460ff1681565b6040516100fb919061075d565b61012d6101c8565b005b61014261013d3660046107a1565b6101fd565b60405190151581526020016100fb565b61012d6103f1565b6003546100e7906001600160a01b031681565b610175610473565b6040516100fb91906107cb565b61012d61019036600461081a565b610501565b6101756105b1565b6004546100e7906001600160a01b031681565b61012d6105be565b61012d6106b9565b61017561073a565b6002546001600160a01b031633146101fb5760405162461bcd60e51b81526004016101f29061083c565b60405180910390fd5b565b604051636eb1769f60e11b8152336004820152306024820152600090839083906001600160a01b0383169063dd62ed3e90604401602060405180830381865afa15801561024e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102729190610888565b10156102c05760405162461bcd60e51b815260206004820152601c60248201527f496e73756666696369656e7420746f6b656e20616c6c6f77616e63650000000060448201526064016101f2565b6040516370a0823160e01b815233600482015283906001600160a01b038316906370a0823190602401602060405180830381865afa158015610306573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032a9190610888565b101561036f5760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b60448201526064016101f2565b6040516323b872dd60e01b8152336004820152306024820152604481018490526001600160a01b038216906323b872dd906064016020604051808303816000875af11580156103c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103e691906108a1565b506001949350505050565b6002546001600160a01b0316331461041b5760405162461bcd60e51b81526004016101f29061083c565b600360048054600160a01b900460ff169081111561043b5761043b610747565b036104585760405162461bcd60e51b81526004016101f2906108c3565b60048054819060ff60a01b1916600160a01b825b0217905550565b600180546104809061090b565b80601f01602080910402602001604051908101604052809291908181526020018280546104ac9061090b565b80156104f95780601f106104ce576101008083540402835291602001916104f9565b820191906000526020600020905b8154815290600101906020018083116104dc57829003601f168201915b505050505081565b600060048054600160a01b900460ff169081111561052157610521610747565b146105795760405162461bcd60e51b815260206004820152602260248201527f5468697320636f6e7472616374206973206e6f206c6f6e6765722070656e64696044820152616e6760f01b60648201526084016101f2565b600380546001600160a01b0319166001600160a01b038316179055600480546001919060ff60a01b1916600160a01b83021790555050565b600580546104809061090b565b6002546001600160a01b031633146105e85760405162461bcd60e51b81526004016101f29061083c565b600360048054600160a01b900460ff169081111561060857610608610747565b036106255760405162461bcd60e51b81526004016101f2906108c3565b6004808054600160a01b900460ff169081111561064457610644610747565b0361069f5760405162461bcd60e51b815260206004820152602560248201527f5468697320636f6e74726163742068617320616c7265616479206265656e20636044820152641b1bdcd95960da1b60648201526084016101f2565b600480546002919060ff60a01b1916600160a01b8361046c565b6002546001600160a01b031633146106e35760405162461bcd60e51b81526004016101f29061083c565b600360048054600160a01b900460ff169081111561070357610703610747565b036107205760405162461bcd60e51b81526004016101f2906108c3565b600480546003919060ff60a01b1916600160a01b8361046c565b600080546104809061090b565b634e487b7160e01b600052602160045260246000fd5b602081016005831061077f57634e487b7160e01b600052602160045260246000fd5b91905290565b80356001600160a01b038116811461079c57600080fd5b919050565b600080604083850312156107b457600080fd5b6107bd83610785565b946020939093013593505050565b60006020808352835180602085015260005b818110156107f9578581018301518582016040015282016107dd565b506000604082860101526040601f19601f8301168501019250505092915050565b60006020828403121561082c57600080fd5b61083582610785565b9392505050565b6020808252602c908201527f596f7520617265206e6f7420616c6c6f77656420746f206361727279206f757460408201526b103a3434b99030b1ba34b7b760a11b606082015260800190565b60006020828403121561089a57600080fd5b5051919050565b6000602082840312156108b357600080fd5b8151801515811461083557600080fd5b60208082526028908201527f5468697320636f6e74726163742068617320616c7265616479206265656e2063604082015267185b98d95b1b195960c21b606082015260800190565b600181811c9082168061091f57607f821691505b60208210810361093f57634e487b7160e01b600052602260045260246000fd5b5091905056fea2646970667358221220e24eb1e1fd45ddce07a10b0f484f2ba3d13a9b3a4f62978b876d6b25557ce0c564736f6c63430008180033";

type AgreementConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AgreementConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Agreement__factory extends ContractFactory {
  constructor(...args: AgreementConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _employerId: string,
    _employeeId: string,
    _employerAddress: AddressLike,
    _currency: AddressLike,
    _contractType: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _employerId,
      _employeeId,
      _employerAddress,
      _currency,
      _contractType,
      overrides || {}
    );
  }
  override deploy(
    _employerId: string,
    _employeeId: string,
    _employerAddress: AddressLike,
    _currency: AddressLike,
    _contractType: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _employerId,
      _employeeId,
      _employerAddress,
      _currency,
      _contractType,
      overrides || {}
    ) as Promise<
      Agreement & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Agreement__factory {
    return super.connect(runner) as Agreement__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AgreementInterface {
    return new Interface(_abi) as AgreementInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Agreement {
    return new Contract(address, _abi, runner) as unknown as Agreement;
  }
}
