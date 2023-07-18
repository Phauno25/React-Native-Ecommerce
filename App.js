

import { useFonts } from "expo-font";
import { useState } from "react";
import Navigator from "./src/navigation/Navigator";

export default function App() {
 
  const [fontsLoaded] = useFonts({
    'Montserrat': require("./src/assets/fonts/Montserrat-Regular.ttf"),
    'MontserratSemiBold': require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
    'MontserratBold': require("./src/assets/fonts/Montserrat-Bold.ttf"),
    'MontserratItalic': require("./src/assets/fonts/Montserrat-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Navigator/>
  );
}


