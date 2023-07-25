import React from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import Cart from "../screens/Cart";
import Order from "../screens/Order";

const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Order"
      screenOptions={({ route, navigation }) => ({
        header: () => {
          return (
            <Header
              route={route}
              navigation={navigation}
              isBackVisible={false}
              title={route.name}
            />
          );
        },
      })}
    >
      <Stack.Screen name="OrderMain" component={Order} />
    </Stack.Navigator>
  );
};

export default OrderStack;

const styles = StyleSheet.create({});
