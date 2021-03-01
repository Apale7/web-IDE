import "./professional_edition.css";
import React, { useState } from "react";
import Monaco from "../components/editor/monaco";
import LanguageSelect from "../components/language_select/language_select";
import { getCode, getLanguage } from "../cache/cache";
import MyTerminal from "../components/terminal/terminal";
const languages = ["cpp", "java"];

function ProfessionalEdition() {
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
      <Monaco
        language={languages[language]}
        setCode={setCode}
        code={code}
      />
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
