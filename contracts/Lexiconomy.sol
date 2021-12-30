//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./LemmaToken.sol";

contract Lexiconomy is LemmaToken {

  /// @dev Donation event for donors because they deserve it
  event Donation(address indexed donor);

    /// @notice Creates the main Lexiconomy smart contract instance.
    // TODO: Migration script
    // TODO: Set price contract on load
    constructor(address _pricer) {
        // Starts paused.
        // _pause();
        setPricer(_pricer);

        // invent the lexiconomy
        // uint256 lexiconomyId = 16346186601005818604545026402126349825711086327116502709577031182923613203716;
        // _inventLemma(msg.sender, lexiconomyId, 0, 0);
        // _defineLemma(lexiconomyId, "the world's decentralized dictionary.");
    }

    /// @notice Thank you :)
    function donate() external payable {
      require(msg.value > 0);
      emit Donation(msg.sender);
    }
}
