//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./LemmaToken.sol";

/// @title The Lexiconomy
/// @author Devin Stein
/// @dev This contract is simple wrapper over LemmaToken. It sets the Pricer and StringValidator contacts and initializes the contract in a paused state.
contract Lexiconomy is LemmaToken {
  /// @notice Creates the Lexiconomy
  /// @param _pricer is the address of the Pricer contract for minting fees
  /// @param _lemmaValidator is the address of the StringValidator for validating lemmas
  constructor(address _pricer, address _lemmaValidator) {
    // Starts paused.
    pause();
    setPricer(_pricer);
    setLemmaValidator(_lemmaValidator);
  }
}
