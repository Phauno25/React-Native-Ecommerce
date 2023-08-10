import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setProfileLocation } from "../features/user/userSlice";
import { usePostProfileLocationMutation } from "../services/shopServices";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import MapPreview from "../components/MapPreview";
import { maps_api_key } from "../database/fireConfig";
import globalStyles from "../global/globalStyles";
import CustomText from "../components/CustomText";

const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const { localId } = useSelector((state) => state.userReducer.value);
  const [triggerSaveProfileLocation, result] = usePostProfileLocationMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission Denied");
          return;
        }

        let currentPosition = await getCurrentPositionAsync({});
        setLocation({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        });
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  //Reverse geocoding
  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {
          const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${maps_api_key}`;
          const response = await fetch(url_reverse_geocode);
          const data = await response.json();
          setAddress(data.results[0].formatted_address);
        }
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [location]);

  const onConfirmLocation = () => {
    const updatedLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
      address: address,
    };
    dispatch(setProfileLocation(updatedLocation));
    triggerSaveProfileLocation({ location: updatedLocation, localId });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {location ? (
        <View>
          <CustomText textAlign="center">
            lat:{location.latitude} long:{location.longitude}
          </CustomText>
          <MapPreview location={location} />
          <CustomText
            fontSize={18}
            style={styles.address}
            textAlign="center"
            color="textPrimary"
          >
            {address}
          </CustomText>
        </View>
      ) : (
        <View>
          <CustomText>Error:{error}</CustomText>
        </View>
      )}
      <Pressable style={styles.buyButton} onPress={onConfirmLocation}>
        <CustomText fontSize={18} color="white">
          Confirm Address
        </CustomText>
      </Pressable>
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    gap: 12,
    backgroundColor: globalStyles.color.white,
  },
  image: { height: 100, width: 100 },
  buyButton: {
    backgroundColor: globalStyles.color.primary,
    padding: 12,
    borderRadius: 12,
  },
  address: {
    padding: 24,
  },
});
