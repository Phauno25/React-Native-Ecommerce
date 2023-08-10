import { FlatList, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import globalStyles from "../global/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../components/CustomText";
import { usePostCartMutation } from "../services/shopServices";

const StatusHandler = ({ navigation }) => {
  const [status, setStatus] = useState("ready");
  const [statusError, setStatusError] = useState("");
  const [triggerPostCart, result] = usePostCartMutation();

  const { items, total, user, updatedAt } = useSelector(
    (state) => state.cartReducer.cart
  );
  const handleConfirm = () => {
    setStatus("loading");
    setStatusError("");
    triggerPostCart({ items, total, user, updatedAt })
      .then((e) => {
        if (e.error) {
          setStatus("error");
          setStatusError("An error ocurred, please try again later.");
        } else {
          setStatus("success");
        }
      })
      .catch(() => {
        setStatusError("An error ocurred, please try again later.");
        setStatus("ready");
      });
  };

  switch (status) {
    case "loading":
      return <CustomText>Confirming your order, please wait...</CustomText>;
    case "success":
      return (
        <View style={styles.container}>
          <CustomText>
            Thanks for purchasing! Your order is being prepared.
          </CustomText>
          <View style={styles.actions}>
            <Pressable
              style={styles.buyButton}
              onPress={() => navigation.navigate("Home")}
            >
              <CustomText
                fontSize={18}
                variant="bold"
                color={globalStyles.color.white}
              >
                Home
              </CustomText>
            </Pressable>
            <Pressable
              style={styles.buyButton}
              onPress={() => navigation.navigate("Order")}
            >
              <CustomText
                fontSize={18}
                variant="bold"
                color={globalStyles.color.white}
                style={styles.buyButtonText}
              >
                My Orders
              </CustomText>
            </Pressable>
          </View>
        </View>
      );
    case "error":
      return (
        <View style={styles.container}>
          <CustomText>{statusError}</CustomText>;
          <View style={styles.actions}>
            <Pressable
              style={styles.buyButton}
              onPress={() => navigation.goBack()}
            >
              <CustomText
                fontSize={18}
                variant="bold"
                color={globalStyles.color.white}
                style={styles.buyButtonText}
              >
                Go Back
              </CustomText>
            </Pressable>
            <Pressable style={styles.buyButton} onPress={handleConfirm}>
              <CustomText
                fontSize={18}
                variant="bold"
                color={globalStyles.color.white}
                style={styles.buyButtonText}
              >
                Try Again
              </CustomText>
            </Pressable>
          </View>
        </View>
      );

    default:
      return (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={[
              globalStyles.defaultFlatList,
              styles.flatlist,
            ]}
            data={items}
            keyExtractor={(item) => item.product.id}
            renderItem={({ item }) => <CartItem cartItem={item} />}
            numColumns={1}
          />
          <View style={styles.actions}>
            <CustomText variant="bold" fontSize={22}>
              Total: ${total}
            </CustomText>
            <Pressable style={styles.buyButton} onPress={handleConfirm}>
              <CustomText
                fontSize={18}
                variant="bold"
                color="white"
                textAlign="center"
              >
                Buy Now
              </CustomText>
            </Pressable>
          </View>
        </View>
      );
  }
};

const Cart = ({ navigation }) => {
  return <StatusHandler navigation={navigation} />;
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalStyles.color.white,
  },
  flatlist: {
    gap: 24,
  },
  actions: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  buyButton: {
    backgroundColor: globalStyles.color.primary,
    padding: 12,
    borderRadius: 12,
  },
});
