import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Button, ButtonSize } from "../Button/Button";
import { formatDate } from "../../../utils/formatDate";
import { useTranslation } from "react-i18next";

export enum NotificationType {
  FOLLOW = "FOLLOW",
  LIKE_EVENT = "LIKE",
  COMMENT_EVENT = "COMMENT",
}

const notificationMessages = {
  [NotificationType.FOLLOW]: "notifications.FOLLOW",
  [NotificationType.LIKE_EVENT]: "notifications.LIKE",
  [NotificationType.COMMENT_EVENT]: "notifications.COMMENT",
};

export interface NotificationItemProps {
  user: string;
  userAvatar: string;
  timestamp: Date;
  type: NotificationType;
  eventImage?: string;
  onFollow?: () => void;
}

export function NotificationItem({
  user,
  userAvatar,
  timestamp,
  type,
  eventImage,
  onFollow,
}: NotificationItemProps) {
  const { t, i18n } = useTranslation();
  const formattedDate = formatDate(timestamp, i18n.language);
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
          source={{
            uri: userAvatar,
          }}
          style={styles.avatarImage}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{user}</Text>
          <Text style={styles.timestamp}>{formattedDate}</Text>
        </View>
        <Text style={styles.description}>{t(notificationMessages[type])}</Text>
      </View>
      <View style={styles.actions}>
        {/* {type === NotificationType.FOLLOW && (
          <Button
            label={t("common.follow")}
            onPress={onFollow}
            size={ButtonSize.EXTRA_SMALL}
            fontSize={14}
          />
        )} */}
        {(type === NotificationType.LIKE_EVENT ||
          type === NotificationType.COMMENT_EVENT) && (
          <Image source={{ uri: eventImage }} style={styles.eventImage} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    padding: 5,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "20%",
  },
  content: {
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "60%",
  },
  actions: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
  title: {
    fontSize: 16,
    fontFamily: "SF-Pro-Rounded-Bold",
  },
  description: {
    fontSize: 14,
    fontFamily: "SF-Pro-Text-Regular",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 500,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
    marginLeft: 10,
    fontFamily: "SF-Pro-Text-Regular",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
