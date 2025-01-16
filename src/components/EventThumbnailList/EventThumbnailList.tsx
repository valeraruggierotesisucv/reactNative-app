import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";

interface EventThumbnail {
  id: string;
  imageUrl: string;
}

interface EventThumbnailListProps {
  events: EventThumbnail[];
  onPressEvent?: (eventId: string) => void;
}

const NUM_COLUMNS = 3;
const SPACING = 8;

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - (NUM_COLUMNS + 1) * SPACING) / NUM_COLUMNS;
const GRID_WIDTH = ITEM_WIDTH * NUM_COLUMNS + SPACING * (NUM_COLUMNS - 1);

export function EventThumbnailList({
  events,
  onPressEvent,
}: EventThumbnailListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.itemContainer}
            onPress={() => onPressEvent?.(event.id)}
          >
            <Image
              source={{ uri: event.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: SPACING / 2,
    width: GRID_WIDTH - SPACING,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    padding: SPACING / 2,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#E1E1E1",
    borderRadius: 10,
  },
});
