// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.24;

import "./Tree.sol";

contract ActionFactory is Tree {
    bytes32 public actionName;
    bytes32 public actionParent;

    function createAction(
        address _parent,
        string _nodeData,
        uint256 _data
    ) public {
        Action action = new Action(_data);

        bytes32 name = bytes32(uint256(uint160(address(action))) << 96);
        bytes32 parent = bytes32(uint256(uint160(_parent)) << 96);

        actionName = name;
        actionParent = parent;

        addd(name, parent, _nodeData);
    }
}

contract Action {
    uint256 public data;

    constructor(uint256 _data) public {
        data = _data;
    }
}
