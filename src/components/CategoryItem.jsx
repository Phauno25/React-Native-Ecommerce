import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import Card from "./Card";
import colors from "../global/colors";

const CategoryItem = ({ category,setCategorySelected }) => {
  return (
    <Pressable onPress={()=>setCategorySelected(category)}>
      <Card additionalStyle={styles.card}>
        <Text style={styles.text}>{category}</Text>
      </Card>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  text: {
    fontSize: 22,
    color: colors.white,
    fontFamily: "Montserrat",
  },
});
