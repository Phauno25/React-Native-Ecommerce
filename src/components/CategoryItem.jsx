import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Card from "./Card";
import globalStyles from "../global/globalStyles";
import CustomText from "./CustomText";

const CategoryItem = ({ category, navigation }) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ItemListCategory", { category: category })
      }
    >
      <Card additionalStyle={styles.card}>
        <CustomText color={globalStyles.color.white} style={styles.text}>{category}</CustomText>
      </Card>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: globalStyles.color.primary,
    borderRadius: 12,
    width: 250,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 22,
  },
});
