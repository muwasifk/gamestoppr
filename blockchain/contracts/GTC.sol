pragma solidity = 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Gitcoin is ERC20, Ownable {
    constructor() ERC20("Gitcoin", "GTC") {
        _mint(msg.sender, 10000000000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) public onlyOwner payable {
        _mint(to, amount);
    }
}