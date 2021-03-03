import "./professional_edition.css";
import React, { useState } from "react";
import Monaco from "../components/editor/monaco";
import LanguageSelect from "../components/language_select/language_select";
import { getCode, getLanguage } from "../cache/cache";
import MyTerminal from "../components/terminal/terminal";
import { useIsAuthenticated } from "react-auth-kit";

import { useHistory } from "react-router-dom";
const languages = ["cpp", "java"];

function ProfessionalEdition() {
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated()) {
    alert("未登录");
    history.push("/login");
  }

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
      <Monaco language={languages[language]} setCode={setCode} code={code} />
      <div style={{ height: "200px" }}>
        <MyTerminal
          container_id="container2"
          host="193.112.177.167:8000"
        ></MyTerminal>
      </div>
    </div>
  );
}

export default ProfessionalEdition;
