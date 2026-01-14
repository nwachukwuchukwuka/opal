import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SNOOZE_MINUTES } from "../constants";
import { SnoozeSheetProps } from "../types";

const ITEM_HEIGHT = 48;
const PICKER_HEIGHT = 192;

const SnoozeSheet = forwardRef<BottomSheet, SnoozeSheetProps>(
  ({ onSnooze, onClose }, ref) => {
    const [selectedMinutes, setSelectedMinutes] = useState(
      SNOOZE_MINUTES[0] || 5
    );
    const scrollViewRef = useRef<ScrollView>(null);

    const snapPoints = useMemo(() => ["55%"], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.7}
        />
      ),
      []
    );

    const handleSnooze = () => {
      onSnooze(selectedMinutes);
      onClose();
    };

    const calculateIndex = (y: number) => {
      const index = Math.round(y / ITEM_HEIGHT);
      return Math.max(0, Math.min(index, SNOOZE_MINUTES.length - 1));
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      const index = calculateIndex(y);
      const minutes = SNOOZE_MINUTES[index];
      if (minutes !== selectedMinutes) {
        setSelectedMinutes(minutes);
      }
    };

    const handleScrollEnd = (
      event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
      const y = event.nativeEvent.contentOffset.y;
      const index = calculateIndex(y);
      const minutes = SNOOZE_MINUTES[index];
      setSelectedMinutes(minutes);
    };

    const handleItemPress = (index: number) => {
      scrollViewRef.current?.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: true,
      });
      setSelectedMinutes(SNOOZE_MINUTES[index]);
    };

    const paddingVertical = (PICKER_HEIGHT - ITEM_HEIGHT) / 2;

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b" }}
      >
        <BottomSheetView className="flex-1 px-5">
          <Text className="text-white text-2xl font-bold mb-2">Snooze</Text>
          <Text className="text-zinc-400 text-base mb-6">
            Each time you snooze, it takes longer for a{"\n"}snooze to become
            available
          </Text>

          {/* Picker */}
          <View className="items-center py-4 mb-4">
            <View className="w-full relative" style={{ height: PICKER_HEIGHT }}>
              {/* Highlight Bar */}
              <View
                className="absolute left-0 right-0 bg-zinc-800 rounded-xl"
                style={{
                  height: ITEM_HEIGHT,
                  top: (PICKER_HEIGHT - ITEM_HEIGHT) / 2,
                }}
              />

              <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onScroll={handleScroll}
                scrollEventThrottle={16} 
                onMomentumScrollEnd={handleScrollEnd}
                contentContainerStyle={{ paddingVertical: paddingVertical }}
              >
                {SNOOZE_MINUTES.map((minutes, index) => {
                  const isSelected = selectedMinutes === minutes;
                  return (
                    <Pressable
                      key={minutes}
                      onPress={() => handleItemPress(index)}
                      style={{ height: ITEM_HEIGHT }}
                      className="items-center justify-center"
                    >
                      <View className="flex-row items-baseline justify-center">
                        <Text
                          className={`text-xl font-semibold ${
                            isSelected ? "text-white" : "text-zinc-600"
                          }`}
                        >
                          {minutes}
                        </Text>
                        {isSelected && (
                          <Text className="text-white text-lg font-medium ml-2">
                            minutes
                          </Text>
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          {/* Button */}
          <View className="mt-auto pb-6">
            <Pressable
              onPress={handleSnooze}
              className="w-full py-4 rounded-full items-center justify-center overflow-hidden"
              style={{ backgroundColor: "#06b6d4" }}
            >
              <Text className="text-white text-lg font-semibold">Snooze</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

SnoozeSheet.displayName = "SnoozeSheet";

export default SnoozeSheet;
