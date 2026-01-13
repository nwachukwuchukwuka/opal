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

  const StatRow = ({ label, value }: { label: string; value: string }) => (
    <View className="flex-row justify-between items-center py-4">
      <Text className="text-zinc-400 text-base">{label}</Text>
      <Text className="text-white text-base font-semibold">{value}</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-zinc-900">
        <View className="flex-1 p-6 items-center">
          {/* Close button */}
          <Pressable className="absolute top-4 right-6 bg-zinc-800 rounded-full p-1.5" onPress={() => router.dismissAll()}>
            <MaterialCommunityIcons name="close" size={24} color="#a1a1aa" />
          </Pressable>

          {/* Header */}
          <View className="items-center mt-14">
            <MaterialCommunityIcons
              name="party-popper"
              size={100}
              color="white"
            />
          </View>
          <Text className="text-white text-3xl font-bold mb-8">
            You did it!
          </Text>

          {/* Fun Fact Card */}
          <View className="bg-zinc-800 rounded-2xl p-4 w-full mb-4">
            <Text className="text-zinc-500 text-xs font-bold text-center mb-1">
              DID YOU KNOW?
            </Text>
            <Text className="text-white text-base text-center">
              {mockStats.funFact}
            </Text>
          </View>

          {/* Stats Card */}
          <View className="bg-zinc-800 rounded-2xl p-4 w-full">
            <StatRow
              label="Distraction Free"
              value={`${mockStats.distractionFreeTime}m`}
            />
            <View className="h-px bg-zinc-700 w-full" />
            <StatRow
              label="Intentional Use Today"
              value={`${mockStats.intentionalUseToday}s`}
            />
          </View>

          <View className="mt-auto w-full gap-3">
            {/* Restart Button */}
            <Pressable className="bg-zinc-200 rounded-full py-4 flex-row items-center justify-center">
              <MaterialCommunityIcons name="restart" size={20} color="black" />
              <Text className="text-black text-lg font-bold ml-2">
                Restart Session
              </Text>
            </Pressable>

            {/* Share Button */}
            <Pressable
              onPress={handleShare}
              className="bg-[#06b6d4] rounded-full py-4 flex-row items-center justify-center"
            >
              <MaterialCommunityIcons
                name="share-outline"
                size={20}
                color="black"
              />
              <Text className="text-black text-lg font-bold ml-2">
                Share With Friends
              </Text>
            </Pressable>
          </View>
        </View>

        <ShareBottomSheet ref={shareSheetRef} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SessionStatsScreen;
