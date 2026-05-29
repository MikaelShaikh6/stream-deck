import { Stack } from "expo-router";
import React from "react";
import { colors } from "../constants/colors";
import "./globals.css";

const headerStyles = {
  headerShown: false,
  headerStyle: {
    backgroundColor: colors.accent,
  },
  headerTintColor: colors.secondaryText,
  headerShadowVisible: false,
};

export default function RootLayout() {
  return <Stack screenOptions={headerStyles} />;
}
