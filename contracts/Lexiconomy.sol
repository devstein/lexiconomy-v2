//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./LemmaToken.sol";

contract Lexiconomy is LemmaToken {
    /// @dev Donation event for donors because they deserve it
    event Donation(address indexed donor);

    /// @notice Creates the main Lexiconomy smart contract instance.
    constructor(address _pricer, address _lemmaValidator) {
        // Starts paused.
        pause();
        setPricer(_pricer);
        setLemmaValidator(_lemmaValidator);
    }

    /// @notice Thank you :)
    function donate() external payable {
        require(msg.value > 0);
        emit Donation(msg.sender);
    }
}
