// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract ActionStateMachine {

    enum ActionStates{ AwaitProposal, GotProposal, AwaitVote, GotVote, AwaitExecution, GotExecution, AwaitEvaluation, GotEvaluation}

    ActionStates public state = ActionStates.AwaitProposal;

    modifier onlyState(ActionStates expected) {
        require(state == expected, "Not permitted in this state");
        _;
    }

    // TODO Create Events
    event Proposal(
        // address indexed _from,
        // address indexed _to,
        // bytes32 _value
    );

    event Vote(
        // address indexed _from,
        // address indexed _to,
        // bytes32 _value
    );

    event Execute(
        // address indexed _from,
        // address indexed _to,
        // bytes32 _value
    );

    event Evaluate(
        // address indexed _from,
        // address indexed _to,
        // bytes32 _value
    );

    function setProposal() public onlyState(ActionStates.AwaitProposal) {
        state = ActionStates.GotProposal;
    }

    function getProposal() public onlyState(ActionStates.GotProposal) {
        state = ActionStates.AwaitVote;
    }

    function setVote() public onlyState(ActionStates.AwaitVote) {
        state = ActionStates.GotVote;
    }

    function getVote() public onlyState(ActionStates.GotVote) {
        state = ActionStates.AwaitExecution;
    }

    function setExecution() public onlyState(ActionStates.AwaitExecution) {
        state = ActionStates.GotExecution;
    }

    function getExecution() public onlyState(ActionStates.GotExecution) {
        state = ActionStates.AwaitEvaluation;
    }

    function setEvaluation() public onlyState(ActionStates.AwaitEvaluation) {
        state = ActionStates.GotEvaluation;
    }

    function getEvaluation() public onlyState(ActionStates.GotEvaluation) {
        state = ActionStates.AwaitProposal;
    }

    // function terminate() public onlyContractOwner {
    //     selfdestruct(msg.sender);
    // }
}