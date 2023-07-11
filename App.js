import { StyleSheet } from "react-native";
import Header from "./src/components/Header";
import Home from "./src/screens/Home";
import ItemListCategory from "./src/screens/ItemListCategory";
import { useFonts } from "expo-font";
import { useState } from "react";

export default function App() {
  const [categorySelected, setCategorySelected] = useState();

  const [fontsLoaded] = useFonts({
    Montserrat: require("./src/assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Header title={categorySelected ? categorySelected : "Categories"} />
      {categorySelected ? (
        <ItemListCategory
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
        />
      ) : (
        <Home setCategorySelected={setCategorySelected} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat",
  },
});
