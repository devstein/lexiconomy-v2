//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface StringValidator is IERC165 {
  function valid(string memory _str) external view returns (bool);
}
