import React from 'react';
import Tree from 'react-d3-tree';

function FamilyTree({ data }) {
  const initialTreeData = {
    name: 'Root',
    children: data,
  };

  const addParentToSubchild = (treeData, newParentName, subchildName) => {
    const findSubchild = (node) => {
      if (node.name === subchildName) {
        return true;
      } else if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          if (findSubchild(node.children[i])) {
            return true;
          }
        }
      }
      return false;
    };

    const addParent = (node) => {
      if (node.name === newParentName) {
        node.children = [...(node.children || []), { name: subchildName }];
      } else if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          addParent(node.children[i]);
        }
      }
    };
    const newTreeData = { ...treeData };
    if (findSubchild(newTreeData)) {
      addParent(newTreeData);
    }

    return newTreeData;
  };

  const treeDataWithNewParent = addParentToSubchild(initialTreeData, 'NewParent', 'SubchildName');

  return (
    <div className="family-tree">
      <Tree
        data={treeDataWithNewParent}
        orientation="vertical"
        collapsible={false}
        translate={{ x: 300, y: 50 }}
        zoom={0.6}
      />
    </div>
  );
}

export default FamilyTree;
