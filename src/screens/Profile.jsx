import { Image, Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import CustomText from "../components/CustomText";
import globalStyles from "../global/globalStyles";

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer.value);

  const launchCamera = () => {
    navigation.navigate("ImageSelector");
  };

  const launchAdress = () => {
    navigation.navigate("LocationSelector");
  };

  return (
    <View style={styles.container}>
      <View style={styles.area}>
        <CustomText fontSize={18}>{user.email}</CustomText>
        {user.profileImage ? (
          <Image source={{ uri: user.profileImage }} style={styles.image} />
        ) : (
          <>
            <Image  source={require("../assets/img/defaultProfile.jpg")} style={styles.image} />
          </>
        )}
        <Pressable onPress={launchCamera}>
          <CustomText variant="link">
            {user.profileImage ? "Change Avatar" : "Add Avatar"}
          </CustomText>
        </Pressable>
      </View>
      <View style={styles.area}>
        <CustomText fontSize={18}>My Shiping Address</CustomText>
        <CustomText color="textPrimary" fontSize={14}>{user.location?.address ? user.location.address: "No address found"}</CustomText>

        <Pressable onPress={launchAdress}>
          <CustomText variant="link">{user.location?.address ? "Change Address": "Add Address"}</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    gap: 12,
    backgroundColor: globalStyles.color.white,
  },
  area: {
    alignItems: "center",
    gap: 12,
    paddingVertical:12,
    paddingHorizontal:6,
    width: "80%",
    backgroundColor: globalStyles.color.background,
  },
  image: { width: 100, height: 100 },
  buyButton: {
    backgroundColor: globalStyles.color.primary,
    padding: 12,
    borderRadius: 12,
  },
  buyButtonText: {
    textAlign: "center",
    fontSize: 18,
  },
});
