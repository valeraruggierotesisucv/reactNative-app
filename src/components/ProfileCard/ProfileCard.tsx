import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

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
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />

          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statItem} onPress={onEvents}>
              <Text style={styles.statNumber}>{events}</Text>
              <Text style={styles.statLabel}>Eventos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem} onPress={onFollowers}>
              <Text style={styles.statNumber}>{followers}</Text>
              <Text style={styles.statLabel}>Seguidores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem} onPress={onFollowed}>
              <Text style={styles.statNumber}>{following}</Text>
              <Text style={styles.statLabel}>Seguidos</Text>
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
                {isFollowing ? "Dejar de seguir" : "Seguir"}
              </Text>
            </TouchableOpacity>
          )}

          {onEditProfile && (
            <TouchableOpacity
              style={[styles.profileButton]}
              onPress={onEditProfile}
            >
              <Text style={[styles.buttonText]}>Editar perfil</Text>
            </TouchableOpacity>
          )}
          {onConfigureProfile && (
            <TouchableOpacity
              style={[styles.profileButton]}
              onPress={onConfigureProfile}
            >
              <Text style={[styles.buttonText]}>Configurar perfil</Text>
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
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
