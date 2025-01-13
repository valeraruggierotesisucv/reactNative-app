import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import { formatDate } from "../../../utils/formatDate";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MAX_LINES = 3;
const MIN_LINES = 3;

interface CommentItemProps {
  username: string;
  comment: string;
  timestamp: Date;
  likes?: number;
  userAvatar?: string;
  onLike?: () => void;
  onReply?: () => void;
}

export function CommentItem({
  username,
  comment,
  timestamp,
  userAvatar,
}: CommentItemProps) {
  const { t, i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [hasTextOverflow, setHasTextOverflow] = useState(false);

  const formattedTimestamp = formatDate(timestamp, i18n.language);

  const onTextLayout = (e: LayoutChangeEvent) => {
    const lineHeight = styles.commentText.lineHeight || 20;
    const maxHeight = lineHeight * MIN_LINES;
    setTextHeight(e.nativeEvent.layout.height);
    setHasTextOverflow(e.nativeEvent.layout.height >= maxHeight);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {userAvatar ? (
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.defaultAvatar]} />
        )}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.timestamp}>{formattedTimestamp}</Text>
        </View>

        <View>
          <Text
            style={styles.commentText}
            numberOfLines={isExpanded ? undefined : MAX_LINES}
            onLayout={onTextLayout}
          >
            {comment}
          </Text>

          {hasTextOverflow && (
            <TouchableOpacity
              onPress={() => setIsExpanded(!isExpanded)}
              style={styles.seeMoreButton}
            >
              <Text style={styles.seeMoreText}>
                {isExpanded ? t("common.see_less") : t("common.see_more")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 12,
    alignSelf: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 500,
  },
  defaultAvatar: {
    backgroundColor: "#DDDDDD",
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  username: {
    fontFamily: "SF-Pro-Text-Bold",
    fontSize: 14,
    marginRight: 8,
  },
  timestamp: {
    color: "#666666",
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#000000",
    marginBottom: 4,
    fontFamily: "SF-Pro-Text-Regular",
  },
  seeMoreButton: {
    marginBottom: 8,
  },
  seeMoreText: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  action: {
    marginRight: 16,
  },
  actionText: {
    color: "#666666",
    fontSize: 12,
  },
});
