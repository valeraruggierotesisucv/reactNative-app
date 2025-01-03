import { Image } from "react-native";

interface AvatarProps {
  source: string;
}

export function Avatar({ source }: AvatarProps) {
  return (
    <Image
      source={{ uri: source }}
      style={{ borderRadius: 500, width: 40, height: 40 }}
    />
  );
}
