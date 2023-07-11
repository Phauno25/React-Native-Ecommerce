import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../global/colors";

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 36,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    color: colors.text,
    paddingBottom: 12,
  },
});
