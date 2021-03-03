import { HashRouter, Router, Route, Link } from "react-router-dom";

import CommunityEdition from "./pages/community_edition";
import ProfessionalEdition from "./pages/professional_edition";

export default function RouterComponent() {
  return (
    <div>
      <Route path="/community" component={CommunityEdition} />
      <Route path="/professional" component={ProfessionalEdition} />
    </div>
  );
}
