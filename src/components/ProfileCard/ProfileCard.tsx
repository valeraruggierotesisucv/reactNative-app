import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "../../contexts/TranslationContext";

interface ProfileCardProps {
  profileImage?: string;
  username: string;
  biography: string;
  events: number;
  followers: number;
  following: number;
  isFollowing?: boolean;
  onEditProfile?: () => void;
  onConfigureProfile?: () => void;
  onFollow?: () => void;
  onEvents?: () => void;
  onFollowers?: () => void;
  onFollowed?: () => void;
}

export function ProfileCard({
  profileImage,
  username,
  biography,
  events,
  followers,
  following,
  isFollowing = false,
  onFollow,
  onConfigureProfile,
  onEditProfile,
  onEvents,
  onFollowers,
  onFollowed,
}: ProfileCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />

          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statItem} onPress={onEvents}>
              <Text style={styles.statNumber}>{events}</Text>
              <Text style={styles.statLabel}>{t("events")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem} onPress={onFollowers}>
              <Text style={styles.statNumber}>{followers}</Text>
              <Text style={styles.statLabel}>{t("followers")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem} onPress={onFollowed}>
              <Text style={styles.statNumber}>{following}</Text>
              <Text style={styles.statLabel}>{t("following")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.biography}>{biography}</Text>
        </View>

        <View style={styles.buttonContainer}>
          {onFollow && (
            <TouchableOpacity
              style={[
                styles.continueButton,
                isFollowing && styles.unfollowButton,
              ]}
              onPress={onFollow}
            >
              <Text
                style={[
                  styles.buttonText,
                  isFollowing && styles.unfollowButtonText,
                ]}
              >
                {isFollowing ? t("unfollow") : t("follow")}
              </Text>
            </TouchableOpacity>
          )}

          {onEditProfile && (
            <TouchableOpacity
              style={[styles.profileButton]}
              onPress={onEditProfile}
            >
              <Text style={[styles.buttonText]}>{t("edit_profile")}</Text>
            </TouchableOpacity>
          )}
          {onConfigureProfile && (
            <TouchableOpacity
              style={[styles.profileButton]}
              onPress={onConfigureProfile}
            >
              <Text style={[styles.buttonText]}>{t("configure_profile")}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    maxWidth: 400,
  },
  content: {
    alignItems: "center",
  },
  headerSection: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "red",
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Regular",
    color: "#000000",
  },
  statLabel: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "SF-Pro-Rounded-Bold",
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "left",
    fontFamily: "SF-Pro-Rounded-Bold",
  },
  biography: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 10,
    textAlign: "left",
    fontFamily: "SF-Pro-Text-Regular",
  },
  continueButton: {
    backgroundColor: "#050F71",
    paddingVertical: 4,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  profileButton: {
    backgroundColor: "#050F71",
    paddingVertical: 4,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  unfollowButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#050F71",
  },
  buttonText: {
    color: "white",
    fontSize: 13,
  },
  unfollowButtonText: {
    color: "#050F71",
  },
  userInfo: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
