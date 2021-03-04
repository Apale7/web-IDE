import "./App.css";
import { AuthProvider } from "react-auth-kit";
import RouteComponent from "./routes";
import { useRefreshToken } from "react-auth-kit";
import React from "react";
import axios from "axios";
function App() {
  // const refreshToken = useRefreshToken();
  // React.useEffect(() => {
  //   const {
  //     authToken,
  //     authTokenType,
  //     expireAt,
  //   } = refreshToken.getCurrentAuthState(); //Get the current state
  //   const userState = refreshToken.getCurrentUserState(); //Get the current user's state

  //   //Send the current auth token ad user state to backend
  //   axios
  //     .post("/api/user/refresh", {
  //       authToken: authToken,
  //       authTokenType: authTokenType,
  //       expireAt: expireAt,
  //       userState: userState,
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         // Setting the auth state
  //         refreshToken.updateAuthState(
  //           res.data.authToken,
  //           "Bearer",
  //           res.data.expireIn
  //         );

  //         // Setting the userstate
  //         refreshToken.updateUserState(res.data.userState);
  //         console.log("refresh success");
  //       } else {
  //         console.log("refresh failed");
  //       }
  //     });
  // }, []);

  return (
    <div className="App">
      <RouteComponent />
    </div>
  );
}

export default App;
