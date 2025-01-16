import { Image } from "react-native";

interface AvatarProps {
  source?: string;
  size?: number;
}

export function Avatar({ source, size=40 }: AvatarProps) {
  return (
    <Image
      source={{ uri: source || "https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/EventImages/user.jpg" }}
      style={{ borderRadius: 500, width: size, height: size }}
    />
  );
}
