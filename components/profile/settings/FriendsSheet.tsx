import { HexagonAvatar } from "@/components/profile/HexagonAvatar";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

export type FriendsSheetRef = BottomSheetModal;

interface Friend {
  id: string;
  name: string;
  avatarColor: string;
  status: "active" | "blocked";
}

const INITIAL_FRIENDS: Friend[] = [
  { id: "1", name: "Taaffeite5892", avatarColor: "#10b981", status: "active" },
];

interface FriendsSheetProps {
  onAddFriends: () => void;
}

const FriendsSheet = forwardRef<FriendsSheetRef, FriendsSheetProps>(
  ({ onAddFriends }, ref) => {
    const snapPoints = useMemo(() => ["92%"], []);
    const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const activeFriends = friends.filter((f) => f.status === "active");
    const blockedFriends = friends.filter((f) => f.status === "blocked");

    const handleMenuPress = (id: string) => {
      setActiveMenuId(activeMenuId === id ? null : id);
    };

    const handleStopSharing = (id: string) => {
      setFriends((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "blocked" } : f))
      );
      setActiveMenuId(null);
    };

    const handleUnblock = (id: string) => {
        setFriends((prev) =>
          prev.map((f) => (f.id === id ? { ...f, status: "active" } : f))
        );
        setActiveMenuId(null);
      };

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.8}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#121214" }}
        handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}
        >
          {/* Header Section */}
          <View className="items-center pt-4 mb-8">
            {/* Avatar Group */}
            <View className="flex-row -space-x-3 mb-4">
              <View className="w-10 h-10 rounded-full bg-zinc-700 border-2 border-[#121214] items-center justify-center z-0">
                <Text>🧔</Text>
              </View>
              <View className="w-10 h-10 rounded-full bg-zinc-700 border-2 border-[#121214] items-center justify-center z-10 -mt-1">
                <Text>👩🏾</Text>
              </View>
              <View className="w-10 h-10 rounded-full bg-zinc-700 border-2 border-[#121214] items-center justify-center z-0">
                <Text>👱🏻‍♀️</Text>
              </View>
            </View>

            <Text className="text-white text-xl font-bold mb-2">
              My Friends
            </Text>
            <Text className="text-zinc-400 text-center text-sm px-8 leading-5">
              See which friends had the most Screen Time in the last 24 hours.
            </Text>
          </View>

          {/* Add Friends Button */}
          <Pressable
            onPress={onAddFriends}
            className="w-full py-4 rounded-full bg-gradient-to-r from-green-200 to-green-300 items-center mb-8"
            style={{ backgroundColor: "#bbf7d0" }}
          >
            <View className="flex-row items-center gap-2">
              <Ionicons name="person-add-outline" size={20} color="black" />
              <Text className="text-black font-bold text-lg">Add Friends</Text>
            </View>
          </Pressable>

          {/* Active Friends List */}
          <View className="gap-3">
            {activeFriends.map((friend) => (
              <View key={friend.id} className="relative z-10">
                <View className="bg-zinc-900 rounded-2xl p-4 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <HexagonAvatar color={friend.avatarColor} size={32} />
                    <Text className="text-white font-semibold text-base">
                      {friend.name}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => handleMenuPress(friend.id)}
                    className="p-2"
                  >
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={20}
                      color="#71717a"
                    />
                  </Pressable>
                </View>

                {activeMenuId === friend.id && (
                  <View className="absolute top-16 right-0 bg-zinc-800 rounded-xl p-1 z-50 w-40 shadow-lg border border-zinc-700">
                    <Pressable
                      onPress={() => handleStopSharing(friend.id)}
                      className="flex-row items-center gap-2 p-3 bg-red-500/10 rounded-lg"
                    >
                      <Text className="text-red-500 font-semibold text-sm">
                        Stop Sharing
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Blocked Section */}
          {blockedFriends.length > 0 && (
            <View className="mt-8">
              <Text className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-3 px-1">
                Blocked
              </Text>
              <View className="gap-3">
                {blockedFriends.map((friend) => (
                  <View key={friend.id} className="relative">
                    <View className="bg-zinc-900 rounded-2xl p-4 flex-row items-center justify-between opacity-60">
                      <View className="flex-row items-center gap-3">
                        <HexagonAvatar color={friend.avatarColor} size={32} />
                        <Text className="text-white font-semibold text-base">
                          {friend.name}
                        </Text>
                      </View>
                      <Pressable onPress={() => handleMenuPress(friend.id)} className="p-2">
                        <Ionicons
                          name="ellipsis-horizontal"
                          size={20}
                          color="#71717a"
                        />
                      </Pressable>
                    </View>
                     {/* Popover Menu for Unblock */}
                    {activeMenuId === friend.id && (
                        <View className="absolute top-16 right-0 bg-zinc-800 rounded-xl p-1 z-50 w-40 shadow-lg border border-zinc-700">
                            <Pressable
                            onPress={() => handleUnblock(friend.id)}
                            className="flex-row items-center gap-2 p-3"
                            >
                            <Text className="text-white font-semibold text-sm">
                                Unblock
                            </Text>
                            </Pressable>
                        </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default FriendsSheet;