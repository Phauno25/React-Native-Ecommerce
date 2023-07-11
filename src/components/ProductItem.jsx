import { Image, Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import Card from "./Card";
import colors from "../global/colors";

const ProductItem = ({ item }) => {
  return (
    <Pressable>
      <Card additionalStyle={styles.card}>
        <Text style={styles.text}>{item.title}</Text>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: item.thumbnail }}
        />
      </Card>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 225,
    borderRadius: 12,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  text: {
    fontSize: 22,
    color: colors.white,
    marginBottom: 6,
    fontFamily: "Montserrat",
  },
});
