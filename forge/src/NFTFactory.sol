// Based loosely on galaxyEggs
// https://etherscan.io/address/0xa08126f5e1ed91a635987071e6ff5eb2aeb67c48#code
// Soul bound token 
// Can be minted to users but not transfered out
// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@eas/contracts/IEAS.sol";

contract NFTFactory is ERC721, Ownable {
    using Strings for uint256;

    uint256 public PRICE;
    uint256 public MAX_SUPPLY;
    uint256 public MAX_PER_MINT;
    bool public can_mint;

    string private _baseTokenURI;

    uint256 public totalSupply;

    address payable private _artist;
    address payable private _benefactor;
    address public attestationContract;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _price, // Price of each NFT in ETH, 1 ETH = 1e18 or 1 followed by 18 0s
        uint256 _maxSupply, // max supply of the nfts
        uint256 _maxPerMint, // max no. of nfts a user can mint in a single tx. also max they can mint into 1 wallet
        address artist, // artist address,
        address _attestationContract,
        string memory _baseuri
    ) ERC721(_name, _symbol) {
        PRICE = _price;
        MAX_SUPPLY = _maxSupply;
        MAX_PER_MINT = _maxPerMint;
        _artist = payable(artist);
        _benefactor = payable(owner());
        attestationContract = _attestationContract;
        _baseTokenURI = _baseuri;
    }

    receive() external payable {}

    fallback() external payable {}

    function updateParams(uint256[] memory numericParams) external onlyOwner {
        PRICE = numericParams[0];
        MAX_SUPPLY = numericParams[1];
        MAX_PER_MINT = numericParams[2];
    }

    function toggleMint() external onlyOwner {
        can_mint = !can_mint;
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function withdraw() external {
        // Split payment 50/50 between artist and owner
        uint256 half = address(this).balance / 2;
        Address.sendValue(_benefactor, half);
        Address.sendValue(_artist, half);
    }

    function mintTo(address addr, bytes32 attestationUid) external payable {
        // verify attestation
        Attestation memory att = IEAS(attestationContract).getAttestation(attestationUid);
        require(att.revocationTime == 0, "Attestation revoked");
        require(att.expirationTime == 0 || att.expirationTime > block.timestamp, "Attestation expired");
        _safeMint(addr, ++totalSupply);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "INVALID");

        string memory baseURI = getBaseURI();

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    }

    function getBaseURI() public view returns (string memory) {
        return _baseTokenURI;
    }
    function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal virtual override {
        if (from != address(0) && to != address(0)) {
            revert("Soul bound token cannot be transferred out");
        }
    }

}