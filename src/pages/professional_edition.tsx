import "./professional_edition.css";
import React, { useState } from "react";
import Monaco from "../components/editor/monaco";
import LanguageSelect from "../components/language_select/language_select";
import { getCode, getLanguage } from "../cache/cache";
import MyTerminal from "../components/terminal/terminal";

import { useHistory } from "react-router-dom";
import DirTree from "../components/dir_tree/dir_tree";
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

function ProfessionalEdition() {
  const history = useHistory();

  const [language, setLanguage] = useState(getLanguage());
  const [code, setCode] = useState(getCode(language));
  // const size = useWindowSize();
  // const [output, setOutput] = useState("");
  // const [tabKey, setTabKey] = useState("1");

  return (
    <div className="App">
      <LanguageSelect
        setLanguage={setLanguage}
        setCode={setCode}
        value={String(language)}
      />
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "200px",
            backgroundColor: dirTreeStyle[0].backgroundColor,
            height: "95vh",
          }}
        >
          <DirTree style={dirTreeStyle[0]} setCode={setCode} />
        </div>
        <div style={{ width: "100%" }}>
          <div style={{ paddingRight: "10px" }}>
            <Monaco
              language={languages[language]}
              setCode={setCode}
              code={code}
            />
          </div>

          <div style={{ height: "200px" }}>
            <MyTerminal
              container_id="container3"
              host="193.112.177.167:8000"
            ></MyTerminal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalEdition;
