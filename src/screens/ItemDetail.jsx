import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../global/globalStyles";
import CustomText from "../components/CustomText";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ItemDetail = () => {
  const { width, height } = useWindowDimensions();
  const product = useSelector((state) => state.shopReducer.productSelected);
  const cart = useSelector((state) => state.cartReducer.cart);
  const test = cart.find(e=> e.product.id === product.id); 
 const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <>
      {product ? (
        <View style={styles.container}>
          <Image
            resizeMode="cover"
            style={width > 350 ? styles.image : styles.imageSM}
            source={{ uri: product.thumbnail }}
          />
          <View style={width > 350 ? styles.content : styles.contentSM}>
            <View>
              <CustomText>{product.category}</CustomText>
              <CustomText
                color="textPrimary"
                style={width > 350 ? styles.textTitle : styles.textTitleSM}
              >
                {product.title}
              </CustomText>
              <View style={styles.specsBarView}>
                <CustomText>{product.brand}</CustomText>
                <CustomText>Stock: {product.stock}</CustomText>
                <View style={styles.ratingView}>
                  <AntDesign
                    name="star"
                    size={24}
                    color={globalStyles.color.tertiary}
                  />
                  <CustomText>{product.rating}</CustomText>
                </View>
              </View>
            </View>

            <CustomText
              style={
                width > 350 ? styles.textDescription : styles.textDescriptionSM
              }
            >
              {product.description}
            </CustomText>
            <View style={styles.priceView}>
              <View style={styles.centeredView}>
                <CustomText
                  variant="bold"
                  color="textPrimary"
                  style={styles.totalPrice}
                >
                  Total Price:
                </CustomText>
                <CustomText style={styles.priceNotDiscount}>
                  $
                  {parseFloat(
                    (100 * product.price) / (100 - product.discountPercentage)
                  ).toFixed(2)}
                </CustomText>
                <CustomText
                  variant="bold"
                  color="textPrimary"
                  style={styles.textTitle}
                >
                  ${parseFloat(product.price).toFixed(2)}
                </CustomText>
              </View>
              <View style={styles.centeredView}>
                <CustomText style={styles.discountPercentage}>
                  {product.discountPercentage}% OFF!
                </CustomText>
                <Pressable style={styles.buyButton} onPress={handleAddCart}>
                  <CustomText
                    variant="bold"
                    color={globalStyles.color.white}
                    style={styles.buyButtonText}
                  >
                   { test ? `On cart (${test.quantity})` : "Add to Cart"}
                  </CustomText>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <CustomText>cargando producto...</CustomText>
      )}
    </>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignContent: "center",
    padding: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    justifyContent: "space-between",
    height: "50%",
  },
  contentSM: {
    justifyContent: "space-between",
    height: "70%",
  },
  card: {},
  image: {
    height: "50%",
    width: "100%",
  },
  imageSM: {
    height: "30%",
    width: "100%",
  },
  textTitle: {
    fontSize: 22,
    marginBottom: 6,
  },
  textTitleSM: {
    fontSize: 16,
    marginBottom: 3,
  },
  textDescription: {
    fontSize: 14,
    lineHeight: 20,
    paddingBottom: 6,
  },
  textDescriptionSM: {
    fontSize: 12,
    lineHeight: 14,
    paddingBottom: 3,
  },
  ratingView: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 5,
  },
  priceView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  specsBarView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  buyButton: {
    backgroundColor: globalStyles.color.primary,
    padding: 12,
    borderRadius: 12,
  },
  buyButtonText: {
    textAlign: "center",
    fontSize: 18,
  },
  centeredView: {
    width: "50%",
  },
  priceNotDiscount: {
    textDecorationLine: "line-through",
    fontFamily: "MontserratSemiBold",
  },
  discountPercentage: {
    textAlign: "center",
  },
});
