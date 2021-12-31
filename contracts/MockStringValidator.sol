//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./StringValidator.sol";

// MockStringValidator is for testing
contract MockStringValidator is StringValidator, Ownable {
    bytes4 public constant interfaceId = type(StringValidator).interfaceId;

    string public validString;

    constructor(string memory _valid) {
        validString = _valid;
    }

    /// @dev Given a string, determine if all it's underlying UTF-8 unicode characters are valid.
    function valid(string memory _str) external view returns (bool) {
        return (keccak256(bytes((_str))) == keccak256(bytes((validString))));
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
}
