import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface SwitchProps {
  isAM: boolean;
  setIsAM: (isAM: boolean) => void;
}

export const Switch = ({ isAM, setIsAM }: SwitchProps) => {
  const translateX = useSharedValue(0);

  const toggleSwitch = () => {
    const newIsAM = !isAM;
    setIsAM(newIsAM);
    translateX.value = withTiming(newIsAM ? 50 : 0, { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.switchBackground}>
        <Animated.View style={[styles.switchThumb, animatedStyle]} />
        <TouchableOpacity style={styles.option} onPress={toggleSwitch}>
          <Text style={isAM ? styles.activeText : styles.inactiveText}>AM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={toggleSwitch}>
          <Text style={!isAM ? styles.activeText : styles.inactiveText}>
            PM
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  switchBackground: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  switchThumb: {
    position: "absolute",
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 2,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeText: {
    color: "#000",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "#888",
  },
});

export default Switch;
