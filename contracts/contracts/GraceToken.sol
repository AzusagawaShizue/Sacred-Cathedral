// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title GraceToken
 * @dev Implementation of the Grace Token ($GRACE)
 * Features:
 * - ERC20 Standard
 * - Burnable
 * - Access Control for Minting
 */
contract GraceToken is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("Grace Token", "GRACE") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /**
     * @dev Mint new tokens.
     * @param to The address to mint tokens to.
     * @param amount The amount of tokens to mint.
     * Only addresses with MINTER_ROLE can call this function.
     */
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}
