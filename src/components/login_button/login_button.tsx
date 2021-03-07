import { Button } from "antd";
import { useHistory } from "react-router-dom";
function LoginButton() {
  const history = useHistory()
  const onClick = () => {
    history.push('/login')    
  };
  return (
    <div className="ButtonStyle">
      <Button onClick={onClick} size="small" style={{}}>
        sign in
      </Button>
    </div>
  );
}

export default LoginButton;
