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
          opacity={0.5}
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
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 24 }}
        >
          {/* Visual Hero Section */}
          <View className="items-center pt-8 mb-10">
            <View className="flex-row items-center mb-6">
              <View className="w-16 h-16 rounded-[24px] bg-white border-2 border-slate-100 items-center justify-center -rotate-6 z-0">
                <Text className="text-3xl">👨‍💻</Text>
              </View>
              <View className="w-16 h-16 rounded-[24px] bg-white border-2 border-emerald-50 items-center justify-center rotate-3 z-10 -mx-4 shadow-sm">
                <Text className="text-3xl">👩‍🚀</Text>
              </View>
              <View className="w-16 h-16 rounded-[24px] bg-white border-2 border-slate-100 items-center justify-center rotate-12 z-0">
                <Text className="text-3xl">🦸‍♂️</Text>
              </View>
            </View>

            <Text className="text-slate-900 text-3xl font-bold mb-3">Friends</Text>
            <Text className="text-slate-400 text-center text-base leading-6 font-medium px-4">
              Compare focus sessions and stay motivated with your inner circle.
            </Text>
          </View>

          {/* Primary Action */}
          <Pressable
            onPress={onAddFriends}
            className="w-full py-5 rounded-full bg-emerald-600 items-center mb-10"
          >
            <View className="flex-row items-center gap-2">
              <Ionicons name="person-add" size={20} color="white" />
              <Text className="text-white font-bold text-lg">Add friends</Text>
            </View>
          </Pressable>

          {/* Active Connections */}
          <View className="mb-8">
            <Text className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-4 px-2">Active connections</Text>
            <View className="gap-4">
              {activeFriends.map((friend) => (
                <View key={friend.id} className="relative">
                  <View className="bg-white rounded-[32px] p-5 flex-row items-center justify-between border border-slate-50">
                    <View className="flex-row items-center gap-4">
                      <View className="w-12 h-12 rounded-2xl bg-slate-50 items-center justify-center border border-slate-100">
                        <HexagonAvatar color={friend.avatarColor} size={36} />
                      </View>
                      <View>
                        <Text className="text-slate-900 font-bold text-base">{friend.name}</Text>
                        <Text className="text-emerald-600 text-[10px] font-bold uppercase">Shared focus</Text>
                      </View>
                    </View>
                    <Pressable
                      onPress={() => handleMenuPress(friend.id)}
                      className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-100"
                    >
                      <Ionicons name="ellipsis-horizontal" size={18} color="#94a3b8" />
                    </Pressable>
                  </View>

                  {activeMenuId === friend.id && (
                    <View className="absolute top-16 right-0 bg-white rounded-3xl p-2 z-50 w-48 border border-slate-100">
                      <Pressable
                        onPress={() => handleStopSharing(friend.id)}
                        className="flex-row items-center gap-3 p-4 bg-red-50 rounded-2xl"
                      >
                        <Ionicons name="hand-palm-outline" size={18} color="#ef4444" />
                        <Text className="text-red-600 font-bold text-sm">Stop sharing</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              ))}
              {activeFriends.length === 0 && (
                <View className="bg-white rounded-[32px] p-8 items-center border border-slate-50">
                  <Text className="text-slate-300 font-medium italic">No active friends yet</Text>
                </View>
              )}
            </View>
          </View>

          {/* Managed Connections */}
          {blockedFriends.length > 0 && (
            <View>
              <Text className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-4 px-2">Managed connections</Text>
              <View className="gap-4">
                {blockedFriends.map((friend) => (
                  <View key={friend.id} className="relative">
                    <View className="bg-white rounded-[32px] p-5 flex-row items-center justify-between border border-slate-50 opacity-60">
                      <View className="flex-row items-center gap-4">
                        <View className="w-12 h-12 rounded-2xl bg-slate-50 items-center justify-center border border-slate-100">
                          <HexagonAvatar color={friend.avatarColor} size={36} />
                        </View>
                        <Text className="text-slate-900 font-bold text-base">{friend.name}</Text>
                      </View>
                      <Pressable onPress={() => handleMenuPress(friend.id)} className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-100">
                        <Ionicons name="ellipsis-horizontal" size={18} color="#94a3b8" />
                      </Pressable>
                    </View>
                    
                    {activeMenuId === friend.id && (
                      <View className="absolute top-16 right-0 bg-white rounded-3xl p-2 z-50 w-48 border border-slate-100">
                        <Pressable
                          onPress={() => handleUnblock(friend.id)}
                          className="flex-row items-center gap-3 p-4 bg-emerald-50 rounded-2xl"
                        >
                          <Ionicons name="refresh-outline" size={18} color="#059669" />
                          <Text className="text-emerald-700 font-bold text-sm">Restore sharing</Text>
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