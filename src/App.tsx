import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import { MobileSizeWrapper, SplashScreen } from "./components";
import { Home } from "./features/dashboard";
import { AuthenticatedLayout } from "./components/layout";
import {
  CreateAccountWithEmail,
  VerifyOtpPage,
  LoginPage,
  SetupWallet,
} from "./features/auth";
import { PublicLayout } from "./components/layout/public";
import { SwapPage } from "./features/swap";
import { ReceivePage } from "./features/receive";
import { SelectTokenPage } from "./components/pages";
import { SendPage } from "./features/send";

function App() {
  return (
    <>
      <MobileSizeWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<SplashScreen />} />

            <Route element={<AuthenticatedLayout />}>
              <Route
                path="/select-token/:action"
                element={<SelectTokenPage />}
              />
              <Route path="/send/:token" element={<SendPage />} />

              <Route path="/dashboard" element={<Home />} />
              <Route path="/swap" element={<SwapPage />} />
              <Route path="/receive" element={<ReceivePage />} />
            </Route>

            <Route element={<PublicLayout />}>
              <Route
                path="/signup/email"
                element={<CreateAccountWithEmail />}
              />
              <Route path="/otp/:action/:token" element={<VerifyOtpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth" element={<SetupWallet />} />
            </Route>
          </Routes>
        </Router>
      </MobileSizeWrapper>

      <Toaster
        richColors
        closeButton
        className="w-full"
        position="top-center"
      />
    </>
  );
}

export default App;
