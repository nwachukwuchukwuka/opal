import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { PrivacyBottomSheetProps } from "../types";

export type PrivacyBottomSheetRef = BottomSheetModal;

const PrivacyBottomSheet = forwardRef<PrivacyBottomSheetRef, PrivacyBottomSheetProps>(
  ({ onGivePermissions }, ref) => {
    const snapPoints = useMemo(() => ["55%"], []);

    const handleGivePermissions = () => {
      if (ref && "current" in ref) {
        ref.current?.dismiss();
      }
      onGivePermissions();
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        animateOnMount={true}
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b", width: 40 }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.7}
          />
        )}
      >
        <BottomSheetView style={{ flex: 1, paddingHorizontal: 24, paddingBottom: 40 }}>
          <View className="flex-1">
            {/* Title */}
            <Text className="text-white text-xl font-bold text-center mb-6 mt-2">
              We take privacy very seriously.
            </Text>

            {/* Description */}
            <Text className="text-zinc-400 text-sm mb-4">
              Opal does NOT see:
            </Text>

            {/* Privacy points */}
            <View className="space-y-4">
              <View className="flex-row items-start">
                <Text className="text-violet-400 mr-3 text-base">✓</Text>
                <Text className="text-zinc-300 text-sm flex-1 leading-5">
                  Any data you enter, such as passwords or phone numbers
                </Text>
              </View>
              <View className="flex-row items-start mt-3">
                <Text className="text-violet-400 mr-3 text-base">✓</Text>
                <Text className="text-zinc-300 text-sm flex-1 leading-5">
                  Your browsing data, such as websites or apps you open
                </Text>
              </View>
              <View className="flex-row items-start mt-3">
                <Text className="text-violet-400 mr-3 text-base">✓</Text>
                <Text className="text-zinc-300 text-sm flex-1 leading-5">
                  Your Screen Time data, Opal only displays it
                </Text>
              </View>
            </View>
          </View>

          {/* Button */}
          <View className="w-full mt-6">
            <Pressable
              onPress={handleGivePermissions}
              className="w-full py-4 rounded-full bg-violet-600 active:bg-violet-700"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Give Permissions to Opal
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default PrivacyBottomSheet;
