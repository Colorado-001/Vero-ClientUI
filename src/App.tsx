import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MobileSizeWrapper, SplashScreen } from "./components";
import { Home } from "./features/dashboard";
import { AuthenticatedLayout } from "./components/layout";
import {
  SetupWallet,
  CreateAccountWithEmail,
  VerifyOtpPage,
} from "./features/auth";
import { PublicLayout } from "./components/layout/public";

function App() {
  return (
    <MobileSizeWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />

          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<Home />} />
          </Route>

          <Route element={<PublicLayout />}>
            <Route path="/signup/email" element={<CreateAccountWithEmail />} />
            <Route path="/otp/:action/:token" element={<VerifyOtpPage />} />
            <Route path="/login" element={<SetupWallet />} />
          </Route>
        </Routes>
      </Router>
    </MobileSizeWrapper>
  );
}

export default App;
