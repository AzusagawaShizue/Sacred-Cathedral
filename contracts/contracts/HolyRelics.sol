// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title HolyRelics
 * @dev ERC721 Token for Rare Relics (Holy Grail, Crown of Thorns, etc.)
 * Supports dynamic metadata (inscriptions).
 */
contract HolyRelics is ERC721, ERC721URIStorage, AccessControl {
    using Strings for uint256;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant INSCRIPTION_ROLE = keccak256("INSCRIPTION_ROLE");

    uint256 private _nextTokenId;

    // Rarity levels
    enum Rarity { COMMON, RARE, LEGENDARY }

    struct RelicData {
        Rarity rarity;
        uint256 power;
        string inscription; // Dynamic text added by players
    }

    mapping(uint256 => RelicData) public relicDetails;

    event RelicInscribed(uint256 indexed tokenId, string newInscription);

    constructor() ERC721("Holy Relics", "RELIC") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(INSCRIPTION_ROLE, msg.sender);
    }

    function safeMint(address to, string memory uri, Rarity rarity, uint256 power) public onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        relicDetails[tokenId] = RelicData({
            rarity: rarity,
            power: power,
            inscription: ""
        });

        return tokenId;
    }

    /**
     * @dev Inscribe text onto a relic.
     * Can be called by INSCRIPTION_ROLE (which would be the GameplayLogic contract).
     */
    function inscribe(uint256 tokenId, string memory text) public onlyRole(INSCRIPTION_ROLE) {
        require(_ownerOf(tokenId) != address(0), "Relic does not exist");
        relicDetails[tokenId].inscription = text;
        emit RelicInscribed(tokenId, text);
    }

    // Overrides
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
