import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { CategoryButton } from "./CategoryButton";
import { useState } from "react";

const meta = {
  title: "CategoryButton",
  component: CategoryButton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 16, backgroundColor: "#f5f5f5" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CategoryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    label: "Category",
    icon: "handshake",
    onPress: () => console.log("Category pressed"),
  },
};

export const Grid: Story = {
  args: {
    label: "Category",
    icon: "handshake",
  },
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handlePress = (categoryId: string) => {
      setSelectedIds((prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev, categoryId]
      );
    };

    const categories = [
      { id: "1", label: "Food", icon: "food" },
      { id: "2", label: "Drinks", icon: "cup" },
      { id: "3", label: "Sports", icon: "basketball" },
      { id: "4", label: "Music", icon: "music" },
      { id: "5", label: "Art", icon: "palette" },
      { id: "6", label: "Movies", icon: "movie" },
      { id: "7", label: "Books", icon: "book" },
      { id: "8", label: "Games", icon: "gamepad-variant" },
      { id: "9", label: "Travel", icon: "airplane" },
      { id: "10", label: "Shopping", icon: "shopping" },
      { id: "11", label: "Health", icon: "heart" },
      { id: "12", label: "Education", icon: "school" },
    ];

    return (
      <View style={styles.grid}>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            label={category.label}
            icon={category.icon as any}
            selected={selectedIds.includes(category.id)}
            onPress={() => handlePress(category.id)}
          />
        ))}
      </View>
    );
  },
};

const styles = {
  grid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    justifyContent: "space-between" as const,
    gap: 20,
    paddingBottom: 20,
  },
};
