import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import globalStyles from "../global/globalStyles";
import useOrder from "../hooks/useOrder";
import OrderItem from "../components/OrderItem";

const Order = () => {
  const { order } = useOrder();
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={[globalStyles.defaultFlatList, styles.flatlist]}
        data={order}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem orderItem={item} />}
        numColumns={1}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: globalStyles.color.white,
  },
  flatlist: {
    gap: 24,
  },
});
