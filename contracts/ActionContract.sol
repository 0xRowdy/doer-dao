// SPDX-License-Identifier: GPL-3.
pragma solidity >=0.7.0 <0.9.0;
import "./ActionStateMachine.sol";

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */

contract Action is ActionStateMachine{

    struct ActionStruct {
        uint id;
        ActionStates state;
        string name;
        string description;
        uint cost;
        address delegate; // address/person delegated to
    }

    modifier onlyState(ActionStates expected) {
        require(state == expected, "Not permitted in this state");
        _;
    }

    ActionStruct public newAction;

    constructor() {

    }

    function createAction(string memory _name, string memory _description, uint memory _cost) onlyOwner public {
        newAction.name = _name;
        newAction.description = _description;
        newAction.cost = _cost;
    }

}