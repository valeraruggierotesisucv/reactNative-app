import { useRef, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { CommentItem } from "../CommentItem/CommentItem";
import { CommentInput } from "../CommentInput/CommentInput";
import { Portal } from "@gorhom/portal";
import React from "react";
export interface Comment {
  username: string;
  comment: string;
  timestamp: Date;
  profileImage?: string;
}

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment?: (comment: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function CommentsSection({
  comments,
  onAddComment,
  isOpen,
  setIsOpen,
}: CommentsSectionProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const snapPoints = ["80%"];

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    }
  }, [isOpen]);

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        animateOnMount
        onClose={() => setIsOpen(false)}
        index={0}
        keyboardBehavior="extend"
        enableDynamicSizing={false}
      >
        <>
          <BottomSheetScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContainer}
          >
            {comments.map((comment, index) => (
              <CommentItem
                key={index}
                username={comment.username}
                comment={comment.comment}
                timestamp={comment.timestamp}
                userAvatar={comment.profileImage}
              />
            ))}
          </BottomSheetScrollView>
          <View style={styles.inputContainer}>
            <CommentInput
              onSubmit={(comment) => {
                onAddComment?.(comment);
                // scrollViewRef.current?.scrollToEnd();
              }}
            />
          </View>
        </>
      </BottomSheet>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
  },
  scrollContainer: {
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
  textInput: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "grey",
    color: "white",
    textAlign: "center",
  },
});
