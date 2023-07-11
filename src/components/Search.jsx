import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import colors from "../global/colors";

const Search = ({ onSearch, error = "", goBack }) => {
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
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={inputValue}
          onChangeText={(text) => handleOnChange(text)}
        />

        <Pressable onPress={() => handleCancel("")}>
          <MaterialIcons name="cancel" size={24} color={colors.white} />
        </Pressable>
        <Pressable onPress={goBack}>
          <AntDesign name="back" size={24} color={colors.white} />
        </Pressable>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    width: "100%",
    gap: 12,
    backgroundColor: colors.black,
  },
  input: {
    width: 250,
    padding: 8,
    fontSize: 18,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  errorText: {
    color: colors.white,
    marginLeft: 45,
  },
});
