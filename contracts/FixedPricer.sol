//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Pricer.sol";

/// @title An implementation of the Pricer interface, which returns a fixed price.
/// @author Devin Stein
/// @notice This is used to get the minting fee in the Lexiconomy. Only the owner can update the price.
contract FixedPricer is Pricer, Ownable {
  bytes4 public constant interfaceId = type(Pricer).interfaceId;
  uint256 private currentPrice;

  constructor(uint256 _price) {
    currentPrice = _price;
  }

  function supportsInterface(bytes4 _interfaceId)
    public
    view
    virtual
    override(IERC165)
    returns (bool)
  {
    return
      _interfaceId == interfaceId || _interfaceId == type(IERC165).interfaceId;
  }

  /// @dev Must be a function to match the Pricer interface
  /// @return return the current price
  function price() external view returns (uint256) {
    return currentPrice;
  }

  /// @dev Allows the owner of the contract to set the current price
  function setPrice(uint256 _price) public onlyOwner {
    currentPrice = _price;
  }
}
