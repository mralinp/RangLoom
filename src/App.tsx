import { PrimeReactProvider } from "primereact/api";
import { useState, useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { MainLayout } from "./layouts/main.layout";
import { HomePage } from "./pages/home.page";
import { PalettesPage } from "./pages/palettes.page";
import { HistoryPage } from "./pages/history.page";
import { SettingsPage } from "./pages/settings.page";
import { Capacitor } from "@capacitor/core";

type Page = "home" | "palettes" | "history" | "settings";

export default function MyApp() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>("home");

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

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "palettes":
        return <PalettesPage />;
      case "history":
        return <HistoryPage />;
      case "settings":
        return <SettingsPage />;
    }
  };

  return (
    <PrimeReactProvider>
      <MainLayout onPageChange={setCurrentPage} currentPage={currentPage}>
        {renderPage()}
      </MainLayout>
    </PrimeReactProvider>
  );
}
