import {
  BottomSheetBackdrop,
  BottomSheetModal,
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

export type DisableDurationSheetRef = BottomSheetModal;

interface DisableDurationSheetProps {
  onDisableForDays: (days: number) => void;
  onDisableIndefinitely: () => void;
}

const ITEM_HEIGHT = 48;
const PICKER_HEIGHT = 192;
const DISABLE_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

const DisableDurationSheet = forwardRef<
  DisableDurationSheetRef,
  DisableDurationSheetProps
>(({ onDisableForDays, onDisableIndefinitely }, ref) => {
  const [selectedDays, setSelectedDays] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const snapPoints = useMemo(() => ["70%"], []);

  const calculateIndex = (y: number) => {
    const index = Math.round(y / ITEM_HEIGHT);
    return Math.max(0, Math.min(index, DISABLE_DAYS.length - 1));
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = calculateIndex(y);
    const day = DISABLE_DAYS[index];
    if (day !== selectedDays) {
      setSelectedDays(day);
    }
  };

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = calculateIndex(y);
    setSelectedDays(DISABLE_DAYS[index]);
  };

  const handleItemPress = (index: number) => {
    scrollViewRef.current?.scrollTo({
      y: index * ITEM_HEIGHT,
      animated: true,
    });
    setSelectedDays(DISABLE_DAYS[index]);
  };

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

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: "#f8fafc" }}
      handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
    >
      <BottomSheetView className="flex-1 px-8 pt-4">
        <Text className="text-slate-900 text-3xl font-bold mb-2">
          Disable duration
        </Text>
        <Text className="text-slate-500 font-medium text-base mb-8 leading-6">
          Zenith will automatically enable this session when you come back, or you
          can manually turn it back on.
        </Text>

        {/* Days Picker */}
        <View className="items-center py-4 mb-4">
          <View className="w-full relative" style={{ height: PICKER_HEIGHT }}>
            {/* Highlight Bar */}
            <View
              className="absolute left-0 right-0 bg-slate-50 border border-slate-100 rounded-3xl"
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
              onMomentumScrollEnd={handleMomentumScrollEnd}
              contentContainerStyle={{
                paddingVertical: (PICKER_HEIGHT - ITEM_HEIGHT) / 2,
              }}
            >
              {DISABLE_DAYS.map((day, index) => {
                const isSelected = selectedDays === day;
                return (
                  <Pressable
                    key={day}
                    onPress={() => handleItemPress(index)}
                    style={{ height: ITEM_HEIGHT }}
                    className="items-center justify-center"
                  >
                    <View className="flex-row items-baseline justify-center">
                      <Text
                        className={`text-2xl font-bold ${isSelected ? "text-slate-900" : "text-slate-300"
                          }`}
                      >
                        {day}
                      </Text>
                      {isSelected && (
                        <Text className="text-slate-900 text-lg ml-2 font-bold">
                          {day > 1 ? "days" : "day"}
                        </Text>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-auto pb-10 gap-4">
          <Pressable
            onPress={() => onDisableForDays(selectedDays)}
            className="w-full py-5 rounded-[28px] bg-emerald-600 border border-emerald-500 items-center justify-center shadow-lg shadow-emerald-900/10"
          >
            <Text className="text-white text-xl font-bold">
              Disable for {selectedDays} {selectedDays > 1 ? "days" : "day"}
            </Text>
          </Pressable>
          <Pressable
            onPress={onDisableIndefinitely}
            className="w-full py-5 rounded-[28px] bg-white border border-slate-100 items-center justify-center"
          >
            <Text className="text-slate-400 text-lg font-bold">
              Disable indefinitely
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DisableDurationSheet;
