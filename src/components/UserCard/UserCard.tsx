import {
  View,
  Image,
  Text,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import { StyleSheet } from "react-native";
import { Button, ButtonSize } from "../Button/Button";
import { Avatar } from "../Avatar/Avatar";

export enum UserCardVariant {
  DEFAULT = "default",
  WITH_BUTTON = "withButton",
}

export interface UserCardProps {
  profileImage: string;
  username: string;
  variant?: UserCardVariant;
  onPressUser?: () => void;
  onPressButton?: () => void;
  actionLabel?: string;
  disabled?: boolean;
}

export function UserCard({
  profileImage,
  username,
  variant = UserCardVariant.DEFAULT,
  onPressUser,
  onPressButton,
  actionLabel,
  disabled,
}: UserCardProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressUser} style={styles.user}>
        <Avatar source={profileImage} />
        <Text style={styles.text}>{username}</Text>
      </Pressable>
      {variant === UserCardVariant.WITH_BUTTON && (
        <View style={{ padding: 0, alignItems: "flex-end" }}>
          <Button
            label={actionLabel || "Action"}
            onPress={onPressButton ?? (() => {})}
            size={ButtonSize.EXTRA_SMALL}
            fontSize={14}
            disabled={disabled}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 5,
    paddingLeft: 5, 
    flex: 1,
  },
  text: {
    fontFamily: "SF-Pro-Rounded-Medium",
    fontSize: 16,
    padding: 5,
    paddingLeft: 10,
  },
});
