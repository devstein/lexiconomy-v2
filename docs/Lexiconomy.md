# Lexiconomy

*Devin Stein*

> The Lexiconomy



*This contract is simple wrapper over LemmaToken. It sets the Pricer and StringValidator contacts and initializes the contract in a paused state.*

## Methods

### airdrop

```solidity
function airdrop(address to, string _lemma, string _definition, string _example) external nonpayable returns (uint256 tokenId)
```

Airdrop a new token to an address

*Used to migrating v1 tokens to their owners in the v2 lexiconomy. Only the owner can airdrop tokens.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | The address to airdrop the new token to |
| _lemma | string | The lemma to mint |
| _definition | string | The definition for the lemma |
| _example | string | The example for the lemma |

#### Returns

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | of the minted ERC721 token |

### approve

```solidity
function approve(address to, uint256 tokenId) external nonpayable
```



*See {IERC721-approve}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | undefined |
| tokenId | uint256 | undefined |

### balanceOf

```solidity
function balanceOf(address owner) external view returns (uint256)
```



*See {IERC721-balanceOf}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### contractURI

```solidity
function contractURI() external pure returns (string)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### definition

```solidity
function definition(uint256 tokenId, string _text) external nonpayable
```

Add a definition to an existing lemma

*named &#39;definition&#39; because &#39;define&#39; is a reserved keyword*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | The token to define |
| _text | string | The definition text |

### example

```solidity
function example(uint256 tokenId, string _text) external nonpayable
```

Add an example to an existing lemma



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | The token to define |
| _text | string | The example text |

### getApproved

```solidity
function getApproved(uint256 tokenId) external view returns (address)
```



*See {IERC721-getApproved}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### getTokenId

```solidity
function getTokenId(string _lemma) external pure returns (uint256)
```

Get the token ID for a given string

*Useful for getting the token ID of a lemma client-side*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _lemma | string | the string to get a token ID for |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The ERC721 token ID |

### isApprovedForAll

```solidity
function isApprovedForAll(address owner, address operator) external view returns (bool)
```



*See {IERC721-isApprovedForAll}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |
| operator | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### lemmaValid

```solidity
function lemmaValid(string _lemma) external view returns (bool)
```

lemmaValid checks if a given lemma string is valid

*Calls the LemmaValidator.valid method*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _lemma | string | the string to validate |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the lemma is valid; otherwise, false |

### lemmaValidator

```solidity
function lemmaValidator() external view returns (contract StringValidator)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract StringValidator | undefined |

### lemmas

```solidity
function lemmas(uint256) external view returns (string lemma, string definition, string example, uint256 number)
```

The lemmas mapping maintains all on-chain data for every token



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| lemma | string | undefined |
| definition | string | undefined |
| example | string | undefined |
| number | uint256 | undefined |

### mint

```solidity
function mint(string _lemma, string _definition, string _example) external payable returns (uint256 tokenId)
```

Mint a new token to the sender of the transaction

*All non-airdropped tokens are created by this method*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _lemma | string | The lemma to mint |
| _definition | string | The definition for the lemma |
| _example | string | The example for the lemma |

#### Returns

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | of the minted ERC721 token |

### mintFee

```solidity
function mintFee() external view returns (uint256)
```

mintFee returns the current minting fee




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The current minting fee |

### name

```solidity
function name() external view returns (string)
```



*See {IERC721Metadata-name}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### ownerOf

```solidity
function ownerOf(uint256 tokenId) external view returns (address)
```



*See {IERC721-ownerOf}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### pause

```solidity
function pause() external nonpayable
```






### paused

```solidity
function paused() external view returns (bool)
```



*Returns true if the contract is paused, and false otherwise.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### pricer

```solidity
function pricer() external view returns (contract Pricer)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Pricer | undefined |

### pricerInterfaceId

```solidity
function pricerInterfaceId() external view returns (bytes4)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes4 | undefined |

### proxyRegistryAddress

```solidity
function proxyRegistryAddress() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) external nonpayable
```



*See {IERC721-safeTransferFrom}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined |
| to | address | undefined |
| tokenId | uint256 | undefined |

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data) external nonpayable
```



*See {IERC721-safeTransferFrom}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined |
| to | address | undefined |
| tokenId | uint256 | undefined |
| _data | bytes | undefined |

### setApprovalForAll

```solidity
function setApprovalForAll(address operator, bool approved) external nonpayable
```



*See {IERC721-setApprovalForAll}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| operator | address | undefined |
| approved | bool | undefined |

### setLemmaValidator

```solidity
function setLemmaValidator(address _address) external nonpayable
```



*Allows the owner to update the LemmaValidator contract. This allows flexibility on the pricing strategies in the future*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _address | address | undefined |

### setPricer

```solidity
function setPricer(address _address) external nonpayable
```



*Allows the owner to update the Pricer contract. This allows flexibility on the pricing strategies in the future.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _address | address | undefined |

### setProxyRegistryAddress

```solidity
function setProxyRegistryAddress(address _address) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _address | address | undefined |

### stringValidatorInterfaceId

```solidity
function stringValidatorInterfaceId() external view returns (bytes4)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes4 | undefined |

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| interfaceId | bytes4 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### symbol

```solidity
function symbol() external view returns (string)
```



*See {IERC721Metadata-symbol}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### tokenByIndex

```solidity
function tokenByIndex(uint256 index) external view returns (uint256)
```



*See {IERC721Enumerable-tokenByIndex}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| index | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### tokenOfOwnerByIndex

```solidity
function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)
```



*See {IERC721Enumerable-tokenOfOwnerByIndex}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |
| index | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### tokenURI

```solidity
function tokenURI(uint256 tokenId) external view returns (string)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```



*See {IERC721Enumerable-totalSupply}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 tokenId) external nonpayable
```



*See {IERC721-transferFrom}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined |
| to | address | undefined |
| tokenId | uint256 | undefined |

### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |

### unpause

```solidity
function unpause() external nonpayable
```








## Events

### Approval

```solidity
event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| approved `indexed` | address | undefined |
| tokenId `indexed` | uint256 | undefined |

### ApprovalForAll

```solidity
event ApprovalForAll(address indexed owner, address indexed operator, bool approved)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| operator `indexed` | address | undefined |
| approved  | bool | undefined |

### Definition

```solidity
event Definition(address indexed owner, uint256 indexed tokenId, string definition)
```

Definition event whenever an owner defines or redefines their lemma



#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| tokenId `indexed` | uint256 | undefined |
| definition  | string | undefined |

### Example

```solidity
event Example(address indexed owner, uint256 indexed tokenId, string example)
```

Example event whenever an owner provides an example for their lemma



#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| tokenId `indexed` | uint256 | undefined |
| example  | string | undefined |

### Invent

```solidity
event Invent(address indexed owner, uint256 indexed tokenId, string lemma, uint256 number)
```

The Invent event is fired whenever a new lemma is invented



#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| tokenId `indexed` | uint256 | undefined |
| lemma  | string | undefined |
| number  | uint256 | undefined |

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |

### Paused

```solidity
event Paused(address account)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account  | address | undefined |

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| from `indexed` | address | undefined |
| to `indexed` | address | undefined |
| tokenId `indexed` | uint256 | undefined |

### Unpaused

```solidity
event Unpaused(address account)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account  | address | undefined |



