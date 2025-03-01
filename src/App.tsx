import { PrimeReactProvider } from "primereact/api";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SplashScreen } from "./components/SplashScreen";
import { MainLayout } from "./layouts/main.layout";
import { HomePage } from "./pages/home.page";
import { PalettesPage } from "./pages/palettes.page";
import { HistoryPage } from "./pages/history.page";
import { SettingsPage } from "./pages/settings.page";
import { CameraPage } from "./pages/camera.page";
import { Capacitor } from "@capacitor/core";
import { BlendingPage } from "./pages/blending.page";

export default function MyApp() {
  const [loading, setLoading] = useState(true);

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
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/blending" element={<BlendingPage />} />
          <Route
            path="*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/palettes" element={<PalettesPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}
