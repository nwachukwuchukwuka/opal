import { Ionicons } from "@expo/vector-icons";
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

const ITEM_HEIGHT = 64;
const PICKER_HEIGHT = 200;

const SnoozeSheet = forwardRef<BottomSheet, SnoozeSheetProps>(
  ({ onSnooze, onClose }, ref) => {
    const [selectedMinutes, setSelectedMinutes] = useState(
      SNOOZE_MINUTES[0] || 5
    );
    const scrollViewRef = useRef<ScrollView>(null);

    const snapPoints = useMemo(() => ["60%"], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
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
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
      >
        <BottomSheetView className="flex-1 px-8 pt-4">
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-amber-50 rounded-[24px] items-center justify-center border border-slate-200 mb-6">
              <Ionicons name="cafe" size={32} color="#d97706" />
            </View>
            <Text className="text-slate-900 text-3xl font-extrabold mb-2">Take a break</Text>
            <Text className="text-slate-500 text-sm font-medium text-center leading-5 px-4">
              Each snooze makes the next one harder to get. Use your time wisely.
            </Text>
          </View>

          <View className="items-center mb-8">
            <View className="w-full bg-white border border-slate-200 rounded-[40px] overflow-hidden relative shadow-sm" style={{ height: PICKER_HEIGHT }}>
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
                      <View className="flex-row items-center justify-center">
                        <Text
                          className={`text-3xl font-extrabold tracking-tighter ${isSelected ? "text-emerald-900" : "text-slate-300"
                            }`}
                        >
                          {minutes}
                        </Text>
                        <Text className={`text-sm font-bold ml-2 uppercase tracking-widest ${isSelected ? "text-slate-600" : "text-slate-300"
                          }`}>
                          min
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          <View className="mt-auto pb-10">
            <Pressable
              onPress={handleSnooze}
              className="w-full py-5 bg-emerald-600 border border-emerald-500 rounded-[28px] items-center justify-center shadow-2xl shadow-emerald-900/20"
            >
              <Text className="text-white text-xl font-bold">Start Break</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

SnoozeSheet.displayName = "SnoozeSheet";

export default SnoozeSheet;
