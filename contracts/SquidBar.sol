pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";


contract SquidBar is ERC20("SquidBar", "xSQUID"){
    using SafeMath for uint256;
    IERC20 public squid;

    constructor(IERC20 _squid) public {
        squid = _squid;
    }

    // Enter the bar. Pay some SQUIDs. Earn some shares.
    function enter(uint256 _amount) public {
        uint256 totalSquid = squid.balanceOf(address(this));
        uint256 totalShares = totalSupply();
        if (totalShares == 0 || totalSquid == 0) {
            _mint(msg.sender, _amount);
        } else {
            uint256 what = _amount.mul(totalShares).div(totalSquid);
            _mint(msg.sender, what);
        }
        squid.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the bar. Claim back your SQUIDs.
    function leave(uint256 _share) public {
        uint256 totalShares = totalSupply();
        uint256 what = _share.mul(squid.balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        squid.transfer(msg.sender, what);
    }
}