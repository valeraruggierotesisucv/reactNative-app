import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { StepsEnum } from "./AddDefaultView";
import { LatLng } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";
import { useEffect } from "react";

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
      <AppHeader title="Ubicación" goBack={() => setStep(StepsEnum.DEFAULT)} />
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
          title="Ubicación del evento"
          onDragEnd={(direction) => {
            setLocation(direction.nativeEvent.coordinate);
            console.log("Location: ", direction.nativeEvent.coordinate);
          }}
        />
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
