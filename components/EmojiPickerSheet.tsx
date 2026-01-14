import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { EMOJI_CATEGORIES } from "../constants";

export type EmojiPickerSheetRef = BottomSheetModal;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface EmojiPickerSheetProps {
  initialEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPickerSheet = forwardRef<EmojiPickerSheetRef, EmojiPickerSheetProps>(
  ({ initialEmoji, onEmojiSelect }, ref) => {
    const [selectedEmoji, setSelectedEmoji] = useState(initialEmoji);
    const [currentPage, setCurrentPage] = useState(0);
    const snapPoints = useMemo(() => ["75%"], []);

    const handleConfirm = () => {
      onEmojiSelect(selectedEmoji);
      if (ref && "current" in ref) {
        ref.current?.dismiss();
      }
    };

    const handleScroll = (event: any) => {
      const pageIndex = Math.round(
        event.nativeEvent.contentOffset.x / SCREEN_WIDTH
      );
      setCurrentPage(pageIndex);
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b" }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1">
          <Text className="text-white text-2xl font-bold text-center mt-2">
            Select Emoji
          </Text>
          {/* Header */}
          <View className="flex-row justify-between items-center px-8 py-4">
            <Pressable className="p-2">
              <Ionicons name="shuffle" size={28} color="white" />
            </Pressable>
            <View className="w-20 h-20 bg-zinc-800 rounded-full items-center justify-center">
              <Text className="text-5xl">{selectedEmoji}</Text>
            </View>
            <Pressable onPress={handleConfirm} className="p-2">
              <Ionicons name="checkmark-circle" size={32} color="#38bdf8" />
            </Pressable>
          </View>

          {/* Emoji Scroller */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {EMOJI_CATEGORIES.map((category) => (
              <View
                key={category.name}
                style={{ width: SCREEN_WIDTH }}
                className="px-4"
              >
                <Text className="text-zinc-400 font-semibold mb-3">
                  {category.name}
                </Text>
                <View className="flex-row flex-wrap justify-between">
                  {category.emojis.map((emoji) => (
                    <Pressable
                      key={emoji}
                      onPress={() => setSelectedEmoji(emoji)}
                      className="p-1"
                    >
                      <Text className="text-4xl">{emoji}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View className="flex-row justify-center items-center h-8">
            {EMOJI_CATEGORIES.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${currentPage === index ? "bg-white" : "bg-zinc-600"}`}
              />
            ))}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default EmojiPickerSheet;
