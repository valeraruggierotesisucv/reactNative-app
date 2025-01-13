import { Image } from "react-native";

interface AvatarProps {
  source: string;
  size?: number;
}

export function Avatar({ source, size=40 }: AvatarProps) {
  return (
    <Image
      source={{ uri: source }}
      style={{ borderRadius: 500, width: size, height: size }}
    />
  );
}
