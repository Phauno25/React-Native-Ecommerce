import { StyleSheet, View } from "react-native";
import React from "react";

const Card = ({ children, additionalStyle = [] }) => {
  return (
    <View style={[styles.cardContainer, additionalStyle]}>{children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
