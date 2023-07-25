import { useFonts } from "expo-font";
import Navigator from "./src/navigation/Navigator";
import { Provider } from "react-redux";
import store from "./src/store/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./src/assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("./src/assets/fonts/Montserrat-Bold.ttf"),
    MontserratItalic: require("./src/assets/fonts/Montserrat-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
