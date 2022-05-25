# StringValidator

*Devin Stein*

> The StringValidator checks if a given string is considered valid.

This is used to validate lemmas in the Lexiconomy.

*This gives flexibility on future validation strategies and potential bug fixes.*

## Methods

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool)
```



*Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section] to learn more about how these ids are created. This function call must use less than 30 000 gas.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| interfaceId | bytes4 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### valid

```solidity
function valid(string _str) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _str | string | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |




