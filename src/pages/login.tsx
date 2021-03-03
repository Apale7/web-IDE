import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

const Login = () => {
  const signIn = useSignIn();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    axios
      .post("/api/user/login", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        if (
          signIn({
            token: res.data.data.access_token,
            expiresIn: 1,
            tokenType: "Bearer",
            authState: {},
            refreshToken: res.data.data.refresh_token, // Only if you are using refreshToken feature
            refreshTokenExpireIn: 60*24*7,
          })
        ) {
          console.log("login success", res);
        } else {
          console.log("login failed", res);
        }
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
