import { Select } from "antd";
import { getCode, storeLanguage } from "../../cache/cache";

const { Option } = Select;
export default function LanguageSelect(props: any) {
  const onChange = (value: string) => {
    storeLanguage(Number(value));
    console.log(value);
    props.setLanguage(value);
    props.setCode(getCode(Number(value)));
  };

  return (
    <Select
      onChange={onChange}
      value={props.value}
      style={{ width: 100}}
    >
      <Option value="0" style={{fontSize: '5px'}}>C++</Option>
      <Option value="1">Java</Option>
      <Option value="2" disabled>
        JavaScript
      </Option>
      <Option value="3" disabled>
        Python
      </Option>
    </Select>
  );
}
