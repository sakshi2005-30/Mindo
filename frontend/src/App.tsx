import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { useState } from "react"
import { AuthLayout } from "./pages/AuthLayout";
import { Dashboard } from "./pages/Dashboard";
import { ContentFeed } from "./pages/ContentFeed";
const App = () => {
  const [openSignin,setOpenSignin]=useState<boolean>(true);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />} />

          <Route path="/dahboard" element={<Dashboard />}>
            <Route index element={<ContentFeed />} />
            <Route path="/youtube" element={<ContentFeed type="youtube" />} />
            <Route path="/twitter" element={<ContentFeed type="twitter" />} />
            <Route path="/link" element={<ContentFeed type="link" />}/>

          </Route>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App