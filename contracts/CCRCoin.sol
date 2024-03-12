// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BoostCoin is ERC20 {
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;

    constructor() ERC20("Crypto Classroom", "CCR") {
        _name = "Crypto Classroom";
        _symbol = "CCR";
        _totalSupply = 3_00_000 * 10**decimals();
        _mint(msg.sender, _totalSupply);
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function decimals() public pure override returns (uint8) {
        return 0; // temp. 0 later 6
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
}

