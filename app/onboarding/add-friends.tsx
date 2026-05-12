import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyLeaderboard = [
  { id: 1, name: "Daligaril", time: "1h 32m", rank: 1, icon: "🥇" },
  { id: 2, name: "Agent1", time: "1h 58m", rank: 2, icon: "🥈" },
  { id: 3, name: "BlueEagle5M", time: "4h 19m", rank: 3, icon: "🥉" },
  { id: 4, name: "BestDeal", time: "5h 38m", rank: 4 },
  { id: 5, name: "Ayomk", time: "9h 51m", rank: 5 },
];

const dummyContacts = [
  { id: 1, name: "Jack Dore", inContacts: true },
  { id: 2, name: "Jane Doe", inContacts: true },
  { id: 3, name: "Jessica Smith", inContacts: true },
  { id: 4, name: "Joshua Smith", inContacts: true },
];

const Avatar = ({ name, size = 40 }: { name: string; size?: number }) => {
  const colors = ["#059669", "#64748b", "#3b82f6", "#0ea5e9", "#10b981"];
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors[colorIndex] + '20',
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors[colorIndex] + '40',
      }}
    >
      <Text className="font-bold" style={{ fontSize: size * 0.4, color: colors[colorIndex] }}>
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
};

export default function AddFriendsScreen() {
  const [showContacts, setShowContacts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSkip = () => {
    router.push("/onboarding/benefits");
  };

  const handleAddFriends = () => {
    setShowContacts(true);
  };

  const handleNext = () => {
    router.push("/onboarding/benefits");
  };

  const handleInvite = (contactId: number) => {
    console.log("Invite contact:", contactId);
  };

  const filteredContacts = dummyContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showContacts) {
    return (
      <View className="flex-1 bg-slate-50">
        <SafeAreaView edges={["top"]} className="flex-1">
          <View className="px-8 py-8">
            <Text className="text-slate-900 text-3xl font-bold text-center mb-3">
              Find your friends
            </Text>
            <Text className="text-slate-500 text-lg text-center font-medium">
              See how they're improving their focus.
            </Text>
          </View>

          {/* Search Bento */}
          <View className="px-8 mb-6">
            <View className="bg-white rounded-[28px] px-5 py-4 flex-row items-center border border-slate-200">
              <Ionicons name="search" size={20} color="#94a3b8" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-slate-900 text-lg font-medium"
                placeholder="Search friends"
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Contacts List Bento */}
          <ScrollView className="flex-1 px-8" showsVerticalScrollIndicator={false}>
            <View className="bg-white rounded-[44px] p-6 border border-slate-200">
              {filteredContacts.map((contact, index) => (
                <View
                  key={contact.id}
                  className={`flex-row items-center justify-between py-5 ${index !== filteredContacts.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                >
                  <View className="flex-row items-center">
                    <Avatar name={contact.name} size={48} />
                    <View className="ml-4">
                      <Text className="text-slate-900 text-lg font-bold">{contact.name}</Text>
                      <Text className="text-slate-400 text-xs font-bold uppercase">In contacts</Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={() => handleInvite(contact.id)}
                    className="bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100"
                  >
                    <Text className="text-emerald-600 text-sm font-bold">Invite</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Next Button */}
          <View className="px-8 pb-12 pt-6">
            <Pressable
              onPress={handleNext}
              className="w-full py-6 rounded-[32px] bg-emerald-600 items-center justify-center"
            >
              <Text className="text-white text-xl font-bold">Continue</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <SafeAreaView edges={["top"]} className="flex-1">
        <View className="flex-row justify-end px-8 pt-4">
          <Pressable onPress={handleSkip} className="bg-white px-5 py-2 rounded-full border border-slate-100">
            <Text className="text-slate-500 font-bold text-sm">Skip</Text>
          </Pressable>
        </View>

        {/* Title Section */}
        <View className="px-10 py-10">
          <Text className="text-slate-900 text-3xl font-bold text-center mb-4 leading-tight">
            See how you compare to friends.
          </Text>
          <Text className="text-slate-500 text-lg text-center font-medium">
            Focusing is better with a bit of healthy competition.
          </Text>
        </View>

        {/* Friend Avatars Group */}
        <View className="flex-row justify-center mb-10">
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              className="w-16 h-16 rounded-full bg-white border-4 border-slate-100 -ml-4 items-center justify-center"
              style={{ zIndex: 10 - i }}
            >
              <View className={`w-full h-full rounded-full items-center justify-center ${i % 2 === 0 ? 'bg-emerald-50' : 'bg-blue-50'}`}>
                <Ionicons name="person" size={24} color={i % 2 === 0 ? '#059669' : '#3b82f6'} />
              </View>
            </View>
          ))}
        </View>

        {/* Leaderboard Bento */}
        <ScrollView className="flex-1 px-8" showsVerticalScrollIndicator={false}>
          <View className="bg-white rounded-[44px] p-8 border border-slate-200">
            <Text className="text-slate-400 text-xs font-bold uppercase mb-6 tracking-wide">Community leaderboard</Text>
            {dummyLeaderboard.map((friend, index) => (
              <View
                key={friend.id}
                className={`flex-row items-center justify-between py-5 ${index !== dummyLeaderboard.length - 1 ? "border-b border-slate-100" : ""
                  }`}
              >
                <View className="flex-row items-center">
                  <View className="w-8 items-center mr-2">
                    {friend.icon ? (
                      <Text className="text-lg">{friend.icon}</Text>
                    ) : (
                      <Text className="text-slate-400 font-bold text-base">{friend.rank}</Text>
                    )}
                  </View>
                  <Avatar name={friend.name} size={44} />
                  <Text className="text-slate-900 text-lg font-bold ml-4">{friend.name}</Text>
                </View>
                <View className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <Text className="text-slate-500 font-bold text-sm">{friend.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Add Friends Button */}
        <View className="px-8 pb-12 pt-6">
          <Pressable
            onPress={handleAddFriends}
            className="w-full py-6 rounded-[32px] bg-emerald-600 flex-row items-center justify-center"
          >
            <Ionicons name="people" size={24} color="white" style={{ marginRight: 12 }} />
            <Text className="text-white text-xl font-bold">Add friends</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
