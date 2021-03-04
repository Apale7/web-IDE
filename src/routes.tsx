import { BrowserRouter, Route, Link } from "react-router-dom";

import CommunityEdition from "./pages/community_edition";
import ProfessionalEdition from "./pages/professional_edition";
import Login from "./pages/login";
import Test from "./pages/file";
export default function RouterComponent() {
  return (
    <BrowserRouter>
      <Route path="/community" component={CommunityEdition} />
      <Route path="/login" component={Login} exact />
      <Route path="/prof" component={ProfessionalEdition} />
      <Route path="/file" component={Test} />
    </BrowserRouter>
  );
}
