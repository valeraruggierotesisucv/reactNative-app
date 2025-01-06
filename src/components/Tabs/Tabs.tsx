import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  onTabChange?: (tabId: string) => void;
}

export function Tabs({ tabs, onTabChange }: TabsProps) {
  const indicatorColor = "#0066ff";
  const indicatorHeight = 4;
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const [tabWidths, setTabWidths] = useState<{ [key: string]: number }>({});
  const [tabPositions, setTabPositions] = useState<{ [key: string]: number }>(
    {}
  );

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const indicatorStyle = useAnimatedStyle(() => {
    const position = tabPositions[activeTab] || 0;
    const width = tabWidths[activeTab] || 0;

    return {
      transform: [
        {
          translateX: withSpring(position, {
            damping: 10,
            stiffness: 90,
          }),
        },
      ],
      width: withSpring(width, {
        damping: 20,
        stiffness: 90,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => handleTabPress(tab.id)}
            onLayout={(e) => {
              const { width, x } = e.nativeEvent.layout;
              setTabWidths((prev) => ({ ...prev, [tab.id]: width }));
              setTabPositions((prev) => ({ ...prev, [tab.id]: x }));
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View
        style={[
          styles.indicator,
          indicatorStyle,
          {
            backgroundColor: indicatorColor,
            height: indicatorHeight,
            borderRadius: indicatorHeight,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
  tab: {
    paddingHorizontal: 16,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "SF-Pro-Rounded-Regular",
  },
  activeTabText: {
    color: "#000000",
    fontFamily: "SF-Pro-Rounded-Bold",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    backgroundColor: "#0066ff",
    borderRadius: 3,
  },
});
