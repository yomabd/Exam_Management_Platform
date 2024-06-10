import React, { useState, useEffect} from 'react';
import { Treebeard } from 'react-treebeard';

const TreeStructure = ({ data }) => {
  const [treeData, setTreeData] = useState(data);
  const [cursor, setCursor] = useState(false);

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setTreeData(Object.assign({}, treeData));
  };
  useEffect(() => {
    setTreeData(data);
  }, [data]);
  return <Treebeard data={treeData} onToggle={onToggle} />;
};

export default TreeStructure;