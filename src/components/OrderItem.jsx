import {
    StyleSheet,
    View,
    Pressable,
    ImageBackground,
  } from "react-native";
  import React from "react";
  import globalStyles from "../global/globalStyles";
  import CustomText from "./CustomText";
  import { MaterialIcons } from "@expo/vector-icons";
  
  const OrderItem = ({ orderItem }) => {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <CustomText style={styles.title}>{orderItem.title}</CustomText>
          <CustomText style={styles.title}>
            x {orderItem.quantity} | ${parseFloat(orderItem.price * orderItem.quantity).toFixed(2)}
          </CustomText>
          <CustomText style={styles.title}>
            ${parseFloat(orderItem.price * orderItem.quantity).toFixed(2)}
          </CustomText>
        </View>
        <View style={styles.imageView}>
          <ImageBackground
            resizeMode="cover"
            style={styles.image}
            source={{ uri: orderItem.thumbnail }}
          >
            <Pressable style={styles.iconButton}>
            <MaterialIcons name="delete-forever" size={36} color={globalStyles.color.white} />
            </Pressable>
          </ImageBackground>
        </View>
        <CustomText color={"#ffffff"} style={styles.discount}>{orderItem.discountPercentage}% OFF</CustomText>
      </View>
    );
  };
  
  export default OrderItem;
  
  const styles = StyleSheet.create({
    container: {
      width: 320,
      height: 100,
      backgroundColor: globalStyles.color.background,
      flexDirection: "row",
      justifyContent: "space-between",
      padding:12
    },
    imageView: {
      width: "40%",
      justifyContent:"center"
    },
    image: {
      width: "100%",
      height: 100,
      alignItems:"flex-end",
      justifyContent:"space-between"
    },
    content: {
      justifyContent: "space-between",
      width: "60%",
    },
    topView: {
      backgroundColor: "white",
      padding: 5,
      justifyContent: "space-between",
      flexDirection: "row-reverse",
    },
    title: {
      flexWrap: "wrap",
    },
    discount:{
      backgroundColor:globalStyles.color.primary,
      position:"absolute",
      top:-10,
      paddingHorizontal:6,
      left:3
    },
    iconButton:{
      padding:6,
      backgroundColor:"red",
    }
  });
  