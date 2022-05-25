# LemmaValidator

*Devin Stein*

> The LemmaValidator checks if a lemma contains only lowercase letters and has no trailing or preceding whitespace.

This is the current lemma validation logic for the Lexiconomy. Only valid lemmas can be minted.

*This code formed the basis of the Unicode Ethereum Project (https://github.com/devstein/unicode-eth/), which is now imported.*

## Methods

### batchSetIllegalCharacters

```solidity
function batchSetIllegalCharacters(uint32[] _codePoints, bool _illegal) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _codePoints | uint32[] | undefined |
| _illegal | bool | undefined |

### batchSetWhitespaceCharacters

```solidity
function batchSetWhitespaceCharacters(uint32[] _codePoints, bool _whitespace) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _codePoints | uint32[] | undefined |
| _whitespace | bool | undefined |

### illegal

```solidity
function illegal(uint32) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

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

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### setIllegalCharacter

```solidity
function setIllegalCharacter(uint32 _codePoint, bool _illegal) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _codePoint | uint32 | undefined |
| _illegal | bool | undefined |

### setWhitespaceCharacter

```solidity
function setWhitespaceCharacter(uint32 _codePoint, bool _whitespace) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _codePoint | uint32 | undefined |
| _whitespace | bool | undefined |

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

### valid

```solidity
function valid(string _str) external view returns (bool)
```

Given a string, if it is considered valid

*Given a string, determine if all it&#39;s underlying UTF-8 Unicode characters are valid*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _str | string | The input string to validate |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### whitespace

```solidity
function whitespace(uint32) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |



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



