import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopStack from "./ShopStack";
import CartStack from "./CartStack";
import globalStyles from "../global/globalStyles";
import OrderStack from "./OrderStack";
import AuthStack from "./AuthStack";
import { useDispatch, useSelector } from "react-redux";
import ProfileStack from "./ProfileStack";
import { useGetProfileImageQuery, useGetProfileLocationQuery } from "../services/shopServices";
import { setProfileLocation, setProfilePic } from "../features/user/userSlice";

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const { email, localId } = useSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();
  const { data, error, loading } = useGetProfileImageQuery(localId);
  const { data: location } = useGetProfileLocationQuery(localId);


  useEffect(() =>{
    if (data) {
      dispatch(setProfilePic(data.image))
    }
  },[data])
  useEffect(() =>{
    if (location) {
      console.log(location.location)
      dispatch(setProfileLocation(location.location))
    }
  },[location])


  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        {email ? (
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Tab.Screen
              name="Shop"
              component={ShopStack}
              options={{
                tabBarLabel: "Shop",
                tabBarIcon: ({ focused }) => {
                  return (
                    <View>
                      <FontAwesome5
                        name="store"
                        size={24}
                        color={
                          focused
                            ? globalStyles.color.primary
                            : globalStyles.color.black
                        }
                      />
                    </View>
                  );
                },
              }}
            />
            <Tab.Screen
              name="Cart"
              component={CartStack}
              options={{
                tabBarLabel: "My Cart",
                tabBarIcon: ({ focused }) => {
                  return (
                    <View>
                      <MaterialIcons
                        name="shopping-cart"
                        size={24}
                        color={
                          focused
                            ? globalStyles.color.primary
                            : globalStyles.color.black
                        }
                      />
                    </View>
                  );
                },
              }}
            />
            <Tab.Screen
              name="Order"
              component={OrderStack}
              options={{
                tabBarLabel: "My Orders",
                tabBarIcon: ({ focused }) => {
                  return (
                    <View>
                      <FontAwesome5
                        name="list-ul"
                        size={24}
                        color={
                          focused
                            ? globalStyles.color.primary
                            : globalStyles.color.black
                        }
                      />
                    </View>
                  );
                },
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStack}
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ focused }) => {
                  return (
                    <View>
                      <MaterialIcons
                        name="person"
                        size={24}
                        color={
                          focused
                            ? globalStyles.color.primary
                            : globalStyles.color.black
                        }
                      />
                    </View>
                  );
                },
              }}
            />
          </Tab.Navigator>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
