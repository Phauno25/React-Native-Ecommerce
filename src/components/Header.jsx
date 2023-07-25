import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "../global/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { useSelector } from "react-redux";

const Header = ({ route, navigation, isBackVisible }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { width, height } = useWindowDimensions();
  const category = useSelector((state) => state.shopReducer.categorySelected);
  let title;
  if (route.name === "Home") {
    title = "Home";
  }
  if (route.name === "ItemListCategory") {
    title = `List of ${category}`;
  }
  if (route.name === "ItemDetail") {
    title = "Product detail";
  }
  return (
    <>
      <View style={width <= 350 ? styles.containerSM : styles.container}>
        {isBackVisible ? (
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={globalStyles.color.black}
            />
          </Pressable>
        ) : (
          <View />
        )}

        <CustomText style={width <= 350 ? styles.textSM : styles.text}>
          {title}
        </CustomText>
      </View>
      <Modal
        onRequestClose={() => setIsCartOpen(!isCartOpen)}
        visible={isCartOpen}
      >
        <CustomText>
          Hola Diego. No llegue a hacer esta seccion pero cuando veamos redux lo
          voy a terminar!
        </CustomText>
        <Pressable onPress={() => setIsCartOpen(false)}>
          <CustomText color="primary">Cerrar modal?</CustomText>
        </Pressable>
      </Modal>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: globalStyles.color.white,
  },
  containerSM: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: globalStyles.color.white,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 6,
    marginLeft: "5%"
  },
  textSM: {
    fontSize: 14,
    textAlign: "center",
    paddingBottom: 3,
  },
});
