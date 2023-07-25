import {
  Image,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Card from "./Card";
import globalStyles from "../global/globalStyles";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { useDispatch } from "react-redux";
import { setProductSelected } from "../features/shop/shopSlice";

const ProductItem = ({ product, navigation }) => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();

  const handleProduct = () => {
    dispatch(setProductSelected(product));
    navigation.navigate("ItemDetail");
  };

  return (
    <Pressable style={styles.pressable} onPress={handleProduct}>
      <Card additionalStyle={width > 350 ? styles.card : styles.cardSM}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: product.thumbnail }}
        />
        <View style={styles.cardContent}>
          <View>
            <CustomText style={width <= 350 ? styles.textSM : ""}>
              {product.brand}
            </CustomText>
            <CustomText
              color="textPrimary"
              style={width > 350 ? styles.textTitle : styles.textTitleSM}
            >
              {product.title}
            </CustomText>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.ratingView}>
              <AntDesign
                name="star"
                size={24}
                color={globalStyles.color.tertiary}
              />
              <CustomText>{parseFloat(product.rating).toFixed(2)}</CustomText>
            </View>
            <View>
              <CustomText style={styles.priceNotDiscount}>
                $
                {parseFloat(
                  (100 * product.price) / (100 - product.discountPercentage)
                ).toFixed(2)}
              </CustomText>
              <CustomText color="primary">
                ${parseFloat(product.price).toFixed(2)}
              </CustomText>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  pressable: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  card: {
    backgroundColor: globalStyles.color.background,
    width: "95%",
    height: 260,
  },
  cardSM: {
    backgroundColor: globalStyles.color.background,
    width: "95%",
    height: 260,
  },
  cardContent: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 5,
  },
  cardFooter: { flexDirection: "row", justifyContent: "space-between" },
  ratingView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 115,
    width: "100%",
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  textTitleSM: {
    fontSize: 14,
    marginBottom: 4,
  },
  priceNotDiscount: {
    textDecorationLine: "line-through",
  },
  textSM: {
    fontSize: 12,
  },
});
