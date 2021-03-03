import "./App.css";
import { AuthProvider } from "react-auth-kit";
import RouteComponent from "./routes";
function App() {
  return (
    <div className="App">
      <AuthProvider
        authStorageType={"localstorage"}
        authStorageName={"_auth_t"}
        authTimeStorageName={"_auth_time"}
        stateStorageName={"_auth_state"}
        // cookieDomain={window.location.hostname}
        // cookieSecure={window.location.protocol === "https:"}
        refreshTokenName={"_refresh_t"}
      >
        <RouteComponent />
      </AuthProvider>
      ;
    </div>
  );
}

export default App;
