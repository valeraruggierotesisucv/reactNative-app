import { Image } from "react-native";
import { IMAGE_PLACEHOLDER } from "../../../utils/consts";

interface AvatarProps {
  source?: string;
  size?: number;
}

export function Avatar({ source, size=40 }: AvatarProps) {
  return (
    <Image
      source={{ uri: source || IMAGE_PLACEHOLDER }}
      style={{ borderRadius: 500, width: size, height: size }}
    />
  );
}
