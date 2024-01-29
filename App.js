import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "./Navigation";

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <Navigation />
    </>
  );
}
