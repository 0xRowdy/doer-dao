// SPDX-License-Identifier: GPL-3.
pragma solidity >=0.7.0 <0.9.0;
import "./ActionStateMachine.sol";

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */

contract Action is ActionStateMachine {
    struct ActionStruct {
        uint256 id;
        ActionStates state;
        string name;
        string description;
        uint256 cost;
        address delegate; // address/person delegated to
    }

    ActionStruct public newAction;

    constructor() {}
}
