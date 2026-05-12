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
    avatarColor: "#059669",
    isMe: true,
  },
  { rank: 2, name: "Taaffeite5892", time: "14m 45s", avatarColor: "#94a3b8" },
];

const GLOBAL_DATA: LeaderboardUser[] = [
  { rank: 1, name: "Jeremyg", time: "1d", avatarColor: "#10b981" },
  {
    rank: 2,
    name: "IndigoSogdianite",
    time: "15h 37m 56s",
    avatarColor: "#6366f1",
  },
  { rank: 3, name: "Ankur777", time: "14h 35m 58s", avatarColor: "#ef4444" },
  {
    rank: 4,
    name: "Louismuknuis69",
    time: "13h 48m 15s",
    avatarColor: "#f59e0b",
  },
];

export const LeaderboardCard = () => {
  const [activeTab, setActiveTab] = useState("Friends");
  const [isModalVisible, setModalVisible] = useState(false);

  const data = activeTab === "Friends" ? FRIENDS_DATA : GLOBAL_DATA;

  return (
    <View className="bg-white border border-slate-200 rounded-[44px] p-6 mb-2">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-slate-900 text-xl font-semibold">Leaderboard</Text>
        <Pressable
          onPress={() => setModalVisible(true)}
          className="w-10 h-10 bg-emerald-50 rounded-full items-center justify-center border border-emerald-100"
        >
          <Ionicons name="person-add" size={20} color="#059669" />
        </Pressable>
      </View>

      <TabSwitcher
        tabs={["Friends", "Global"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <View className="gap-3">
        {data.map((user) => (
          <View
            key={`${activeTab}-${user.rank}`}
            className={`flex-row items-center justify-between p-4 rounded-[28px] ${user.isMe ? "bg-emerald-50 border border-emerald-100" : "bg-slate-50/50 border border-slate-200"
              }`}
          >
            <View className="flex-row items-center gap-4 flex-1 mr-4">
              <View className="w-8 items-center">
                <Text className={`font-bold ${user.isMe ? "text-emerald-700" : "text-slate-400"}`}>
                  {user.rank}
                </Text>
              </View>
              <HexagonAvatar color={user.avatarColor} size={40} />
              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className={`font-semibold ${user.isMe ? "text-emerald-950" : "text-slate-900"}`}
                >
                  {user.name}
                </Text>
                {user.isMe && (
                  <Text className="text-emerald-600 text-[10px] font-bold">It's You</Text>
                )}
              </View>
            </View>
            <Text className={`text-xs font-bold ${user.isMe ? "text-emerald-700" : "text-slate-900"}`}>
              {user.time}
            </Text>
          </View>
        ))}
      </View>

      <AddFriendsModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};
