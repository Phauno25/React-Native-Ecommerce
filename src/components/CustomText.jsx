import { StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../global/globalStyles";

/*Este componente lo hice para reemplazar al Text de react native asi no tengo que andar
especificando en los estilos de cada Text que font tiene que usar. */

const CustomText = ({
  variant = "semiBold",
  color = "default",
  style = {},
  children,
}) => {
  const variantStyle = styles[variant] ? styles[variant] : styles["semiBold"];
  const [colorStyle, setColorStyle] = useState({});

  useEffect(() => {
    switch (color) {
      case "primary":
        setColorStyle({ color: globalStyles.color.primary });
        break;
      case "secondary":
        setColorStyle({ color: globalStyles.color.secondary });
        break;

      case "textPrimary":
        setColorStyle({ color: globalStyles.color.textPrimary });
        break;

      case "textSecondary":
        setColorStyle({ color: globalStyles.color.textSecondary });
        break;

      default:
        if (color.startsWith("#")) {
          setColorStyle({ color: color });
        } else {
          setColorStyle({});
        }
        break;
    }
  }, []);

  return (
    <Text style={[styles.baseText, variantStyle, colorStyle, style]}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  baseText: {
    color: globalStyles.color.textSecondary,
    fontWeight: 600,
  },
  bold: {
    fontFamily: "MontserratBold",
  },
  semiBold: {
    fontFamily: "MontserratSemiBold",
  },
  regular: {},
});
