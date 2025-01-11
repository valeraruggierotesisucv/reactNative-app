import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserCard, UserCardVariant } from "../UserCard/UserCard";
import { SocialInteractions } from "../SocialInteractions/SocialInteractions";
import { useState, useEffect } from "react";
import { Chip, ChipVariant } from "../Chip/Chip";
import { theme } from "../../../utils/theme";
import { DisplayInput } from "../DisplayInput/DisplayInput";
import { useTranslation } from "../../contexts/TranslationContext";
import { CommentsSection } from "../CommentsSection/CommentsSection";
import { Comment } from "../CommentsSection/CommentsSection";
import { Portal, PortalHost } from "@gorhom/portal";

export enum EventCardVariant {
  DEFAULT = "default",
  DETAILS = "details",
}

interface PillsProps {
  startsAt: string;
  endsAt: string;
  date: string;
}

interface DisplayEventProps {
  location?: string;
  startsAt?: string;
  endsAt?: string;
  date?: string;
  category?: string;
}
interface EventCardProps extends DisplayEventProps {
  profileImage: string;
  username: string;
  eventImage: string;
  title: string; // max 28 caracteres
  description: string; // max 100 caracteres
  isLiked: boolean;
  date: string;
  variant?: EventCardVariant;
  onPressUser: () => void;
  onComment: (comment: string) => Promise<void>;
  onShare: () => void;
  onMoreDetails?: () => void;
  fetchComments: () => Promise<Comment[]>;
}

const Pills = ({ startsAt, endsAt, date }: PillsProps) => {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Chip label={startsAt} variant={ChipVariant.LIGHT} />
      <Chip label={endsAt} variant={ChipVariant.LIGHT} />
      <Chip label={date} variant={ChipVariant.LIGHT} />
    </View>
  );
};

export function DisplayEvent({
  location,
  startsAt,
  endsAt,
  date,
  category,
}: DisplayEventProps) {
  const { t } = useTranslation();

  return (
    <View>
      <DisplayInput label={t("location")} data={location} />

      <DisplayInput
        label={t("when")}
        data={
          <Pills
            startsAt={startsAt || ""}
            endsAt={endsAt || ""}
            date={date || ""}
          />
        }
      />

      <DisplayInput
        label={t("category")}
        data={<Chip label={category || ""} variant={ChipVariant.LIGHT} />}
      />
    </View>
  );
}

export function EventCard({
  profileImage,
  username,
  eventImage,
  title, // max 28 caracteres
  description,
  isLiked,
  date,
  location,
  startsAt,
  category,
  endsAt,
  variant = EventCardVariant.DEFAULT,
  onPressUser,
  onComment,
  onShare,
  onMoreDetails,
  fetchComments,
}: EventCardProps) {
  const { t } = useTranslation();
  const [like, setLike] = useState(isLiked);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleLike = () => {
    setLike(!like);
  };

  const handleAddComment = (comment: string) => {
    console.log("comment", comment);

    try {
      onComment(comment);
    } catch (error) {
      console.error("Error adding comment", error);
      return;
    }

    setComments([
      ...comments,
      {
        username: username,
        comment: comment,
        userAvatar: profileImage,
        timestamp: new Date(),
      },
    ]);
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetchComments();
        setComments(response);
      } catch (error) {
        console.error(error);
      }
    };

    getComments();
  }, [commentsVisible]);

  return (
    <>
      <UserCard
        profileImage={profileImage}
        username={username}
        variant={UserCardVariant.DEFAULT}
        onPressUser={onPressUser}
      />
      <Image
        source={{ uri: eventImage }}
        style={{ height: 277, width: "100%" }}
      />
      <SocialInteractions
        isLiked={like}
        onLike={handleLike}
        onComment={() => setCommentsVisible(true)}
        onShare={onShare}
      />
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {variant === EventCardVariant.DEFAULT ? (
          <View style={styles.chipContainer}>
            <Chip label={date} variant={ChipVariant.LIGHT} />
          </View>
        ) : null}
      </View>
      <Text style={styles.description} numberOfLines={3}>
        {description}
      </Text>
      {variant === EventCardVariant.DEFAULT ? (
        <TouchableOpacity onPress={onMoreDetails}>
          <Text style={styles.details}>{t("see_more_details")}</Text>
        </TouchableOpacity>
      ) : (
        <DisplayEvent
          location={location}
          startsAt={startsAt}
          endsAt={endsAt}
          date={date}
          category={category}
        />
      )}
      {commentsVisible && (
        <CommentsSection
          comments={comments}
          onAddComment={handleAddComment}
          isOpen={commentsVisible}
          setIsOpen={setCommentsVisible}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  chipContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 10,
  },
  title: {
    fontFamily: "SF-Pro-Rounded-Semibold",
    fontSize: 20,
    padding: 8,
    paddingTop: 0,
  },
  description: {
    fontFamily: "SF-Pro-Text-Regular",
    fontSize: 13,
    padding: 10,
    paddingTop: 0,
    justifyContent: "space-evenly",
  },
  details: {
    fontFamily: "SF-Pro-Text-Regular",
    color: theme.colors["darkGray"],
    textAlign: "center",
  },
});
