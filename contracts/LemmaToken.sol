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

contract LemmaToken is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable {
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

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
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

    // TODOs
    // 
    // CREATE ALL TESTS!
    // 
    // Mint
    // SetMintFee
    // 
    // Define 
    // ValidateLemma
    // GetTokenId
    // Read about Proxy/Upgrades 

    // What about ID (number invented) and total supply?
    // ENS -- Create an name lexiconomy.eth and lexiconomy-owner.eth (Subdomain?)
    // 
    // *****
    // For price, we can make thee price contract an external contract
    // This way we can change the implementation later on
    // Start off with fixed ETH price
    // Transition to fixed USD price
    // Transition to logarithmic USD price
    // *****
    //
    // What about ID (number invented) and total supply?

    // Do we need to convert to bytes?
    // If we do not care about the characters then no
    // We do because lower case
    // lowercase function: 
    // https://github.com/willitscale/solidity-util/blob/master/lib/Strings.sol#L360-L382
    // require all to be low
    // can we set ranges for what is legal and illegal?
    // Really only care about trailing whitespace, only allow "space" for separators, and control characters?

  /// @dev The Invent event is fired whenever a new lemma is invented
  // event Invent(address indexed owner, uint256 indexed lemmaId, uint32 indexed releaseId, uint256 price);

    /// @dev Definition event whenever an owner redefines their lemma
    event Definition(address indexed owner, uint256 indexed tokenId, string definition);

    /// @dev Example event whenever an owner provides an example for their lemma
    event Example(address indexed owner, uint256 indexed tokenId, string example);

    bytes4 public constant pricerInterfaceId = type(Pricer).interfaceId;    
    Pricer public pricer;

    function setPricer(address _address) public onlyOwner {
        require(_address.supportsInterface(pricerInterfaceId), "LemmaToken: address does not implement the Pricer interface");

        Pricer candidateContract = Pricer(_address);

        // Set the new contract address
        pricer = candidateContract;
    }

    function mintFee() public view returns (uint256) {
        return pricer.price();
    }

    function mint(string memory lemma) public payable returns (uint256 tokenId) {
      require(msg.value >= mintFee(), "LemmaToken: minting fee too low");
      tokenId = uint256(keccak256(bytes(lemma)));
      _safeMint(msg.sender, tokenId);
      return tokenId;
    }

    function definition(uint256 tokenId, string calldata text) public {
      bool allowed = _isApprovedOrOwner(msg.sender, tokenId);
      require(allowed, "LemmaToken: caller is not owner nor approved");
      emit Definition(msg.sender, tokenId, text);
    }

    function example(uint256 tokenId, string calldata text) public {
      bool allowed = _isApprovedOrOwner(msg.sender, tokenId);
      require(allowed, "LemmaToken: caller is not owner nor approved");
      emit Example(msg.sender, tokenId, text);
    }

    function _isLowercase(bytes1 _b1)
        private
        pure
    returns (bool) {
        return !(_b1 >= 0x41 && _b1 <= 0x5A);
    }

    // check first and last letter for lowercase
    // check every character for upper case
    // check every for illegal whitespace character
    // check every for illegal control character
}
