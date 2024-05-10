// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class VehicleCertificationCanceled extends ethereum.Event {
  get params(): VehicleCertificationCanceled__Params {
    return new VehicleCertificationCanceled__Params(this);
  }
}

export class VehicleCertificationCanceled__Params {
  _event: VehicleCertificationCanceled;

  constructor(event: VehicleCertificationCanceled) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get vehicleId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get authority(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class VehicleCertificationCreated extends ethereum.Event {
  get params(): VehicleCertificationCreated__Params {
    return new VehicleCertificationCreated__Params(this);
  }
}

export class VehicleCertificationCreated__Params {
  _event: VehicleCertificationCreated;

  constructor(event: VehicleCertificationCreated) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get code(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get vehicleId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get authority(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get uri(): string {
    return this._event.parameters[4].value.toString();
  }
}

export class VehicleTokenCreated extends ethereum.Event {
  get params(): VehicleTokenCreated__Params {
    return new VehicleTokenCreated__Params(this);
  }
}

export class VehicleTokenCreated__Params {
  _event: VehicleTokenCreated;

  constructor(event: VehicleTokenCreated) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get creator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get uri(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class VehicleRegistrationToken__getVehicleTokenResultValue0Struct extends ethereum.Tuple {
  get tokenId(): BigInt {
    return this[0].toBigInt();
  }

  get mintingAuthority(): Address {
    return this[1].toAddress();
  }
}

export class VehicleRegistrationToken extends ethereum.SmartContract {
  static bind(address: Address): VehicleRegistrationToken {
    return new VehicleRegistrationToken("VehicleRegistrationToken", address);
  }

  addCertification(
    vehicleId: BigInt,
    code: BigInt,
    certificationURI: string,
  ): BigInt {
    let result = super.call(
      "addCertification",
      "addCertification(uint256,uint256,string):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(vehicleId),
        ethereum.Value.fromUnsignedBigInt(code),
        ethereum.Value.fromString(certificationURI),
      ],
    );

    return result[0].toBigInt();
  }

  try_addCertification(
    vehicleId: BigInt,
    code: BigInt,
    certificationURI: string,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "addCertification",
      "addCertification(uint256,uint256,string):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(vehicleId),
        ethereum.Value.fromUnsignedBigInt(code),
        ethereum.Value.fromString(certificationURI),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner),
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  certificationExists(key: BigInt): boolean {
    let result = super.call(
      "certificationExists",
      "certificationExists(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(key)],
    );

    return result[0].toBoolean();
  }

  try_certificationExists(key: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "certificationExists",
      "certificationExists(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(key)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getVehicleToken(
    tokenId: BigInt,
  ): VehicleRegistrationToken__getVehicleTokenResultValue0Struct {
    let result = super.call(
      "getVehicleToken",
      "getVehicleToken(uint256):((uint256,address))",
      [ethereum.Value.fromUnsignedBigInt(tokenId)],
    );

    return changetype<VehicleRegistrationToken__getVehicleTokenResultValue0Struct>(
      result[0].toTuple(),
    );
  }

  try_getVehicleToken(
    tokenId: BigInt,
  ): ethereum.CallResult<VehicleRegistrationToken__getVehicleTokenResultValue0Struct> {
    let result = super.tryCall(
      "getVehicleToken",
      "getVehicleToken(uint256):((uint256,address))",
      [ethereum.Value.fromUnsignedBigInt(tokenId)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<VehicleRegistrationToken__getVehicleTokenResultValue0Struct>(
        value[0].toTuple(),
      ),
    );
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)],
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isURIUsed(tokenURI: string): boolean {
    let result = super.call("isURIUsed", "isURIUsed(string):(bool)", [
      ethereum.Value.fromString(tokenURI),
    ]);

    return result[0].toBoolean();
  }

  try_isURIUsed(tokenURI: string): ethereum.CallResult<boolean> {
    let result = super.tryCall("isURIUsed", "isURIUsed(string):(bool)", [
      ethereum.Value.fromString(tokenURI),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  mintToken(tokenURI: string): BigInt {
    let result = super.call("mintToken", "mintToken(string):(uint256)", [
      ethereum.Value.fromString(tokenURI),
    ]);

    return result[0].toBigInt();
  }

  try_mintToken(tokenURI: string): ethereum.CallResult<BigInt> {
    let result = super.tryCall("mintToken", "mintToken(string):(uint256)", [
      ethereum.Value.fromString(tokenURI),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)],
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenExists(key: BigInt): boolean {
    let result = super.call("tokenExists", "tokenExists(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(key),
    ]);

    return result[0].toBoolean();
  }

  try_tokenExists(key: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("tokenExists", "tokenExists(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(key),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddCertificationCall extends ethereum.Call {
  get inputs(): AddCertificationCall__Inputs {
    return new AddCertificationCall__Inputs(this);
  }

  get outputs(): AddCertificationCall__Outputs {
    return new AddCertificationCall__Outputs(this);
  }
}

export class AddCertificationCall__Inputs {
  _call: AddCertificationCall;

  constructor(call: AddCertificationCall) {
    this._call = call;
  }

  get vehicleId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get code(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get certificationURI(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class AddCertificationCall__Outputs {
  _call: AddCertificationCall;

  constructor(call: AddCertificationCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class DeleteCertificationCall extends ethereum.Call {
  get inputs(): DeleteCertificationCall__Inputs {
    return new DeleteCertificationCall__Inputs(this);
  }

  get outputs(): DeleteCertificationCall__Outputs {
    return new DeleteCertificationCall__Outputs(this);
  }
}

export class DeleteCertificationCall__Inputs {
  _call: DeleteCertificationCall;

  constructor(call: DeleteCertificationCall) {
    this._call = call;
  }

  get certificationId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DeleteCertificationCall__Outputs {
  _call: DeleteCertificationCall;

  constructor(call: DeleteCertificationCall) {
    this._call = call;
  }
}

export class MintTokenCall extends ethereum.Call {
  get inputs(): MintTokenCall__Inputs {
    return new MintTokenCall__Inputs(this);
  }

  get outputs(): MintTokenCall__Outputs {
    return new MintTokenCall__Outputs(this);
  }
}

export class MintTokenCall__Inputs {
  _call: MintTokenCall;

  constructor(call: MintTokenCall) {
    this._call = call;
  }

  get tokenURI(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class MintTokenCall__Outputs {
  _call: MintTokenCall;

  constructor(call: MintTokenCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetMarketplaceAddressCall extends ethereum.Call {
  get inputs(): SetMarketplaceAddressCall__Inputs {
    return new SetMarketplaceAddressCall__Inputs(this);
  }

  get outputs(): SetMarketplaceAddressCall__Outputs {
    return new SetMarketplaceAddressCall__Outputs(this);
  }
}

export class SetMarketplaceAddressCall__Inputs {
  _call: SetMarketplaceAddressCall;

  constructor(call: SetMarketplaceAddressCall) {
    this._call = call;
  }

  get marketplaceAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetMarketplaceAddressCall__Outputs {
  _call: SetMarketplaceAddressCall;

  constructor(call: SetMarketplaceAddressCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
