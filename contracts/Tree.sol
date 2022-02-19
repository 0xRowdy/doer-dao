pragma solidity ^0.4.24;

contract Tree {
    struct Node {
        bytes32 name;
        bytes32 parent;
        bytes32 data;
        bytes32[] nodes;
    }

    mapping(bytes32 => Node) nodes;

    function() public {
        revert();
    }

    function get(bytes32 _name, bytes32 _parent)
        public
        view
        returns (
            bytes32,
            bytes32,
            bytes32,
            bytes32[]
        )
    {
        Node storage node = nodes[keccak256(abi.encodePacked(_parent, _name))];
        return (node.name, node.parent, node.data, node.nodes);
    }

    function stringToBytes32(string memory source)
        public
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    function addd(
        bytes32 _name,
        bytes32 _parent,
        string _data
    ) public {
        require(_name.length > 0);

        bytes32 path = keccak256(abi.encodePacked(_parent, _name));
        Node storage node = nodes[path];
        require(node.name == 0x0);

        nodes[path] = Node({
            name: _name,
            parent: _parent,
            data: stringToBytes32(_data),
            nodes: new bytes32[](0)
        });
        nodes[_parent].nodes.push(path);
    }

    function update(
        bytes32 _name,
        bytes32 _parent,
        bytes32 _data
    ) public {
        bytes32 path = keccak256(abi.encodePacked(_parent, _name));
        Node storage node = nodes[path];
        require(node.name.length > 0);

        node.data = _data;
    }

    function remove(bytes32 _name, bytes32 _parent) public {
        bytes32 path = keccak256(abi.encodePacked(_parent, _name));
        require(nodes[path].nodes.length == 0); // allow to remove leaves (node without linked nodes)

        delete nodes[path]; // removes from nodes

        // removes from parent list of nodes
        bytes32[] storage childs = nodes[_parent].nodes;
        for (uint256 i = getIndex(childs, path); i < childs.length - 1; i++) {
            childs[i] = childs[i + 1];
        }
        delete childs[childs.length - 1];
        childs.length--;
    }

    function getIndex(bytes32[] childs, bytes32 _path)
        internal
        pure
        returns (uint256)
    {
        for (uint256 i = 0; i < childs.length; i++) {
            if (_path == childs[i]) {
                return i;
            }
        }
        return childs.length - 1;
    }
}
