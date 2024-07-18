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
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  PayAsYouGoAgreement,
  PayAsYouGoAgreementInterface,
} from "../PayAsYouGoAgreement";

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
        internalType: "uint256",
        name: "_monthlyPayment",
        type: "uint256",
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
        name: "employeeAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "employerAddress",
        type: "address",
      },
    ],
    name: "PayAsYouGoPaymentMade",
    type: "event",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "payments",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "payeeAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sendPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMonthlyPayment",
        type: "uint256",
      },
    ],
    name: "setMonthlyPayments",
    outputs: [],
    stateMutability: "nonpayable",
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
  "0x60806040523480156200001157600080fd5b5060405162001cd238038062001cd28339818101604052810190620000379190620003a1565b848484846040518060400160405280600d81526020017f70617920617320796f7520676f000000000000000000000000000000000000008152508460009081620000829190620006a8565b508360019081620000949190620006a8565b5082600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600460146101000a81548160ff0219169083600481111562000140576200013f6200078f565b5b02179055508060059081620001569190620006a8565b505050505050806007819055505050505050620007be565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001d7826200018c565b810181811067ffffffffffffffff82111715620001f957620001f86200019d565b5b80604052505050565b60006200020e6200016e565b90506200021c8282620001cc565b919050565b600067ffffffffffffffff8211156200023f576200023e6200019d565b5b6200024a826200018c565b9050602081019050919050565b60005b83811015620002775780820151818401526020810190506200025a565b60008484015250505050565b60006200029a620002948462000221565b62000202565b905082815260208101848484011115620002b957620002b862000187565b5b620002c684828562000257565b509392505050565b600082601f830112620002e657620002e562000182565b5b8151620002f884826020860162000283565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200032e8262000301565b9050919050565b620003408162000321565b81146200034c57600080fd5b50565b600081519050620003608162000335565b92915050565b6000819050919050565b6200037b8162000366565b81146200038757600080fd5b50565b6000815190506200039b8162000370565b92915050565b600080600080600060a08688031215620003c057620003bf62000178565b5b600086015167ffffffffffffffff811115620003e157620003e06200017d565b5b620003ef88828901620002ce565b955050602086015167ffffffffffffffff8111156200041357620004126200017d565b5b6200042188828901620002ce565b945050604062000434888289016200034f565b935050606062000447888289016200034f565b92505060806200045a888289016200038a565b9150509295509295909350565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620004ba57607f821691505b602082108103620004d057620004cf62000472565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200053a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620004fb565b620005468683620004fb565b95508019841693508086168417925050509392505050565b6000819050919050565b600062000589620005836200057d8462000366565b6200055e565b62000366565b9050919050565b6000819050919050565b620005a58362000568565b620005bd620005b48262000590565b84845462000508565b825550505050565b600090565b620005d4620005c5565b620005e18184846200059a565b505050565b5b818110156200060957620005fd600082620005ca565b600181019050620005e7565b5050565b601f82111562000658576200062281620004d6565b6200062d84620004eb565b810160208510156200063d578190505b620006556200064c85620004eb565b830182620005e6565b50505b505050565b600082821c905092915050565b60006200067d600019846008026200065d565b1980831691505092915050565b60006200069883836200066a565b9150826002028217905092915050565b620006b38262000467565b67ffffffffffffffff811115620006cf57620006ce6200019d565b5b620006db8254620004a1565b620006e88282856200060d565b600060209050601f8311600181146200072057600084156200070b578287015190505b6200071785826200068a565b86555062000787565b601f1984166200073086620004d6565b60005b828110156200075a5784890151825560018201915060208501945060208101905062000733565b868310156200077a578489015162000776601f8916826200066a565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b61150480620007ce6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806387d8178911610097578063e5a6b10f11610066578063e5a6b10f14610217578063e6400bbe14610235578063ea8a1af01461023f578063ef838f8814610249576100f5565b806387d817891461019057806398b9f004146101c1578063cb2ef6f7146101dd578063da860f1b146101fb576100f5565b806343d726d6116100d357806343d726d614610140578063633423be1461014a5780636720ceb11461016857806384ab30a514610172576100f5565b80630d0175a9146100fa57806310ccb04c1461011857806324600fc314610136575b600080fd5b610102610267565b60405161010f9190610e42565b60405180910390f35b61012061028d565b60405161012d9190610ed4565b60405180910390f35b61013e6102a0565b005b610148610332565b005b610152610464565b60405161015f9190610e42565b60405180910390f35b61017061048a565b005b61017a6106a1565b6040516101879190610f7f565b60405180910390f35b6101aa60048036038101906101a59190610fdc565b61072f565b6040516101b8929190611018565b60405180910390f35b6101db60048036038101906101d6919061106d565b610783565b005b6101e5610868565b6040516101f29190610f7f565b60405180910390f35b61021560048036038101906102109190610fdc565b6108f6565b005b61021f610989565b60405161022c9190610e42565b60405180910390f35b61023d6109af565b005b610247610b57565b005b610251610c8a565b60405161025e9190610f7f565b60405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460149054906101000a900460ff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610330576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103279061110c565b60405180910390fd5b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103b99061110c565b60405180910390fd5b600360048111156103d6576103d5610e5d565b5b600460149054906101000a900460ff1660048111156103f8576103f7610e5d565b5b03610438576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042f9061119e565b60405180910390fd5b60048060146101000a81548160ff0219169083600481111561045d5761045c610e5d565b5b0217905550565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461051a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105119061110c565b60405180910390fd5b6001600481111561052e5761052d610e5d565b5b600460149054906101000a900460ff1660048111156105505761054f610e5d565b5b14610590576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058790611230565b60405180910390fd5b6105be600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600754610d18565b3073ffffffffffffffffffffffffffffffffffffffff167f960f80c1468168314e9bb3daa45c4819ef0a7969615e253bbc73477997b1eb5860405160405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f433731019d78f9808cedc4435fc0eefc894b9a6f2147b6afbc20d284fe41955c60405160405180910390a3565b600180546106ae9061127f565b80601f01602080910402602001604051908101604052809291908181526020018280546106da9061127f565b80156107275780601f106106fc57610100808354040283529160200191610727565b820191906000526020600020905b81548152906001019060200180831161070a57829003601f168201915b505050505081565b6006818154811061073f57600080fd5b90600052602060002090600202016000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b6000600481111561079757610796610e5d565b5b600460149054906101000a900460ff1660048111156107b9576107b8610e5d565b5b146107f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107f090611322565b60405180910390fd5b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600460146101000a81548160ff021916908360048111156108605761085f610e5d565b5b021790555050565b600580546108759061127f565b80601f01602080910402602001604051908101604052809291908181526020018280546108a19061127f565b80156108ee5780601f106108c3576101008083540402835291602001916108ee565b820191906000526020600020905b8154815290600101906020018083116108d157829003601f168201915b505050505081565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610986576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097d9061110c565b60405180910390fd5b50565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a3f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a369061110c565b60405180910390fd5b60036004811115610a5357610a52610e5d565b5b600460149054906101000a900460ff166004811115610a7557610a74610e5d565b5b03610ab5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aac9061119e565b60405180910390fd5b600480811115610ac857610ac7610e5d565b5b600460149054906101000a900460ff166004811115610aea57610ae9610e5d565b5b03610b2a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b21906113b4565b60405180910390fd5b6002600460146101000a81548160ff02191690836004811115610b5057610b4f610e5d565b5b0217905550565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610be7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bde9061110c565b60405180910390fd5b60036004811115610bfb57610bfa610e5d565b5b600460149054906101000a900460ff166004811115610c1d57610c1c610e5d565b5b03610c5d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c549061119e565b60405180910390fd5b6003600460146101000a81548160ff02191690836004811115610c8357610c82610e5d565b5b0217905550565b60008054610c979061127f565b80601f0160208091040260200160405190810160405280929190818152602001828054610cc39061127f565b8015610d105780601f10610ce557610100808354040283529160200191610d10565b820191906000526020600020905b815481529060010190602001808311610cf357829003601f168201915b505050505081565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84846040518363ffffffff1660e01b8152600401610d7a9291906113d4565b6020604051808303816000875af1158015610d99573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dbd9190611435565b610dfc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610df3906114ae565b60405180910390fd5b505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e2c82610e01565b9050919050565b610e3c81610e21565b82525050565b6000602082019050610e576000830184610e33565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60058110610e9d57610e9c610e5d565b5b50565b6000819050610eae82610e8c565b919050565b6000610ebe82610ea0565b9050919050565b610ece81610eb3565b82525050565b6000602082019050610ee96000830184610ec5565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610f29578082015181840152602081019050610f0e565b60008484015250505050565b6000601f19601f8301169050919050565b6000610f5182610eef565b610f5b8185610efa565b9350610f6b818560208601610f0b565b610f7481610f35565b840191505092915050565b60006020820190508181036000830152610f998184610f46565b905092915050565b600080fd5b6000819050919050565b610fb981610fa6565b8114610fc457600080fd5b50565b600081359050610fd681610fb0565b92915050565b600060208284031215610ff257610ff1610fa1565b5b600061100084828501610fc7565b91505092915050565b61101281610fa6565b82525050565b600060408201905061102d6000830185611009565b61103a6020830184610e33565b9392505050565b61104a81610e21565b811461105557600080fd5b50565b60008135905061106781611041565b92915050565b60006020828403121561108357611082610fa1565b5b600061109184828501611058565b91505092915050565b7f596f7520617265206e6f7420616c6c6f77656420746f206361727279206f757460008201527f207468697320616374696f6e0000000000000000000000000000000000000000602082015250565b60006110f6602c83610efa565b91506111018261109a565b604082019050919050565b60006020820190508181036000830152611125816110e9565b9050919050565b7f5468697320636f6e74726163742068617320616c7265616479206265656e206360008201527f616e63656c6c6564000000000000000000000000000000000000000000000000602082015250565b6000611188602883610efa565b91506111938261112c565b604082019050919050565b600060208201905081810360008301526111b78161117b565b9050919050565b7f5468697320636f6e7472616374206973206e6f206c6f6e67657220616374697660008201527f6500000000000000000000000000000000000000000000000000000000000000602082015250565b600061121a602183610efa565b9150611225826111be565b604082019050919050565b600060208201905081810360008301526112498161120d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061129757607f821691505b6020821081036112aa576112a9611250565b5b50919050565b7f5468697320636f6e7472616374206973206e6f206c6f6e6765722070656e646960008201527f6e67000000000000000000000000000000000000000000000000000000000000602082015250565b600061130c602283610efa565b9150611317826112b0565b604082019050919050565b6000602082019050818103600083015261133b816112ff565b9050919050565b7f5468697320636f6e74726163742068617320616c7265616479206265656e206360008201527f6c6f736564000000000000000000000000000000000000000000000000000000602082015250565b600061139e602583610efa565b91506113a982611342565b604082019050919050565b600060208201905081810360008301526113cd81611391565b9050919050565b60006040820190506113e96000830185610e33565b6113f66020830184611009565b9392505050565b60008115159050919050565b611412816113fd565b811461141d57600080fd5b50565b60008151905061142f81611409565b92915050565b60006020828403121561144b5761144a610fa1565b5b600061145984828501611420565b91505092915050565b7f546f6b656e207472616e73666572206661696c65640000000000000000000000600082015250565b6000611498601583610efa565b91506114a382611462565b602082019050919050565b600060208201905081810360008301526114c78161148b565b905091905056fea264697066735822122045abe6d9983ae8bffbfa603eda83069ed8e661f8a76ddfb33c5065806f1973ea64736f6c63430008180033";

type PayAsYouGoAgreementConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PayAsYouGoAgreementConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PayAsYouGoAgreement__factory extends ContractFactory {
  constructor(...args: PayAsYouGoAgreementConstructorParams) {
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
    _monthlyPayment: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _employerId,
      _employeeId,
      _employerAddress,
      _currency,
      _monthlyPayment,
      overrides || {}
    );
  }
  override deploy(
    _employerId: string,
    _employeeId: string,
    _employerAddress: AddressLike,
    _currency: AddressLike,
    _monthlyPayment: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _employerId,
      _employeeId,
      _employerAddress,
      _currency,
      _monthlyPayment,
      overrides || {}
    ) as Promise<
      PayAsYouGoAgreement & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): PayAsYouGoAgreement__factory {
    return super.connect(runner) as PayAsYouGoAgreement__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PayAsYouGoAgreementInterface {
    return new Interface(_abi) as PayAsYouGoAgreementInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PayAsYouGoAgreement {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as PayAsYouGoAgreement;
  }
}
