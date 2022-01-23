//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface Pricer is IERC165 {
  function price() external view returns (uint256);
}
