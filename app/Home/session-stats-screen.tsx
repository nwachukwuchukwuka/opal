import ShareBottomSheet from "@/components/ShareBottomSheet";
import { SessionStats } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const mockStats: SessionStats = {
  distractionFreeTime: 10,
  intentionalUseToday: 3,
  funFact: "That's enough time to scroll 600,000 pixels.",
};

const SessionStatsScreen = () => {
  const shareSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();

  const handleShare = () => {
    shareSheetRef.current?.expand();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-slate-50 px-6 pt-4 pb-8">

        <View className="flex-row justify-end mb-8">
          <Pressable
            className="bg-white border border-slate-200 rounded-full w-12 h-12 items-center justify-center"
            onPress={() => router.dismissAll()}
          >
            <MaterialCommunityIcons name="close" size={24} color="#64748b" />
          </Pressable>
        </View>

        <View className="items-center mb-10">
          <View className="w-32 h-32 bg-emerald-50 rounded-full items-center justify-center border border-emerald-100 mb-6">
            <MaterialCommunityIcons
              name="trophy-award"
              size={64}
              color="#059669"
            />
          </View>
          <Text className="text-slate-900 text-4xl font-extrabold">
            You did it!
          </Text>
          <Text className="text-slate-500 text-base font-medium mt-2">
            Session completed successfully
          </Text>
        </View>

        <View className="flex-row gap-4 mb-4">
          <View className="flex-1 bg-white  rounded-[32px] p-6 items-center justify-center border border-slate-200">
            <Text className="text-slate-500 text-sm font-bold mb-2 text-center">
              Distraction Free
            </Text>
            <Text className="text-slate-900 text-4xl font-extrabold">
              {mockStats.distractionFreeTime}m
            </Text>
          </View>

          <View className="flex-1 bg-white rounded-[32px] p-6 items-center justify-center border border-slate-200">
            <Text className="text-slate-500 text-sm font-bold mb-2 text-center">
              Intentional Use
            </Text>
            <Text className="text-slate-900 text-4xl font-extrabold">
              {mockStats.intentionalUseToday}s
            </Text>
          </View>
        </View>

        <View className="bg-slate-100 rounded-[28px] p-6 border border-slate-200 mb-auto">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons name="lightbulb-on" size={20} color="#059669" />
            <Text className="text-slate-500 text-sm font-bold ml-2">
              Did you know?
            </Text>
          </View>
          <Text className="text-slate-700 text-base font-medium leading-6">
            {mockStats.funFact}
          </Text>
        </View>

        <View className="w-full gap-4 mt-6">
          <Pressable
            className="bg-white border border-slate-200 rounded-[24px] py-4 flex-row items-center justify-center"
          >
            <MaterialCommunityIcons name="restart" size={22} color="#0f172a" />
            <Text className="text-slate-900 text-lg font-bold ml-2">
              Restart Session
            </Text>
          </Pressable>

          <Pressable
            onPress={handleShare}
            className="bg-emerald-600 border border-emerald-500 rounded-[24px] py-4 flex-row items-center justify-center"
          >
            <MaterialCommunityIcons
              name="share"
              size={22}
              color="white"
            />
            <Text className="text-white text-lg font-bold ml-2">
              Share With Friends
            </Text>
          </Pressable>
        </View>

        <ShareBottomSheet ref={shareSheetRef} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SessionStatsScreen;