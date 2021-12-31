//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";

import "hardhat/console.sol";

import "./Pricer.sol";
import "./StringValidator.sol";

contract LemmaToken is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Pausable,
    Ownable
{
    using ERC165Checker for address;

    // BEGIN: Generated by OpenZepplin
    constructor() ERC721("Lemma", "LEX") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        // tokenURI concats the baseURI with the token id
        return "https://lexiconomy.org/lemma-id/";
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // END: Generated by OpenZepplin

    /// @dev The Invent event is fired whenever a new lemma is invented.
    /// This helps map ERC721 token Ids back to the associate lemma
    event Invent(
        address indexed owner,
        uint256 indexed tokenId,
        uint256 fee,
        uint256 number,
        string lemma
    );

    /// @dev Definition event whenever an owner redefines their lemma
    event Definition(
        address indexed owner,
        uint256 indexed tokenId,
        string definition
    );

    /// @dev Example event whenever an owner provides an example for their lemma
    event Example(
        address indexed owner,
        uint256 indexed tokenId,
        string example
    );

    bytes4 public constant pricerInterfaceId = type(Pricer).interfaceId;
    Pricer public pricer;

    function setPricer(address _address) public onlyOwner {
        require(
            _address.supportsInterface(pricerInterfaceId),
            "LemmaToken: address does not implement the Pricer interface"
        );

        Pricer candidateContract = Pricer(_address);

        // Set the new contract address
        pricer = candidateContract;
    }

    bytes4 public constant stringValidatorInterfaceId =
        type(StringValidator).interfaceId;
    StringValidator public lemmaValidator;

    function setLemmaValidator(address _address) public onlyOwner {
        require(
            _address.supportsInterface(stringValidatorInterfaceId),
            "LemmaToken: address does not implement the StringValidator interface"
        );

        StringValidator candidateContract = StringValidator(_address);

        // Set the new contract address
        lemmaValidator = candidateContract;
    }

    function mintFee() public view returns (uint256) {
        return pricer.price();
    }

    function lemmaValid(string memory _lemma) public view returns (bool) {
        return lemmaValidator.valid(_lemma);
    }

    function getTokenId(string memory _lemma) public pure returns (uint256) {
        return uint256(keccak256(bytes(_lemma)));
    }

    function mint(string memory _lemma)
        public
        payable
        returns (uint256 tokenId)
    {
        require(msg.value >= mintFee(), "LemmaToken: minting fee too low");
        require(
            lemmaValid(_lemma),
            "LemmaToken: lemma is invalid. Does it contain invalid characters?"
        );
        tokenId = getTokenId(_lemma);
        _safeMint(msg.sender, tokenId);
        // emit Invent event to associate metadata with minting a tokenId
        emit Invent(msg.sender, tokenId, msg.value, totalSupply(), _lemma);
        return tokenId;
    }

    /// @dev definition beecause 'define' is a reserved keyword
    function definition(uint256 tokenId, string calldata text)
        public
        whenNotPaused
    {
        bool allowed = _isApprovedOrOwner(msg.sender, tokenId);
        require(allowed, "LemmaToken: caller is not owner nor approved");
        emit Definition(msg.sender, tokenId, text);
    }

    function example(uint256 tokenId, string calldata text)
        public
        whenNotPaused
    {
        bool allowed = _isApprovedOrOwner(msg.sender, tokenId);
        require(allowed, "LemmaToken: caller is not owner nor approved");
        emit Example(msg.sender, tokenId, text);
    }
}
