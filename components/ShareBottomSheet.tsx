import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SHARE_OPTIONS } from "../constants/appData";

const ShareBottomSheet = forwardRef<BottomSheet, {}>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);

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
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#27272a" }}
      handleIndicatorStyle={{ backgroundColor: "#71717a" }}
    >
      <BottomSheetView className="flex-1 p-6">
        <View className="items-center mb-6">
          <View className="bg-black rounded-3xl p-4 shadow-lg w-72 h-80 items-center justify-center">
            <Text className="text-white text-2xl font-bold mt-2">Opal</Text>
            <Text className="text-zinc-400 text-xs">Achievement Unlocked</Text>
          </View>
          <Text className="text-zinc-400 mt-3 font-semibold">Preview</Text>
        </View>

        <Text className="text-zinc-300 text-base font-semibold mb-4">
          Share to:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {SHARE_OPTIONS.map((option) => (
            <Pressable key={option.id} className="items-center mr-2 w-20">
              <View
                className="w-16 h-16 rounded-2xl items-center justify-center mb-2"
                style={{ backgroundColor: option.color }}
              >
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={36}
                  color="white"
                />
              </View>
              <Text className="text-zinc-200 text-xs text-center">
                {option.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
});

ShareBottomSheet.displayName = "ShareBottomSheet";

export default ShareBottomSheet;
