import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import { login } from "../api/login";
import { withRouter } from "react-router";
import { useEffect } from "react";
import { isLogin } from "../auth/login";
const Login = (props: any) => {
  useEffect(() => {
    if (isLogin()) {
      props.history.push("/app");
    }
  }, []);
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);

    const res = await login({
      username: values.username,
      password: values.password,
    });

    if (!res.result) {
      message.error(res.message);
      return;
    }
    message.success("登录成功");
    props.history.push("/prof");
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
export default withRouter(Login);
