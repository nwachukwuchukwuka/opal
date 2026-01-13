import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import PrivacyBottomSheet from "../../components/PrivacyBottomSheet";

export default function ConnectScreenTimeScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleGivePermissions = () => {
    router.push("/onboarding/permissions");
  };

  const handleLearnMore = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView className="flex-1 bg-black">
          {/* Content */}
          <View className="flex-1 px-6 pt-8">
            {/* Title */}
            <Text className="text-white text-2xl font-bold text-center mb-2">
              Connect Opal to Screen Time, Securely.
            </Text>
            <Text className="text-zinc-500 text-sm text-center mb-8">
              To analyse your Screen Time on this iPhone,{"\n"}Opal will need
              your permission.
            </Text>

            {/* iOS Permission Dialog Mockup */}
            <View className="bg-zinc-800/90 rounded-2xl p-5 mx-4 border border-zinc-700">
              <Text className="text-white text-base font-semibold text-center mb-3">
                "Opal" Would Like to Access{"\n"}Screen Time
              </Text>
              <Text className="text-zinc-400 text-xs text-center mb-4 leading-5">
                Providing "Opal" access to Screen Time may allow it to see your
                activity data, restrict content, and limit the usage of apps and
                websites.
              </Text>
              <View className="border-t border-zinc-700 pt-3 flex-row justify-center gap-8">
                <Pressable className="py-2 px-4">
                  <Text className="text-blue-500 text-base"> Continue</Text>
                </Pressable>
                <Pressable className="py-2 px-4">
                  <Text className="text-blue-500 text-base font-semibold">
                    Don't Allow
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Arrow indicator */}
            <View className="items-center mt-4">
              <Text className="text-zinc-500 text-2xl">↑</Text>
            </View>

            {/* Info text */}
            <View className="mt-auto mb-4">
              <Text className="text-zinc-500 text-sm text-center">
                Your information is protected by Apple and will{"\n"}stay 100%
                on your phone.
              </Text>
              <Pressable onPress={handleLearnMore} className="mt-2">
                <Text className="text-zinc-400 text-sm text-center underline">
                  Learn More
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Give Permissions Button */}
          {/* <View className="px-6 pb-10">
            <Pressable
              onPress={handleGivePermissions}
              className="w-full py-4 rounded-full bg-violet-600 active:bg-violet-700"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Give Permissions to Opal
              </Text>
            </Pressable>
          </View> */}
        </SafeAreaView>

        {/* Privacy Bottom Sheet */}
        <PrivacyBottomSheet
          ref={bottomSheetRef}
          onGivePermissions={handleGivePermissions}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
