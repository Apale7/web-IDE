import React, { useState } from "react";
import { Tree } from "antd";

import axios, { get } from "../../axios/axiosSetting";

const { DirectoryTree } = Tree;

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

const initTreeDate: DataNode[] = [
  { title: "root", key: "root" },
];

// It's just a simple demo. You can use tree map to optimize update perf.
function updateTreeData(
  list: DataNode[],
  key: React.Key,
  children: DataNode[]
): DataNode[] {
  return list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    } else if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}

interface FileStat {
  file_type: number;
  file_name: string;
}

function getDirectory(containerID: string, path: string) {
  return axios.get("/api/file/dir", {
    params: {
      container_id: containerID,
      path: path,
    },
  });
}

const DirTree = (props: any) => {
  const [treeData, setTreeData] = useState(initTreeDate);

  function onLoadData({ key, children }: any) {
    return new Promise<void>(async (resolve) => {
      if (children) {
        resolve();
        return;
      }

      await getDirectory("container3", "/root").then((res) => {
        console.log(res);
        setTreeData((origin) =>
          updateTreeData(
            origin,
            key,
            res.data.data.map((fileStat: FileStat) => {
              const tmp: DataNode = {
                title: fileStat.file_name,
                key: fileStat.file_name + String(Math.random()),
                isLeaf: fileStat.file_type === 0,
              };
              console.log(tmp);

              return tmp;
            })
          )
        );
      });
      resolve();
    });
  }

  return (
    <DirectoryTree
      loadData={onLoadData}
      treeData={treeData}
      style={props.style}
    />
  );
};

export default DirTree;
