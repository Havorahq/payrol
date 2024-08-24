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
import type { NonPayableOverrides } from "../../../common";
import type {
  BatchPayments,
  BatchPaymentsInterface,
} from "../../../contracts/Batch.sol/BatchPayments";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "contractType",
            type: "string",
          },
          {
            internalType: "address",
            name: "agreementAddress",
            type: "address",
          },
        ],
        internalType: "struct BatchPayments.Agreement[]",
        name: "_agreements",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_contractType",
        type: "string",
      },
      {
        internalType: "address",
        name: "_agreementAddress",
        type: "address",
      },
    ],
    name: "addAgreement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "agreements",
    outputs: [
      {
        internalType: "string",
        name: "contractType",
        type: "string",
      },
      {
        internalType: "address",
        name: "agreementAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getContractAtIndex",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "contractType",
            type: "string",
          },
          {
            internalType: "address",
            name: "agreementAddress",
            type: "address",
          },
        ],
        internalType: "struct BatchPayments.Agreement",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContracts",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "contractType",
            type: "string",
          },
          {
            internalType: "address",
            name: "agreementAddress",
            type: "address",
          },
        ],
        internalType: "struct BatchPayments.Agreement[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    name: "performBatchPayments",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenAddress",
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
    name: "used",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526002805460ff191690553480156200001b57600080fd5b5060405162000f5738038062000f578339810160408190526200003e9162000193565b600080546001600160a01b03191633178155600280546001600160a01b03841661010002610100600160a81b03199091161790555b8251811015620000f95760018382815181106200009457620000946200032e565b60209081029190910181015182546001810184556000938452919092208251600290920201908190620000c89082620003d5565b5060209190910151600191820180546001600160a01b0319166001600160a01b039092169190911790550162000073565b505050620004a1565b634e487b7160e01b600052604160045260246000fd5b604080519081016001600160401b03811182821017156200013d576200013d62000102565b60405290565b604051601f8201601f191681016001600160401b03811182821017156200016e576200016e62000102565b604052919050565b80516001600160a01b03811681146200018e57600080fd5b919050565b60008060408385031215620001a757600080fd5b82516001600160401b0380821115620001bf57600080fd5b818501915085601f830112620001d457600080fd5b8151602082821115620001eb57620001eb62000102565b8160051b620001fc82820162000143565b928352848101820192828101908a8511156200021757600080fd5b83870192505b848310156200030f578251868111156200023657600080fd5b8701601f196040828e03820112156200024e57600080fd5b6200025862000118565b86830151898111156200026a57600080fd5b8301603f81018f136200027c57600080fd5b878101518a81111562000293576200029362000102565b620002a58985601f8401160162000143565b93508084528f6040828401011115620002bd57600080fd5b60005b81811015620002de57828101604001518582018b01528901620002c0565b50600090840189015250818152620002f96040840162000176565b818801528452505091830191908301906200021d565b97506200032191505087820162000176565b9450505050509250929050565b634e487b7160e01b600052603260045260246000fd5b600181811c908216806200035957607f821691505b6020821081036200037a57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620003d0576000816000526020600020601f850160051c81016020861015620003ab5750805b601f850160051c820191505b81811015620003cc57828155600101620003b7565b5050505b505050565b81516001600160401b03811115620003f157620003f162000102565b620004098162000402845462000344565b8462000380565b602080601f831160018114620004415760008415620004285750858301515b600019600386901b1c1916600185901b178555620003cc565b600085815260208120601f198616915b82811015620004725788860151825594840194600190910190840162000451565b5085821015620004915787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610aa680620004b16000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80638da5cb5b116100665780638da5cb5b146100df5780639b534f181461010a5780639d76ea581461012a578063bd14de9614610142578063c3a2a93a1461016357600080fd5b806324600fc3146100985780633f26781e146100a257806363898e2b146100aa57806364b65f6e146100cc575b600080fd5b6100a0610178565b005b6100a06101ad565b6002546100b79060ff1681565b60405190151581526020015b60405180910390f35b6100a06100da3660046106af565b61030c565b6000546100f2906001600160a01b031681565b6040516001600160a01b0390911681526020016100c3565b61011d610118366004610771565b6103c6565b6040516100c39190610802565b6002546100f29061010090046001600160a01b031681565b610155610150366004610771565b6104b4565b6040516100c392919061081c565b61016b610579565b6040516100c39190610846565b6000546001600160a01b031633146101ab5760405162461bcd60e51b81526004016101a2906108aa565b60405180910390fd5b565b6000546001600160a01b031633146101d75760405162461bcd60e51b81526004016101a2906108aa565b60025460ff16156102445760405162461bcd60e51b815260206004820152603160248201527f746865206261746368207061796d656e747320636f6e74726163742068617320604482015270185b1c9958591e481899595b881d5cd959607a1b60648201526084016101a2565b60028054600160ff1990911617908190556040516370a0823160e01b81523060048201526101009091046001600160a01b03169060009082906370a0823190602401602060405180830381865afa1580156102a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102c791906108f6565b116103095760405162461bcd60e51b81526020600482015260126024820152714e6f7420656e6f7567682062616c616e636560701b60448201526064016101a2565b50565b6000546001600160a01b031633146103365760405162461bcd60e51b81526004016101a2906108aa565b604080518082019091528281526001600160a01b0382166020820152600180548082018255600091909152815182916002027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601908190610397908261099a565b5060209190910151600190910180546001600160a01b0319166001600160a01b03909216919091179055505050565b604080518082019091526060815260006020820152600182815481106103ee576103ee610a5a565b90600052602060002090600202016040518060400160405290816000820180546104179061090f565b80601f01602080910402602001604051908101604052809291908181526020018280546104439061090f565b80156104905780601f1061046557610100808354040283529160200191610490565b820191906000526020600020905b81548152906001019060200180831161047357829003601f168201915b5050509183525050600191909101546001600160a01b031660209091015292915050565b600181815481106104c457600080fd5b90600052602060002090600202016000915090508060000180546104e79061090f565b80601f01602080910402602001604051908101604052809291908181526020018280546105139061090f565b80156105605780601f1061053557610100808354040283529160200191610560565b820191906000526020600020905b81548152906001019060200180831161054357829003601f168201915b505050600190930154919250506001600160a01b031682565b60606001805480602002602001604051908101604052809291908181526020016000905b8282101561067457838290600052602060002090600202016040518060400160405290816000820180546105d09061090f565b80601f01602080910402602001604051908101604052809291908181526020018280546105fc9061090f565b80156106495780601f1061061e57610100808354040283529160200191610649565b820191906000526020600020905b81548152906001019060200180831161062c57829003601f168201915b50505091835250506001918201546001600160a01b031660209182015291835292909201910161059d565b50505050905090565b634e487b7160e01b600052604160045260246000fd5b80356001600160a01b03811681146106aa57600080fd5b919050565b600080604083850312156106c257600080fd5b823567ffffffffffffffff808211156106da57600080fd5b818501915085601f8301126106ee57600080fd5b8135818111156107005761070061067d565b604051601f8201601f19908116603f011681019083821181831017156107285761072861067d565b8160405282815288602084870101111561074157600080fd5b82602086016020830137600060208483010152809650505050505061076860208401610693565b90509250929050565b60006020828403121561078357600080fd5b5035919050565b6000815180845260005b818110156107b057602081850181015186830182015201610794565b506000602082860101526020601f19601f83011685010191505092915050565b60008151604084526107e5604085018261078a565b6020938401516001600160a01b0316949093019390935250919050565b60208152600061081560208301846107d0565b9392505050565b60408152600061082f604083018561078a565b905060018060a01b03831660208301529392505050565b600060208083016020845280855180835260408601915060408160051b87010192506020870160005b8281101561089d57603f1988860301845261088b8583516107d0565b9450928501929085019060010161086f565b5092979650505050505050565b6020808252602c908201527f596f7520617265206e6f7420616c6c6f77656420746f206361727279206f757460408201526b103a3434b99030b1ba34b7b760a11b606082015260800190565b60006020828403121561090857600080fd5b5051919050565b600181811c9082168061092357607f821691505b60208210810361094357634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610995576000816000526020600020601f850160051c810160208610156109725750805b601f850160051c820191505b818110156109915782815560010161097e565b5050505b505050565b815167ffffffffffffffff8111156109b4576109b461067d565b6109c8816109c2845461090f565b84610949565b602080601f8311600181146109fd57600084156109e55750858301515b600019600386901b1c1916600185901b178555610991565b600085815260208120601f198616915b82811015610a2c57888601518255948401946001909101908401610a0d565b5085821015610a4a5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220622c4fdd69aa7db61910a43b5389d10abfebc5a6fa4bd5e2ac2fc1f9c319f75864736f6c63430008180033";

type BatchPaymentsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BatchPaymentsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BatchPayments__factory extends ContractFactory {
  constructor(...args: BatchPaymentsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _agreements: BatchPayments.AgreementStruct[],
    _tokenAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _agreements,
      _tokenAddress,
      overrides || {}
    );
  }
  override deploy(
    _agreements: BatchPayments.AgreementStruct[],
    _tokenAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_agreements, _tokenAddress, overrides || {}) as Promise<
      BatchPayments & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BatchPayments__factory {
    return super.connect(runner) as BatchPayments__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BatchPaymentsInterface {
    return new Interface(_abi) as BatchPaymentsInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): BatchPayments {
    return new Contract(address, _abi, runner) as unknown as BatchPayments;
  }
}
