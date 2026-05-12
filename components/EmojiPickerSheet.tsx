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
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
          />
        )}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1">
          <Text className="text-slate-900 text-3xl font-bold text-center mt-4">
            Select emoji
          </Text>
          {/* Header */}
          <View className="flex-row justify-between items-center px-10 py-8">
            <Pressable className="w-12 h-12 bg-slate-100 rounded-2xl items-center justify-center">
              <Ionicons name="shuffle" size={24} color="#64748b" />
            </Pressable>
            <View className="w-24 h-24 bg-white border border-slate-100 rounded-full items-center justify-center shadow-sm shadow-slate-900/5">
              <Text className="text-5xl">{selectedEmoji}</Text>
            </View>
            <Pressable onPress={handleConfirm} className="w-12 h-12 bg-emerald-600 rounded-2xl items-center justify-center">
              <Ionicons name="checkmark" size={28} color="#ffffff" />
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
                className="px-6"
              >
                <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4 ml-2">
                  {category.name}
                </Text>
                <View className="flex-row flex-wrap justify-between gap-y-2">
                  {category.emojis.map((emoji) => (
                    <Pressable
                      key={emoji}
                      onPress={() => setSelectedEmoji(emoji)}
                      className={`w-14 h-14 items-center justify-center rounded-2xl ${selectedEmoji === emoji ? 'bg-emerald-50 border border-emerald-100' : ''}`}
                    >
                      <Text className="text-4xl">{emoji}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View className="flex-row justify-center items-center h-12 pb-6">
            {EMOJI_CATEGORIES.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${currentPage === index ? "bg-emerald-600 w-4" : "bg-slate-200"}`}
              />
            ))}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default EmojiPickerSheet;
