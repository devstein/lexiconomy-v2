//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

import "unicode-eth/contracts/Unicode.sol";

import "./StringValidator.sol";

contract LemmaValidator is StringValidator, Ownable {
  using Unicode for string;

  bytes4 public constant interfaceId = type(StringValidator).interfaceId;

  mapping(uint32 => bool) public illegal;
  mapping(uint32 => bool) public whitespace;

  constructor() {}

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

  /// @dev Given a string, determine if all it's underlying UTF-8 Unicode characters are valid.
  function valid(string memory _str) external view returns (bool) {
    string memory char;
    uint256 len = bytes(_str).length;
    uint256 cursor;
    uint32 codePoint;

    // check first character
    (char, cursor) = _str.decodeChar(cursor);
    codePoint = char.toCodePoint();

    // do not allow whitespace prefix
    if (illegal[codePoint] || whitespace[codePoint]) return false;

    bool isWhitespace;
    // maintain flag for previous character
    bool prevWhitespace;

    while (cursor < len) {
      (char, cursor) = _str.decodeChar(cursor);
      codePoint = char.toCodePoint();

      // if invalid return false
      if (illegal[codePoint]) return false;

      // only allow one whitespace character between words
      isWhitespace = whitespace[codePoint];
      if (isWhitespace && prevWhitespace) return false;

      prevWhitespace = isWhitespace;
    }

    // check last character
    // do not allow trailing whitespace
    // we've already check if it's illegal above
    if (isWhitespace) return false;

    return true;
  }

  function setIllegalCharacter(uint32 _codePoint, bool _illegal)
    external
    onlyOwner
  {
    illegal[_codePoint] = _illegal;
  }

  function setWhitespaceCharacter(uint32 _codePoint, bool _whitespace)
    external
    onlyOwner
  {
    whitespace[_codePoint] = _whitespace;
  }
}
