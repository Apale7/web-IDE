import "./professional_edition.css";
import React, { useEffect, useState } from "react";
import Monaco from "../components/editor/monaco";
import LanguageSelect from "../components/language_select/language_select";
import { getCode, getLanguage, getAccessToken } from "../cache/cache";
import MyTerminal from "../components/terminal/terminal";

import { useHistory } from "react-router-dom";
import DirTree from "../components/dir_tree/dir_tree";
import axios from "../axios/axiosSetting";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
const languages = ["cpp", "java"];

const dirTreeStyle = [
  {
    backgroundColor: "#252526",
    color: "#cccccc",
  },
  {
    backgroundColor: "#ffffff",
    color: "#000000",
  },
];

const saveFile = (containerID: string, path: string, code: string) => {
  return axios.post("api/file/save", {
    container_id: containerID,
    path: path,
    data: code,
  });
};

function ProfessionalEdition() {
  const history = useHistory();
  const container_id = "container3";
  const host = "193.112.177.167:8000";
  const [language, setLanguage] = useState(getLanguage());
  const [code, setCode] = useState("This is the welcome page");
  const [selectedFile, setSelectedFile] = useState("");
  const [needSave, setNeedSave] = useState(false);
  // const size = useWindowSize();
  // const [output, setOutput] = useState("");
  // const [tabKey, setTabKey] = useState("1");
  const autoSave = () => {
    const myInterval = setInterval(() => {
      if (!needSave) return;
      saveFile(container_id, selectedFile, code).then((res) => {
        console.log(res.data.data);
        setNeedSave(false);
      });
    }, 1000);
    return myInterval;
  };
  useEffect(() => {
    const i = autoSave();
    return () => clearInterval(i);
  });
  return (
    <div
      className="App"
      style={{
        backgroundColor: "#007acc",
        height: "100vh",
        overflow: "hidden",
        padding: "0",
      }}
    >
      <div
        className="Menu"
        style={{ padding: "5px", display: "flex", backgroundColor: "#2a2d2e" }}
      >
        <LanguageSelect
          setLanguage={setLanguage}
          setCode={setCode}
          value={String(language)}
          className="ButtonStyle"
        />
        <Input
          placeholder="default size"
          style={{ width: "650px" }}
          prefix={<UserOutlined />}
        />
      </div>
      <div style={{ display: "flex", height: "93%", overflow: "hidden", }}>
        <div
          style={{
            width: "200px",
            backgroundColor: dirTreeStyle[0].backgroundColor,
            height: "100%",
            border: "1px solid",
          }}
        >
          <DirTree
            style={dirTreeStyle[0]}
            setCode={setCode}
            setSelectedFile={setSelectedFile}
          />
        </div>
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "#000000" }}
        >
          <div style={{ width: "100%", height: "65%" }}>
            <Monaco
              language={languages[language]}
              setCode={setCode}
              code={code}
              setNeedSave={setNeedSave}
              prof={true}
            />
          </div>

          <div style={{ height: "35%", overflow: "hidden" }}>
            <MyTerminal
              style={{ height: "100%" }}
              container_id={container_id}
              host={host}
              token={"this is a fake token"}
            ></MyTerminal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalEdition;
