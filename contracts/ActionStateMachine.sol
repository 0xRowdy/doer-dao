// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Action State Machine
 * @dev Implements life cycle of an action and enforces what functions are allowed
 */
contract ActionStateMachine {

    enum ActionStates{ ProposalsOpen, TokenStakingOpen, VotingOpen, ExecutionOpen, EvaluationsOpen}

    struct Proposal {
        uint id;
        string name;
        string description;
        uint cost;
    }

    ActionStates public state = ActionStates.ProposalsOpen;
    Proposal[] public proposals;

    modifier onlyState(ActionStates expected) {
        require(state == expected, "Not permitted in this state");
        _;
    }

    // TODO Create Events
    event ProposalsClosed(
        string name
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

    function setProposal(string memory _name, string memory _description, uint _cost) public onlyState(ActionStates.ProposalsOpen) {
        Proposal memory _proposal = Proposal({
            id: block.timestamp,
            name: _name,
            description: _description,
            cost: _cost
        });
        proposals.push(_proposal);
    }

    function getProposals() external view returns (Proposal[] memory) {
        return proposals;
    }

    function closeProposals() public onlyState(ActionStates.ProposalsOpen) {
        // When Proposal window is closed by govenance
        emit ProposalsClosed( "closed");
        state = ActionStates.TokenStakingOpen;
    }

    function closeTokenStaking() public onlyState(ActionStates.TokenStakingOpen) {
        state = ActionStates.VotingOpen;
    }

    function closeVoting() public onlyState(ActionStates.VotingOpen) {
        state = ActionStates.ExecutionOpen;
    }

    function closeExecution() public onlyState(ActionStates.ExecutionOpen) {
        state = ActionStates.EvaluationsOpen;
    }

    function closeEvaluations() public onlyState(ActionStates.EvaluationsOpen) {
        state = ActionStates.ProposalsOpen;
    }

    // function terminate() public onlyContractOwner {
    //     selfdestruct(msg.sender);
    // }
}