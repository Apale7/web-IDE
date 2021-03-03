import { BrowserRouter,Route, Link } from "react-router-dom";
import {PrivateRoute} from 'react-auth-kit'

import CommunityEdition from "./pages/community_edition";
import ProfessionalEdition from "./pages/professional_edition";
import Login from "./pages/login";

export default function RouterComponent() {
  return (
    <BrowserRouter>
      <Route path="/community" component={CommunityEdition} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/" component={ProfessionalEdition} loginPath={'/login'} exact/>
    </BrowserRouter>
  );
}
