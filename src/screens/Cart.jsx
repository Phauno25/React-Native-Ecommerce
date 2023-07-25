import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import CartItem from "../components/CartItem";
import globalStyles from "../global/globalStyles";
import { useSelector } from "react-redux";

const Cart = () => {
  
  const cart = useSelector(state => state.cartReducer.cart)

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={[globalStyles.defaultFlatList,styles.flatlist]}
        data={cart}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => <CartItem cartItem={item} />}
        numColumns={1}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: globalStyles.color.white,
  },
  flatlist:{
    gap:24,
  }
});
