import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { AddFriendsModal } from "./AddFriendsModal";
import { HexagonAvatar } from "./HexagonAvatar";
import { TabSwitcher } from "./TabSwitcher";

interface LeaderboardUser {
  rank: number;
  name: string;
  time: string;
  avatarColor: string;
  isMe?: boolean;
}

const FRIENDS_DATA: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Alexthegreat1",
    time: "4h 59m 15s",
    avatarColor: "#10b981",
    isMe: true,
  },
  { rank: 2, name: "Taaffeite5892", time: "14m 45s", avatarColor: "#3b82f6" },
];

const GLOBAL_DATA: LeaderboardUser[] = [
  { rank: 1, name: "jeremyg", time: "1d", avatarColor: "#10b981" },
  {
    rank: 2,
    name: "IndigoSogdianite",
    time: "15h 37m 56s",
    avatarColor: "#6366f1",
  },
  { rank: 3, name: "Ankur777", time: "14h 35m 58s", avatarColor: "#ef4444" },
  {
    rank: 4,
    name: "louismuknuis69",
    time: "13h 48m 15s",
    avatarColor: "#f59e0b",
  },
  {
    rank: 4963,
    name: "Alexthegreat1",
    time: "0s",
    avatarColor: "#10b981",
    isMe: true,
  },
];

export const LeaderboardCard = () => {
  const [activeTab, setActiveTab] = useState("Friends");
  const [isAddFriendsVisible, setIsAddFriendsVisible] = useState(false);

  const data = activeTab === "Friends" ? FRIENDS_DATA : GLOBAL_DATA;

  return (
    <>
      <View className="bg-zinc-900 rounded-3xl p-5 mb-6">
        <TabSwitcher
          tabs={["Friends", "Global"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white text-lg font-bold">
              {activeTab === "Friends"
                ? "Friends Screen Time"
                : "Session Time Leaderboard"}
            </Text>
            {activeTab === "Friends" && (
              <View className="flex-row items-center">
                <Ionicons name="person" size={14} color="white" />
                <Text className="text-white ml-1 font-bold">1</Text>
              </View>
            )}
          </View>
          <Text className="text-zinc-400 text-sm leading-5">
            These are{" "}
            {activeTab === "Friends"
              ? "your top 10 friends who had the most Screen Time"
              : "the top 10 Opal members who had the most Session Time"}{" "}
            in the last 24 hours
          </Text>
        </View>

        <View className="gap-4 mb-6">
          {data.map((user) => (
            <View key={user.rank} className="flex-row items-center">
              <Text className="text-zinc-500 w-6 font-mono text-xs">
                {user.rank}
              </Text>
              <HexagonAvatar color={user.avatarColor} size={24} />
              <Text className="text-white flex-1 ml-3 font-medium">
                {user.name}
              </Text>
              <Text className="text-zinc-400">{user.time}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row justify-center items-center mb-6">
          <View className="flex-row -space-x-3">
            <View className="w-10 h-10 rounded-full bg-zinc-700 border-2 border-zinc-900 items-center justify-center">
              <Text>🧔</Text>
            </View>
            <View className="w-10 h-10 rounded-full bg-zinc-700 border-2 border-zinc-900 items-center justify-center">
              <Text>👩🏾</Text>
            </View>
            <View className="w-10 h-10 rounded-full bg-zinc-700 border-2 border-zinc-900 items-center justify-center">
              <Text>👱🏻‍♀️</Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => setIsAddFriendsVisible(true)}
          className="bg-white rounded-full py-4 items-center flex-row justify-center gap-2"
        >
          <Ionicons name="person-add-outline" size={18} color="black" />
          <Text className="text-black font-bold text-base">
            {activeTab === "Friends" ? "Add Friends" : "Invite Friends"}
          </Text>
        </Pressable>
      </View>
      <AddFriendsModal
        visible={isAddFriendsVisible}
        onClose={() => setIsAddFriendsVisible(false)}
      />
    </>
  );
};
