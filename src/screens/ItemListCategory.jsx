import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import product from "../data/product.json";
import Search from "../components/Search";
import ProductItem from "../components/ProductItem";
import colors from "../global/colors";
import validations from "../utils/validations";

const ItemListCategory = ({ categorySelected = "", setCategorySelected }) => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [keywordError, setKeywordError] = useState("");

  useEffect(() => {
    const productsFiltered = product.filter(
      (product) =>
        product.category === categorySelected &&
        product.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setProducts(productsFiltered);
  }, [categorySelected, keyword]);

  const onSearch = (input) => {
    const evaluation = validations.alphanumericspaces.test(input);

    if (evaluation) {
      setKeyword(input);
      setKeywordError("");
    } else {
      setKeywordError("Solo letras y números");
    }
  };

  return (
    <View style={styles.container}>
      <Search
        onSearch={onSearch}
        error={keywordError}
        goBack={() => setCategorySelected("")}
      />
      {products.length == 0 ? (
        <Text style={styles.noResult}>Sin resultados </Text>
      ) : (
        ""
      )}
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => ProductItem({ item })}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ItemListCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: colors.background,
  },
  flatlist: { alignItems: "center", justifyContent: "center" },
  noResult: {
    color: colors.white,
    fontSize: 24,
    paddingTop: 24,
    textAlign: "center",
  },
});
