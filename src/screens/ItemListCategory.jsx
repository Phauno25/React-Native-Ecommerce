import { StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import ProductItem from "../components/ProductItem";
import validations from "../utils/validations";
import CustomText from "../components/CustomText";
import { useSelector } from "react-redux";
import Container from "../components/Container";

/*Screen que muestra una lista de todos los productos dentro de una categoria*/ 

const ItemListCategory = ({ navigation }) => {
  /*Hooks*/
  const [keyword, setKeyword] = useState("");
  const [keywordError, setKeywordError] = useState("");
  const [products, setProducts] = useState([]);
  const productsSelected = useSelector(
    (state) => state.shopReducer.productsSelected
  );

  /*Utilizamos ese useEffect para filtrar los productos que coincidan con el texto colocado en el 
  input del componente Search del usuario*/
  useEffect(() => {
    const productsFiltered = productsSelected.filter((product) =>
      product.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setProducts(productsFiltered);
  }, [keyword]);


  /*Handlers de eventos*/
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
    <Container>
      <Search onSearch={onSearch} error={keywordError} />
      {products.length == 0 ? (
        <CustomText fontSize={22} textAlign="center" style={styles.noResult}>
          Sin resultados
        </CustomText>
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
    </Container>
  );
};

export default ItemListCategory;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 12,
  },
  flatlist: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  noResult: {
    paddingTop: 24,
  },
  centeredRow: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    gap: 5,
  },
});
