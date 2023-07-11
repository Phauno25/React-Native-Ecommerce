import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import categories from "../data/categories.json";
import CategoryItem from "../components/CategoryItem";
import colors from "../global/colors";

const Home = ({ setCategorySelected }) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={categories}
        keyExtractor={(category) => category}
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            setCategorySelected={setCategorySelected}
          />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: colors.background,
  },
  flatlist: { alignItems: "center", justifyContent: "center" },
});
