import React from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import Home from "../screens/Home";
import ItemListCategory from "../screens/ItemListCategory";
import ItemDetail from "../screens/ItemDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Shop"
      screenOptions={({ route, navigation }) => ({
        header: () => {
          return (
            <Header
              route={route}
              navigation={navigation}
              isBackVisible={route.name === "Home" ? false : true}
              title={route.name}
            />
          );
        },
      })}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ItemListCategory" component={ItemListCategory} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
    </Stack.Navigator>
  );
};

export default ShopStack;

const styles = StyleSheet.create({
});
