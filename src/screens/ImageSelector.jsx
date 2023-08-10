import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePic } from "../features/user/userSlice";
import { usePostProfileImageMutation } from "../services/shopServices";
import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import globalStyles from "../global/globalStyles";
import CustomText from "../components/CustomText";

const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const { localId } = useSelector((state) => state.userReducer.value);
  const [triggerSaveProfileImg, result] = usePostProfileImageMutation();
  const dispatch = useDispatch();

  const checkCameraPermissions = async () => {
    const { granted } = await requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await checkCameraPermissions();
    if (isCameraOk) {
      let result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const confirmImage = () => {
    dispatch(setProfilePic(image));
    triggerSaveProfileImg({ image, localId });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <Pressable style={styles.buyButton} onPress={confirmImage}>
            <CustomText
              fontSize={18}
              variant="bold"
              color="white"
              textAlign="center"
            >
              Confirm
            </CustomText>
          </Pressable>
          <Pressable style={styles.buyButton} onPress={pickImage}>
            <CustomText
              fontSize={18}
              variant="bold"
              color="white"
              textAlign="center"
            >
              Take Other
            </CustomText>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.noPhotoContainer}>
            <Image
              source={require("../assets/img/defaultProfile.jpg")}
              style={styles.image}
            />
            <CustomText textAlign="center">No image</CustomText>
          </View>
          <Pressable style={styles.buyButton} onPress={pickImage}>
            <CustomText
              fontSize={18}
              variant="bold"
              color="white"
              textAlign="center"
            >
              Add a Foto
            </CustomText>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    gap: 12,
    backgroundColor: globalStyles.color.white,
  },
  image: { height: 200, width: 200 },
  buyButton: {
    backgroundColor: globalStyles.color.primary,
    padding: 12,
    borderRadius: 12,
    width: 150,
  },
});
