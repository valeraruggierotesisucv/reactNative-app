import { Image, ImageStyle } from "react-native";

interface IconLogoProps {
  style?: ImageStyle;
}

const iconLogoWidth = 380;
const iconLogoHeight = 380;

export function IconLogo({ style }: IconLogoProps) {
  return (
    <Image
      source={require("../../../assets/images/IconLogo.png")}
      width={iconLogoWidth}
      height={iconLogoHeight}
      style={style}
    />
  );
}
