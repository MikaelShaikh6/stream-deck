import { Stack } from "expo-router";
import { colors } from "../constants/colors";
import "./globals.css";

const headerStyles = {
  headerStyle: {
    backgroundColor: colors.accent,
  },
  headerTintColor: colors.secondary_text,
  headerShadowVisible: false,
};

export default function RootLayout() {
  return <Stack screenOptions={headerStyles} />;
}
