import {
  StyleSheet,
  TouchableOpacity,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  View,
} from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

interface CommentInputProps {
  onSubmit?: (comment: string) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export function CommentInput({ onSubmit, onFocus, onBlur }: CommentInputProps) {
  const { t } = useTranslation();
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(comment);
    }
    setComment("");
  };

  return (
    <View style={styles.container}>
      <BottomSheetTextInput
        style={styles.input}
        placeholder={t("comments.comment_placeholder")}
        value={comment}
        onChangeText={setComment}
        placeholderTextColor="#666"
        multiline
        maxLength={1000}
        onSubmitEditing={() => {}}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <TouchableOpacity
        style={[styles.sendButton]}
        onPress={handleSubmit}
        disabled={comment.length === 0}
      >
        <View style={styles.iconContainer}>
          <Feather
            name="send"
            size={24}
            color={comment.length === 0 ? "gray" : "black"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 1,
    fontFamily: "SF-Pro-Text-Regular",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    transform: [{ rotate: "45deg" }],
  },
});
