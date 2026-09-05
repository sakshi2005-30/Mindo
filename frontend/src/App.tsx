import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { PublicBrain } from "./pages/PublicBrain";
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
            <Route path="/share/:sharelink" element={<PublicBrain />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<ContentFeed />} />
                <Route path="youtube" element={<ContentFeed />} />
                <Route path="twitter" element={<ContentFeed />} />
                <Route path="link" element={<ContentFeed />} />
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