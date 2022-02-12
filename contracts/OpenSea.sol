//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Taken from: https://github.com/ProjectOpenSea/opensea-creatures/blob/master/contracts/ERC721Tradable.sol
// to support easy trading on OpenSea
contract OwnableDelegateProxy {

}

contract ProxyRegistry {
  mapping(address => OwnableDelegateProxy) public proxies;
}
