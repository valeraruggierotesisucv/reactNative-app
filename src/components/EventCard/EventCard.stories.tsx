import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { EventCard, EventCardVariant } from "./EventCard";

const meta = {
  title: "EventCard",
  component: EventCard,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profileImage:
      "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
    username: "John Doe",
    onPressUser: () => console.log("USER PRESSED"),
    eventImage: require("../../assets/event.png"),
    title: "Martin Garrix Meet and Greet",
    description:
      "Martijn Gerard Garritsen, conocido por su nombre artístico Martin Garrix, es un DJ, remezclador y productor discográfico neerlandés; también propietario del sello discográfico STMPD RCRDS",
    isLiked: false,
    date: "24/12/2024",
    onComment: () => console.log("COMMENT"),
    onShare: () => console.log("SHARE"),
    onMoreDetails: () => console.log("MORE DETAILS"),
  },
};

export const Details: Story = {
  args: {
    profileImage:
      "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
    username: "John Doe",
    onPressUser: () => console.log("USER PRESSED"),
    eventImage:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmartingarrix.com%2Ftour%2F&psig=AOvVaw3VUb5iJZIRtKb7JikxVwcC&ust=1736031465915000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMi567LT2ooDFQAAAAAdAAAAABAE",
    title: "Martin Garrix Meet and Greet",
    description:
      "Martijn Gerard Garritsen, conocido por su nombre artístico Martin Garrix, es un DJ, remezclador y productor discográfico neerlandés; también propietario del sello discográfico STMPD RCRDS",
    isLiked: false,
    date: "24/12/2024",
    variant: EventCardVariant.DETAILS,
    location: "Av Universitaria. ",
    startsAt: "8:00 pm",
    endsAt: "10:00 pm",
    category: "CONCIERTO",
    onComment: () => console.log("COMMENT"),
    onShare: () => console.log("SHARE"),
    onMoreDetails: () => console.log("MORE DETAILS"),
  },
};
