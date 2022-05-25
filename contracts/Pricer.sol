//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

/// @title The Pricer interface for getting a price.
/// @author Devin Stein
/// @notice This is used to get the minting fee in the Lexiconomy.
/// @dev This gives the Lexiconomy flexibility on minting free strategies in the future, like pinning to a USD price..
interface Pricer is IERC165 {
  function price() external view returns (uint256);
}
