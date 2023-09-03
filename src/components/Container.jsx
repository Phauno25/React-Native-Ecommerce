import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../global/globalStyles";

/*Custom Component para utilizar como componente padre de todas las screens*/

const Container = ({
  children,
  variant = "view",
  bgColor = "background",
  alignV = "flex-start",
  style,
}) => {
  /*Vars*/
  const verticalAlignStyle = { justifyContent: alignV };
  /*States*/
  const [colorStyle, setColorStyle] = useState();
  /*Hooks*/
  const { height } = useWindowDimensions();

  /*Filtramos la prop bgColor para decidir los estilos que tendra el fondo*/
  useEffect(() => {
    switch (bgColor) {
      case "primary":
        setColorStyle({ backgroundColor: globalStyles.color.primary });
        break;
      case "secondary":
        setColorStyle({ backgroundColor: globalStyles.color.secondary });
        break;
      case "textPrimary":
        setColorStyle({ backgroundColor: globalStyles.color.textPrimary });
        break;
      case "textSecondary":
        setColorStyle({ backgroundColor: globalStyles.color.textSecondary });
        break;
      case "background":
        setColorStyle({ backgroundColor: globalStyles.color.background });
        break;

      default:
        if (bgColor.startsWith("#")) {
          setColorStyle({ backgroundColor: bgColor });
        } else {
          setColorStyle({});
        }
        break;
    }
  }, []);

  /*Si la variante es scrollView utilizamos el componente scrollView en lugar de una view*/
  return variant === "scrollView" ? (
    <ScrollView
      contentContainerStyle={[
        { minHeight: height },
        styles.ScrollViewContainer,
        colorStyle,
        verticalAlignStyle,
        style,
      ]}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[styles.BasicContainer, colorStyle, verticalAlignStyle, style]}
    >
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  BasicContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: globalStyles.color.background,
    maxWidth: 760,
  },
  ScrollViewContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: globalStyles.color.background,
  },
});
