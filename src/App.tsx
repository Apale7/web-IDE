import { useState } from "react";
import "./App.css";
import CommunityEdition from "./pages/community_edition";
import ProfessionalEdition from "./pages/professional_edition";
import { AuthProvider } from "react-auth-kit";

function App() {

  let mainPage;
  if (isLogin) {
    mainPage = <ProfessionalEdition></ProfessionalEdition>;
  } else {
    mainPage = <CommunityEdition></CommunityEdition>;
  }

  return <div className="App">{mainPage}</div>;
}

export default App;
