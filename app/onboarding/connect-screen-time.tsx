import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
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
        <SafeAreaView className="flex-1 bg-slate-50">
          {/* Content */}
          <View className="flex-1 px-8 pt-12">
            {/* Title */}
            <Text className="text-slate-900 text-3xl font-bold text-center mb-4 leading-tight">
              Connect to screen time securely.
            </Text>
            <Text className="text-slate-500 text-base font-medium text-center mb-12 leading-7">
              To analyze your screen time on this iPhone, Zenith will need your permission.
            </Text>

            <View className="bg-white rounded-[32px] p-8 border border-slate-100 items-center">
              <View className="w-16 h-16 bg-emerald-50 rounded-2xl items-center justify-center mb-6">
                <Ionicons name="shield-checkmark" size={32} color="#059669" />
              </View>
              
              <Text className="text-slate-900 text-xl font-bold text-center mb-3">
                Zenith would like to access screen time.
              </Text>
              <Text className="text-slate-500 text-sm text-center mb-8 leading-6">
                Providing access allows Zenith to see your activity data and help you manage focus sessions.
              </Text>
              
              <View className="w-full gap-3">
                <Pressable 
                  onPress={handleGivePermissions}
                  className="w-full py-4 bg-emerald-600 rounded-2xl items-center justify-center"
                >
                  <Text className="text-white text-lg font-bold">Allow Access</Text>
                </Pressable>
                <Pressable className="w-full py-4 bg-slate-50 rounded-2xl items-center justify-center">
                  <Text className="text-slate-400 text-lg font-bold">Not Now</Text>
                </Pressable>
              </View>
            </View>

            {/* Info text */}
            <View className="mt-auto mb-8">
              <Text className="text-slate-400 text-sm text-center leading-6 font-medium">
                Your information is protected by Apple and stays 100% on your phone.
              </Text>
              <Pressable onPress={handleLearnMore} className="mt-4 py-2">
                <Text className="text-emerald-600 text-sm text-center font-bold">
                  Learn more about privacy
                </Text>
              </Pressable>
            </View>
          </View>
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
