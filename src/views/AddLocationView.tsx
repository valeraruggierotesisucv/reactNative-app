import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { StepsEnum } from "./AddDefaultView";
import { LatLng } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { Button, ButtonSize } from "../components/Button/Button";
import { useTranslation } from "react-i18next";
import React from "react";
interface AddLocationViewProps {
  origin: Location.LocationObject | null;
  location: LatLng | null;
  setLocation: (location: LatLng) => void;
  setStep: (step: StepsEnum) => void;
}

export function AddLocationView({
  origin,
  location,
  setLocation,
  setStep,
}: AddLocationViewProps) {
  const { t } = useTranslation();
  useEffect(() => {
    if (origin) {
      setLocation({
        latitude: origin.coords.latitude,
        longitude: origin.coords.longitude,
      });
    }
  }, []);

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude ?? origin?.coords.latitude ?? 0,
          longitude: location?.longitude ?? origin?.coords.longitude ?? 0,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          coordinate={{
            latitude: location?.latitude ?? origin?.coords.latitude ?? 0,
            longitude: location?.longitude ?? origin?.coords.longitude ?? 0,
          }}
          draggable
          title={t("addLocation.marker")}
          onDragEnd={(direction) => {
            setLocation(direction.nativeEvent.coordinate);
            console.log("Location: ", direction.nativeEvent.coordinate);
          }}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button label="Siguiente" onPress={() => setStep(StepsEnum.DEFAULT)} size={ButtonSize.MEDIUM} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
