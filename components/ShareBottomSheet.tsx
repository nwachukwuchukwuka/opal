
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SHARE_OPTIONS } from "../constants/appData";

const ShareBottomSheet = forwardRef<BottomSheet, {}>((props, ref) => {
  const snapPoints = useMemo(() => ["85%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ), []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#f8fafc" }} // Slate 50
      handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }} // Slate 300
    >
      <BottomSheetView className="flex-1 px-6 pt-2 pb-6">

        {/* Redesigned Header */}
        <View className="mb-6 items-center">
          <Text className="text-slate-900 text-2xl font-extrabold mb-1.5">
            Share Achievement
          </Text>
          <Text className="text-slate-500 text-sm font-medium">
            Inspire your friends to stay focused
          </Text>
        </View>

        <View className="bg-white border-2 border-slate-100 rounded-[36px] p-6 items-center justify-center mb-8 h-56 relative overflow-hidden">


          <View className="w-16 h-16 bg-emerald-100 border border-emerald-200 rounded-full items-center justify-center mb-4 z-10">
            <MaterialCommunityIcons name="trophy" size={32} color="#059669" />
          </View>

          <Text className="text-slate-900 text-3xl font-extrabold mb-3 z-10">
            Opal
          </Text>

          <View className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-[16px] z-10">
            <Text className="text-slate-600 font-bold text-xs">
              Achievement Unlocked
            </Text>
          </View>
        </View>

        {/* Share Options Section */}
        <Text className="text-slate-900 text-base font-bold mb-4 ml-1">
          Share to
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
          className="overflow-visible"
        >
          {SHARE_OPTIONS.map((option) => (
            <Pressable key={option.id} className="items-center mr-4 w-20">
              <View
                className="w-16 h-16 rounded-[24px] items-center justify-center mb-3 border-2 border-white"
                style={{ backgroundColor: option.color }}
              >
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={32}
                  color="white"
                />
              </View>
              <Text className="text-slate-600 text-xs font-bold text-center">
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