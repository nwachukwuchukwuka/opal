import { HexagonAvatar } from "@/components/profile/HexagonAvatar";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AddFriendsModalProps {
  visible: boolean;
  onClose: () => void;
}

const FOUND_FRIENDS = [
  {
    id: "1",
    name: "Taaffeite5892",
    username: "Taaffeite5892",
    avatarColor: "#10b981",
    isFriend: true,
  },
];

const CONTACTS = [
  {
    id: "2",
    name: "Jack Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    name: "Jessica Smith",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "4",
    name: "John Smith",
    avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

export const AddFriendsModal = ({ visible, onClose }: AddFriendsModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = CONTACTS.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <SafeAreaView className="flex-1 bg-black">
        {/* Header Content */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-white text-3xl font-bold text-center mb-2 leading-tight">
            Add your friends to see their{"\n"}Screen Time
          </Text>
          <Text className="text-zinc-400 text-base text-center mb-8">
            Connect with friends to get started!
          </Text>

          {/* Search Bar */}
          <View className="bg-zinc-900 rounded-xl px-4 py-3 mb-6">
            <TextInput
              placeholder="Search"
              placeholderTextColor="#52525b"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="text-white text-base"
            />
          </View>
        </View>

        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-3 pb-24">
            {FOUND_FRIENDS.map((friend) => (
              <View
                key={friend.id}
                className="bg-zinc-900 p-4 rounded-2xl flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-3">
                  <HexagonAvatar color={friend.avatarColor} size={40} />
                  <View>
                    <Text className="text-white font-semibold text-base">
                      {friend.name}
                    </Text>
                    <Text className="text-zinc-500 text-xs">
                      {friend.username}
                    </Text>
                  </View>
                </View>
                <View className="bg-zinc-800/50 px-4 py-2 rounded-full border border-zinc-700/50 flex-row items-center gap-1">
                  <Ionicons name="checkmark" size={14} color="#38bdf8" />
                  <Text className="text-sky-400 font-bold text-sm">
                    Friends
                  </Text>
                </View>
              </View>
            ))}

            {filteredContacts.map((contact) => (
              <View
                key={contact.id}
                className="bg-zinc-900 p-4 rounded-2xl flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-3">
                  <Image
                    source={{ uri: contact.avatarUrl }}
                    className="w-10 h-10 rounded-full"
                  />
                  <View>
                    <Text className="text-white font-semibold text-base">
                      {contact.name}
                    </Text>
                    <Text className="text-zinc-500 text-xs uppercase tracking-wider">
                      IN YOUR CONTACTS
                    </Text>
                  </View>
                </View>
                <Pressable className="bg-zinc-800 px-4 py-2 rounded-full">
                  <Text className="text-white font-bold text-sm">+ Invite</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View className="absolute bottom-10 left-0 right-0 px-6">
          <Pressable
            onPress={onClose}
            className="bg-white w-full py-4 rounded-full items-center justify-center"
          >
            <Text className="text-black text-lg font-bold">Done</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
