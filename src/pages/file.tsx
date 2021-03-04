import axios from "../axios/axiosSetting";
import { useState } from "react";
import { Button } from "antd";
export default function Test() {
  const [msg, setMsg] = useState("");
  return (
    <div>
      <Button
        onClick={() => {
          axios.get("/api/file/file").then((res: any) => {
            console.log(res);
            if (res.data.code === 0) {
              setMsg(res.data);
            } else {
              setMsg("未登录");
            }
          });
        }}
      >
        点我
      </Button>
      <p>{msg}</p>
    </div>
  );
}
