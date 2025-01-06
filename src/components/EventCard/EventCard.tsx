import {
  ImageSourcePropType,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { UserCard, UserCardVariant } from "../UserCard/UserCard";
import { SocialInteractions } from "../SocialInteractions/SocialInteractions";
import { useState } from "react";
import { Chip, ChipVariant } from "../Chip/Chip";
import { theme } from "../../../utils/theme";
import { DisplayInput } from "../DisplayInput/DisplayInput";
import { getLoadedFonts } from "expo-font";

export enum EventCardVariant {
  DEFAULT = "default",
  DETAILS = "details",
}

interface PillsProps {
  startsAt: string; // esto falta en el modelo
  endsAt: string; // esto falta en el modelo
  date: string;
}
interface DisplayEventProps {
  location?: string;
  startsAt?: string; // esto falta en el modelo
  endsAt?: string; // esto falta en el modelo
  date?: string;
  category?: string;
}
interface EventCardProps extends DisplayEventProps {
  profileImage: string;
  username: string;
  eventImage: string; // falta este campo en la db
  onPressUser: () => void;
  title: string; // max 28 caracteres
  description: string; // max 100 caracteres
  isLiked: boolean;
  date: string;
  variant?: EventCardVariant;
  onComment: () => void;
  onShare: () => void;
  onMoreDetails: () => void;
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
  return (
    <View>
      <DisplayInput label="UBICACIÓN" data={location} />

      <DisplayInput
        label="¿CUÁNDO?"
        data={
          <Pills
            startsAt={startsAt || ""}
            endsAt={endsAt || ""}
            date={date || ""}
          />
        }
      />

      <DisplayInput
        label="CATEGORÍA"
        data={<Chip label={category || ""} variant={ChipVariant.LIGHT} />}
      />
    </View>
  );
}

export function EventCard({
  profileImage,
  username,
  onPressUser,
  eventImage,
  title,
  description,
  isLiked,
  date,
  location,
  startsAt,
  category,
  endsAt,
  variant = EventCardVariant.DEFAULT,
  onComment,
  onShare,
  onMoreDetails,
}: EventCardProps) {
  const [like, setLike] = useState(isLiked);
  console.log(getLoadedFonts());
  const handleLike = () => {
    setLike(!like);
  };
  return (
    <>
      <UserCard
        profileImage={profileImage}
        username={username}
        variant={UserCardVariant.DEFAULT}
        onPressUser={onPressUser}
      />
      <Image source={{ uri: eventImage }} style={{ height: 277 }} />
      <SocialInteractions
        isLiked={like}
        onLike={handleLike}
        onComment={onComment}
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
          <Text style={styles.details}>Ver más detalles ...</Text>
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
