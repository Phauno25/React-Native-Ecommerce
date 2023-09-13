import { FlatList, StyleSheet, View } from "react-native";
import { useState } from "react";
import CartItem from "../components/CartItem";
import globalStyles from "../global/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../components/CustomText";
import { usePostCartMutation } from "../services/shopServices";
import CustomButton from "../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { resetCart } from "../features/cart/cartSlice";
import Container from "../components/Container";
import { addOrder } from "../features/shop/shopSlice";

/*Status handler es un componente que dependiendo del valor de la variable STATUS va a mostrar una pantalla
de cargando, o la screen del carrito o una pantalla indicando que la compra de efectuó ok */

/*Para eso realiza un switch en base al status y decide que componente devolver */

const StatusHandler = ({ navigation }) => {
  /*Hooks*/
  const dispatch = useDispatch();
  const [status, setStatus] = useState("ready");
  const [statusError, setStatusError] = useState("");
  const [triggerPostCart, result] = usePostCartMutation();
  const { items, total, user, updatedAt } = useSelector(
    (state) => state.cartReducer.cart
  );

  /*Handler de eventos*/

  const handleResetCart = (param) => {
    dispatch(resetCart());
    setStatus("ready");
    navigation.navigate(param);
  };

  const handleConfirm = () => {
    setStatus("loading");
    setStatusError("");
    const order = { items, total, user: user.email, updatedAt, id: Date.now() };
    triggerPostCart(order)
      .then((e) => {
        if (e.error) {
          setStatus("error");
          setStatusError("An error ocurred, please try again later.");
        } else {
          setStatus("success");
          dispatch(addOrder(order));
        }
      })
      .catch(() => {
        setStatusError("An error ocurred, please try again later.");
        setStatus("ready");
      });
  };

  /*Logica para filtrar que componente mostrar en base al status*/
  switch (status) {
    case "loading":
      return (
        <Container alignV="center">
          <CustomText>Confirming your order, please wait...</CustomText>
        </Container>
      );
    case "success":
      return (
        <Container style={styles.gap} alignV="center">
          <CustomText fontSize={22}>Order Completed</CustomText>
          <AntDesign
            name="checkcircle"
            size={80}
            color={globalStyles.color.secondary}
          />
          <CustomText textAlign="center" fontSize={16}>
            Thanks for purchasing! Your order is being prepared and will be
            delivered in 72hs.
          </CustomText>
          <View style={styles.actions}>
            <CustomButton onPress={() => handleResetCart("Home")} fontSize={18}>
              Home
            </CustomButton>
            <CustomButton
              onPress={() => handleResetCart("Order")}
              fontSize={18}
            >
              My Orders
            </CustomButton>
          </View>
        </Container>
      );
    case "error":
      return (
        <Container style={styles.gap} alignV="center" bgColor="white">
          <MaterialIcons
            name="error"
            size={80}
            color={globalStyles.color.secondary}
          />
          <CustomText textAlign="center" fontSize={18}>
            There has been an error procesing your order, please try again
            later.
          </CustomText>
          <View style={styles.actions}>
            <CustomButton onPress={() => handleResetCart("Home")} fontSize={18}>
              Home
            </CustomButton>
            <CustomButton onPress={() => handleConfirm} fontSize={18}>
              Try Again
            </CustomButton>
          </View>
        </Container>
      );

    default:
      return (
        <Container style={styles.gap} alignV="center">
          <FlatList
            style={{ width: "100%" }}
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
            <CustomText variant="bold" color="secondary" fontSize={22}>
              Total: ${parseFloat(total).toFixed(2)}
            </CustomText>
            <CustomButton onPress={ (items.length > 0 & total > 0) ? handleConfirm : ()=>("")}>Buy Now</CustomButton>
          </View>
        </Container>
      );
  }
};

/*Finalmente el componente Cart solo retorna el statusHandler el cual se encarga de la logica*/
const Cart = ({ navigation }) => {
  return <StatusHandler navigation={navigation} />;
};

export default Cart;

const styles = StyleSheet.create({
  gap: {
    gap: 24,
  },
  flatlist: {
    gap: 24,
    paddingBottom: 12,
    width: "100%",
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cartBottom: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
  },
});
