import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Card from "./Card";
import globalStyles from "../global/globalStyles";
import CustomText from "./CustomText";
import { setCategorySelected } from "../features/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";

const CategoryItem = ({ category, navigation }) => {
  const dispatch = useDispatch();

  const handleCategory = () => {
    dispatch(setCategorySelected(category));
    navigation.navigate("ItemListCategory");
  };

  return (
    <Pressable onPress={handleCategory}>
      <Card additionalStyle={styles.card}>
        <CustomText color={globalStyles.color.white} style={styles.text}>
          {category}
        </CustomText>
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
