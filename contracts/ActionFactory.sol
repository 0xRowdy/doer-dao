// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Action.sol";

contract ActionFactory {
    mapping(address => address) public parents;

    event CreateAction(
        address indexed _action,
        address indexed _parent,
        uint256 _data
    );

    function createAction(address _parent, uint256 _data) public {
        Action action = new Action(_parent, _data);
        parents[address(action)] = _parent;

        emit CreateAction(address(action), _parent, _data);
    }
}
