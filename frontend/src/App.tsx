import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";

import { AuthLayout } from "./pages/AuthLayout";
import { Dashboard } from "./pages/Dashboard";
import { ContentFeed } from "./pages/ContentFeed";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
const App = () => {

  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLayout />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<ContentFeed />} />
                <Route
                  path="youtube"
                  element={<ContentFeed type="youtube" />}
                />
                <Route
                  path="twitter"
                  element={<ContentFeed type="twitter" />}
                />
                <Route path="link" element={<ContentFeed type="link" />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App