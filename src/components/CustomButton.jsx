import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "./CustomText";
import globalStyles from "../global/globalStyles";

/*Boton personalizado para la aplicacion*/

const CustomButton = ({
  children,
  onPress,
  variant = "filled",
  color = "primary",
  style = {},
  fontSize,
}) => {
  /*Hooks*/
  const { width } = useWindowDimensions();
  const [pressableStyle, setPressableStyle] = useState();
  /*Vars*/
  const base = width >= 350 ? styles.baseMd : styles.baseSm;
  /* Filtramos el color dependiendo del valor de la prop "variant" */
  useEffect(() => {
    if (variant !== "link") {
      switch (color) {
        case "primary":
          setPressableStyle({
            backgroundColor: globalStyles.color.primary,
          });
          break;
        case "secondary":
          setPressableStyle({
            backgroundColor: globalStyles.color.secondary,
          });
          break;
        case "tertiary":
          setPressableStyle({
            backgroundColor: globalStyles.color.secondary,
          });
          break;

        default:
          if (color.startsWith("#")) {
            setPressableStyle({
              backgroundColor: color,
            });
          } else {
            setPressableStyle({});
          }
          break;
      }
    }
  }, []);

  return (
    <Pressable onPress={onPress} style={[base, pressableStyle, style]}>
      <CustomText
        fontSize={16}
        variant={variant === "link" ? "semibold" : "bold"}
        color={variant === "link" ? "secondary" : "white"}
        textAlign="center"
      >
        {children}
      </CustomText>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  baseMd: {
    padding: 12,
    borderRadius: 12,
  },
  baseSm: {
    padding: 6,
    borderRadius: 12,
  },
});
