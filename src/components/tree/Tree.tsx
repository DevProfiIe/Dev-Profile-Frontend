import { GetCommitDetailsDiff, TreeData } from '~/redux/api/types';
import { Fragment, useEffect, useState } from 'react';
import Node from './node/Node';

interface TreeProps {
  commitData: GetCommitDetailsDiff[];
  fileTree: TreeData;
}

export interface DevProfileNode {
  name: string;
  depth: number;
  children: DevProfileNode[];
  sort: 'folder' | 'file' | 'root';
  isSelectable: boolean;
  data?: GetCommitDetailsDiff;
  id: string;
}

const Tree: React.FC<TreeProps> = ({ fileTree, commitData }: TreeProps) => {
  const [tree, setTree] = useState<DevProfileNode | null>(null);

  /**
   *
   * @param data
   */
  const makeTree = (data: TreeData) => {
    const rootNode: DevProfileNode = {
      name: 'root',
      depth: 0,
      children: [],
      sort: 'root',
      isSelectable: false,
      id: '',
    };

    const getNode = (node: TreeData, parent: DevProfileNode, depth = 1) => {
      const newNode: DevProfileNode = {
        name: node.name,
        depth: depth,
        children: [],
        sort: 'folder',
        isSelectable: false,
        data: commitData.find((item) => item.filename === node.name),
        id: node.id,
      };

      if (node.children.length <= 0) {
        newNode.sort = 'file';
        newNode.isSelectable = true;
        parent.children.push(newNode);
        return;
      }

      for (let i = 0; i < node.children.length; i++) {
        getNode(node.children[i], newNode, depth + 1);
      }

      parent.children.push(newNode);
    };

    getNode(data, rootNode);
    setTree(rootNode);
  };

  useEffect(() => {
    makeTree(fileTree);
  }, []);

  return <Fragment>{tree && <Node node={tree} />}</Fragment>;
};

export default Tree;
