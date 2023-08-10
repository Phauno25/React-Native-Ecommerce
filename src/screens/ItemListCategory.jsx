import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import ProductItem from "../components/ProductItem";
import globalStyles from "../global/globalStyles";
import validations from "../utils/validations";
import CustomText from "../components/CustomText";
import { useSelector } from "react-redux";
import { useGetProductsByCategoryQuery } from "../services/shopServices";

const ItemListCategory = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [keywordError, setKeywordError] = useState("");
  const [products,setProducts] = useState([]);
  

  const productsSelected = useSelector(
    (state) => state.shopReducer.productsSelected
  );
  const categorySelected = useSelector(
    (state) => state.shopReducer.categorySelected
  );
  const {data: productsFiltered,isError,isLoading} = useGetProductsByCategoryQuery(categorySelected)

  useEffect(() => {
    const productsFiltered = productsSelected.filter((product) =>
      product.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setProducts(productsFiltered);
  }, [keyword]);

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
      <Search onSearch={onSearch} error={keywordError} />
      {products.length == 0 ? (
        <CustomText style={styles.noResult}>Sin resultados</CustomText>
      ) : (
        ""
      )}
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => (
          <ProductItem product={item} navigation={navigation} />
        )}
        showsVerticalScrollIndicator={true}
        numColumns={2}
        columnWrapperStyle={styles.centeredRow}
      />
    </View>
  );
};

export default ItemListCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: globalStyles.color.white,
  },
  content: {
    paddingHorizontal: 12,
  },
  flatlist: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  noResult: {
    fontSize: 24,
    paddingTop: 24,
    textAlign: "center",
  },
  centeredRow: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    gap: 5,
  },
});
