import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.alinaderiparizi.rangloom",
  appName: "rangloom",
  webDir: "dist",
  ios: {
    scheme: "rangloom",
  },
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export default config;
