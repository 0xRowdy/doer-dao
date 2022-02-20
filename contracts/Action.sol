// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Action {
    address public parent;
    uint256 public data;

    constructor(address _parent, uint256 _data) {
        parent = _parent;
        data = _data;
    }
}
