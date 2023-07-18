import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../global/globalStyles";
import CustomText from "./CustomText";

const Search = ({ onSearch, error = "" }) => {
  const { width, height } = useWindowDimensions();
  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (text) => {
    setInputValue(text);
    onSearch(text);
  };

  const handleCancel = (text) => {
    setInputValue(text);
    onSearch(text);
  };

  return (
    <View style={width > 350 ? styles.container : ""}>
      <View style={styles.searchBox}>
        <TextInput
          style={width > 350 ? styles.input : styles.inputSm}
          placeholder="Search product..."
          value={inputValue}
          onChangeText={(text) => handleOnChange(text)}
        />
        <Pressable style={styles.searchButton} onPress={() => handleCancel("")}>
          <MaterialIcons
            name="cancel"
            size={width > 350 ? 24 : 20}
            color={globalStyles.color.black}
          />
        </Pressable>
      </View>
      {error ? <CustomText style={styles.errorText}>{error}</CustomText> : null}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  searchBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    gap: 6,
  },
  input: {
    width: "85%",
    padding: 8,
    fontSize: 16,
    backgroundColor: globalStyles.color.white,
    borderBottomWidth: 1,
    borderColor: globalStyles.color.textSecondary,
  },
  inputSm: {
    width: "60%",
    padding: 8,
    backgroundColor: globalStyles.color.white,
    borderRadius: 10,
  },
  searchButton: {
    width: "10%",
  },
  errorText: {
    color: globalStyles.color.secondary,
    marginLeft: "5%",
  },
});
