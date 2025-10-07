import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MobileSizeWrapper, SplashScreen } from "./components";
import { Home } from "./features/dashboard";
import { AuthenticatedLayout } from "./components/layout";
import { ConnectWallet } from "./features/auth";

function App() {
  return (
    <MobileSizeWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />

          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<Home />} />
          </Route>

          <Route path="/login">
            <Route index element={<ConnectWallet />} />
          </Route>
        </Routes>
      </Router>
    </MobileSizeWrapper>
  );
}

export default App;
