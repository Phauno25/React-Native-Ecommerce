import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Card from "./Card";
import globalStyles from "../global/globalStyles";
import CustomText from "./CustomText";
import { setCategorySelected } from "../features/shop/shopSlice";
import { useDispatch } from "react-redux";


/*Card sencilla para mostrar las diferentes categorias*/
const CategoryItem = ({ category, navigation }) => {
  
  /*Hooks*/
  const dispatch = useDispatch();

  /*Handlers de eventos*/
  const handleCategory = () => {
    dispatch(setCategorySelected(category));
    navigation.navigate("ItemListCategory");
  };

  return (
    <Pressable onPress={handleCategory}>
      <Card additionalStyle={styles.card}>
        <CustomText color={globalStyles.color.background} fontSize={22}>
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
    borderRadius: 25,
    width: 250,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
