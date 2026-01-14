import { router } from "expo-router";
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
  { id: 1, name: "Daligaril", time: "1h 32m", rank: 1 },
  { id: 2, name: "Agent1", time: "1h 58m", rank: 2 },
  { id: 3, name: "BlueEagle5M", time: "4h 19m", rank: 3 },
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
  const colors = ["#8B5CF6", "#EC4899", "#3B82F6", "#10B981", "#F59E0B"];
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors[colorIndex],
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text className="text-white font-bold" style={{ fontSize: size * 0.4 }}>
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
      <SafeAreaView edges={["top"]} className="flex-1 bg-black">
        <View className="px-6 mb-6 pt-6">
          <Text className="text-white text-2xl font-bold text-center mb-2">
            Add your friends to see their Screen Time
          </Text>
          <Text className="text-zinc-500 text-sm text-center">
            Connect with friends to get started!
          </Text>
        </View>

        {/* Search */}
        <View className="px-6 mb-4">
          <TextInput
            className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-base"
            placeholder="Search"
            placeholderTextColor="#71717a"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Contacts List */}
        <ScrollView className="flex-1 px-6">
          {filteredContacts.map((contact) => (
            <View
              key={contact.id}
              className="flex-row items-center justify-between py-3 border-b border-zinc-800"
            >
              <View className="flex-row items-center">
                <Avatar name={contact.name} size={40} />
                <View className="ml-3">
                  <Text className="text-white text-base">{contact.name}</Text>
                  <Text className="text-zinc-500 text-xs">
                    IN YOUR CONTACTS
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => handleInvite(contact.id)}
                className="py-1 px-4"
              >
                <Text className="text-zinc-400 text-sm">+ Invite</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>

        {/* Next Button */}
        <View className="px-6 pb-10">
          <Pressable
            onPress={handleNext}
            className="w-full py-4 rounded-full bg-zinc-800 active:bg-zinc-700"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Next
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-black">
      <View className="flex-row justify-end px-6 mb-4">
        <Pressable onPress={handleSkip}>
          <Text className="text-zinc-500 text-base">Skip</Text>
        </Pressable>
      </View>

      {/* Title */}
      <View className="px-6 mb-6">
        <Text className="text-white text-2xl font-bold text-center mb-2">
          Add your friends to see their Screen Time
        </Text>
        <Text className="text-zinc-500 text-sm text-center">
          You thought your Screen Time was bad?
        </Text>
      </View>

      {/* Friend Avatars */}
      <View className="flex-row justify-center mb-6">
        <View className="flex-row">
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              className="w-14 h-14 rounded-full bg-zinc-700 border-2 border-black -ml-3 first:ml-0"
              style={{ zIndex: 4 - i }}
            >
              <View className="w-full h-full rounded-full bg-zinc-600 items-center justify-center">
                <Text className="text-2xl">👤</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Leaderboard */}
      <ScrollView className="flex-1 px-6">
        {dummyLeaderboard.map((friend, index) => (
          <View
            key={friend.id}
            className="flex-row items-center justify-between py-3 border-b border-zinc-800"
          >
            <View className="flex-row items-center">
              <Text className="text-zinc-500 text-sm w-6">{friend.rank}</Text>
              <Avatar name={friend.name} size={36} />
              <Text className="text-white text-base ml-3">{friend.name}</Text>
            </View>
            <Text className="text-zinc-400 text-sm">{friend.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Add Friends Button */}
      <View className="px-6 pb-10">
        <Pressable
          onPress={handleAddFriends}
          className="w-full py-4 rounded-full bg-zinc-800 border border-zinc-700 flex-row items-center justify-center active:bg-zinc-700"
        >
          <Text className="text-white text-lg mr-2">👥</Text>
          <Text className="text-white text-lg font-semibold">Add Friends</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
