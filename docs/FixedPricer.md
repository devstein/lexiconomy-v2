# FixedPricer

*Devin Stein*

> An implementation of the Pricer interface, which returns a fixed price.

This is used to get the minting fee in the Lexiconomy. Only the owner can update the price.



## Methods

### interfaceId

```solidity
function interfaceId() external view returns (bytes4)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes4 | undefined |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### price

```solidity
function price() external view returns (uint256)
```



*Must be a function to match the Pricer interface*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | return the current price |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### setPrice

```solidity
function setPrice(uint256 _price) external nonpayable
```



*Allows the owner of the contract to set the current price*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _price | uint256 | undefined |

### supportsInterface

```solidity
function supportsInterface(bytes4 _interfaceId) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _interfaceId | bytes4 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |



## Events

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |



