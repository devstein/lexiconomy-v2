//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

/// @title The StringValidator checks if a given string is considered valid.
/// @author Devin Stein
/// @notice This is used to validate lemmas in the Lexiconomy.
/// @dev This gives flexibility on future validation strategies and potential bug fixes.
interface StringValidator is IERC165 {
  function valid(string memory _str) external view returns (bool);
}
