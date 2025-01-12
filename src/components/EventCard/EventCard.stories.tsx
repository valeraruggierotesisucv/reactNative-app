import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { EventCard, EventCardVariant } from "./EventCard";
import { dummyComments } from "../../data/dummyComments";

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
    eventImage:
      "https://www.laxmedellin.com/uploads/newsarticle/716b6fe2890f4c94a3a04b71f481d504/Martin-Garrix-02-by-Louis-van-Baar.jpg",
    title: "Martin Garrix Meet and Greet",
    description:
      "Martijn Gerard Garritsen, conocido por su nombre artístico Martin Garrix, es un DJ, remezclador y productor discográfico neerlandés; también propietario del sello discográfico STMPD RCRDS",
    isLiked: false,
    date: "24/12/2024",
    onComment: () => Promise.resolve(),
    fetchComments: () => Promise.resolve(dummyComments),
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
      "https://www.laxmedellin.com/uploads/newsarticle/716b6fe2890f4c94a3a04b71f481d504/Martin-Garrix-02-by-Louis-van-Baar.jpg",
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
    onComment: () => Promise.resolve(),
    fetchComments: () => Promise.resolve(dummyComments),
    onShare: () => console.log("SHARE"),
    onMoreDetails: () => console.log("MORE DETAILS"),
  },
};
