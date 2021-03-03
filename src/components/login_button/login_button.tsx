import { Modal, Button } from "antd";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import axios from "axios";
function LoginButton() {
  const signIn = useSignIn();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setModalText("sign in");
    setConfirmLoading(true);
    axios
      .post("/api/user/login", {
        username: "apale",
        password: "123465",
      })
      .then((res) => {
        if (
          signIn({
            token: res.data.token,
            expiresIn: res.data.expiresIn,
            tokenType: "Bearer",
            authState: res.data.authUserState,
            refreshToken: res.data.refreshToken, // Only if you are using refreshToken feature
            refreshTokenExpireIn: res.data.refreshTokenExpireIn,
          })
        ) {
          // Only if you are using refreshToken feature
          // Redirect or do-something
        } else {
          //Throw error
        }
      });
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  return (
    <div className="ButtonStyle">
      <Button onClick={showModal} size="small" style={{}}>
        sign in
      </Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
}

export default LoginButton;
