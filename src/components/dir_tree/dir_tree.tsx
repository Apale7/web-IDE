import React, { useState } from "react";
import { Tree } from "antd";

import axios, { get } from "../../axios/axiosSetting";
import { log } from "console";

const { DirectoryTree } = Tree;

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

const initTreeDate: DataNode[] = [{ title: "/", key: "/" }];

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

function getFile(containerID: string, path: string) {
  return axios.get("/api/file/file", {
    params: {
      container_id: containerID,
      path: path,
    },
  });
}

const DirTree = (props: any) => {
  const [treeData, setTreeData] = useState(initTreeDate);

  const onLoadData = ({ key, children }: any) => {
    console.log(key);

    return new Promise<void>(async (resolve) => {
      if (children) {
        resolve();
        return;
      }

      await getDirectory("container3", key).then((res) => {
        console.log(res);
        setTreeData((origin) =>
          updateTreeData(
            origin,
            key,
            res.data.data.map((fileStat: FileStat) => {
              const tmp: DataNode = {
                title: fileStat.file_name,
                key:
                  key +
                  fileStat.file_name +
                  (fileStat.file_type === 0 ? "" : "/"),
                isLeaf: fileStat.file_type === 0,
              };
              // console.log(tmp);

              return tmp;
            })
          )
        );
      });
      resolve();
    });
  };

  const onSelect = (selectedKeys: any, info: any) => {
    if (selectedKeys.length <= 0) return;
    console.log(selectedKeys[0]);
    getFile("container3", selectedKeys[0]).then((res) => {
      console.log(res.data.data.files[0].content);
      props.setCode(res.data.data.files[0].content);
      props.setSelectedFile(selectedKeys[0]);
    });
  };

  const onExpand = function (expandedKeys: any, info: any) {
    if (!expandedKeys || expandedKeys.length === 0) {
      return;
    }
    console.log(info);
    if (info.expanded) onLoadData({ key: expandedKeys[0] });
  };
  return (
    <DirectoryTree
      loadData={onLoadData}
      treeData={treeData}
      style={props.style}
      onSelect={onSelect}
      height={950}
      onExpand={onExpand}
    />
  );
};

export default DirTree;
