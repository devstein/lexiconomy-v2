//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Pricer.sol";

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
            _interfaceId == interfaceId ||
            _interfaceId == type(IERC165).interfaceId;
    }

    /// @dev Keep price a function for flexibility in the future to
    /// compute the price dynamically.
    function price() external view returns (uint256) {
        return currentPrice;
    }

    function setPrice(uint256 _price) public onlyOwner {
        currentPrice = _price;
    }
}
