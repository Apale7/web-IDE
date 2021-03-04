import useWindowSize from "../../hooks/windowSize";

import MonacoEditor from "react-monaco-editor";
import {getLanguage, storeCode} from "../../cache/cache";
export default function Monaco(props: any) {
  const options = {
    selectOnLineNumbers: true
  };
  const onChange = (code: string, e: any) => {
    props.setCode(code);
    storeCode(getLanguage(), code)
  };
  const onMounted = (editor: any, monaco: any) => {
    console.log("language", props.language);
    editor.focus();
  };
  const size = useWindowSize();
  return (
    <div>
      <MonacoEditor
        height={size.innerHeight * 0.65}
        language={props.language}
        theme="vs-dark"
        value={props.code}
        options={options}
        onChange={onChange}
        editorDidMount={onMounted}
      />
    </div>
  );
}
