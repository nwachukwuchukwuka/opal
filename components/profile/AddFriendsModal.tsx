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
    username: "taaffeite5892",
    avatarColor: "#10b981", // Updated to Emerald
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
      <SafeAreaView className="flex-1 bg-slate-50">

        {/* Redesigned Header Area */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row justify-between items-start mb-8">
            <View className="flex-1 mr-4">
              <Text className="text-slate-900 text-4xl font-bold leading-[44px] mb-2">
                Add Friends
              </Text>
              <Text className="text-slate-500 text-base font-medium">
                Connect with friends to see their screen time and stay accountable.
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              className="w-12 h-12 bg-white rounded-[20px] items-center justify-center border border-slate-200"
            >
              <Ionicons name="close" size={24} color="#64748b" />
            </Pressable>
          </View>

          {/* Redesigned Search Bar */}
          <View className="bg-white rounded-[24px] px-5 py-4 flex-row items-center border border-slate-200">
            <Ionicons name="search" size={20} color="#94a3b8" />
            <TextInput
              placeholder="Search by name or username"
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="text-slate-900 text-base font-bold flex-1 ml-3"
            />
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          className="flex-1 px-6 pt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          <View className="gap-8">

            {/* Friends Section */}
            {FOUND_FRIENDS.length > 0 && (
              <View>
                <Text className="text-slate-400 text-xs font-bold mb-3 ml-2">
                  Already friends
                </Text>
                {FOUND_FRIENDS.map((friend) => (
                  <View
                    key={friend.id}
                    className="bg-white p-4 rounded-[32px] flex-row items-center justify-between border border-slate-100 mb-3"
                  >
                    <View className="flex-row items-center gap-4">
                      <View className="p-1 bg-slate-50 rounded-[24px] border border-slate-100">
                        <HexagonAvatar color={friend.avatarColor} size={48} />
                      </View>
                      <View>
                        <Text className="text-slate-900 font-bold text-lg">
                          {friend.name}
                        </Text>
                        <Text className="text-slate-500 text-xs font-medium mt-0.5">
                          @{friend.username}
                        </Text>
                      </View>
                    </View>

                    {/* Badge */}
                    <View className="bg-emerald-50 px-3 py-2 rounded-[16px] border border-emerald-100 flex-row items-center gap-1.5">
                      <Ionicons name="checkmark-circle" size={16} color="#059669" />
                      <Text className="text-emerald-700 font-bold text-xs">
                        Friends
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Contacts Section */}
            <View>
              <Text className="text-slate-400 text-xs font-bold mb-3 ml-2">
                From your contacts
              </Text>
              {filteredContacts.map((contact) => (
                <View
                  key={contact.id}
                  className="bg-white p-4 rounded-[32px] flex-row items-center justify-between border border-slate-100 mb-3"
                >
                  <View className="flex-row items-center gap-4">
                    <Image
                      source={{ uri: contact.avatarUrl }}
                      className="w-16 h-16 rounded-[24px] border border-slate-100"
                    />
                    <View>
                      <Text className="text-slate-900 font-bold text-lg">
                        {contact.name}
                      </Text>
                      <Text className="text-slate-400 text-xs font-medium mt-0.5">
                        In contacts
                      </Text>
                    </View>
                  </View>

                  <Pressable className="bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-[20px]">
                    <Text className="text-slate-700 font-bold text-sm">
                      Invite
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Structured Bottom Dock */}
        <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100">
          <Pressable
            onPress={onClose}
            className="bg-emerald-600 w-full py-5 rounded-[28px] items-center justify-center"
          >
            <Text className="text-white text-lg font-bold">Finish Setup</Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </Modal>
  );
};