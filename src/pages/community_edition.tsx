import "./community_edition.css";
import React, { useState } from "react";
import Monaco from "../components/editor/monaco";
import useWindowSize from "../hooks/windowSize";
import { Button, Col, Input, Row, Tabs } from "antd";
import axios from "axios";
import LanguageSelect from "../components/language_select/language_select";
import { getCode, getLanguage } from "../cache/cache";
import LoginButton from "../components/login_button/login_button";
const { TabPane } = Tabs;
const languages = ["cpp", "java"];
const { TextArea } = Input;

function CommunityEdition() {
  const [language, setLanguage] = useState(getLanguage());
  const [code, setCode] = useState(getCode(language));
  const size = useWindowSize();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [tabKey, setTabKey] = useState("1");
  const onClick = () => {
    console.log(code);
    const data = {
      language: String(language),
      input: input,
      code: code,
    };
    axios.post("/api/judge", data).then((res) => {
      console.log(res.data.resp.result_);
      setOutput(res.data.resp.result_);
    });
    setTabKey("2");
  };
  return (
    <div className="App">
      <div className="Menu" style={{padding:'5px'}}>
        <LanguageSelect
          setLanguage={setLanguage}
          setCode={setCode}
          value={String(language)}
          className = 'ButtonStyle'
        />
        <LoginButton></LoginButton>
      </div>

      <Monaco language={languages[language]} setCode={setCode} code={code} />
      <Row style={{ height: String(size.innerHeight * 0.1) }} id="bottom_row">
        <Col offset={0} span={24}>
          <MyTabs
            input={input}
            output={output}
            tabKey={tabKey}
            setInput={setInput}
            setOutput={setOutput}
            setTabKey={setTabKey}
          />
        </Col>
        <Button onClick={onClick} id="run">
          运行
        </Button>
      </Row>
      {/* <MyTerminal container_id="test"></MyTerminal> */}
    </div>
  );
}

function MyTextArea(props: any) {
  const size = useWindowSize();
  return (
    <TextArea
      style={{
        width: "100%",
        resize: "none",
        height: String(size.innerHeight * 0.23) + "px",
      }}
      bordered={false}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.setValue(event.target.value);
      }}
      value={props.value}
    ></TextArea>
  );
}

function MyTabs(props: any) {
  return (
    <Tabs
      activeKey={props.tabKey}
      onChange={(key) => {
        props.setTabKey(key);
      }}
    >
      <TabPane tab="输入" key="1">
        <MyTextArea value={props.input} setValue={props.setInput} />
      </TabPane>
      <TabPane tab="输出" key="2">
        <MyTextArea value={props.output} setValue={props.setOutput} />
      </TabPane>
    </Tabs>
  );
}

export default CommunityEdition;
