//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./StringValidator.sol";

contract LemmaValidator is StringValidator, Ownable {
    bytes4 public constant interfaceId = type(StringValidator).interfaceId;

    /// @dev invalidCharacteres maps decimal unicode character points to validity.
    /// Uses invalid, so by default all characters are valid (true).
    mapping(uint32 => bool) public invalidCharacters;

    // UTF-8 Decoder adapted from: http://bjoern.hoehrmann.de/utf-8/decoder/dfa/
    // prettier-ignore
    uint8[364] private UTF8_Decoder = [
        // The first part of the table maps bytes to character classes that
        // to reduce the size of the transition table and create bitmasks.
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
        8,8,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
        10,3,3,3,3,3,3,3,3,3,3,3,3,4,3,3,11,6,6,6,5,8,8,8,8,8,8,8,8,8,8,8,
        // The second part is a transition table that maps a combination
        // of a state of the automaton and a character class to a state.
        0,12,24,36,60,96,84,12,12,12,48,72,12,12,12,12,12,12,12,12,12,12,12,12,
        12, 0,12,12,12,12,12, 0,12, 0,12,12,12,24,12,12,12,12,12,24,12,24,12,12,
        12,12,12,12,12,12,12,24,12,12,12,12,12,24,12,12,12,12,12,12,12,24,12,12,
        12,12,12,12,12,12,12,36,12,36,12,12,12,36,12,12,12,12,12,36,12,36,12,12,
        12,36,12,12,12,12,12,12,12,12,12,12
    ];
    uint8 private constant UTF8_ACCEPT = 0;
    uint8 private constant UTF8_REJECT = 1;

    constructor() {}

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

    // UTF-8 Decoder adapted from: http://bjoern.hoehrmann.de/utf-8/decoder/dfa/
    function decode(
        uint32 _state,
        uint32 _codepoint,
        uint8 _byte
    ) internal view returns (uint32 nextState, uint32 codepoint) {
        uint8 byteType = UTF8_Decoder[_byte];

        if (_state == UTF8_ACCEPT) {
            codepoint = (uint8(0xff) >> byteType) & (_byte);
        } else {
            codepoint = (_byte & uint8(0x3f)) | (_codepoint << 6);
        }

        nextState = UTF8_Decoder[256 + (_state) + byteType];

        return (nextState, codepoint);
    }

    /// @dev Given a string, determine if all it's underlying UTF-8 unicode characters are valid.
    function valid(string memory _str) external view returns (bool) {
        bytes memory strBytes = bytes(_str);
        uint256 byteLength = strBytes.length;

        // keep track of state of the character (UTF8_REJECT or UTF8_ACCEPT)
        uint32 state = UTF8_ACCEPT;
        uint32 codepoint;
        uint8 numBytesDecoded = 0;

        for (uint8 index = 0; index < byteLength; index++) {
            bytes1 _byte = strBytes[index];
            (state, codepoint) = decode(state, codepoint, uint8(_byte));
            numBytesDecoded += 1;
            if (state == UTF8_ACCEPT) {
                // validate the codepoint
                if (invalidCharacters[codepoint]) return false;
                numBytesDecoded = 0;
            }
            // if we haven't hit UTF8_ACCEPT by the 4th byte, then it's invalid unicode.
            // no character is more than 4 bytes.
            if (numBytesDecoded > 3) return false;
        }

        // if it's a valid string, we will end at a valid codepoint
        return state == UTF8_ACCEPT;
    }

    function setCharacterValidity(uint32 _codepoint, bool _valid)
        external
        onlyOwner
    {
        // invert because we maintain invalid mapping
        invalidCharacters[_codepoint] = !_valid;
    }
}
