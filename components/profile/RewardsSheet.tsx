import { RewardItem } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { REFERRAL_CODE, REWARDS } from "../../constants/appData";
import { GemUnlockModal } from "../rewards/GemUnlockModal";

export type RewardsSheetRef = BottomSheetModal;

const RewardsSheet = forwardRef<RewardsSheetRef>((props, ref) => {
  const snapPoints = useMemo(() => ["92%"], []);
  const [isCopied, setIsCopied] = useState(false);

  const [rewardsList, setRewardsList] = useState(REWARDS);
  const [unlockingItem, setUnlockingItem] = useState<RewardItem | null>(null);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleClaim = (id: string) => {
    setRewardsList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "claimed" } : item
      )
    );
  };

  const handlePressClaim = (item: RewardItem) => {
    setUnlockingItem(item);
  };

  const handleCloseUnlockModal = () => {
    if (unlockingItem) {
      setRewardsList((prev) =>
        prev.map((r) =>
          r.id === unlockingItem.id ? { ...r, status: "claimed" } : r
        )
      );
    }
    setUnlockingItem(null);
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
    <>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={false}
        backgroundStyle={{ backgroundColor: "#121214" }}
        handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="px-5 pt-2">
            <LinearGradient
              colors={["#4c7675", "#7dd3fc", "#4c7675"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-3xl h-48 items-center justify-center mb-6 relative overflow-hidden"
            >
              <View className="absolute border-[30px] border-white/10 w-80 h-80 rounded-full" />
              <View className="absolute border-[2px] border-white/20 w-64 h-64 rounded-full border-dashed" />
              <View className="items-center">
                <Text className="text-white text-5xl font-bold tracking-tighter">
                  Opal
                </Text>
                <Text className="text-white font-semibold mt-1">
                  30-day Guest Pass
                </Text>
              </View>
            </LinearGradient>

            <Text className="text-white text-center text-sm leading-5 mb-6 px-4">
              Give a friend unlimited access to Opal Pro, including unlimited
              schedules, app limits, deep focus, whitelisting and more!
            </Text>

            <Text className="text-zinc-500 text-xs text-center uppercase tracking-widest mb-3">
              Your Referral Code
            </Text>

            <Pressable onPress={handleCopy} className="mb-6">
              {isCopied ? (
                <View className="bg-zinc-800 h-12 rounded-xl flex-row items-center justify-center border border-zinc-700">
                  <Ionicons name="checkmark" size={18} color="#86efac" />
                  <Text className="text-green-300 font-bold ml-2">Copied</Text>
                </View>
              ) : (
                <View className="flex-row justify-center gap-3">
                  {REFERRAL_CODE.map((char, index) => (
                    <View
                      key={index}
                      className="w-10 h-12 bg-zinc-800 rounded-lg items-center justify-center"
                    >
                      <Text className="text-white font-bold text-lg">
                        {char}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </Pressable>

            <View className="gap-3 mb-8">
              <TouchableOpacity className="bg-green-300 rounded-full py-4 flex-row items-center justify-center">
                <Ionicons name="people" size={20} color="black" />
                <Text className="text-black font-bold text-base ml-2">
                  Add Friends
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-full py-4 flex-row items-center justify-center">
                <Ionicons name="share-outline" size={20} color="black" />
                <Text className="text-black font-bold text-base ml-2">
                  Share Referral Link
                </Text>
              </TouchableOpacity>
            </View>

            <View className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-lg bg-zinc-800 items-center justify-center mr-3 border border-zinc-700">
                  <Ionicons name="diamond" size={20} color="#f59e0b" />
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-zinc-400 text-xs">Next Unlock:</Text>
                    <Text className="text-zinc-500 text-xs">0/1</Text>
                  </View>
                  <Text className="text-white font-bold">Loyal Gem</Text>
                  <View className="h-1 bg-zinc-800 rounded-full mt-3 w-full">
                    <View className="h-full bg-zinc-600 w-[10%] rounded-full" />
                  </View>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between items-center mb-2 px-1">
              <View className="flex-row items-center">
                <Text className="text-zinc-400 text-sm mr-2">You referred</Text>
                <Ionicons
                  name="information-circle-outline"
                  size={14}
                  color="#71717a"
                />
              </View>
              <View className="flex-row items-center">
                <Ionicons name="person" size={12} color="white" />
                <Text className="text-white font-bold ml-1">1</Text>
              </View>
            </View>

            {/* Single Referral Item Mock */}
            <View className="flex-row items-center justify-between mb-8 px-1">
              <View className="flex-row items-center">
                <View className="w-6 h-6 rounded-full bg-zinc-700 border border-zinc-500 mr-2" />
                <Text className="text-white">Jendoe55</Text>
              </View>
              <Text className="text-zinc-600 text-xs">Joined 05/09/2024</Text>
            </View>
          </View>

          {/* --- TIMELINE REWARDS SECTION --- */}
          <View className="px-5">
            {rewardsList.map((item, index) => {
              const isLast = index === rewardsList.length - 1;

              return (
                <View key={item.id} className="flex-row">
                  {/* Left Column: Icon + Line */}
                  <View className="items-center mr-4">
                    {/* The Reward Icon */}
                    <View className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl items-center justify-center z-10">
                      {item.type === "gem" ? (
                        <View
                          style={{
                            shadowColor: item.color,
                            shadowRadius: 10,
                            shadowOpacity: item.status !== "locked" ? 0.8 : 0,
                          }}
                        >
                          <Ionicons
                            name="diamond"
                            size={24}
                            color={
                              item.status === "locked" ? "#52525b" : item.color
                            }
                          />
                        </View>
                      ) : item.type === "gift" ? (
                        <Ionicons
                          name="gift"
                          size={24}
                          color={item.status === "locked" ? "#52525b" : "white"}
                        />
                      ) : (
                        <Ionicons
                          name="help"
                          size={24}
                          color={item.status === "locked" ? "#52525b" : "white"}
                        />
                      )}
                    </View>

                    {/* The Connecting Line & Arrow */}
                    {!isLast && (
                      <View className="flex-1 items-center py-1">
                        <View className="w-[1px] h-full bg-zinc-800" />
                        <Ionicons
                          name="arrow-down"
                          size={12}
                          color="#27272a"
                          style={{ marginTop: -6 }}
                        />
                      </View>
                    )}
                  </View>

                  {/* Right Column: Content Card */}
                  <View className="flex-1 pb-6">
                    <View className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                      <View className="flex-row justify-between mb-1">
                        <Text className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">
                          {item.friendsRequired}{" "}
                          {item.friendsRequired === 1 ? "Friend" : "Friends"}
                        </Text>
                        {/* Progress text for claimable item */}
                        {item.status === "claimable" && (
                          <Text className="text-zinc-500 text-xs">1/3</Text>
                        )}
                      </View>

                      <Text className="text-white text-lg font-bold mb-1">
                        {item.title}
                      </Text>
                      <Text className="text-zinc-500 text-xs mb-4">
                        {item.description}
                      </Text>

                      {/* Status Logic */}
                      {item.status === "claimed" ? (
                        <View className="bg-zinc-800 rounded-full py-3 items-center flex-row justify-center">
                          <Ionicons
                            name="checkmark"
                            size={16}
                            color="#71717a"
                          />
                          <Text className="text-zinc-500 font-bold ml-2">
                            Claimed
                          </Text>
                        </View>
                      ) : item.status === "claimable" ? (
                        <>
                          <View className="h-1 bg-zinc-800 rounded-full mb-4 w-full">
                            <View className="h-full bg-teal-400 w-[33%] rounded-full" />
                          </View>
                          <TouchableOpacity
                            onPress={() => handlePressClaim(item)}
                            className="bg-white rounded-full py-3 items-center"
                          >
                            <Text className="text-black font-bold">Claim</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        // Locked State
                        <View className="h-1 bg-zinc-800 rounded-full mt-2 w-full">
                          <View className="h-full bg-zinc-700 w-[5%] rounded-full" />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
      <GemUnlockModal
        visible={!!unlockingItem}
        item={unlockingItem}
        onClose={handleCloseUnlockModal}
      />
    </>
  );
});

export default RewardsSheet;
