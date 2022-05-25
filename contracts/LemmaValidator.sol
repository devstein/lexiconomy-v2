//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

import "unicode-eth/contracts/Unicode.sol";

import "./StringValidator.sol";

/// @title The LemmaValidator checks if a lemma contains only lowercase letters and has no trailing or preceding whitespace.
/// @author Devin Stein
/// @notice This is the current lemma validation logic for the Lexiconomy. Only valid lemmas can be minted.
/// @dev This code formed the basis of the Unicode Ethereum Project (https://github.com/devstein/unicode-eth/), which is now imported.
contract LemmaValidator is StringValidator, Ownable {
  /// @dev Add Unicode utilities to strings
  using Unicode for string;

  bytes4 public constant interfaceId = type(StringValidator).interfaceId;

  // @notice a mapping to check if a character code point is illegal
  mapping(uint32 => bool) public illegal;
  // @notice a mapping to check if a character code point is whitespace
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

  /// @notice Given a string, if it is considered valid
  /// @param _str The input string to validate
  /// @dev Given a string, determine if all it's underlying UTF-8 Unicode characters are valid
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

  function batchSetIllegalCharacters(
    uint32[] calldata _codePoints,
    bool _illegal
  ) external onlyOwner {
    uint256 len = _codePoints.length;
    for (uint256 i = 0; i < len; i++) {
      illegal[_codePoints[i]] = _illegal;
    }
  }

  function setWhitespaceCharacter(uint32 _codePoint, bool _whitespace)
    external
    onlyOwner
  {
    whitespace[_codePoint] = _whitespace;
  }

  function batchSetWhitespaceCharacters(
    uint32[] calldata _codePoints,
    bool _whitespace
  ) external onlyOwner {
    uint256 len = _codePoints.length;
    for (uint256 i = 0; i < len; i++) {
      whitespace[_codePoints[i]] = _whitespace;
    }
  }
}
