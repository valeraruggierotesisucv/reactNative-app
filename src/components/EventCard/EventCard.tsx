import { Image, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { UserCard, UserCardVariant } from "../UserCard/UserCard";
import { SocialInteractions } from "../SocialInteractions/SocialInteractions";
import { useState, useEffect } from "react";
import { Chip, ChipVariant } from "../Chip/Chip";
import { theme } from "../../../utils/theme";
import { DisplayInput } from "../DisplayInput/DisplayInput";
import { useTranslation } from "react-i18next";
import { CommentsSection } from "../CommentsSection/CommentsSection";
import { Comment } from "../CommentsSection/CommentsSection";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import React from "react";
import { truncateString } from "../../../utils/formatString";

export enum EventCardVariant {
  DEFAULT = "default",
  DETAILS = "details",
}

interface PillsProps {
  startsAt: string;
  endsAt: string;
  date: string;
}

interface LocationPillsProps {
  latitude: string;
  longitude: string; 
}
interface DisplayEventProps {
  latitude?: string;
  longitude?: string; 
  startsAt?: string;
  endsAt?: string;
  date?: string;
  category?: string;
  musicUrl?: string;
}
interface EventCardProps extends DisplayEventProps {
  eventId: string, 
  profileImage: string;
  username: string;
  eventImage: string;
  title: string; // max 28 caracteres
  description: string; // max 100 caracteres
  isLiked: boolean;
  date: string;
  variant?: EventCardVariant;
  musicUrl?: string;
  onPressUser: () => void;
  onComment: (eventId: string, comment: string, eventImage: string) => Promise<void>;
  userComment: { username: string, profileImage: string}; 
  onShare: () => void;
  onMoreDetails?: () => void;
  fetchComments: () => Promise<Comment[]>;
  handleLike: () => void;
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

const LocationPills = ( { latitude, longitude }: LocationPillsProps) => {
  const lat = parseFloat(latitude).toFixed(3);
  const long = parseFloat(longitude).toFixed(3);
  return(
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Chip
        label={lat}
        variant={ChipVariant.LIGHT}
      />
      <Chip
        label={long}
        variant={ChipVariant.LIGHT}
      />
    </View>    
  )
}

export function DisplayEvent({
  latitude,
  longitude, 
  startsAt,
  endsAt,
  date,
  category,
  musicUrl,
}: DisplayEventProps) {
  const { t } = useTranslation();

  return (
    <View>
      {musicUrl && <AudioPlayer uri={musicUrl} />}
      <DisplayInput
        label={t("common.location").toUpperCase()}
        data={<LocationPills latitude={latitude || ""} longitude={longitude || ""}/>}
      />

      <DisplayInput
        label={t("common.when").toUpperCase()}
        data={
          <Pills
            startsAt={startsAt || ""}
            endsAt={endsAt || ""}
            date={date || ""}
          />
        }
      />

      <DisplayInput
        label={t("common.category").toUpperCase()}
        data={<Chip label={category || ""} variant={ChipVariant.LIGHT} />}
      />      
    </View>
  );
}

export function EventCard({
  eventId, 
  profileImage,
  username,
  eventImage,
  title, // max 28 caracteres
  description,
  isLiked,
  date,
  latitude,
  longitude, 
  startsAt,
  category,
  endsAt,
  variant = EventCardVariant.DEFAULT,
  userComment, 
  onPressUser,
  onComment,
  onShare,
  onMoreDetails,
  fetchComments,
  musicUrl,
  handleLike,
}: EventCardProps) {
  const { t } = useTranslation();
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  

  const handleAddComment = async (comment: string) => {
    try {
      await onComment(eventId, comment, eventImage);
      setComments([
        ...comments,
        {
          username: userComment.username,
          comment: comment,
          profileImage: userComment.profileImage,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error adding comment", error);
      return;
    }
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
    
    if(commentsVisible){
      getComments();
    }
  
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
        isLiked={isLiked}
        onLike={handleLike}
        onComment={() => setCommentsVisible(true)}
        onShare={onShare}
      />
      <View style={styles.header}>
        <Text style={styles.title}>{truncateString(title, 25)}</Text>
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
          <Text style={styles.details}>{t("common.see_more_details")}</Text>
        </TouchableOpacity>
      ) : (
        <DisplayEvent
          latitude={latitude}
          longitude={longitude}
          startsAt={startsAt}
          endsAt={endsAt}
          date={date}
          category={category}
          musicUrl={musicUrl}
        />
      )}
      {commentsVisible && comments && (
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
