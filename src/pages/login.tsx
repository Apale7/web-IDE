import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import axios from "../axios/axiosSetting";
import { getTokens, setTokens } from "../cache/cache";
const Login = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    axios
      .post("/api/user/login", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        if (!res) {
          console.log("服务器错误");
          return;
        }
        
        if (res.data.status_code !== 0) {
          console.log("用户名或密码错误");
          return;
        }
        console.log(res);

        setTokens(
          res.data.data.access_token,
          res.data.data.access_exp,
          res.data.data.refresh_token,
          res.data.data.refresh_exp
        );

        console.log(
          `exp after ${
            (res.data.data.access_exp -
              Date.parse(new Date().toString()) / 1000) /
            60
          } minutes`
        );
      });
  };

  return (
    <div className="loginContainer">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
