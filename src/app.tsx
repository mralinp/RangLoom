import { PrimeReactProvider } from "primereact/api";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SplashScreen } from "./components/SplashScreen";
import { HomePage } from "./pages/home.page";
import { PalettesPage } from "./pages/palettes.page";
import { HistoryPage } from "./pages/history.page";
import { SettingsPage } from "./pages/settings.page";
import { CameraPage } from "./pages/camera.page";
import { Capacitor } from "@capacitor/core";
import { BlendingPage } from "./pages/blending.page";
import { AuthPage } from "./pages/auth.page";
import { useAuthStore } from "./store/auth.store";

export function App() {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Check if running on a mobile device
    if (Capacitor.isNativePlatform()) {
      // Additional mobile-specific logic can go here
    }
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />
            }
          />
          {isAuthenticated ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/blending" element={<BlendingPage />} />
              <Route path="/camera" element={<CameraPage />} />
              <Route path="/palettes" element={<PalettesPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/auth" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}
