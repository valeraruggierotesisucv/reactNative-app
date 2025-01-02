import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface ProfileCardProps {
  profileImage?: string;
  username: string;
  biography: string;
  events: number;
  followers: number;
  following: number;
  isFollowing?: boolean;
  onFollow?: () => void;
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
}: ProfileCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{events}</Text>
              <Text style={styles.statLabel}>Eventos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{followers}</Text>
              <Text style={styles.statLabel}>Seguidores</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{following}</Text>
              <Text style={styles.statLabel}>Seguidos</Text>
            </View>
          </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.biography}>{biography}</Text>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, isFollowing && styles.unfollowButton]}
          onPress={onFollow}
        >
          <Text
            style={[
              styles.buttonText,
              isFollowing && styles.unfollowButtonText,
            ]}
          >
            {isFollowing ? "Dejar de seguir" : "Seguir"}
          </Text>
        </TouchableOpacity>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    alignItems: "center",
  },
  headerSection: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
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
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "left",
  },
  biography: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "left",
  },
  continueButton: {
    backgroundColor: "#00008B",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
  },
  unfollowButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#00008B",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  unfollowButtonText: {
    color: "#00008B",
  },
  userInfo: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 16,
  },
});
