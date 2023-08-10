import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import CategoryItem from "../components/CategoryItem";
import globalStyles from "../global/globalStyles";
import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../services/shopServices";

const Home = ({ navigation }) => {

  const {data:categories,isLoading,isError} = useGetCategoriesQuery();
  
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={globalStyles.defaultFlatList}
        data={categories}
        keyExtractor={(category) => category}
        renderItem={({ item }) => (
          <CategoryItem category={item} navigation={navigation} />
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
    backgroundColor: globalStyles.color.white,
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
    color: globalStyles.color.primary,
    paddingBottom: 6,
  },
});
