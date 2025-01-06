import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { CommentItem } from "../CommentItem/CommentItem";
import { CommentInput } from "../CommentInput/CommentInput";
export interface Comment {
  id: string;
  username: string;
  comment: string;
  timestamp: Date;
  userAvatar?: string;
}

interface CommentsSectionProps {
  comments: Comment[];
  onReply?: (commentId: string) => void;
  onAddComment?: (comment: string) => void;
}

export function CommentsSection({
  comments,
  onReply,
  onAddComment,
}: CommentsSectionProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);
  const snapPoints = ["100%"];

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      animateOnMount
      onClose={() => setIsOpen(false)}
      index={0}
    >
      <View style={styles.container}>
        <BottomSheetScrollView contentContainerStyle={styles.scrollContainer}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              username={comment.username}
              comment={comment.comment}
              timestamp={comment.timestamp}
              userAvatar={comment.userAvatar}
              onReply={() => onReply?.(comment.id)}
            />
          ))}
        </BottomSheetScrollView>
        <View style={styles.inputContainer}>
          <CommentInput onSubmit={onAddComment} />
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});
