// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IFanToken {
    function awardLoyaltyPoints(address _user, uint256 _points) external;
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}
